//initialize the express package
const express = require("express");
const app = express();
var cors = require("cors");

app.use(cors());

app.use(express.json());

var pun = {
  1: "I failed math so many times at school, I can’t even count.",
  2: "I used to have a handle on life, but then it broke.",
  3: "I was wondering why the frisbee kept getting bigger and bigger, but then it hit me.",
  4: "I heard there were a bunch of break-ins over at the car park. That is wrong on so many levels.",
  5: "When life gives you melons, you might be dyslexic.",
  6: "It takes a lot of balls to golf the way I do.",
  7: "I told him to be himself; that was pretty mean, I guess",
  8: "My father has schizophrenia, but he’s good people.",
  9: "The problem with kleptomaniacs is that they always take things literally.",
  10: "Never trust atoms; they make up everything",
  11: "Light travels faster than sound, which is the reason that some people appear bright before you hear them speak.",
  12: "Before you criticize someone, walk a mile in their shoes. That way, when you do criticize them, you’re a mile away and you have their shoes.",
  13: "Maybe if we start telling people their brain is an app, they’ll want to use it.",
  14: "I got a new pair of gloves today, but they’re both ‘lefts,’ which on the one hand is great, but on the other, it’s just not right.",
  15: "It was an emotional wedding. Even the cake was in tiers.",
  16: "I was riding a donkey the other day when someone threw a rock at me and I fell off. I guess I was stoned off my ass.",
  17: " 6:30 is the best time on a clock, hands down.",
  18: "If attacked by a mob of clowns, go for the juggler.",
  19: "My friend was explaining electricity to me, but I was like, ‘Watt?’",
  20: "Are people born with photographic memories, or does it take time to develop?",
};

function randomIntFromInterval(min, max) {
  // min and max included
  return Math.floor(Math.random() * (max - min + 1) + min);
}

app.get("/jokes/all", (req, res) => {
  res.json({ pun });
});

app.get("/jokes/one", (req, res) => {
  const rndInt = randomIntFromInterval(1, 20);
  var number = rndInt.toString();

  res.json({
    jokeNumber: number,
    joke: pun[number],
  });
});

app.post("/jokes", (req, res) => {
  var { number, joke } = req.body;
  var notEnded = true;

  if (number in pun) {
    return res.status(409).json({
      message: `joke Number exists`,
    });
  } else {
    pun[number] = joke;
    res.status(201).json({
      pun,
    });
  }
});

app.delete("/jokes", (req, res) => {
  var number = req.body.number;
  delete pun[number];
  res.status(204).json({
    message: `Deleted Message`,
  });
});

app.patch("/jokes", (req, res) => {
  var joke = req.body.joke;
  var number = req.body.number;

  pun[number] = joke;
  res.status(201).json({
    pun,
  });
});

var port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
