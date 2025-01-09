import React from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { signup } from "../services/actions/auth";

const Signup = () => {
  const {
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();
  const onSubmit = (data) => {
    signup(data, navigate);
    reset();
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-300">
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-xl">
        <h1 className="text-3xl font-bold text-center text-gray-700 mb-6">Signup</h1>
        <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
          {/* Name Field */}
          <div className="flex flex-col">
            <label htmlFor="name" className="text-sm font-medium text-gray-600">
              Name
            </label>
            <input
              type="text"
              id="name"
              placeholder="Enter your name"
              {...register("name", {
                required: "Name is required",
                minLength: {
                  value: 3,
                  message: "Minimum 3 characters",
                },
              })}
              className="mt-2 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
            />
            {errors.name && (
              <span className="text-sm text-red-500 mt-1">
                {errors.name.message}
              </span>
            )}
          </div>

          {/* Email Field */}
          <div className="flex flex-col">
            <label htmlFor="email" className="text-sm font-medium text-gray-600">
              Email
            </label>
            <input
              type="email"
              id="email"
              placeholder="Enter your email"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                  message: "Invalid email address",
                },
              })}
              className="mt-2 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
            />
            {errors.email && (
              <span className="text-sm text-red-500 mt-1">
                {errors.email.message}
              </span>
            )}
          </div>

          {/* Password Field */}
          <div className="flex flex-col">
            <label htmlFor="password" className="text-sm font-medium text-gray-600">
              Password
            </label>
            <input
              type="password"
              id="password"
              placeholder="Create a password"
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "Password must be at least 6 characters",
                },
              })}
              className="mt-2 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
            />
            {errors.password && (
              <span className="text-sm text-red-500 mt-1">
                {errors.password.message}
              </span>
            )}
          </div>

          <div className="text-sm text-center">
            <Link to="/login" className="text-purple-500 hover:underline">
              Already have an account? Login here
            </Link>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-3 bg-indigo-500 text-white font-medium rounded-lg hover:bg-indigo-600 transition duration-300"
          >
            Signup
          </button>
        </form>
      </div>
    </div>
  );
};

export default Signup;
