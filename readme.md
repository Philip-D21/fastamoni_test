
# Donation Processing API

## Table of Contents
1. [Technology Stack](#1-technology-stack)
2. [File Structure](#2-file-structure)
3. [Authentication](#3-authentication)
4. [How to Run Locally](#4-how-to-run-locally)
5. [API Endpoints](#5-api-endpoints)
    1. [User Registration](#51-user-registration)
    2. [User Login](#52-user-login)
    3. [Create Wallet](#53-create-wallet)
    4. [Set Transaction PIN](#54-set-transaction-pin)
    5. [Create Donation](#55-create-donation)
    6. [Get Donation Counts](#56-get-donation-counts)
    7. [Get Single Donation](#57-get-single-donation)
    8. [Get Donations in a Period](#58-get-donations-in-a-period)
    9. [Process a Donation](#59-process-a-donation)

## 1. Technology Stack

- Node.js - Server-Side JavaScript Runtime
- Express.js - Web Application Framework for Node.js
- MySQL - Relational Database Management System
- Sequelize - Object-Relational Mapping (ORM) for MySQL
- Render - Deployment and Hosting Platform

### Test Informations

[Postman-Documentation](https://documenter.getpostman.com/view/20202295/2s9YJW76ZY)


## 2. File Structure

- **App.js**: Main application file
- **routes/**: Express route definitions
- **controllers/**: Controller functions for routes
- **models/**: User, Donation, Wallet, TransactionPin models
- **middlewares/**: Middleware for error handling and validation
- **utils/**: Utility functions, e.g., AppError
- **env/**: Environment variables
- **package.json**: Project dependencies
- **package-lock.json**: Dependency lock file

## 3. Authentication

Authentication is required for specific API endpoints, and actions are performed based on the authenticated user's context. The API uses JWT (JSON Web Tokens) authentication for secure user identification.

### JWT Authentication

JWT authentication is employed to ensure the security and integrity of user access. Users obtain a token upon successful login, and this token is used for subsequent authenticated requests to the API. JWT tokens are issued with an expiration time and contain user-specific information.

- **Token Issuance**: When a user logs in successfully, the API issues a JWT token that is included in the response.

- **Token Expiration**: JWT tokens have an expiration time, typically set to a specific duration after which the token becomes invalid. Users must re-authenticate once the token expires.

- **Token Inclusion**: To authenticate API requests, clients include the JWT token in the Authorization header of their HTTP requests.

```http
Authorization: Bearer <jwt-token>



## 4. How to Run Locally

To run the API locally, follow these steps:

```bash
npm install
npm run dev




### 51. user-registration

 To register a user, you can make a POST request to

http://localhost:7000/api/auth/signup

### Signup User

- Route: /signup
- Method: POST
- Body:

```
{
  "email": "doe@example.com",
  "password": "Password1",
  "fullname": "jon doe",
  "username": 'jon_doe",
}

```

- Responses

Success
```
{
    "status": "success",
    "message": "User created successfully",
    "user": {
        "id": 1,
        "fullname": "jon doe",
        "username": "jon_doe",
        "email": "doe@example.com",
        "password": "$2a$10$/zQR3FMaFBRNZrevT9hBK.k.ReyVn9WogEdl/0ikub8GNAWxyR5aK",
        "updatedAt": "2023-09-22T20:46:01.158Z",
        "createdAt": "2023-09-22T20:46:01.158Z"
    }
}
```

  
#### 52. user-Login

 To login, simply make a post request to

http://localhost:7000/api/auth/login

### Login User

- Route: /login
- Method: POST
- Body: 
```
{
   "email": "doe@example.com",
   "password": "Password1"
}
```

- Responses

Success
```
{
    message: 'Login successful',
    token: 'sjlkafjkldsfjsd'
}

```


####    create-Wallet

    To create a wallet, simply make POST request 

    http://localhost:7000/api/wallet
    
- Route: /wallet
- Method: POST
- Body: 
```
{
  "userId": 1,
  "walletName": 'starter',
}
```
- Responses

Success
```
{
   message: "Wallet created successfully"
    
}
```
    - Get Wallet

To gete a wallet, simply make GET request 

    http://localhost:7000/api/wallet/1
    
- Route: /wallet
- Method: GET

- Responses

Success
```
{
    "balance": 0,
    "walletName": "starter",
    "currency": "NGN"
}

```
## create Pin

  To create a transaction pin for a user, simply make POST request 
    
http://localhost:7000/api/set-pin

- Route: /set-pin
- Method: POST
- Body: 
```
{
  "userId": 1
  "transactionPin": 2222,
  "confirmTransactionPin": 2222,
}
```
- Responses

Success
```
{
    message: 'Transaction PIN set successfully'
    token: 'sjlkafjkldsfjsd'
}
```

# Donation Processing API Documentation

This documentation provides an overview of the endpoints and functionality of the Donation Processing API.

## Table of Contents

- [Endpoints](#endpoints)
  - [Create a New Donation](#create-a-new-donation)
  - [Get Donation Counts](#get-donation-counts)
  - [Get a Single Donation](#get-a-single-donation)
  - [Get Donations in a Period](#get-donations-in-a-period)
  - [Process a Donation](#process-a-donation)

## Introduction

The Donation Processing API allows users to create and manage donations. Additionally, it provides the functionality to process donations, such as sending thank-you messages when a user has made multiple donations.

## Endpoints

### Create a New Donation

- **URL**: `/api/donations`
- **Method**: `POST`
- **Description**: Create a new donation record.
- **Request Body**:
  - `donorId` (integer, required): The ID of the user making the donation.
  - `beneficiaryId` (integer, required): The ID of the user receiving the donation.
  - `amount` (float, required): The donation amount.
  - `message` (string, optional): An optional message from the donor.
- **Response**: Status code and JSON response.

### Get Donation Counts

- **URL**: `/api/donations/count/:userId`
- **Method**: `GET`
- **Description**: Get the count of donations made by a specific user.
- **Request Parameters**:
  - `userId` (integer, required): The ID of the user to retrieve donation counts for.
- **Response**: Status code and JSON response.

### Get a Single Donation

- **URL**: `/api/donations/:userId/:donationId`
- **Method**: `GET`
- **Description**: Get details of a single donation.
- **Request Parameters**:
  - `userId` (integer, required): The ID of the user who made the donation.
  - `donationId` (integer, required): The ID of the donation to retrieve.
- **Response**: Status code and JSON response.

### Get Donations in a Period

- **URL**: `/api/donations/:userId`
- **Method**: `GET`
- **Description**: Get a list of donations made by a specific user within a specified time period.
- **Request Parameters**:
  - `userId` (integer, required): The ID of the user to retrieve donations for.
- **Query Parameters**:
  - `startDate` (string, required): The start date of the period (YYYY-MM-DD).
  - `endDate` (string, required): The end date of the period (YYYY-MM-DD).
  - `page` (integer, optional): Page number for pagination.
  - `pageSize` (integer, optional): Number of results per page.
- **Response**: Status code and JSON response.

### Process a Donation

- **URL**: `/api/donations/message/:userId`
- **Method**: `POST`
- **Description**: Process a donation for a specific user. Sends a thank-you message if the user has made multiple donations.
- **Request Parameters**:
  - `userId` (integer, required): The ID of the user to process the donation for.
- **Response**: Status code and JSON response.

## Conclusion

This API provides the functionality to manage donations, track donation counts, and send thank-you messages to users who have made multiple donations. It can be integrated into your application to support donation-related features.
