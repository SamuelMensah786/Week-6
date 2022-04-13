const fs = require("fs");
const { Router } = require("express");
const router = Router();

let users = [];

fs.readFile("database.json", (err, data) => {
  if (err) throw err;

  users = JSON.parse(data);
});

router.get("/users", (req, res) => {
  res.status(200).json({ success: true, data: users });
});

router.get("/users/:id", (req, res) => {
  const userId = req.params.id;

  // use only two equal signs because the userId is a string but the actual id in the array is a number
  const user = users.find((u) => u.id == userId);

  if (!user) {
    return res.status(400).json({ success: false, message: "user not found" });
  }

  res.status(200).json({ success: true, data: user });
});

router.post("/users", (req, res) => {
  const newUser = req.body;
  users.push(newUser);

  let data = JSON.stringify(users);
  fs.writeFileSync("database.json", data);

  res.status(200).json(users);
});

module.exports = router;
