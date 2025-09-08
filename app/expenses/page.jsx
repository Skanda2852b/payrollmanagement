"use client";
import {
  useState,
  useEffect,
} from "react";
import { useRouter } from "next/navigation";

export default function Expenses() {
  const [user, setUser] =
    useState(null);
  const [
    expenses,
    setExpenses,
  ] = useState([]);
  const [
    formData,
    setFormData,
  ] = useState({
    month: "",
    year: new Date().getFullYear(),
    category: "",
    amount: "",
    description: "",
  });
  const [
    loading,
    setLoading,
  ] = useState(false);
  const [
    submitting,
    setSubmitting,
  ] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const userData =
      localStorage.getItem(
        "user"
      );
    if (!userData) {
      router.push("/login");
      return;
    }

    const userObj =
      JSON.parse(userData);
    setUser(userObj);

    if (
      userObj.role !==
      "employee"
    ) {
      router.push(
        "/dashboard"
      );
      return;
    }

    fetchExpenses();
  }, [router]);

  const fetchExpenses =
    async () => {
      setLoading(true);
      try {
        const response =
          await fetch(
            "/api/expenses"
          );
        if (response.ok) {
          const data =
            await response.json();
          setExpenses(
            data.expenses ||
              []
          );
        }
      } catch (error) {
        console.error(
          "Error fetching expenses:",
          error
        );
      } finally {
        setLoading(false);
      }
    };

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
    setSubmitting(true);

    try {
      const response =
        await fetch(
          "/api/expenses",
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

      if (response.ok) {
        setFormData({
          month: "",
          year: new Date().getFullYear(),
          category: "",
          amount: "",
          description: "",
        });
        fetchExpenses(); // Refresh the list
      } else {
        console.error(
          "Failed to submit expense"
        );
      }
    } catch (error) {
      console.error(
        "Error submitting expense:",
        error
      );
    } finally {
      setSubmitting(false);
    }
  };

  if (
    !user ||
    user.role !== "employee"
  ) {
    return null;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">
        Expense Management
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4 text-gray-700">
            Submit New Expense
          </h2>
          <form
            onSubmit={
              handleSubmit
            }
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label
                  htmlFor="month"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Month
                </label>
                <select
                  id="month"
                  name="month"
                  value={
                    formData.month
                  }
                  onChange={
                    handleChange
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                >
                  <option value="">
                    Select
                    Month
                  </option>
                  <option value="January">
                    January
                  </option>
                  <option value="February">
                    February
                  </option>
                  <option value="March">
                    March
                  </option>
                  <option value="April">
                    April
                  </option>
                  <option value="May">
                    May
                  </option>
                  <option value="June">
                    June
                  </option>
                  <option value="July">
                    July
                  </option>
                  <option value="August">
                    August
                  </option>
                  <option value="September">
                    September
                  </option>
                  <option value="October">
                    October
                  </option>
                  <option value="November">
                    November
                  </option>
                  <option value="December">
                    December
                  </option>
                </select>
              </div>

              <div>
                <label
                  htmlFor="year"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Year
                </label>
                <input
                  type="number"
                  id="year"
                  name="year"
                  value={
                    formData.year
                  }
                  onChange={
                    handleChange
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
            </div>

            <div className="mb-4">
              <label
                htmlFor="category"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Category
              </label>
              <select
                id="category"
                name="category"
                value={
                  formData.category
                }
                onChange={
                  handleChange
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              >
                <option value="">
                  Select
                  Category
                </option>
                <option value="Travel">
                  Travel
                </option>
                <option value="Meals">
                  Meals
                </option>
                <option value="Supplies">
                  Supplies
                </option>
                <option value="Equipment">
                  Equipment
                </option>
                <option value="Other">
                  Other
                </option>
              </select>
            </div>

            <div className="mb-4">
              <label
                htmlFor="amount"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Amount ($)
              </label>
              <input
                type="number"
                id="amount"
                name="amount"
                value={
                  formData.amount
                }
                onChange={
                  handleChange
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <div className="mb-4">
              <label
                htmlFor="description"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Description
              </label>
              <textarea
                id="description"
                name="description"
                value={
                  formData.description
                }
                onChange={
                  handleChange
                }
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              ></textarea>
            </div>

            <button
              type="submit"
              disabled={
                submitting
              }
              className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50"
            >
              {submitting
                ? "Submitting..."
                : "Submit Expense"}
            </button>
          </form>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4 text-gray-700">
            Expense History
          </h2>
          {loading ? (
            <div className="flex justify-center items-center h-32">
              <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
            </div>
          ) : expenses.length >
            0 ? (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Date
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Category
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Amount
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {expenses.map(
                    (
                      expense
                    ) => (
                      <tr
                        key={
                          expense._id
                        }
                      >
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {new Date(
                            expense.submittedAt
                          ).toLocaleDateString()}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {
                            expense.category
                          }
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          $
                          {
                            expense.amount
                          }
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span
                            className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                              expense.status ===
                              "approved"
                                ? "bg-green-100 text-green-800"
                                : expense.status ===
                                  "rejected"
                                ? "bg-red-100 text-red-800"
                                : "bg-yellow-100 text-yellow-800"
                            }`}
                          >
                            {
                              expense.status
                            }
                          </span>
                        </td>
                      </tr>
                    )
                  )}
                </tbody>
              </table>
            </div>
          ) : (
            <p className="text-gray-500">
              No expenses
              submitted yet
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
