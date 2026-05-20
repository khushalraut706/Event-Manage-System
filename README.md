# 🎉 TECHFEST 2025 🚀💻

 Welcome to our Event Management Web App! Powered by Node.js, Express.js, MongoDB, and Mongoose, we've created a modern platform for managing tech events and registrations. 🚀

Users can explore events, register online, and receive instant confirmation, while admins can manage registrations through a powerful dashboard.  
Join workshops, conferences, and networking sessions with ease using TECHFEST 2025!

---

#  [Live](https://event-manage-system-a27k.onrender.com)

---

# 📡 Endpoints

## Registration Routes

### Add Registration

**Endpoint:** `POST /register`

**Description:**  
Adds a new event registration with user details such as name, email, phone number, and selected event.

---

### Get All Registrations

**Endpoint:** `GET /register`

**Description:**  
Retrieves a list of all event registrations.

---

### Get Registration By ID

**Endpoint:** `GET /register/:id`

**Description:**  
Retrieves details of a specific registration using its ID.

---

###  Update Registration

**Endpoint:** `PUT /register/:id`

**Description:**  
Updates registration details of a specific user identified by ID.

---

###  Delete Registration

**Endpoint:** `DELETE /register/:id`

**Description:**  
Deletes a registration from the system based on its ID.

---

#  Event Routes

## Add Event

**Endpoint:** `POST /event`

**Description:**  
Adds a new event to the system.

---

##  Get All Events

**Endpoint:** `GET /event`

**Description:**  
Retrieves a list of all available events.

---

## Update Event

**Endpoint:** `PUT /event/:eventId`

**Description:**  
Updates event details identified by event ID.

---

##  Delete Event

**Endpoint:** `DELETE /event/:eventId`

**Description:**  
Deletes an event from the system.

---

#  Data Models

#  Registration

The Registration data model represents information about users registering for events.

## Fields:

- `name` : String (User's full name)
- `email` : String (User's email address)
- `phone` : String (User's mobile number)
- `event` : String (Selected event name)
- `createdAt` : Date (Registration date)

## Example:

```json
{
  "name": "ayush Sharma",
  "email": "ayush@gmail.com",
  "phone": "9876543210",
  "event": "AI & ML Summit"
}
