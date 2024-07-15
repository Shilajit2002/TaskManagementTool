import Calendar from "../../Components/Calendar/Calendar";
import Task from "../../Components/Task/Task";

const Dashboard = () => {
  return (
    <>
      <div className="w-full min-h-dvh bg-white flex justify-evenly items-center">
        <Calendar />
        <Task />
      </div>
    </>
  );
};

export default Dashboard;
