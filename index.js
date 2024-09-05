const express = require("express");
const app = express();

var users = [
  {
    name: "John",
    kidneys: [
      {
        healthy: false,
      },
    ],
  },
];

app.get("/", (req, res) => {
  johnKidneys = users[0].kidneys;
  const numberOfKidneys = johnKidneys.length;
  console.log(numberOfKidneys);
  let healthyKidneys = 0;
  for (let i = 0; i < numberOfKidneys; i++) {
    if (johnKidneys[i].healthy) {
      healthyKidneys += 1;
    }
  }
  const unhealthyKidneys = numberOfKidneys - healthyKidneys;
  res.json({
    numberOfKidneys,
    healthyKidneys,
    unhealthyKidneys,
  });
});

app.use(express.json());
app.post("/", (req, res) => {
  const isHealthy = req.body.isHealthy;
  users[0].kidneys.push({
    healthy: isHealthy,
  });
  res.json({
    msg: "Done!",
  });
});

app.put("/", (req, res) => {
  for (let i = 0; i < users[0].kidneys.length; i++) {
    users[0].kidneys[i].healthy = true;
  }
  res.json({
    msg: "updated to true",
  });
});

app.delete("/", (req, res) => {
  if (isThereatLeastoneBadKidney()) {
    const newKidney = [];
    for (i = 0; i < users[0].kidneys.length; i++) {
      if (users[0].kidneys[i].healthy) {
        newKidney.push({
          healthy: true,
        });
      }
    }
    users[0].kidneys = newKidney;
    res.json({ msg: "Done!" });
  } else {
    res.status(411).json({
      msg: "You already have a good kidney!",
    });
  }
});

function isThereatLeastoneBadKidney() {
  let atleastoneUnhealthyKidney = false;
  for (i = 0; i < users[0].kidneys.length; i++) {
    if (!users[0].kidneys[i].healthy) {
      atleastoneUnhealthyKidney = true;
    }
  }
  return atleastoneUnhealthyKidney;
}

app.listen(3000);
