// controllers/ticketController.js
const Ticket = require("../models/ticketModel");

// Create a ticket
exports.createTicket = async (req, res) => {
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
};

// Get all tickets (admin panel)
exports.getAllTickets = async (req, res) => {
  try {
    const tickets = await Ticket.findAll();
    res.json(tickets);
  } catch (error) {
    console.error("Error fetching tickets:", error);
    res.status(500).json({ error: "Error fetching tickets" });
  }
};

// Update a ticket (admin panel)
exports.updateTicket = async (req, res) => {
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
};
