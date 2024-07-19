import axios from "axios";
import { BACKEND_SERVER } from "../../Helper/BaseUrl";
import { toast, ToastContainer } from "react-toastify";

const Task = ({ sendData, setSendData, setAttendanceData }) => {
  const notifyWarn = (msg: string) =>
    toast.warn(`${msg}`, {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });

  const notifySuccess = (msg: string) =>
    toast.success(`${msg}`, {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });

  const notifyError = (msg: string) =>
    toast.error(`${msg}`, {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    // If the name is "workingHours" and the value is not a number, do nothing
    if (name === "workingHours") {
      const numericValue = parseInt(value, 10);
      if (isNaN(numericValue) && value !== "") {
        return;
      }

      if (numericValue < 0 || numericValue > 24) {
        return;
      }
      // Update state with numeric value for workingHours
      setSendData({
        ...sendData,
        [name]: numericValue || "",
      });
    } else {
      // Update state with the string value for other fields
      setSendData({
        ...sendData,
        [name]: value,
      });
    }
  };

  const handleSheetFunc = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const token = localStorage.getItem("taskToken");
    const userid = localStorage.getItem("taskUserId");

    if (sendData?.workingHours !== "") {
      axios
        .post(`${BACKEND_SERVER}/users/timesheet/${userid}`, sendData, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          setAttendanceData(res?.data?.attendance || []);
          notifySuccess("Sheet updated successfully");
        })
        .catch((err) => {
          notifyError(err?.response?.data?.msg);
          // console.log(err);
        });
    } else {
      notifyWarn("Please fill the data!");
    }
  };

  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
      <div className="2xl:w-2/5 xl:w-1/2 lg:w-1/2 md:w-full h-dvh overflow-auto sm:w-full flex flex-col items-center bg-slate-900 text-white p-5 self-start shadow-lg">
        <form
          className="w-2/3 flex flex-col items-center p-5"
          onSubmit={handleSheetFunc}
        >
          <p className="text-3xl font-bold">Task Details</p>

          <div className="w-full flex flex-col items-start my-5">
            <label
              htmlFor="title"
              className="text-xl font-semibold text-indigo-100"
            >
              Task Title
            </label>
            <input
              type="text"
              name="title"
              id="title"
              placeholder="Enter task title"
              className="p-2 my-3 w-full border rounded shadow focus:outline-none text-slate-900"
              value={sendData?.title}
              onChange={handleChange}
            />
          </div>

          <div className="w-full flex flex-col items-start my-5">
            <label
              htmlFor="hours"
              className="text-xl font-semibold text-indigo-100"
            >
              Working Hours
            </label>
            <input
              type="text"
              name="workingHours"
              id="hours"
              placeholder="Enter working hours (0-24)"
              className="p-2 my-3 w-full border rounded shadow focus:outline-none text-slate-900"
              value={sendData?.workingHours}
              onChange={handleChange}
              required
            />
          </div>

          <div className="w-full flex flex-col items-start my-5">
            <label
              htmlFor="description"
              className="text-xl font-semibold text-indigo-100"
            >
              Task Description
            </label>
            <textarea
              name="description"
              id="description"
              placeholder="Enter task description"
              className="p-2 my-3 w-full h-52 border rounded shadow focus:outline-none text-slate-900"
              value={sendData?.description}
              onChange={(e) => {
                setSendData({
                  ...sendData,
                  description: e.target.value,
                });
              }}
            />
          </div>

          <button
            className="bg-green-600 text-white mt-5 px-5 py-1 text-lg rounded-md hover:bg-green-400"
            type="submit"
          >
            Save
          </button>
        </form>
      </div>
    </>
  );
};

export default Task;
