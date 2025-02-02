const mongoose = require("mongoose");

const MailSchema = new mongoose.Schema(
  {
    to: {
      type: String,
      required: [true, "Recipient email is required"],
    },
    subject: {
      type: String,
      required: [true, "Subject is required"],
    },
    text: {
      type: String,
      required: [true, "Message is required"],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Mail", MailSchema);
