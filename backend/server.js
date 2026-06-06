const express = require("express");
const cors = require("cors");

const pipelineRoute = require("./routes/pipeline");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/pipeline", pipelineRoute);

app.get("/", (req, res) => {
  res.send("Backend Running");
});

app.listen(5000, () => {
  console.log("Server running on port 5000");
});