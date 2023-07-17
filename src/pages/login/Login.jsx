import { useState, useCallback, useEffect } from "react";
import Axios from "axios";

const AlertValidation = ({ message }) => {
  return (
    <>
      <div className="alert alert-danger pt-2 ps-2" role="alert">
        {message}
        <span> Auto closed on ...</span>
      </div>
    </>
  );
};

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [dataLogin, setdataLogin] = useState([""]);
  const [validationForm, setvalidationForm] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault();
    Axios.post(`http://localhost:5000/auth/login`, { username, password })
      .then((response) => {
        setdataLogin(response);
        console.log(response);
      })
      .catch((error) => {
        // Handle error response
        console.log(error);
      });
  };

  return (
    <>
      {/* ALERT VALIDATION FORM */}
      {validationForm && (
        <AlertValidation message="please fill all the field correctly!" />
      )}

      <div className="px-4 h-[48em] flex flex-col items-center justify-center">
        <div className="text-4xl sm:text-5xl xl:text-6xl text-center">
          Login Page
        </div>
        <form className="mt-12 container max-w-lg" onSubmit={handleLogin}>
          <div className="mb-4">
            <label htmlFor="title" className="block text-md text-gray-700">
              Email
            </label>
            <input
              type="text"
              id="title"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              name="title"
              className="border border-gray-300 px-3 py-2 mt-1 w-full block text-sm focus:outline-none"
              placeholder="ex: shiroplane"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="title"
              className="font-b block text-md text-gray-700"
            >
              Password
            </label>
            <input
              type="text"
              id="title"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              name="title"
              className="border border-gray-300 px-3 py-2 mt-1 w-full font-b block text-sm focus:outline-none"
              placeholder="ex: supersecretpassword"
            />
          </div>
          <div className="mt-8">
            <button type="submit" className="py-2 px-8 border bg-white hover:bg-gray-50 text-black font-b">
              Login
            </button>
          </div>
        </form>
      </div>

      <div className=""></div>
    </>
  );
}

export default Login;
