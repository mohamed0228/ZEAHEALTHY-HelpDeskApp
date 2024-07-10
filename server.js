const express = require("express");
const { Sequelize, DataTypes } = require("sequelize");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
const port = process.env.PORT || 5000; // Use PORT from environment variables or default to 5000

require("dotenv").config();

app.use(cors());
app.use(bodyParser.json());

// Database connection
const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialect: "postgres",
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false, // This is necessary for connecting to Supabase
    },
  },
});

// Define Ticket model
const Ticket = sequelize.define("Ticket", {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      isEmail: true,
    },
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  status: {
    type: DataTypes.ENUM("new", "in_progress", "resolved"),
    defaultValue: "new",
  },
  response: {
    type: DataTypes.TEXT,
  },
});

// Sync the models with the database
sequelize
  .sync()
  .then(() => {
    console.log("Models synced successfully.");
  })
  .catch((error) => {
    console.error("Unable to sync models:", error);
  });

// Routes
// Create a ticket
app.post("/api/tickets", async (req, res) => {
  const { name, email, description } = req.body;

  try {
    const ticket = await Ticket.create({
      name,
      email,
      description,
      status: "new",
    });
    res.status(201).json(ticket);
  } catch (error) {
    console.error("Error creating ticket:", error);
    res.status(500).json({ error: "Error creating ticket" });
  }
});

// Get all tickets (admin panel)
app.get("/api/admin/tickets", async (req, res) => {
  try {
    const tickets = await Ticket.findAll();
    res.json(tickets);
  } catch (error) {
    console.error("Error fetching tickets:", error);
    res.status(500).json({ error: "Error fetching tickets" });
  }
});

// Update a ticket (admin panel)
app.put("/api/admin/tickets/:id", async (req, res) => {
  const { id } = req.params;
  const { response, status } = req.body;

  try {
    const ticket = await Ticket.findByPk(id);
    if (!ticket) {
      return res.status(404).json({ error: "Ticket not found" });
    }

    // Update ticket details
    ticket.response = response;
    ticket.status = status;

    await ticket.save();
    res.json(ticket);
  } catch (error) {
    console.error("Error updating ticket:", error);
    res.status(500).json({ error: "Error updating ticket" });
  }
});

// Start server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
