"use client";
import {
  useState,
  useEffect,
} from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import {
  Bar,
  Doughnut,
} from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

export default function Dashboard() {
  const [user, setUser] =
    useState(null);
  const [
    salaryData,
    setSalaryData,
  ] = useState([]);
  const [
    expenses,
    setExpenses,
  ] = useState([]);
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
    if (!userData) {
      router.push("/login");
      return;
    }
    setUser(
      JSON.parse(userData)
    );
    fetchData();
  }, [router]);

  const fetchData =
    async () => {
      try {
        const [
          salaryRes,
          expensesRes,
        ] = await Promise.all(
          [
            fetch(
              "/api/salary"
            ),
            fetch(
              "/api/expenses"
            ),
          ]
        );

        if (salaryRes.ok) {
          const salaryData =
            await salaryRes.json();
          setSalaryData(
            salaryData.salaryData ||
              []
          );
        }

        if (expensesRes.ok) {
          const expensesData =
            await expensesRes.json();
          setExpenses(
            expensesData.expenses ||
              []
          );
        }
      } catch (error) {
        console.error(
          "Error fetching data:",
          error
        );
      } finally {
        setLoading(false);
      }
    };

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      </div>
    );
  }

  // Prepare data for charts
  const salaryChartData = {
    labels: salaryData.map(
      (item) =>
        `${item.month} ${item.year}`
    ),
    datasets: [
      {
        label:
          "Salary Amount",
        data: salaryData.map(
          (item) =>
            item.totalAmount
        ),
        backgroundColor:
          "rgba(54, 162, 235, 0.5)",
        borderColor:
          "rgba(54, 162, 235, 1)",
        borderWidth: 1,
      },
    ],
  };

  const expenseCategories =
    {};
  expenses.forEach(
    (expense) => {
      if (
        expenseCategories[
          expense.category
        ]
      ) {
        expenseCategories[
          expense.category
        ] += expense.amount;
      } else {
        expenseCategories[
          expense.category
        ] = expense.amount;
      }
    }
  );

  const expenseChartData = {
    labels: Object.keys(
      expenseCategories
    ),
    datasets: [
      {
        label:
          "Expenses by Category",
        data: Object.values(
          expenseCategories
        ),
        backgroundColor: [
          "rgba(255, 99, 132, 0.5)",
          "rgba(54, 162, 235, 0.5)",
          "rgba(255, 206, 86, 0.5)",
          "rgba(75, 192, 192, 0.5)",
          "rgba(153, 102, 255, 0.5)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };

  // Chart options for better presentation
  const barChartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Salary History",
      },
    },
  };

  const doughnutChartOptions =
    {
      responsive: true,
      plugins: {
        legend: {
          position: "bottom",
        },
        title: {
          display: true,
          text: "Expense Categories",
        },
      },
    };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">
        Dashboard
      </h1>

      {/* Admin Quick Actions */}
      {user &&
        user.role ===
          "admin" && (
          <div className="bg-white p-6 rounded-lg shadow-md mb-8">
            <h2 className="text-xl font-semibold mb-4 text-gray-700">
              Admin Quick
              Actions
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Link
                href="/admin/users"
                className="bg-blue-600 text-white py-3 px-4 rounded-md hover:bg-blue-700 text-center transition-colors"
              >
                Manage Users
              </Link>
              <Link
                href="/salary/new"
                className="bg-green-600 text-white py-3 px-4 rounded-md hover:bg-green-700 text-center transition-colors"
              >
                Generate
                Salary Slip
              </Link>
            </div>
          </div>
        )}

      {/* Employee Quick Actions */}
      {user &&
        user.role ===
          "employee" && (
          <div className="bg-white p-6 rounded-lg shadow-md mb-8">
            <h2 className="text-xl font-semibold mb-4 text-gray-700">
              Quick Actions
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Link
                href="/expenses"
                className="bg-blue-600 text-white py-3 px-4 rounded-md hover:bg-blue-700 text-center transition-colors"
              >
                Submit Expense
              </Link>
              <Link
                href="/salary/history"
                className="bg-green-600 text-white py-3 px-4 rounded-md hover:bg-green-700 text-center transition-colors"
              >
                View Salary
                History
              </Link>
            </div>
          </div>
        )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <Bar
            data={
              salaryChartData
            }
            options={
              barChartOptions
            }
          />
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <Doughnut
            data={
              expenseChartData
            }
            options={
              doughnutChartOptions
            }
          />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent Salary Slips */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4 text-gray-700">
            Recent Salary
            Slips
          </h2>
          {salaryData.length >
          0 ? (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Period
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Basic
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Total
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {salaryData
                    .slice(
                      0,
                      5
                    )
                    .map(
                      (
                        salary,
                        index
                      ) => (
                        <tr
                          key={
                            index
                          }
                        >
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {
                              salary.month
                            }{" "}
                            {
                              salary.year
                            }
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            $
                            {
                              salary.basicSalary
                            }
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-green-600">
                            $
                            {
                              salary.totalAmount
                            }
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                              Paid
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
              No salary slips
              available
            </p>
          )}
        </div>

        {/* Recent Expenses */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4 text-gray-700">
            Recent Expenses
          </h2>
          {expenses.length >
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
                  {expenses
                    .slice(
                      0,
                      5
                    )
                    .map(
                      (
                        expense,
                        index
                      ) => (
                        <tr
                          key={
                            index
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
