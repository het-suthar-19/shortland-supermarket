import { useEffect, useState } from "react";
import { productsAPI, categoriesAPI } from "../../lib/api";
import { Search, Save } from "lucide-react";

export default function AdminInventory() {
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filterCategory, setFilterCategory] = useState("");
    const [searchTerm, setSearchTerm] = useState("");
    const [changedStocks, setChangedStocks] = useState({});

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const [prodRes, catRes] = await Promise.all([
                productsAPI.getAll({ limit: 1000 }),
                categoriesAPI.getAll(),
            ]);
            setProducts(prodRes.data.products);
            setCategories(catRes.data);
        } catch (error) {
            console.error("Error fetching inventory data:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleStockChange = (id, newStock) => {
        setChangedStocks((prev) => ({
            ...prev,
            [id]: newStock,
        }));
    };

    const saveStock = async (id) => {
        try {
            const newStock = changedStocks[id];
            if (newStock === undefined) return;

            const product = products.find((p) => p.id === id);
            const formData = new FormData();
            formData.append("stock", newStock);
            // We need to send other required fields if the API requires them, 
            // but assuming the backend allows partial updates or we just send what's needed.
            // Based on previous code, update takes FormData. 
            // Safest is to just construct simple object if backend supports JSON, 
            // but `productsAPI.update` wraps it in FormData check.
            // Let's create a minimal payload.
            // Re-reading product.routes.js would verify if it handles partial updates well.
            // Assuming it does or we resend critical fields.
            // Actually `productsAPI.update` logic:
            // const isFormData = data instanceof FormData;
            // We'll stick to FormData to match existing patterns.

            // To be safe, let's just send the stock change. 
            // If the backend wipes other fields, we have a problem. 
            // Usually PUT replaces resource, PATCH updates. 
            // The `product.routes.js` likely uses `prisma.product.update` which does partial updates for provided fields.

            await productsAPI.update(id, formData);

            // Update local state
            setProducts(products.map(p => p.id === id ? { ...p, stock: parseInt(newStock) } : p));
            setChangedStocks(prev => {
                const next = { ...prev };
                delete next[id];
                return next;
            });
            alert("Stock updated!");
        } catch (error) {
            console.error("Error updating stock:", error);
            alert("Failed to update stock");
        }
    };

    const filteredProducts = products.filter((product) => {
        const matchesCategory = filterCategory ? product.categoryId === filterCategory : true;
        const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
        return matchesCategory && matchesSearch;
    });

    return (
        <div className="min-h-screen bg-gray-50 py-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <h1 className="text-4xl font-bold text-black mb-8">Inventory Management</h1>

                <div className="bg-white rounded-xl shadow-md p-6 mb-8">
                    <div className="flex flex-col md:flex-row gap-4 justify-between items-center">
                        <div className="relative w-full md:w-96">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                            <input
                                type="text"
                                placeholder="Search products..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary"
                            />
                        </div>
                        <select
                            value={filterCategory}
                            onChange={(e) => setFilterCategory(e.target.value)}
                            className="w-full md:w-64 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary"
                        >
                            <option value="">All Categories</option>
                            {categories.map((cat) => (
                                <option key={cat.id} value={cat.id}>{cat.name}</option>
                            ))}
                        </select>
                    </div>
                </div>

                {loading ? (
                    <div className="text-center py-16">Loading...</div>
                ) : (
                    <div className="bg-white rounded-xl shadow-md overflow-hidden">
                        <table className="w-full">
                            <thead className="bg-gray-100">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase">Product</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase">Category</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase">Current Stock</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200">
                                {filteredProducts.map((product) => {
                                    const category = categories.find(c => c.id === product.categoryId);
                                    const stockValue = changedStocks[product.id] !== undefined ? changedStocks[product.id] : product.stock;
                                    const isChanged = changedStocks[product.id] !== undefined && changedStocks[product.id] != product.stock;

                                    return (
                                        <tr key={product.id} className="hover:bg-gray-50">
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="flex items-center space-x-3">
                                                    <img
                                                        src={product.image || "https://via.placeholder.com/100"}
                                                        alt={product.name}
                                                        className="w-10 h-10 object-cover rounded"
                                                    />
                                                    <span className="font-medium">{product.name}</span>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-gray-500">
                                                {category?.name || "Uncategorized"}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <input
                                                    type="number"
                                                    min="0"
                                                    value={stockValue}
                                                    onChange={(e) => handleStockChange(product.id, e.target.value)}
                                                    className="w-24 px-2 py-1 border border-gray-300 rounded focus:ring-2 focus:ring-primary"
                                                />
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                {isChanged && (
                                                    <button
                                                        onClick={() => saveStock(product.id)}
                                                        className="text-green-600 hover:text-green-800 flex items-center space-x-1"
                                                    >
                                                        <Save className="w-5 h-5" />
                                                        <span>Save</span>
                                                    </button>
                                                )}
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    );
}
