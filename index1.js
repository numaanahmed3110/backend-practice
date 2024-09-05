const express = require("express");

const app = express();
const userMiddleware = (req, res, next) => {
  const username = req.headers.username;
  const password = req.headers.password;
  if (!(username === "numaan" && password == "pass")) {
    res.status(400).json({ msg: "somethings wrong with inputs" });
  } else {
    next();
  }
};

const kidneyMiddleware = (req, res, next) => {
  const username = req.headers.username;
  const password = req.headers.password;
  const kidneyId = req.query.kidneyId;
  if (!(kidneyId == 1 || kidneyId == 2)) {
    res.status(400).json({ msg: "somethings wrong with inputs" });
  } else {
    next();
  }
};
app.use(userMiddleware);

app.get("/health-checkup", kidneyMiddleware, (req, res) => {
  // do something with kidney
  res.json({
    msg: "your kidney is fine",
  });
});

app.get("/heart-checkup", (req, res) => {
  //do something
  res.json({
    msg: "your heart is fine",
  });
});
app.listen(3000);
