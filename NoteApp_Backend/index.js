require("dotenv").config();

const express = require("express");
const app = express();
const session = require("express-session");

app.use({
  resave: false,
  saveUninitialized: true,
  secret: process.env.SESSION_SECRET,
});
