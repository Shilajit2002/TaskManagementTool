const {
  addAttendance,
  getAttendance,
} = require("../../Controller/TimeSheet/timeSheetController");

const auth = require("../../Middleware/auth");

const router = require("express").Router();

router.post("/timesheet/:id", auth, addAttendance);
router.get("/get-timesheet/:id", auth, getAttendance);

module.exports = router;
