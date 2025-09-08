'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function NewSalary() {
  const [user, setUser] = useState(null);
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState('');
  const router = useRouter();

  const [formData, setFormData] = useState({
    employeeId: '',
    month: '',
    year: new Date().getFullYear(),
    basicSalary: '',
    allowances: '0',
    deductions: '0',
    bonus: '0',
  });

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (!userData) {
      router.push('/login');
      return;
    }
    
    const userObj = JSON.parse(userData);
    setUser(userObj);
    
    if (userObj.role !== 'admin') {
      router.push('/dashboard');
      return;
    }
    
    fetchEmployees();
  }, [router]);

  const fetchEmployees = async () => {
    try {
      const response = await fetch('/api/users');
      if (response.ok) {
        const data = await response.json();
        setEmployees(data.users || []);
      }
    } catch (error) {
      console.error('Error fetching employees:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setMessage('');
    
    try {
      // Calculate total amount
      const totalAmount = 
        parseFloat(formData.basicSalary || 0) + 
        parseFloat(formData.allowances || 0) + 
        parseFloat(formData.bonus || 0) - 
        parseFloat(formData.deductions || 0);
      
      const salaryData = {
        ...formData,
        totalAmount,
        basicSalary: parseFloat(formData.basicSalary),
        allowances: parseFloat(formData.allowances),
        deductions: parseFloat(formData.deductions),
        bonus: parseFloat(formData.bonus),
      };
      
      const response = await fetch('/api/salary', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(salaryData),
      });

      const result = await response.json();

      if (response.ok) {
        setMessage('Salary slip generated successfully!');
        setFormData({
          employeeId: '',
          month: '',
          year: new Date().getFullYear(),
          basicSalary: '',
          allowances: '0',
          deductions: '0',
          bonus: '0',
        });
      } else {
        setMessage(result.message || 'Failed to generate salary slip');
      }
    } catch (error) {
      setMessage('An error occurred. Please try again.');
      console.error('Error generating salary:', error);
    } finally {
      setSubmitting(false);
    }
  };

  if (!user || user.role !== 'admin') {
    return null;
  }

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">Generate Salary Slip</h1>
        
        {message && (
          <div className={`mb-4 p-3 rounded-md ${message.includes('successfully') ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
            {message}
          </div>
        )}
        
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="employeeId" className="block text-sm font-medium text-gray-700 mb-1">
              Employee
            </label>
            <select
              id="employeeId"
              name="employeeId"
              value={formData.employeeId}
              onChange={handleChange}
              className="w-full px-3 py-2 text-black border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            >
              <option value="">Select Employee</option>
              {employees.map((employee) => (
                <option key={employee._id} value={employee._id}>
                  {employee.name} ({employee.email})
                </option>
              ))}
            </select>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label htmlFor="month" className="block text-sm font-medium text-gray-700 mb-1">
                Month
              </label>
              <select
                id="month"
                name="month"
                value={formData.month}
                onChange={handleChange}
                className="w-full px-3 py-2 text-black border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              >
                <option value="">Select Month</option>
                <option value="January">January</option>
                <option value="February">February</option>
                <option value="March">March</option>
                <option value="April">April</option>
                <option value="May">May</option>
                <option value="June">June</option>
                <option value="July">July</option>
                <option value="August">August</option>
                <option value="September">September</option>
                <option value="October">October</option>
                <option value="November">November</option>
                <option value="December">December</option>
              </select>
            </div>
            
            <div>
              <label htmlFor="year" className="block text-sm font-medium text-gray-700 mb-1">
                Year
              </label>
              <input
                type="number"
                id="year"
                name="year"
                value={formData.year}
                onChange={handleChange}
                className="w-full px-3 py-2 text-black border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
          </div>
          
          <div className="mb-4">
            <label htmlFor="basicSalary" className="block text-sm font-medium text-gray-700 mb-1">
              Basic Salary ($)
            </label>
            <input
              type="number"
              id="basicSalary"
              name="basicSalary"
              value={formData.basicSalary}
              onChange={handleChange}
              className="w-full px-3 py-2 text-black border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
              min="0"
              step="0.01"
            />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            <div>
              <label htmlFor="allowances" className="block text-sm font-medium text-gray-700 mb-1">
                Allowances ($)
              </label>
              <input
                type="number"
                id="allowances"
                name="allowances"
                value={formData.allowances}
                onChange={handleChange}
                className="w-full px-3 py-2 text-black border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                min="0"
                step="0.01"
              />
            </div>
            
            <div>
              <label htmlFor="deductions" className="block text-sm font-medium text-gray-700 mb-1">
                Deductions ($)
              </label>
              <input
                type="number"
                id="deductions"
                name="deductions"
                value={formData.deductions}
                onChange={handleChange}
                className="w-full px-3 py-2 text-black border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                min="0"
                step="0.01"
              />
            </div>
            
            <div>
              <label htmlFor="bonus" className="block text-sm font-medium text-gray-700 mb-1">
                Bonus ($)
              </label>
              <input
                type="number"
                id="bonus"
                name="bonus"
                value={formData.bonus}
                onChange={handleChange}
                className="w-full px-3 py-2 text-black border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                min="0"
                step="0.01"
              />
            </div>
          </div>
          
          <div className="mb-4 p-3 bg-gray-50 rounded-md">
            <p className="text-sm font-medium text-gray-700">Total Amount: ${
              (parseFloat(formData.basicSalary || 0) + 
              parseFloat(formData.allowances || 0) + 
              parseFloat(formData.bonus || 0) - 
              parseFloat(formData.deductions || 0)).toFixed(2)
            }</p>
          </div>
          
          <button
            type="submit"
            disabled={submitting}
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50"
          >
            {submitting ? 'Generating...' : 'Generate Salary Slip'}
          </button>
        </form>
      </div>
    </div>
  );
}