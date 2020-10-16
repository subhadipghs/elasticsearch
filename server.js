require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");
const aws = require('./routes/aws_elastic');
const campaignRoutes = require('./routes/campaign');

const app = express();
// Bodyparser middleware
app.use(express.json({ extended: false }));
// Logger

app.use(morgan("dev"));

// DB Config
const db = require("./config/keys").mongoURI;
// Connect to MongoDB
console.log(db);
mongoose
  .connect(db, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then(() => console.log("MongoDB successfully connected"))
  .catch((err) => console.log(err));

// Routes
app.use("/api", campaignRoutes);

app.get("/", (req, res) => res.send("Server Working"))

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server up and running on port ${port} !`));
