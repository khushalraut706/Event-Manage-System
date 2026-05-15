const Registration = require('../models/Registration');

// POST /api/register — Save new registration
const registerUser = async (req, res) => {
  try {
    const { name, email, phone, event } = req.body;

    // Basic field presence check
    if (!name || !email || !phone || !event) {
      return res.status(400).json({
        success: false,
        message: 'All fields (name, email, phone, event) are required.',
      });
    }

    // Check for duplicate email
    const existingUser = await Registration.findOne({ email: email.toLowerCase().trim() });
    if (existingUser) {
      return res.status(409).json({
        success: false,
        message: 'This email is already registered for an event.',
      });
    }

    // Create and save registration
    const registration = new Registration({ name, email, phone, event });
    await registration.save();

    res.status(201).json({
      success: true,
      message: 'Registration successful! 🎉',
      data: registration,
    });
  } catch (error) {
    // Mongoose validation errors
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map((e) => e.message);
      return res.status(400).json({ success: false, message: messages.join(', ') });
    }
    // Duplicate key (race condition fallback)
    if (error.code === 11000) {
      return res.status(409).json({
        success: false,
        message: 'This email is already registered.',
      });
    }
    console.error('Register error:', error);
    res.status(500).json({ success: false, message: 'Server error. Please try again.' });
  }
};

// GET /api/registrations — Fetch all registrations
const getAllRegistrations = async (req, res) => {
  try {
    const registrations = await Registration.find().sort({ createdAt: -1 });
    res.status(200).json({
      success: true,
      count: registrations.length,
      data: registrations,
    });
  } catch (error) {
    console.error('Fetch error:', error);
    res.status(500).json({ success: false, message: 'Failed to fetch registrations.' });
  }
};

// DELETE /api/registration/:id — Delete a registration
const deleteRegistration = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Registration.findByIdAndDelete(id);

    if (!deleted) {
      return res.status(404).json({ success: false, message: 'Registration not found.' });
    }

    res.status(200).json({ success: true, message: 'Registration deleted successfully.' });
  } catch (error) {
    if (error.name === 'CastError') {
      return res.status(400).json({ success: false, message: 'Invalid registration ID.' });
    }
    console.error('Delete error:', error);
    res.status(500).json({ success: false, message: 'Failed to delete registration.' });
  }
};

module.exports = { registerUser, getAllRegistrations, deleteRegistration };
