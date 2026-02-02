const express = require("express");
const router = express.Router();
const nodemailer = require("nodemailer");

// GET contact page
router.get("/", (req, res) => {
  res.render("contact", { title: "Contact", active: "contact" });
});

// POST contact form
router.post("/", async (req, res) => {
  const { company, email, phone, message } = req.body;

  try {
    // ✅ transporter
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // ✅ send email
    await transporter.sendMail({
      from: `"SolviTech Website" <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_USER,
      subject: "New Contact Request - SolviTech",
      text: `
New Contact Request

Company: ${company}
Email: ${email}
Phone: ${phone || "N/A"}

Message:
${message || "N/A"}
      `,
    });

    // ✅ show success on same page
    return res.render("contact", {
      title: "Contact",
      active: "contact",
      success: "Request submitted successfully! We will contact you soon.",
    });
  } catch (err) {
    console.log("EMAIL ERROR:", err);

    return res.render("contact", {
      title: "Contact",
      active: "contact",
      error: "Request failed. Email not sent. Check server console.",
    });
  }
});

module.exports = router;
