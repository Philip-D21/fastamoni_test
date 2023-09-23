

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
  + `models`: a folder that contains user-donation-wallet-transsaction pin models.
  + `middlewares`: a folder that contains middlewares that performs some  error handling and validation
  + `utils`: a folder that contains  functions like AppError
  + `env`: environment variables
  + `package.json`: package.json
  + `package-lock.json`: package-lock.json