

### Test Informations

[Postman-Documentation]()


### How to run locally

```bash
npm install
npm run dev
```
### 1. Technology Used

- [Node.js](https://nodejs.org/) - Server Side
- [Express.js](https://expressjs.com/) for routing
- [mysql](https://www.mysql.com/) for database
- [Render](https://www.render.com/) for deployment and hosting
### 2. file structure:

  - [App.js]: main file
  + `routes`: a folder that uses the express router feature and keeps the route information in it.
  + `controllers`: a folder that contains controller functions for routes.
  + `models`: a folder that contains user-donation-wallet-transaction pin models.
  + `middlewares`: a folder that contains middlewares that performs some  error handling and validation
  + `utils`: a folder that contains  functions like AppError
  + `env`: environment variables
  + `package.json`: package.json
  + `package-lock.json`: package-lock.json


  ## Authentication
### for registration
   

#### Register

 To register a user, you can make a POST request to

/api/auth/signup

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

  
#### Login

 To login, simply make a post request to

http:  /api/auth/login

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



  ## Wallet

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



  ## Donation


    To create a wallet, simply make POST request 
    
- Route: /donation
- Method: POST
- Body: 
```
{
    "donorId": 1,
    "beneficiaryId": 2,
    "amount": 20.0
}

```
- Responses

Success
```
{
    "message": "Donation created successfully",
    "donation": {
        "createdAt": "2023-09-23T10:15:16.623Z",
        "id": 2,
        "donorId": 1,
        "beneficiaryId": 2,
        "amount": 20,
        "updatedAt": "2023-09-23T10:15:16.623Z"
    }
}
```

