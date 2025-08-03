const express = require("express");
const database = require("./database.json");

const app = express();
app.use(express.json());
const PORT = 3000;

app.get("/", (require, response) => {
  response.send("Hello world");
});

app.post("/login", (require, response) => {
  const { email, password } = require.body;

  const user = database.find(
    (user) => user.email === email && user.password === password
  );

  if (user) {
    response.status(200).json({
      token: "access_token",
    });
  } else {
    response.status(401).json({
      error: "invalid_credentials",
    });
  }
});

app.listen(PORT, () => {
  console.log(`Server is runnig on port ${PORT}`);
});
