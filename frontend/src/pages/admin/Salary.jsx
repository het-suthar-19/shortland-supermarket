import { useEffect, useState } from "react";
import { employeesAPI, attendanceAPI } from "../../lib/api";
import { Calendar, DollarSign, Clock } from "lucide-react";

export default function AdminSalary() {
    const [employees, setEmployees] = useState([]);
    const [attendance, setAttendance] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedMonth, setSelectedMonth] = useState(new Date().toISOString().slice(0, 7)); // YYYY-MM
    const [showLogModal, setShowLogModal] = useState(false);
    const [logData, setLogData] = useState({
        employeeId: "",
        date: new Date().toISOString().slice(0, 10),
        hoursWorked: 8,
        status: "present",
    });

    useEffect(() => {
        fetchData();
    }, [selectedMonth]);

    const fetchData = async () => {
        try {
            setLoading(true);
            // Calculate start and end of selected month
            const [year, month] = selectedMonth.split("-");
            const startDate = new Date(year, month - 1, 1).toISOString();
            const endDate = new Date(year, month, 0).toISOString();

            const [empRes, attRes] = await Promise.all([
                employeesAPI.getAll(),
                attendanceAPI.getAll({ startDate, endDate }),
            ]);

            setEmployees(empRes.data);
            setAttendance(attRes.data);
        } catch (error) {
            console.error("Error fetching salary data:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleLogAttendance = async (e) => {
        e.preventDefault();
        try {
            await attendanceAPI.log(logData);
            setShowLogModal(false);
            fetchData(); // Refresh data
            alert("Attendance logged successfully");
        } catch (error) {
            console.error("Error logging attendance:", error);
            alert("Failed to log attendance");
        }
    };

    const calculateSalary = (employeeId) => {
        const emp = employees.find((e) => e.id === employeeId);
        if (!emp) return 0;

        const empAttendance = attendance.filter((a) => a.employeeId === employeeId);
        const totalHours = empAttendance.reduce((sum, record) => sum + record.hoursWorked, 0);
        return (totalHours * emp.hourlyRate).toFixed(2);
    };

    return (
        <div className="min-h-screen bg-gray-50 py-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between mb-8">
                    <h1 className="text-4xl font-bold text-black">Salary & Attendance</h1>
                    <button
                        onClick={() => setShowLogModal(true)}
                        className="bg-primary text-white px-6 py-3 rounded-lg hover:bg-primary-dark transition flex items-center space-x-2"
                    >
                        <Clock className="w-5 h-5" />
                        <span>Log Attendance</span>
                    </button>
                </div>

                <div className="bg-white rounded-xl shadow-md p-6 mb-8 flex items-center space-x-4">
                    <Calendar className="text-gray-500 w-6 h-6" />
                    <input
                        type="month"
                        value={selectedMonth}
                        onChange={(e) => setSelectedMonth(e.target.value)}
                        className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary"
                    />
                    <span className="text-gray-500 text-sm">Select month to view calculated salaries</span>
                </div>

                {loading ? (
                    <div className="text-center py-16">Loading...</div>
                ) : (
                    <div className="bg-white rounded-xl shadow-md overflow-hidden">
                        <table className="w-full">
                            <thead className="bg-gray-100">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase">Employee</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase">Role</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase">Hourly Rate</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase">Hours Worked</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase">Total Salary</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200">
                                {employees.map((emp) => {
                                    const empAttendance = attendance.filter((a) => a.employeeId === emp.id);
                                    const totalHours = empAttendance.reduce((sum, record) => sum + record.hoursWorked, 0);

                                    return (
                                        <tr key={emp.id} className="hover:bg-gray-50">
                                            <td className="px-6 py-4 whitespace-nowrap font-medium">{emp.name}</td>
                                            <td className="px-6 py-4 whitespace-nowrap capitalize text-gray-500">{emp.role}</td>
                                            <td className="px-6 py-4 whitespace-nowrap">${emp.hourlyRate}</td>
                                            <td className="px-6 py-4 whitespace-nowrap font-semibold">{totalHours} hrs</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-green-600 font-bold flex items-center">
                                                <DollarSign className="w-4 h-4 mr-1" />
                                                {calculateSalary(emp.id)}
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                )}

                {showLogModal && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                        <div className="bg-white rounded-xl shadow-lg max-w-md w-full">
                            <div className="p-6">
                                <h2 className="text-2xl font-bold text-black mb-4">Log Attendance</h2>
                                <form onSubmit={handleLogAttendance} className="space-y-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Employee</label>
                                        <select
                                            required
                                            value={logData.employeeId}
                                            onChange={(e) => setLogData({ ...logData, employeeId: e.target.value })}
                                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary"
                                        >
                                            <option value="">Select Employee</option>
                                            {employees.map(emp => (
                                                <option key={emp.id} value={emp.id}>{emp.name}</option>
                                            ))}
                                        </select>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
                                        <input
                                            type="date"
                                            required
                                            value={logData.date}
                                            onChange={(e) => setLogData({ ...logData, date: e.target.value })}
                                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary"
                                        />
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">Hours Worked</label>
                                            <input
                                                type="number"
                                                step="0.5"
                                                required
                                                value={logData.hoursWorked}
                                                onChange={(e) => setLogData({ ...logData, hoursWorked: e.target.value })}
                                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                                            <select
                                                value={logData.status}
                                                onChange={(e) => setLogData({ ...logData, status: e.target.value })}
                                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary"
                                            >
                                                <option value="present">Present</option>
                                                <option value="half-day">Half Day</option>
                                                <option value="absent">Absent</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div className="flex justify-end space-x-4 mt-6">
                                        <button
                                            type="button"
                                            onClick={() => setShowLogModal(false)}
                                            className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-100"
                                        >
                                            Cancel
                                        </button>
                                        <button
                                            type="submit"
                                            className="px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark"
                                        >
                                            Log
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
