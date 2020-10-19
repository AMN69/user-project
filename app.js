const express = require("express");
const app = express();
const mongoose = require("./db");

const router = express.Router();

// parse requests of content-type - application/json
app.use(express.json());

//parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

app.use("/", router);

app.use("/users", require("./routes/user_route"));

app.listen(3000, () => console.log("Listening to PORT 3000"));
