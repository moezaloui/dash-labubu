import React, { useEffect, useState } from "react";
import axios from "axios";

const statusOptions = [
  "en attente", "annulée", "livrée"
];

const apiStatusMap = {
  "Order Placed": "order_placed",
  Pending: "pending",
  Processing: "processing",
  Shipped: "shipped",
  Delivered: "delivered",
  Cancelled: "cancelled",
  Refunded: "refunded",
};

function Orders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [statusUpdatingId, setStatusUpdatingId] = useState(null);
  const [currency] = useState("TND ");

  // Fonction fetch orders avec gestion loading / erreur
  const fetchOrders = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await axios.get("https://server-salem.vercel.app/api/orders");
      setOrders(res.data);
    } catch (err) {
      setError("Erreur chargement commandes.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  // Mise à jour du statut d'une commande + re-fetch si succès
  const updateStatus = async (orderId, newStatusDisplay) => {
    const statusToSend = apiStatusMap[newStatusDisplay] || newStatusDisplay.toLowerCase();
    setStatusUpdatingId(orderId);
    setError(null);
    try {
      await axios.put(`https://server-salem.vercel.app/api/orders/${orderId}/status`, {
        status: statusToSend,
      });
      // Re-fetch data après succès update
      await fetchOrders();
    } catch (err) {
      setError("Échec de la mise à jour du statut.");
      console.error(err);
    } finally {
      setStatusUpdatingId(null);
    }
  };

  if (loading) {
    return (
      <div className="p-6 min-h-screen flex justify-center items-center">
        <p className="text-gray-600 text-lg">Chargement des commandes...</p>
      </div>
    );
  }

  return (
    <div className="p-6 min-h-screen">
      <h1 className="text-xl font-normal mb-6 text-gray-800">Liste des commandes</h1>

      {error && (
        <div className="mb-4 p-4 bg-red-100 text-red-700 rounded">
          {error}
          <button
            onClick={fetchOrders}
            className="ml-4 px-3 py-1 bg-red-700 text-white rounded hover:bg-red-800 transition"
          >
            Réessayer
          </button>
        </div>
      )}

      {orders.length === 0 && !error ? (
        <p className="text-center text-gray-500">Aucune commande trouvée.</p>
      ) : (
        <div className="space-y-4">
          {orders.map((order) => (
            <div
              key={order._id || order.id}
              className="bg-white rounded-lg p-6 flex shadow-sm justify-between items-center"
            >
              <div>
                <p className="font-semibold">Commande #{order._id || order.id}</p>
                <p>Nom: {order.name}</p>
                <p>Téléphone: {order.phone}</p>
                <p>Adresse: {order.address}</p>
                <p>Date: {new Date(order.createdAt).toLocaleDateString()}</p>
              </div>

              <div className="flex flex-col items-end">
                <p className="text-lg font-semibold">
                  {currency} {order.selectedPrice || "N/A"}
                </p>

                <select
                  value={statusOptions.includes(order.status) ? order.status : "en attente"}
                  onChange={(e) => updateStatus(order._id || order.id, e.target.value)}
                  disabled={statusUpdatingId === (order._id || order.id)}
                  className="px-3 py-1 rounded-md text-sm cursor-pointer"
                >
                  {statusOptions.map((status) => (
                    <option key={status} value={status}>
                      {status}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Orders;
