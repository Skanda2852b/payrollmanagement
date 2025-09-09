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
  const [
    isMenuOpen,
    setIsMenuOpen,
  ] = useState(false);
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
          setIsMenuOpen(
            false
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

  const toggleMenu = () => {
    setIsMenuOpen(
      !isMenuOpen
    );
  };

  return (
    <nav className="bg-blue-600 text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link
              href="/dashboard"
              className="text-xl font-bold flex items-center"
            >
              <svg
                className="w-6 h-6 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={
                    2
                  }
                  d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              Payroll System
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-4">
            {user ? (
              <>
                <span className="text-sm hidden lg:inline-block">
                  Welcome,{" "}
                  {user.name}
                </span>
                <Link
                  href="/dashboard"
                  className="hover:text-blue-200 transition-colors flex items-center"
                >
                  <svg
                    className="w-4 h-4 mr-1"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={
                        2
                      }
                      d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                    />
                  </svg>
                  Dashboard
                </Link>
                {user.role ===
                  "employee" && (
                  <Link
                    href="/expenses"
                    className="hover:text-blue-200 transition-colors flex items-center"
                  >
                    <svg
                      className="w-4 h-4 mr-1"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={
                          2
                        }
                        d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                      />
                    </svg>
                    Expenses
                  </Link>
                )}
                {user.role ===
                  "admin" && (
                  <Link
                    href="/admin/users"
                    className="hover:text-blue-200 transition-colors flex items-center"
                  >
                    <svg
                      className="w-4 h-4 mr-1"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={
                          2
                        }
                        d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
                      />
                    </svg>
                    Manage
                    Users
                  </Link>
                )}
                <button
                  onClick={
                    handleLogout
                  }
                  className="bg-blue-700 hover:bg-blue-800 px-3 py-1 rounded transition-colors flex items-center"
                >
                  <svg
                    className="w-4 h-4 mr-1"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={
                        2
                      }
                      d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                    />
                  </svg>
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  href="/login"
                  className="hover:text-blue-200 transition-colors"
                >
                  Login
                </Link>
                <Link
                  href="/register"
                  className="hover:text-blue-200 transition-colors"
                >
                  Register
                </Link>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            {user && (
              <span className="text-sm mr-3 hidden sm:inline-block">
                Welcome,{" "}
                {
                  user.name.split(
                    " "
                  )[0]
                }
              </span>
            )}
            <button
              onClick={
                toggleMenu
              }
              className="inline-flex items-center justify-center p-2 rounded-md text-white hover:text-blue-200 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
            >
              <svg
                className="h-6 w-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {isMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={
                      2
                    }
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={
                      2
                    }
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-blue-700 pb-3">
            <div className="px-2 pt-2 space-y-1">
              {user ? (
                <>
                  <Link
                    href="/dashboard"
                    className="block px-3 py-2 rounded-md text-base font-medium hover:bg-blue-600 transition-colors"
                    onClick={() =>
                      setIsMenuOpen(
                        false
                      )
                    }
                  >
                    Dashboard
                  </Link>
                  {user.role ===
                    "employee" && (
                    <Link
                      href="/expenses"
                      className="block px-3 py-2 rounded-md text-base font-medium hover:bg-blue-600 transition-colors"
                      onClick={() =>
                        setIsMenuOpen(
                          false
                        )
                      }
                    >
                      Expenses
                    </Link>
                  )}
                  {user.role ===
                    "admin" && (
                    <Link
                      href="/admin/users"
                      className="block px-3 py-2 rounded-md text-base font-medium hover:bg-blue-600 transition-colors"
                      onClick={() =>
                        setIsMenuOpen(
                          false
                        )
                      }
                    >
                      Manage
                      Users
                    </Link>
                  )}
                  <button
                    onClick={() => {
                      handleLogout();
                      setIsMenuOpen(
                        false
                      );
                    }}
                    className="w-full text-left block px-3 py-2 rounded-md text-base font-medium hover:bg-blue-600 transition-colors"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link
                    href="/login"
                    className="block px-3 py-2 rounded-md text-base font-medium hover:bg-blue-600 transition-colors"
                    onClick={() =>
                      setIsMenuOpen(
                        false
                      )
                    }
                  >
                    Login
                  </Link>
                  <Link
                    href="/register"
                    className="block px-3 py-2 rounded-md text-base font-medium hover:bg-blue-600 transition-colors"
                    onClick={() =>
                      setIsMenuOpen(
                        false
                      )
                    }
                  >
                    Register
                  </Link>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
