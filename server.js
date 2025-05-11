const express = require("express");
const path = require("path");
const { open } = require("sqlite");
const sqlite3 = require("sqlite3");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

const dbPath = path.join(__dirname, "creditsea.db");
let db;
const initializeDBAndServer = async () => {
  try {
    db = await open({
      filename: dbPath,
      driver: sqlite3.Database,
    });
    app.listen(3000, () => {
      console.log("Server is running at http://localhost:3000/");
    });
  } catch (error) {
    console.log(`Database error is ${error.message}`);
    process.exit(1);
  }
};

initializeDBAndServer();

app.get("/userAppliedLoans/", async (request, response) => {
  const getUserAppliedLoans = `SELECT * FROM
    userAppliedLoans;`;
  const userAppliedLoanItems = await db.all(getUserAppliedLoans);
  response.send(userAppliedLoanItems);
});

app.get("/adminRecentLoans/", async (request, response) => {
  const getAdminRecentLoans = `SELECT * FROM
    adminRecentLoans;`;
  const adminRecentLoanItems = await db.all(getAdminRecentLoans);
  response.send(adminRecentLoanItems);
});

app.get("/verifierAppliedLoans/", async (request, response) => {
  const getverifierAppliedLoans = `SELECT * FROM
    verifierAppliedLoans;`;
  const verifierAppliedLoanItems = await db.all(getverifierAppliedLoans);
  response.send(verifierAppliedLoanItems);
});

module.exports = app;
