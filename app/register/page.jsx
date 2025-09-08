"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function Register() {
  const [
    formData,
    setFormData,
  ] = useState({
    name: "",
    email: "",
    password: "",
    role: "employee",
  });
  const [error, setError] =
    useState("");
  const [
    loading,
    setLoading,
  ] = useState(false);
  const router = useRouter();

  const handleChange = (
    e
  ) => {
    setFormData({
      ...formData,
      [e.target.name]:
        e.target.value,
    });
  };

  const handleSubmit = async (
    e
  ) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response =
        await fetch(
          "/api/auth/register",
          {
            method: "POST",
            headers: {
              "Content-Type":
                "application/json",
            },
            body: JSON.stringify(
              formData
            ),
          }
        );

      const data =
        await response.json();

      if (response.ok) {
        localStorage.setItem(
          "user",
          JSON.stringify(
            data.user
          )
        );
        router.push(
          "/dashboard"
        );
      } else {
        setError(
          data.message
        );
      }
    } catch (error) {
      setError(
        "An error occurred. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white p-8 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
        Register
      </h2>
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}
      <form
        onSubmit={
          handleSubmit
        }
      >
        <div className="mb-4">
          <label
            htmlFor="name"
            className="block text-gray-700 font-medium mb-2"
          >
            Full Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={
              formData.name
            }
            onChange={
              handleChange
            }
            className="w-full px-3 py-2 text-black border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="email"
            className="block text-gray-700 font-medium mb-2"
          >
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={
              formData.email
            }
            onChange={
              handleChange
            }
            className="w-full px-3 py-2 text-black border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="password"
            className="block text-gray-700 font-medium mb-2"
          >
            Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            value={
              formData.password
            }
            onChange={
              handleChange
            }
            className="w-full px-3 py-2 text-black border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        <div className="mb-6">
          <label
            htmlFor="role"
            className="block text-gray-700 font-medium mb-2"
          >
            Role
          </label>
          <select
            id="role"
            name="role"
            value={
              formData.role
            }
            onChange={
              handleChange
            }
            className="w-full px-3 py-2 text-black border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="employee">
              Employee
            </option>
            <option value="admin">
              Admin
            </option>
          </select>
        </div>
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50"
        >
          {loading
            ? "Creating account..."
            : "Register"}
        </button>
      </form>
      <p className="mt-4 text-center text-gray-600">
        Already have an
        account?{" "}
        <Link
          href="/login"
          className="text-blue-600 hover:underline"
        >
          Login here
        </Link>
      </p>
    </div>
  );
}
