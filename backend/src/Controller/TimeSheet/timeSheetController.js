// Import User Model
const userModel = require("../../Models/User/userModel");
// Import TimeSheet Model
const timeSheetModel = require("../../Models/TimeSheet/timeSheetModel");

// Attendance API
const addAttendance = async (req, res) => {
  try {
    if (req.params.id !== req.user.id) {
      return res.status(401).json({ msg: "Unauthorized User" });
    }

    const { date, workingHours, title, description } = req.body;

    // Check if user exists
    const userData = await userModel.findById(req.params.id);
    if (!userData) {
      return res.status(409).json({ msg: "User not exists." });
    }

    // Find time sheet data for perticular user
    let timeSheetData = await timeSheetModel.findOne({
      user_id: req.params.id,
    });

    if (!timeSheetData) {
      // Create new timesheet if not exists
      timeSheetData = new timeSheetModel({
        name: userData.name,
        user_id: req.params.id,
        attendance: [
          { date: new Date(date), workingHours, title, description },
        ],
      });
    } else {
      // Update timesheet if it exists
      const attendanceIndex = timeSheetData.attendance.findIndex(
        (att) =>
          att.date.toISOString().split("T")[0] ===
          new Date(date).toISOString().split("T")[0]
      );

      if (attendanceIndex >= 0) {
        // Update existing attendance
        timeSheetData.attendance[attendanceIndex].workingHours = workingHours;
        timeSheetData.attendance[attendanceIndex].title = title;
        timeSheetData.attendance[attendanceIndex].description = description;
      } else {
        // Add new attendance entry
        timeSheetData.attendance.push({
          date: new Date(date),
          workingHours,
          title,
          description,
        });
      }
    }

    // Save timesheet data
    const savedData = await timeSheetData.save();

    // Ok
    return res.status(200).json(savedData);
  } catch (error) {
    return res.status(500).json({
      msg: "Internal Server Error",
      err: error.message,
    });
  }
};

// Attendance API
const getAttendance = async (req, res) => {
  try {
    if (req.params.id !== req.user.id) {
      // Unauthorized
      return res.status(401).json({ msg: "Unauthorized User" });
    }

    // Check if timesheet exists for the employee
    let timeSheetData = await timeSheetModel.findOne({
      user_id: req.params.id,
    });

    // Ok
    return res.status(200).json(timeSheetData);
  } catch (error) {
    // Status for Server Error
    return res.status(500).json({
      msg: "Internal Server Error",
      err: error.message,
    });
  }
};

// Exporting the function
module.exports = { addAttendance, getAttendance };
