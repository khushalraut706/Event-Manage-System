const express = require('express');
const router = express.Router();
const {
  registerUser,
  getAllRegistrations,
  deleteRegistration,
} = require('../controllers/registrationController');

// POST /api/register
router.post('/register', registerUser);

// GET /api/registrations
router.get('/registrations', getAllRegistrations);

// DELETE /api/registration/:id
router.delete('/registration/:id', deleteRegistration);

module.exports = router;
