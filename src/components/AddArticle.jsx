import React, { useState } from "react";

function AddArticle() {
  const [form, setForm] = useState({
    title: "",
    description: "",
    price: "",
    imageUrl: [], // doit correspondre au modèle
  });

  const [toast, setToast] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    const maxImages = 4 - form.imageUrl.length;

    files.slice(0, maxImages).forEach((file) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        setForm((prev) => ({
          ...prev,
          imageUrl: [...prev.imageUrl, reader.result],
        }));
      };
      reader.readAsDataURL(file);
    });
  };

  const removeImage = (index) => {
    setForm((prev) => ({
      ...prev,
      imageUrl: prev.imageUrl.filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    fetch("https://server-salem.vercel.app/api/products", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    })
      .then((res) => {
        if (!res.ok) throw new Error("Erreur lors de l'ajout");
        return res.json();
      })
      .then(() => {
        setToast("Produit ajouté avec succès !");
        setForm({
          title: "",
          description: "",
          price: "",
          imageUrl: [],
        });
      })
      .catch((err) => alert("Erreur : " + err.message));
  };

  return (
    <div className="w-full p-6 bg-white rounded shadow mt-8">
      <h2 className="text-2xl font-bold mb-6">Ajouter un produit</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          name="title"
          value={form.title}
          onChange={handleChange}
          placeholder="Titre du produit"
          className="w-full border p-2 rounded"
          required
        />

        <textarea
          name="description"
          value={form.description}
          onChange={handleChange}
          placeholder="Description"
          className="w-full border p-2 rounded"
          required
        />

        <input
          name="price"
          value={form.price}
          onChange={handleChange}
          type="number"
          placeholder="Prix"
          className="w-full border p-2 rounded"
          required
        />

        {/* Upload images */}
        <div>
          <label className="block font-semibold mb-1">Images (max 4) :</label>
          <input
            type="file"
            accept="image/*"
            multiple
            onChange={handleImageUpload}
            className="mb-2"
            disabled={form.imageUrl.length >= 4}
          />
          <div className="flex flex-wrap gap-2">
            {form.imageUrl.map((img, index) => (
              <div
                key={index}
                className="relative w-24 h-24 border rounded overflow-hidden"
              >
                <img
                  src={img}
                  alt={`Image ${index}`}
                  className="w-full h-full object-cover"
                />
                <button
                  type="button"
                  onClick={() => removeImage(index)}
                  className="absolute top-0 right-0 bg-red-600 text-white px-1 rounded-bl"
                >
                  &times;
                </button>
              </div>
            ))}
          </div>
        </div>

        <button
          type="submit"
          className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700"
        >
          Ajouter
        </button>
      </form>

      {toast && (
        <div className="mt-4 text-green-700 font-medium bg-green-100 p-3 rounded">
          {toast}
        </div>
      )}
    </div>
  );
}

export default AddArticle;
