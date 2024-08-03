import React from "react";
import { Link } from "react-router-dom";

interface DetailsProps {
  element: JSX.Element;
}

const Navbar: React.FC<DetailsProps> = ({ element }) => {
  return (
    <>
      <div className="flex flex-row">
        <nav className="bg-gray-900 w-20  justify-between flex flex-col ">
          <div className="mt-10 mb-10">
            <img
              src="https://randomuser.me/api/portraits/women/76.jpg"
              className="rounded-full w-10 h-10 mb-3 mx-auto cursor-pointer"
              draggable="false"
            />
            <div className="mt-10">
              <ul>
                <li className="mb-6">
                  <Link to={"/profile"}>
                    <span>
                      <svg
                        className="fill-current h-7 w-7 mx-auto text-gray-300 hover:text-green-500"
                        viewBox="0 0 24 24"
                      >
                        <path
                          d="M12 4a4 4 0 014 4 4 4 0 01-4 4 4 4 0 01-4-4 4 4 0
                          014-4m0 10c4.42 0 8 1.79 8 4v2H4v-2c0-2.21 3.58-4
                          8-4z"
                        ></path>
                      </svg>
                    </span>
                  </Link>
                </li>
                <li className="mb-6">
                  <Link to={"/"}>
                    <span>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="fill-current h-7 w-7 mx-auto text-gray-300 hover:text-green-500"
                      >
                        <path d="M5.566 4.657A4.505 4.505 0 0 1 6.75 4.5h10.5c.41 0 .806.055 1.183.157A3 3 0 0 0 15.75 3h-7.5a3 3 0 0 0-2.684 1.657ZM2.25 12a3 3 0 0 1 3-3h13.5a3 3 0 0 1 3 3v6a3 3 0 0 1-3 3H5.25a3 3 0 0 1-3-3v-6ZM5.25 7.5c-.41 0-.806.055-1.184.157A3 3 0 0 1 6.75 6h10.5a3 3 0 0 1 2.683 1.657A4.505 4.505 0 0 0 18.75 7.5H5.25Z" />
                      </svg>
                    </span>
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="mb-4">
            <span>
              <svg
                className="fill-current h-7 w-7 text-gray-300 mx-auto hover:text-red-500 cursor-pointer"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                onClick={() => {
                  localStorage.removeItem("taskToken");
                  localStorage.removeItem("taskUserId");
                  window.location.href = "/signin";
                }}
              >
                <path
                  d="M13 4.00894C13.0002 3.45665 12.5527 3.00876 12.0004 3.00854C11.4481 3.00833 11.0002 3.45587 11 4.00815L10.9968 12.0116C10.9966 12.5639 11.4442 13.0118 11.9965 13.012C12.5487 13.0122 12.9966 12.5647 12.9968 12.0124L13 4.00894Z"
                  fill="currentColor"
                />
                <path
                  d="M4 12.9917C4 10.7826 4.89541 8.7826 6.34308 7.33488L7.7573 8.7491C6.67155 9.83488 6 11.3349 6 12.9917C6 16.3054 8.68629 18.9917 12 18.9917C15.3137 18.9917 18 16.3054 18 12.9917C18 11.3348 17.3284 9.83482 16.2426 8.74903L17.6568 7.33481C19.1046 8.78253 20 10.7825 20 12.9917C20 17.41 16.4183 20.9917 12 20.9917C7.58172 20.9917 4 17.41 4 12.9917Z"
                  fill="currentColor"
                />
              </svg>
            </span>
          </div>
        </nav>
        <div className="w-screen min-h-screen flex justify-center">
          {element}
        </div>
      </div>
    </>
  );
};

export default Navbar;
