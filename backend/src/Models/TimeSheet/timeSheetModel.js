// Import Mongoose
const mongoose = require("mongoose");

// Create TimeSheet Schema
const timeSheetSchema = new mongoose.Schema(
  {
    name: {
      type: String,
    },
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
    },
    attendance: [
      {
        date: {
          type: Date,
          required: true,
        },
        workingHours: {
          type: Number,
          required: true,
        },
        title: {
          type: String,
        },
        description: {
          type: String,
        },
      },
    ],
  },
  { timestamps: true }
);

// Create TimeSheet Collection & Export It
module.exports = mongoose.model("timesheet", timeSheetSchema);
