"use client";
import {
  useState,
  useEffect,
} from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Navbar() {
  const [user, setUser] =
    useState(null);
  const router = useRouter();

  useEffect(() => {
    const userData =
      localStorage.getItem(
        "user"
      );
    if (userData) {
      setUser(
        JSON.parse(userData)
      );
    }
  }, []);

  const handleLogout =
    async () => {
      try {
        const response =
          await fetch(
            "/api/auth/logout",
            {
              method: "POST",
            }
          );
        if (response.ok) {
          localStorage.removeItem(
            "user"
          );
          router.push(
            "/login"
          );
        }
      } catch (error) {
        console.error(
          "Logout error:",
          error
        );
      }
    };

  return (
    <nav className="bg-blue-600 text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link
              href="/dashboard"
              className="text-xl font-bold"
            >
              Payroll System
            </Link>
          </div>
          <div className="flex items-center space-x-4">
            {user ? (
              <>
                <span className="text-sm">
                  Welcome,{" "}
                  {user.name}
                </span>
                <Link
                  href="/dashboard"
                  className="hover:text-blue-200"
                >
                  Dashboard
                </Link>
                {user.role ===
                  "employee" && (
                  <Link
                    href="/expenses"
                    className="hover:text-blue-200"
                  >
                    Expenses
                  </Link>
                )}
                {user.role ===
                  "admin" && (
                  <Link
                    href="/admin/users"
                    className="hover:text-blue-200"
                  >
                    Manage
                    Users
                  </Link>
                )}
                <button
                  onClick={
                    handleLogout
                  }
                  className="bg-blue-700 hover:bg-blue-800 px-3 py-1 rounded"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  href="/login"
                  className="hover:text-blue-200"
                >
                  Login
                </Link>
                <Link
                  href="/register"
                  className="hover:text-blue-200"
                >
                  Register
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
