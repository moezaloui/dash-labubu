// ListItems.jsx
import React, { useEffect, useState, useCallback } from "react";
import { FaEye, FaEdit, FaTrash } from "react-icons/fa";
// import ImagesEditor from "./ImagesEditor"; // Assuming it's in another file

function ListItems() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [toast, setToast] = useState(null);

  const [modal, setModal] = useState({ type: null, item: null });
  const [deleteId, setDeleteId] = useState(null);
  const [newFiles, setNewFiles] = useState([]); // Placeholder for file input

  const fetchArticles = () => {
    setLoading(true);
    fetch("https://server-salem.onrender.com/api/products")
      .then((res) => res.ok ? res.json() : Promise.reject("Erreur de récupération"))
      .then(setItems)
      .catch((err) => setError(err.toString()))
      .finally(() => setLoading(false));
  };

  useEffect(() => fetchArticles(), []);



  useEffect(() => {
    if (toast) {
      const timer = setTimeout(() => setToast(null), 3000);
      return () => clearTimeout(timer);
    }
  }, [toast]);

  if (loading) return <div className="text-center mt-20">Chargement...</div>;
  if (error) return <div className="text-center mt-20 text-red-500">Erreur : {error}</div>;

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold text-center mb-6">Liste des Produits</h2>

      <div className="space-y-4">
        {items.map(item => (
          <div key={item.id} className="flex items-center bg-white shadow rounded p-4">
            <img src={item.imageUrl?.[0] || "https://via.placeholder.com/150"} alt={item.name} className="w-24 h-24 object-cover rounded mr-6" />
            <div className="flex-grow">
              <h3 className="font-semibold text-lg">{item.name}</h3>
              <p className="text-sm text-gray-600">{item.description || "Pas de description."}</p>
              <div className="text-xs text-gray-500 mt-1">
                Catégorie: {item.category} / {item.subcategory} <br />
                Tailles: {item.sizes?.join(", ") || "N/A"}
              </div>
            </div>
            <div className="text-right">
              <p className="font-bold text-lg">{item.price} DT</p>
              {item.bestseller && <span className="text-xs bg-yellow-300 text-yellow-800 rounded px-2 py-0.5">Bestseller</span>}
              <div className="flex gap-2 mt-2">
                <button onClick={() => setModal({ type: "view", item })}><FaEye /></button>
                <button onClick={() => setModal({ type: "edit", item: { ...item } })}><FaEdit /></button>
                <button onClick={() => setDeleteId(item.id)}><FaTrash /></button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modal View */}
      {modal.type === "view" && (
        <Modal onClose={() => setModal({ type: null, item: null })}>
          <h2 className="text-xl font-bold mb-4">{modal.item.name}</h2>
          <img src={modal.item.images?.[0] || "https://via.placeholder.com/300"} alt="" className="w-full mb-4" />
          <p>{modal.item.description}</p>
        </Modal>
      )}

      {/* Modal Edit */}
      {modal.type === "edit" && (
        <Modal onClose={() => setModal({ type: null, item: null })}>
          <h2 className="text-xl font-bold mb-4">Modifier le produit</h2>
          <input value={modal.item.name} onChange={(e) => setModal(prev => ({ ...prev, item: { ...prev.item, name: e.target.value } }))} className="w-full mb-2 border p-2" placeholder="Nom" />
          <textarea value={modal.item.description} onChange={(e) => setModal(prev => ({ ...prev, item: { ...prev.item, description: e.target.value } }))} className="w-full mb-2 border p-2" placeholder="Description" />
     
          <input type="number" value={modal.item.price} onChange={(e) => setModal(prev => ({ ...prev, item: { ...prev.item, price: parseFloat(e.target.value) || 0 } }))} className="w-full mb-2 border p-2" placeholder="Prix" />
          {/* <ImagesEditor images={modal.item.images || []} onChange={handleImagesChange} /> */}
          <div className="flex justify-end gap-4 mt-4">
            <button onClick={() => setModal({ type: null, item: null })} className="border px-4 py-2">Annuler</button>
            <button onClick={() => handleUpdate(modal.item)} className="bg-blue-600 text-white px-4 py-2 rounded">Enregistrer</button>
          </div>
        </Modal>
      )}

      {/* Modal Confirmation Delete */}
      {deleteId && (
        <Modal onClose={() => setDeleteId(null)}>
          <p className="mb-4">Supprimer ce produit ?</p>
          <div className="flex justify-end gap-4">
            <button onClick={() => setDeleteId(null)} className="border px-4 py-2">Annuler</button>
            <button onClick={handleDelete} className="bg-red-600 text-white px-4 py-2 rounded">Supprimer</button>
          </div>
        </Modal>
      )}

      {toast && <div className="fixed bottom-6 right-6 bg-black text-white px-6 py-3 rounded shadow-lg animate-fadeInOut">{toast}</div>}
      <style>{`
        @keyframes fadeInOut {
          0% { opacity: 0; transform: translateY(10px); }
          10%, 90% { opacity: 1; transform: translateY(0); }
          100% { opacity: 0; transform: translateY(10px); }
        }
        .animate-fadeInOut {
          animation: fadeInOut 3s ease forwards;
        }
      `}</style>
    </div>
  );
}

function Modal({ children, onClose }) {
  return (
    <div onClick={onClose} className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div onClick={(e) => e.stopPropagation()} className="bg-white rounded-lg p-6 w-full max-w-lg max-h-[90vh] overflow-y-auto">
        <button onClick={onClose} className="text-gray-600 float-right">&times;</button>
        {children}
      </div>
    </div>
  );
}

export default ListItems;
