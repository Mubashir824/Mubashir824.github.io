const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.render("services", { title: "Services", active: "services" });

});

module.exports = router;
