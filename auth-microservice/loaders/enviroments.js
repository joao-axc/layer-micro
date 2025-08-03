const { config } = require("dotenv");

module.exports = () => {
  const env = config({
    path: `./config/.env.${process.env.NODE_ENV || "development"}`,
  });

  if (env.error) {
    throw env.error;
  }

  return {
    server: {
      port: parseInt(env.parsed.SERVER_PORT, 10),
    },
  };
};
