// routes/ticketRoutes.js
const express = require("express");
const router = express.Router();
const ticketController = require("../controllers/ticketController");

// Create a ticket
router.post("/tickets", ticketController.createTicket);

// Get all tickets (admin panel)
router.get("/admin/tickets", ticketController.getAllTickets);

// Update a ticket (admin panel)
router.put("/admin/tickets/:id", ticketController.updateTicket);

module.exports = router;
