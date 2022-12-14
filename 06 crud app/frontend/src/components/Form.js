import React, { useState } from "react";
import axios from "axios";

const Form = () => {
  // To Store the value from Frontend
  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");
console.log(userName, userEmail);
  // storing data from the frontend
  const submitData = async () => {
    const data = {
      name: userName, //dont use Capital letters
      email: userEmail,
    };

    // to transfer data from frontend to backend we need axios
    // const res = await axios.post("http://localhost:4000/createUser", data)  // one way is to write full url all the time and second is to make a proxy in the package.json

    //  "proxy": "http://127.0.0.1:4000",

      const res = await axios.post("/createUser", data); // proxy way
      console.log(res);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    submitData();
    setUserName("");
    setUserEmail("");
  };
  return (
      <div>
        <form onSubmit={handleSubmit}>
          <section className="text-gray-600 body-font relative">
            <div className="container px-5 py-8 mx-auto">
              <div className="flex flex-col text-center w-full mb-6">
                <h1 className="sm:text-3xl text-2xl font-medium title-font text-gray-900">
                  Create User
                </h1>
              </div>
              <div className="lg:w-1/2 md:w-2/3 mx-auto">
                <div className="flex flex-wrap -m-2">
                  <div className="p-2 w-1/2">
                    <div className="relative">
                      <label
                        htmlFor="name"
                        className="leading-7 text-sm text-gray-600"
                        >
                        Name
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={userName}
                        onChange={(e) => setUserName(e.target.value)}
                        className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                        />
                    </div>
                  </div>
                  <div className="p-2 w-1/2">
                    <div className="relative">
                      <label
                        htmlFor="email"
                        className="leading-7 text-sm text-gray-600"
                        >
                        Email
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={userEmail}
                        onChange={(e) => setUserEmail(e.target.value)}
                        className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                        />
                    </div>
                  </div>
                  <div className="p-2 w-full">
                    <button
                      type="submit"
                      className="flex mx-auto text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg"
                      >
                      Submit
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </form>
      </div>
  );
};

export default Form;
