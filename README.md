# Advanced Role-Based Authentication System Using the MERN Stack (Backend)

![Banner](https://res.cloudinary.com/doxgutilx/image/upload/v1740657044/images/iiqdxle6e4giheutrxkp.png)

This project is an advanced role-based authentication system built using the MERN (MongoDB, Express.js, React.js, Node.js) stack. It provides a robust backend for user authentication and authorization, with features like user registration, login, password management, email verification, and role-based access control.

---

## Features

- **User Registration**: Allows new users to register.
- **Login**: Authenticates registered users.
- **Forgot Password**: Enables users to reset their password.
- **Confirm Password**: Ensures the user confirms their new password.
- **Email Verification**: Sends a verification email to the user.
- **Change Password**: Allows users to change their password.
- **Admin Dashboard**: A dashboard for admin users.
- **User Profile**: A profile page for users.

---

## Installation

1. **Clone the repository**:

   ```bash
   git clone <repository-url>
   ```

2. **Navigate to the project directory**:

   ```bash
   cd <project-folder>
   ```

3. **Install dependencies**:

   ```bash
   npm install
   ```

4. **Run the server**:
   ```bash
   npm run dev
   ```

---

## API Endpoints

You can test the API using Postman. Import the `AuthAPI.postman_collection.json` file into Postman for a pre-configured setup.

### Available Endpoints:

- **User Registration**:

  ```
  POST http://127.0.0.1:8000/api/register
  ```

- **User Login**:

  ```
  POST http://127.0.0.1:8000/api/login
  ```

- **Resend Verification Email**:

  ```
  GET http://127.0.0.1:8000/api/resend-verify-email
  ```

- **Verify Email**:

  ```
  POST http://127.0.0.1:8000/api/verify-email
  ```

- **Check Authenticated User**:

  ```
  GET http://127.0.0.1:8000/api/checkauthuser
  ```

- **Forgot Password**:

  ```
  POST http://127.0.0.1:8000/api/forget-password
  ```

- **Confirm Password**:
  ```
  POST http://127.0.0.1:8000/api/confirm-password/<Token>
  ```

---

## Configuration

**Environment Variables**:
Create a `.env` file in the root directory and add the following variables:

```env
# Application Configuration
APP_NAME = "AuthAPI"
PORT = 8000

# Database Configuration
DB_USERNAME = "your_database_username"
DB_PASSWORD = "your_database_password"
DB_NAME = "your_database_name"

# JWT Configuration
SECRET_KEY = "your_jwt_secret_key"

# Email Configuration
EMAIL_HOST = "your_email_host"          # Example: smtp.gmail.com
EMAIL_PORT = 587                        # Example: 587 for Gmail
EMAIL_USER = "your_email_address"       # Example: yourname@gmail.com
EMAIL_PASS = "your_email_password"      # Example: your_app_specific_password
EMAIL_FROM = "your_email_address"       # Example: yourname@gmail.com
```

Ensure MongoDB is running and update the `MONGODB_URI` in the `.env` file with your database connection string.
