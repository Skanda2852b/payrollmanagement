"use client";
import {
  useEffect,
  useState,
} from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function Home() {
  const [user, setUser] =
    useState(null);
  const [
    loading,
    setLoading,
  ] = useState(true);
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
      router.push(
        "/dashboard"
      );
    } else {
      setLoading(false);
    }
  }, [router]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            <h1 className="text-5xl font-bold text-gray-800 mb-6">
              Streamline Your
              Payroll
              Management
            </h1>
            <p className="text-xl text-gray-600 mb-10 max-w-3xl mx-auto">
              Efficiently
              manage employee
              salaries,
              expenses, and
              generate
              detailed reports
              with our
              comprehensive
              payroll
              management
              system.
            </p>
            <div className="flex justify-center space-x-4">
              <Link
                href="/login"
                className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-lg transition duration-300"
              >
                Get Started
              </Link>
              <Link
                href="/register"
                className="border border-blue-600 text-blue-600 hover:bg-blue-50 font-bold py-3 px-8 rounded-lg transition duration-300"
              >
                Create Account
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">
            Powerful Features
            for Modern
            Businesses
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6 rounded-lg hover:shadow-lg transition-shadow duration-300">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg
                  className="w-8 h-8 text-blue-600"
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
              </div>
              <h3 className="text-xl font-semibold mb-2">
                Salary
                Management
              </h3>
              <p className="text-gray-600">
                Generate and
                manage salary
                slips with
                detailed
                breakdowns for
                each employee.
              </p>
            </div>

            <div className="text-center p-6 rounded-lg hover:shadow-lg transition-shadow duration-300">
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg
                  className="w-8 h-8 text-green-600"
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
              </div>
              <h3 className="text-xl font-semibold mb-2">
                Expense
                Tracking
              </h3>
              <p className="text-gray-600">
                Employees can
                submit
                expenses, and
                admins can
                review and
                approve them.
              </p>
            </div>

            <div className="text-center p-6 rounded-lg hover:shadow-lg transition-shadow duration-300">
              <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg
                  className="w-8 h-8 text-purple-600"
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
                    d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">
                Visual Reports
              </h3>
              <p className="text-gray-600">
                Interactive
                charts and
                graphs to
                visualize
                salary and
                expense data.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">
            How It Works
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="bg-blue-600 text-white w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                1
              </div>
              <h3 className="font-semibold mb-2">
                Sign Up
              </h3>
              <p className="text-gray-600 text-sm">
                Create your
                account as
                admin or
                employee
              </p>
            </div>
            <div className="text-center">
              <div className="bg-blue-600 text-white w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                2
              </div>
              <h3 className="font-semibold mb-2">
                Manage
              </h3>
              <p className="text-gray-600 text-sm">
                Admins manage
                payroll,
                employees
                submit
                expenses
              </p>
            </div>
            <div className="text-center">
              <div className="bg-blue-600 text-white w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                3
              </div>
              <h3 className="font-semibold mb-2">
                Track
              </h3>
              <p className="text-gray-600 text-sm">
                Monitor all
                financial
                activities in
                one place
              </p>
            </div>
            <div className="text-center">
              <div className="bg-blue-600 text-white w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                4
              </div>
              <h3 className="font-semibold mb-2">
                Analyze
              </h3>
              <p className="text-gray-600 text-sm">
                Gain insights
                with visual
                reports and
                analytics
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-blue-600">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-white mb-6">
            Ready to Simplify
            Your Payroll
            Process?
          </h2>
          <p className="text-xl text-blue-100 mb-10 max-w-3xl mx-auto">
            Join hundreds of
            businesses that
            trust our payroll
            management system
            for their
            financial
            operations.
          </p>
          <div className="flex justify-center space-x-4">
            <Link
              href="/register"
              className="bg-white text-blue-600 hover:bg-gray-100 font-bold py-3 px-8 rounded-lg transition duration-300"
            >
              Get Started
              Today
            </Link>
            <Link
              href="/login"
              className="border border-white text-white hover:bg-blue-700 font-bold py-3 px-8 rounded-lg transition duration-300"
            >
              Sign In
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">
                Payroll System
              </h3>
              <p className="text-gray-400">
                Streamlining
                payroll
                management for
                businesses of
                all sizes with
                our
                comprehensive
                solution.
              </p>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">
                Quick Links
              </h4>
              <ul className="space-y-2">
                <li>
                  <Link
                    href="/login"
                    className="text-gray-400 hover:text-white"
                  >
                    Login
                  </Link>
                </li>
                <li>
                  <Link
                    href="/register"
                    className="text-gray-400 hover:text-white"
                  >
                    Register
                  </Link>
                </li>
                <li>
                  <Link
                    href="/dashboard"
                    className="text-gray-400 hover:text-white"
                  >
                    Dashboard
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">
                Contact Us
              </h4>
              <p className="text-gray-400">
                support@payrollsystem.com
              </p>
              <p className="text-gray-400">
                +1 (555)
                123-4567
              </p>
            </div>
          </div>
          <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
            <p>
              &copy;{" "}
              {new Date().getFullYear()}{" "}
              Payroll
              Management
              System. All
              rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
