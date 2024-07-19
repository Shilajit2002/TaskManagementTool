import { useEffect, useState } from "react";
import axios from "axios";
import { BACKEND_SERVER } from "../../Helper/BaseUrl";

const Calendar = ({ setSendData, attendanceData, setAttendanceData }) => {
  // Data from UseLoaderContext Hook
  // const { setOpenLoader, openLoader } = useLoaderContext();

  const [date, setDate] = useState(new Date()); // Initialize date state to current date
  const [currYear, setCurrYear] = useState(date.getFullYear()); // Get current year from date
  const [currMonth, setCurrMonth] = useState(date.getMonth()); // Get current month from date
  const [days, setDays] = useState([]); // State to store the days to be displayed in the calendar

  // Array of month names for display purposes
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  // Example national holidays and leave days
  const nationalHolidays = ["2024-06-16", "2024-07-16"];

  // Fetch attendance data from the backend when the component mounts
  useEffect(() => {
    // Fetch attendance data from the backend
    const fetchAttendanceData = () => {
      const token = localStorage.getItem("taskToken");
      const userid = localStorage.getItem("taskUserId");
      axios
        .get(`${BACKEND_SERVER}/users/get-timesheet/${userid}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          setAttendanceData(res?.data?.attendance || []);
        })
        .catch((err) => {
          console.log(err);
        });
    };

    fetchAttendanceData();
  }, [setAttendanceData]);

  // Re-render the calendar whenever the current year, month, or attendance data changes
  useEffect(() => {
    renderCalendar(); // Call function to render calendar
  }, [currYear, currMonth, attendanceData]);

  const renderCalendar = () => {
    // Calculate the necessary dates and days for the current month view
    const firstDayofMonth = new Date(currYear, currMonth, 1).getDay();
    const lastDateofMonth = new Date(currYear, currMonth + 1, 0).getDate();
    const lastDayofMonth = new Date(
      currYear,
      currMonth,
      lastDateofMonth
    ).getDay();
    const lastDateofLastMonth = new Date(currYear, currMonth, 0).getDate();

    const daysArray = []; // Array to hold day objects

    // Add days from the previous month to fill the first week
    for (let i = firstDayofMonth; i > 0; i--) {
      daysArray.push({
        date: new Date(currYear, currMonth - 1, lastDateofLastMonth - i + 1),
        inactive: true, // Mark these days as inactive
      });
    }

    // Add days for the current month
    for (let i = 1; i <= lastDateofMonth; i++) {
      const dayDate = new Date(currYear, currMonth, i);
      const isToday =
        i === date.getDate() &&
        currMonth === new Date().getMonth() &&
        currYear === new Date().getFullYear();
      const isNationalHoliday = nationalHolidays.includes(
        dayDate.toISOString().split("T")[0]
      );

      // Find the working hours for the current day from attendance data
      const attendance = attendanceData?.find((att) => {
        const attDate = new Date(att.date);
        return (
          attDate.getFullYear() === dayDate.getFullYear() &&
          attDate.getMonth() === dayDate.getMonth() &&
          attDate.getDate() === dayDate.getDate()
        );
      });

      const isLeaveDay = attendance && attendance.workingHours === 0; // Check if working hours are 0

      daysArray.push({
        date: dayDate,
        active: isToday,
        isNationalHoliday,
        isLeaveDay,
        isToday,
        workingHours: attendance ? attendance.workingHours : "", // Set working hours or empty string if not found
        title: attendance ? attendance.title : "", // Set title or empty string if not found
        description: attendance ? attendance.description : "", // Set description or empty string if not found
        isWeekend: dayDate.getDay() === 0 || dayDate.getDay() === 6, // Check if Saturday or Sunday
      });

      if (daysArray[i].active) {
        setSendData(daysArray[i]);
      }
    }

    // Add days from the next month to fill the last week
    for (let i = lastDayofMonth; i < 6; i++) {
      daysArray.push({
        date: new Date(currYear, currMonth + 1, i - lastDayofMonth + 1),
        inactive: true, // Mark these days as inactive
      });
    }

    setDays(daysArray); // Update state with the array of day objects
  };

  const handlePrevNext = (direction: string) => {
    const currentDate = new Date(); // Get the current date
    const currentYear = currentDate.getFullYear();
    const currentMonth = currentDate.getMonth();
    // Calculate the new month and year based on the direction
    let newMonth = direction === "prev" ? currMonth - 1 : currMonth + 1;
    let newYear = currYear;
    // Prevent navigation beyond the previous month
    if (newYear === currentYear && newMonth < currentMonth - 1) {
      newMonth = currentMonth - 1;
    }
    // Prevent navigation beyond the next month
    if (newYear === currentYear && newMonth > currentMonth + 1) {
      newMonth = currentMonth + 1;
    }
    // Adjust year and month if necessary
    if (newMonth < 0) {
      newMonth = 11;
      newYear -= 1;
    } else if (newMonth > 11) {
      newMonth = 0;
      newYear += 1;
    }
    // Set the new date, year, and month
    setDate(new Date(newYear, newMonth, 1));
    setCurrYear(newYear);
    setCurrMonth(newMonth);
  };

  return (
    <>
      <div className="2xl:w-3/5 xl:w-1/2 lg:w-1/2 md:w-full sm:w-full flex flex-col items-center bg-white p-5 self-start h-dvh overflow-auto">
        <div className="w-2/3 flex flex-col items-center bg-white my-5">
          <header className="w-full flex justify-evenly items-center my-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="size-6"
              onClick={() => handlePrevNext("prev")}
              style={{
                width: "35px",
                color: "#3A0F67",
                cursor: "pointer",
              }}
            >
              <path
                fillRule="evenodd"
                d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25Zm-4.28 9.22a.75.75 0 0 0 0 1.06l3 3a.75.75 0 1 0 1.06-1.06l-1.72-1.72h5.69a.75.75 0 0 0 0-1.5h-5.69l1.72-1.72a.75.75 0 0 0-1.06-1.06l-3 3Z"
                clipRule="evenodd"
              />
            </svg>
            <p className="text-3xl font-extrabold">{`${months[currMonth]} ${currYear}`}</p>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="size-6"
              onClick={() => handlePrevNext("next")}
              style={{
                width: "35px",
                color: "#3A0F67",
                cursor: "pointer",
              }}
            >
              <path
                fillRule="evenodd"
                d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25Zm4.28 10.28a.75.75 0 0 0 0-1.06l-3-3a.75.75 0 1 0-1.06 1.06l1.72 1.72H8.25a.75.75 0 0 0 0 1.5h5.69l-1.72 1.72a.75.75 0 1 0 1.06 1.06l3-3Z"
                clipRule="evenodd"
              />
            </svg>
          </header>
          <div className="calendar w-full flex flex-col items-center my-2">
            <ul className="weeks w-full grid grid-cols-7 my-2">
              <li className="text-center cursor-pointer text-lg font-semibold">
                Sun
              </li>
              <li className="text-center cursor-pointer text-lg font-semibold">
                Mon
              </li>
              <li className="text-center cursor-pointer text-lg font-semibold">
                Tue
              </li>
              <li className="text-center cursor-pointer text-lg font-semibold">
                Wed
              </li>
              <li className="text-center cursor-pointer text-lg font-semibold">
                Thu
              </li>
              <li className="text-center cursor-pointer text-lg font-semibold">
                Fri
              </li>
              <li className="text-center cursor-pointer text-lg font-semibold">
                Sat
              </li>
            </ul>
            <div className="w-full flex flex-col items-center">
              <ul className="days w-full grid grid-cols-7 border-2 border-inset border-purple-700 shadow-lg">
                {days.map((dayObj, index) => (
                  <li
                    key={index}
                    onClick={() => {
                      setSendData(dayObj);
                    }}
                    className={`
                    flex flex-col items-start p-2 text-2xl font-semibold text-center cursor-pointer border-sm
                    ${dayObj?.inactive ? "text-gray-400 opacity-30" : ""}
                    ${
                      dayObj?.active
                        ? "bg-purple-500 text-slate-800 hover:bg-purple-400"
                        : ""
                    }
                    ${
                      dayObj?.isNationalHoliday
                        ? "bg-blue-200 hover:bg-blue-100"
                        : ""
                    }
                    ${
                      dayObj?.isLeaveDay &&
                      !dayObj?.isWeekend &&
                      !dayObj?.isNationalHoliday
                        ? "bg-red-300 hover:bg-red-100"
                        : ""
                    }
                    ${
                      dayObj?.isWeekend
                        ? "bg-yellow-300 hover:bg-yellow-200"
                        : ""
                    }
                    ${
                      !dayObj?.active &&
                      !dayObj?.isNationalHoliday &&
                      !dayObj?.isLeaveDay &&
                      !dayObj?.isWeekend
                        ? "bg-white text-gray-500 hover:bg-gray-100"
                        : ""
                    }
                  `}
                    style={{
                      backgroundColor: dayObj?.workingHours > 0 ? "#fff" : "",
                      color: dayObj?.workingHours > 0 ? "#7c7979" : "",
                      boxShadow:
                        "rgba(0, 0, 0, 0.12) 0px 1px 3px, rgba(0, 0, 0, 0.24) 0px 1px 2px",
                    }}
                  >
                    {dayObj?.date.getDate()}
                    <div
                      className="w-7 h-7 text-center bg-gray-100 font-semibold text-lg cursor-pointer focus:outline-none mt-5 self-end"
                      style={{
                        color:
                          dayObj?.workingHours > 0
                            ? "rgb(10, 157, 177)"
                            : dayObj?.workingHours === 0
                            ? "#202020"
                            : "",
                      }}
                    >
                      {dayObj?.workingHours >= 0 ? dayObj?.workingHours : ""}
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="colorCode w-full flex justify-center items-center">
            <div className="w-1/4 flex justify-center items-center text-lg h-20 shadow-md bg-white mt-5 cursor-pointer border-t-4 border-teal-500 hover:bg-teal-500">
              Filled Hours
            </div>
            <div className="w-1/4 flex justify-center items-center text-lg h-20 shadow-md bg-white mt-5 cursor-pointer border-t-4 border-red-300 hover:bg-red-300">
              Leave Day
            </div>
            <div className="w-1/4 flex justify-center items-center text-lg h-20 shadow-md bg-white mt-5 cursor-pointer border-t-4 border-yellow-300 hover:bg-yellow-300">
              Weekend
            </div>
            <div className="w-1/4 flex justify-center items-center text-lg h-20 shadow-md bg-white mt-5 cursor-pointer border-t-4 border-blue-200 hover:bg-blue-200">
              Holiday
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Calendar;
