import { useState } from "react";
import Calendar from "../../Components/Calendar/Calendar";
import Task from "../../Components/Task/Task";

const Dashboard = () => {
  const [sendData, setSendData] = useState<unknown>(null); // Replace 'any' with actual type if known
  const [attendanceData, setAttendanceData] = useState<unknown[]>([]); // Replace 'any' with actual type if known

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
