import { useState } from "react";

const Task = () => {
  const [data, setData] = useState({
    title: "",
    hours: "",
    description: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target.value;
    setData({
      ...data,
      [name]: value,
    });
  };

  return (
    <>
      <div className="2xl:w-2/5 xl:w-1/2 lg:w-1/2 md:w-full h-dvh overflow-auto sm:w-full flex flex-col items-center bg-slate-900 text-white p-5 self-start shadow-lg">
        <form className="w-2/3 flex flex-col items-center p-5">
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
              value={data?.title}
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
              name="hours"
              id="hours"
              placeholder="Enter working hours"
              className="p-2 my-3 w-full border rounded shadow focus:outline-none text-slate-900"
              value={data?.hours}
              onChange={handleChange}
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
              value={data?.description}
              onChange={handleChange}
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
