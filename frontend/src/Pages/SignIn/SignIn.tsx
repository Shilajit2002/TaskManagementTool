import { Link } from "react-router-dom";
import back from "./Assets/back.jpg";
import { useState } from "react";
import axios from "axios";
import { BACKEND_SERVER } from "../../Helper/BaseUrl";
import { ToastContainer, toast } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";

const SignIn = () => {
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

  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setData({
      ...data,
      [name]: value,
    });
  };

  const handleSignIn = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (data?.email !== " " && data?.password !== " ") {
      axios
        .post(`${BACKEND_SERVER}/users/login`, data)
        .then((res) => {
          localStorage.setItem("taskToken", res?.data?.token);
          localStorage.setItem("taskUserId", res?.data?.userid);
          setData({
            email: "",
            password: "",
          });

          window.location.href = "/";
        })
        .catch((err) => {
          notifyError(err?.response?.data?.msg);
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
      <section
        className="bg-gray-50 w-full min-h-dvh"
        style={{
          background: `url('${back}') no-repeat`,
          backgroundSize: "cover",
        }}
      >
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
          <div className="flex items-center mb-6 text-3xl font-semibold text-gray-100">
            <img
              className="w-10 h-10 mr-2"
              src="https://cdn-icons-png.flaticon.com/512/906/906334.png"
              alt="logo"
              draggable="false"
            />
            Task Manager
          </div>
          <div className="w-full rounded-lg shadow md:mt-0 sm:max-w-md xl:p-0 backdrop-blur-3xl bg-black/50">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-100 md:text-2xl">
                Create an account
              </h1>
              <form className="space-y-4 md:space-y-6" onSubmit={handleSignIn}>
                <div>
                  <label
                    htmlFor="email"
                    className="block mb-2 text-sm font-medium text-gray-100"
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-indigo-600 focus:border-indigo-600 block w-full p-2.5 dark:bg-gray-200 dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500 outline-none focus:outline-none font-semibold"
                    placeholder="name@company.com"
                    required
                    value={data?.email}
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <label
                    htmlFor="password"
                    className="block mb-2 text-sm font-medium text-gray-100"
                  >
                    Password
                  </label>
                  <input
                    type="password"
                    name="password"
                    id="password"
                    placeholder="••••••••"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-indigo-600 focus:border-indigo-600 block w-full p-2.5 dark:bg-gray-200 dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500 outline-none focus:outline-none font-semibold"
                    required
                    value={data?.password}
                    onChange={handleChange}
                  />
                </div>
                <button
                  type="submit"
                  className="w-full text-white bg-indigo-600 hover:bg-indigo-700 focus:ring-4 focus:outline-none focus:ring-indigo-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-indigo-600 dark:hover:bg-indigo-700 dark:focus:ring-indigo-800"
                >
                  Login
                </button>
                <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                  Not have an account?{" "}
                  <Link
                    to="/signup"
                    className="font-medium text-indigo-600 hover:underline dark:text-indigo-500"
                  >
                    Signup here
                  </Link>
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default SignIn;
