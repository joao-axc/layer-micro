const server = require("./loaders/server");

const PORT = 3000;

(async () => {
  try {
    server.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
})();
