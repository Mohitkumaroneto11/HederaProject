require("dotenv").config();
const port = process.env.PORT;
const httpServer = require("./src/app");
httpServer.listen(port, () => {
     console.log("Server Running on port "+port);
});
