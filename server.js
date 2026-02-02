const express = require("express");
const path = require("path");
require("dotenv").config();
const expressLayouts = require("express-ejs-layouts");

const app = express();

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(expressLayouts);
app.set("layout", "layout");

app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));
app.use((req, res, next) => {
  res.locals.active = "";
  res.locals.title = "SolviTech";
  next();
});

app.use("/", require("./routes/home"));
app.use("/services", require("./routes/services"));
app.use("/solutions", require("./routes/solutions"));
app.use("/industries", require("./routes/industries"));
app.use("/about", require("./routes/about"));
app.use("/contact", require("./routes/contact"));

const PORT = 3000;
app.listen(PORT, () =>
  console.log(`SolviTech running at http://localhost:${PORT}`)
);
