const Server = require("./loaders/server");
const Env = require("./loaders/enviroments");

(async () => {
  try {
    const env = Env();
    const server = Server(env);

    server.listen(env.server.port, () => {
      console.log(`Server is running on port ${env.server.port}`);
    });
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
})();
