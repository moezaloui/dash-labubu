// Articles.jsx
import React, { useEffect, useState } from "react";
import { Eye, Pencil, Trash } from "lucide-react";
import { Link } from "react-router-dom";
import EditeArticle from "../components/EditeArticle";
import ImageCarousel from "../components/ImageCarousel";

function Articles() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [toast, setToast] = useState(null);

  const [modal, setModal] = useState(null); // { type: 'view' | 'edit', item }
  const [deleteId, setDeleteId] = useState(null);

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

  const handleDelete = () => {
    fetch(`https://server-salem.onrender.com/api/products/${deleteId}`, {
      method: "DELETE",
    })
      .then((res) => {
        if (!res.ok) throw new Error("Erreur suppression");
        setToast("Produit supprimé");
        fetchArticles();
      })
      .catch((err) => alert(err.message))
      .finally(() => setDeleteId(null));
  };

  const handleEditChange = (field, value) => {
    setModal((prev) => ({
      ...prev,
      item: { ...prev.item, [field]: value },
    }));
  };

  const handleEditSubmit = () => {
    fetch(`https://server-salem.onrender.com/api/products/${modal.item._id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(modal.item),
    })
      .then((res) => {
        if (!res.ok) throw new Error("Erreur mise à jour");
        setToast("Produit mis à jour");
        fetchArticles();
        setModal(null);
      })
      .catch((err) => alert(err.message));
  };

  if (loading) return <div className="text-center mt-20">Chargement...</div>;
  if (error) return <div className="text-center mt-20 text-red-500">Erreur : {error}</div>;

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold text-center mb-6">Liste des Produits</h2>

      <div className="flex justify-end p-3">
        <Link to="/add-article">
          <button className="bg-green-500 text-white text-sm font-semibold p-2 rounded-md">
            Ajouter un article
          </button>
        </Link>
      </div>

      <div className="space-y-4">
        {items.map((item) => (
          <div key={item._id} className="flex items-center bg-white shadow rounded p-4">
            <img src={item.imageUrl?.[0] || "https://via.placeholder.com/150"} alt={item.title} className="w-24 h-24 object-cover rounded mr-6" />
            <div className="flex-grow">
              <h3 className="font-semibold text-lg">{item.title}</h3>
              <p className="text-sm text-gray-600">{item.description || "Pas de description."}</p>
            </div>
            <div className="text-right">
              <p className="font-bold text-lg">{item.price} DT</p>
              <div className="flex gap-2 mt-2">
                <button onClick={() => setModal({ type: "view", item })}><Eye color="#4571a1" /></button>
                <button onClick={() => setModal({ type: "edit", item: { ...item } })}><Pencil color="#4571a1" /></button>
                <button onClick={() => setDeleteId(item._id)}><Trash color="#4571a1" /></button>
              </div>
            </div>
          </div>
        ))}
      </div>
      

      {modal?.type === "view" && (
  <div
    onClick={() => setModal(null)}
    className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 px-4"
  >
    <div
      onClick={(e) => e.stopPropagation()}
      className="bg-white rounded-xl shadow-lg w-full max-w-lg overflow-hidden"
    >
      <ImageCarousel images={modal.item.imageUrl} />

      <div className="p-6 space-y-4">
        <h2 className="text-2xl font-bold text-gray-800">{modal.item.title}</h2>

        <p className="text-gray-600">
          {modal.item.description || "Aucune description fournie."}
        </p>

        <p className="text-lg font-semibold text-green-600">
          {modal.item.price} DT
        </p>

        <div className="text-right">
          <button
            onClick={() => setModal(null)}
            className="px-5 py-2 bg-gray-800 text-white rounded hover:bg-gray-700 transition"
          >
            Fermer
          </button>
        </div>
      </div>
    </div>
  </div>
)}


      {modal?.type === "edit" && (
       <EditeArticle
          item={modal.item}
          onChange={(updatedItem) => setModal({ ...modal, item: updatedItem })}
          onClose={() => setModal(null)}
          onSubmit={handleEditSubmit}
        />
      )}

      {deleteId && (
        <div onClick={() => setDeleteId(null)} className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div onClick={(e) => e.stopPropagation()} className="bg-white rounded p-6 w-full max-w-sm">
            <p className="text-center mb-4">Supprimer ce produit ?</p>
            <div className="flex justify-around">
              <button onClick={() => setDeleteId(null)} className="px-4 py-2 border rounded">Annuler</button>
              <button onClick={handleDelete} className="px-4 py-2 bg-red-600 text-white rounded">Supprimer</button>
            </div>
          </div>
        </div>
      )}

      {toast && (
        <div className="fixed bottom-6 right-6 bg-black text-white px-6 py-3 rounded shadow-lg animate-fadeInOut z-50">
          {toast}
        </div>
      )}

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

export default Articles;
