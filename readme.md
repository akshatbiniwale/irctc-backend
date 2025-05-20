# IRCTC Clone - Railway Management System Backend

This is a simplified IRCTC-like railway management system built using Node.js, Express, Sequelize, and MySQL. It supports admin and user roles, train management, seat booking with concurrency handling, and secure role-based access to endpoints.

---

## 📁 Project Structure

```
├── app.js
├── config
│   └── db.js
├── controllers
│   ├── authController.js
│   ├── trainController.js
│   └── bookingController.js
├── middleware
│   ├── authMiddleware.js
│   └── roleMiddleware.js
├── models
│   ├── user.js
│   ├── train.js
│   └── booking.js
├── routes
│   ├── authRoutes.js
│   ├── trainRoutes.js
│   └── bookingRoutes.js
├── .env
└── package.json
```

---

## 🚀 Setup Instructions

1. **Clone the Repository**

```bash
git clone https://github.com/akshatbiniwale/irctc-backend.git
cd irctc-backend
```

2. **Install Dependencies**

```bash
npm install
```

3. **Configure Environment Variables**
   Create a `.env` file:

```env
PORT=3000
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=yourpassword
DB_NAME=irctc_db
DB_DIALECT=mysql
JWT_SECRET=your_jwt_secret
```

4. **Start the Server**

```bash
npm run dev
```

Server will start on: `http://localhost:3000`

---

## 🔐 Roles

* **Admin**: Can create, update, and delete trains.
* **User**: Can register, log in, check trains, view availability, and book seats.

---

## 🛤️ API Endpoints

### Auth

| Endpoint             | Method | Description                 |
|----------------------|--------|-----------------------------|
| `/api/auth/register` | POST   | Register a new user / admin |
| `/api/auth/login`    | POST   | Log in a user / admin       |

### Train

| Endpoint                                      | Method | Description          |
|-----------------------------------------------|--------|----------------------|
| `/api/trains/add`                             | POST   | Create a new train   |
| `/api/trains/update/:id`                      | PUT    | Update a train       |
| `/api/trains/delete/:id`                      | DELETE | Delete a train       |
| `/api/trains/all`                             | GET    | Get all trains       |
| `/api/trains/available?source=&destination=`  | GET    | Get available trains |

### Booking

| Endpoint                          | Method | Description              |
|----------------------------------|--------|---------------------------|
| `/api/bookings/book/:trainId`    | POST   | Book a seat               |
| `/api/bookings/cancel/:bookingId`| PUT    | Cancel a seat             |
| `/api/bookings/all`              | GET    | Get all bookings          |
| `/api/bookings/:bookingId`       | GET    | Get booking details       |

### User

| Endpoint                   | Method | Description       |
|----------------------------|--------|-------------------|
| `/api/bookings/history`    | GET    | Get my bookings   |

---

## 📌 Headers

* **Admin API Key**:

  ```
  x-api-key: your_admin_api_key
  ```

* **User Auth Token**:

  ```
  Authorization: Bearer <JWT_TOKEN>
  ```

---

## 🧪 API Testing with Postman

You can import the provided Postman collection JSON file directly into Postman to test all the endpoints. The collection includes folders for:

* Auth
* Train Management
* Booking Operations

Use environment variables for `{{base_url}}`, `{{token}}`, and `{{api_key}}`.

---

## 📖 Sample Train JSON Object

```json
{
  "name": "Rajdhani Express",
  "source": "Delhi",
  "destination": "Mumbai",
  "totalSeats": 120
}
```

---

## ✅ Features

* Role-based access control
* Secure API key validation for admin routes
* JWT-based authentication for users
* Seat booking with race condition prevention
* Modular, clean code structure using MVC pattern
