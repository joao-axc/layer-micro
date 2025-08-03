const http = require("http");

const server = http.createServer((require, response) => {
  if (require.method === "GET" && require.url === "/hello") {
    response.statusCode = 200;
    response.setHeader("Content-Type", "plain-text");
    response.end("Hello world!");
  } else if (
    require.method === "POST" &&
    require.url === "/login" &&
    require.headers["content-type"] === "application/json"
  ) {
    let data = "";

    require.on("data", (chunck) => {
      data += chunck;
    });

    require.on("end", () => {
      const { email, password } = JSON.parse(data);
      let body;

      if (email === "user@mail.com" && password === "password") {
        body = {
          token: "access_token",
        };

        response.statusCode = 200;
      } else {
        body = {
          error: "invalid_credentials",
        };
        response.statusCode = 401;
      }

      response.setHeader("Content-Type", "application/json");
      response.end(JSON.stringify(body));
    });
  } else {
    response.statusCode = 404;
    response.setHeader("Content-Type", "plain/text");
    response.end(`${response.statusCode} - Not Found`);
  }
});

server.on("connection", () => {
  console.log("New client connection");
});

server.listen(3000);
