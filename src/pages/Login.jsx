import React, { useContext } from "react";
import { AuthContext } from "../components/AuthContext";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const { signUpWithGoogle, signUpWithGithub } = useContext(AuthContext);
  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <>
      <form
        onSubmit={handleSubmit}
        className="w-full h-screen flex items-center justify-center bg-gray-800"
      >
        <div className="bg-gray-200 w-96 h-auto rounded-lg pt-8 pb-8 px-8 flex flex-col items-center">
          <label className="font-light text-4xl mb-4">
            Todo<span className="font-bold"> by Voice</span>
          </label>
          <input
            type="text"
            className="w-full h-12 rounded-lg px-4 text-lg focus:ring-blue-600 mb-4"
            placeholder="Email"
          />
          <input
            type="password"
            className="w-full h-12 rounded-lg px-4 text-lg focus:ring-blue-600 mb-4"
            placeholder="Password"
          />
          <p className="text-right mb-4">Forgot password</p>
          <button
            onClick={() => signUpWithGoogle(navigate)}
            className="w-full h-12 rounded-lg bg-red-600 text-gray-200 uppercase font-semibold hover:bg-red-700 transition mb-4"
          >
            Sign with Google
          </button>

          <button onClick={() => signUpWithGithub(navigate)} className="w-full h-12 rounded-lg bg-gray-800 text-gray-200 uppercase font-semibold hover:bg-gray-900 transition mb-4">
            Sign with Github
          </button>
        </div>
      </form>
    </>
  );
};

export default Login;
