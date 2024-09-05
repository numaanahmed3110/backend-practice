const express = require("express");

const app = express();

app.use(express.json());

app.post("/health-checkup", (req, res) => {
  //   kidneys = [1, 2];
  const kidneys = req.body.kidneys;
  const kidneyLen = kidneys.length;

  res.send("You have " + kidneyLen + " kidneys");
});

app.listen(3000);
