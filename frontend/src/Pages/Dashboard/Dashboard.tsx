import { useState } from "react";
import Calendar from "../../Components/Calendar/Calendar";
import Task from "../../Components/Task/Task";

const Dashboard = () => {
  const [sendData, setSendData] = useState(null);
  const [attendanceData, setAttendanceData] = useState([]); // State to store attendance data fetched from the backend
  return (
    <>
      <div className="w-full min-h-dvh bg-white flex justify-evenly items-center max-md:flex-col">
        <Calendar
          setSendData={setSendData}
          attendanceData={attendanceData}
          setAttendanceData={setAttendanceData}
        />
        <Task
          sendData={sendData}
          setSendData={setSendData}
          setAttendanceData={setAttendanceData}
        />
      </div>
    </>
  );
};

export default Dashboard;
