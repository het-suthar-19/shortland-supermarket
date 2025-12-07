import { useEffect, useState } from "react";
import { employeesAPI } from "../../lib/api";
import { Plus, Edit, Trash2 } from "lucide-react";

export default function AdminEmployees() {
    const [employees, setEmployees] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [editingId, setEditingId] = useState(null);
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        role: "staff",
        hourlyRate: "",
        active: true,
    });

    useEffect(() => {
        fetchEmployees();
    }, []);

    const fetchEmployees = async () => {
        try {
            const res = await employeesAPI.getAll();
            setEmployees(res.data);
        } catch (error) {
            console.error("Error fetching employees:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (editingId) {
                await employeesAPI.update(editingId, formData);
            } else {
                await employeesAPI.create(formData);
            }
            setShowModal(false);
            setEditingId(null);
            setFormData({
                name: "",
                email: "",
                phone: "",
                role: "staff",
                hourlyRate: "",
                active: true,
            });
            fetchEmployees();
        } catch (error) {
            console.error("Error saving employee:", error);
            alert("Failed to save employee");
        }
    };

    const handleEdit = (emp) => {
        setEditingId(emp.id);
        setFormData({
            name: emp.name,
            email: emp.email,
            phone: emp.phone || "",
            role: emp.role,
            hourlyRate: emp.hourlyRate,
            active: emp.active,
        });
        setShowModal(true);
    };

    const handleDelete = async (id) => {
        if (!confirm("Are you sure you want to delete this employee?")) return;
        try {
            await employeesAPI.delete(id);
            fetchEmployees();
        } catch (error) {
            console.error("Error deleting employee:", error);
            alert("Failed to delete employee");
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 py-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between mb-8">
                    <h1 className="text-4xl font-bold text-black">Manage Employees</h1>
                    <button
                        onClick={() => {
                            setEditingId(null);
                            setFormData({
                                name: "",
                                email: "",
                                phone: "",
                                role: "staff",
                                hourlyRate: "",
                                active: true,
                            });
                            setShowModal(true);
                        }}
                        className="bg-primary text-white px-6 py-3 rounded-lg hover:bg-primary-dark transition flex items-center space-x-2"
                    >
                        <Plus className="w-5 h-5" />
                        <span>Add Employee</span>
                    </button>
                </div>

                {loading ? (
                    <div className="text-center py-16">Loading...</div>
                ) : (
                    <div className="bg-white rounded-xl shadow-md overflow-hidden">
                        <table className="w-full">
                            <thead className="bg-gray-100">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase">Name</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase">Role</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase">Hourly Rate</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase">Status</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200">
                                {employees.map((emp) => (
                                    <tr key={emp.id} className="hover:bg-gray-50">
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div>
                                                <div className="font-medium">{emp.name}</div>
                                                <div className="text-sm text-gray-500">{emp.email}</div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap capitalize">{emp.role}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-green-600 font-medium">
                                            ${emp.hourlyRate}/hr
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${emp.active ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`}>
                                                {emp.active ? "Active" : "Inactive"}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="flex items-center space-x-2">
                                                <button onClick={() => handleEdit(emp)} className="text-blue-600 hover:text-blue-800">
                                                    <Edit className="w-5 h-5" />
                                                </button>
                                                <button onClick={() => handleDelete(emp.id)} className="text-red-600 hover:text-red-800">
                                                    <Trash2 className="w-5 h-5" />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}

                {showModal && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                        <div className="bg-white rounded-xl shadow-lg max-w-md w-full">
                            <div className="p-6">
                                <h2 className="text-2xl font-bold text-black mb-4">
                                    {editingId ? "Edit Employee" : "Add Employee"}
                                </h2>
                                <form onSubmit={handleSubmit} className="space-y-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                                        <input
                                            type="text"
                                            required
                                            value={formData.name}
                                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                                        <input
                                            type="email"
                                            required
                                            value={formData.email}
                                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                                        <input
                                            type="tel"
                                            value={formData.phone}
                                            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary"
                                        />
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">Role</label>
                                            <select
                                                value={formData.role}
                                                onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary"
                                            >
                                                <option value="staff">Staff</option>
                                                <option value="manager">Manager</option>
                                                <option value="driver">Driver</option>
                                                <option value="admin">Admin</option>
                                            </select>
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">Hourly Rate ($)</label>
                                            <input
                                                type="number"
                                                step="0.01"
                                                required
                                                value={formData.hourlyRate}
                                                onChange={(e) => setFormData({ ...formData, hourlyRate: e.target.value })}
                                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary"
                                            />
                                        </div>
                                    </div>
                                    <div className="flex items-center">
                                        <input
                                            type="checkbox"
                                            id="active"
                                            checked={formData.active}
                                            onChange={(e) => setFormData({ ...formData, active: e.target.checked })}
                                            className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
                                        />
                                        <label htmlFor="active" className="ml-2 block text-sm text-gray-900">
                                            Active Employee
                                        </label>
                                    </div>
                                    <div className="flex justify-end space-x-4 mt-6">
                                        <button
                                            type="button"
                                            onClick={() => setShowModal(false)}
                                            className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-100"
                                        >
                                            Cancel
                                        </button>
                                        <button
                                            type="submit"
                                            className="px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark"
                                        >
                                            Save
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
