const express = require('express');
const DummyDb = require('./DummyDb.js');
const app = express();
const cors = require('cors');
const corsOptions = {
  origin: ["http://localhost:5173"],
};

app.use(cors(corsOptions));
app.use(express.json());

app.get("/api/user/getUser", (req, res) => {
  try {
    const user = DummyDb[req.query.userId];
    res.status(200).send(user);
  } catch (exception) {
    console.error("failed to get user: " + exception.message);
    res.status(400);
  }
});

app.listen(8080, () => {
  console.log("server started on port 8080");
});