import React from "react";

function EditeArticle({ item, onChange, onClose, onSubmit }) {
  if (!item) return null;

  const handleChange = (field, value) => {
    onChange({ ...item, [field]: value });
  };

  const handleFileChange = async (index, file) => {
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      const base64 = reader.result;
      const updatedImages = [...(item.imageUrl || [])];
      updatedImages[index] = base64;
      handleChange("imageUrl", updatedImages);
    };
    reader.readAsDataURL(file);
  };

  const handleAddImage = () => {
    if ((item.imageUrl?.length || 0) < 4) {
      handleChange("imageUrl", [...(item.imageUrl || []), ""]);
    }
  };

  const handleRemoveImage = (index) => {
    const updatedImages = [...(item.imageUrl || [])];
    updatedImages.splice(index, 1);
    handleChange("imageUrl", updatedImages);
  };

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 px-4"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-white rounded-xl p-6 w-full max-w-md sm:max-w-lg md:max-w-xl space-y-5 overflow-y-auto max-h-[90vh]"
      >
        <h2 className="text-2xl font-semibold text-gray-800">Modifier l’article</h2>

        <div className="space-y-3">
          <div>
            <label className="block mb-1 text-sm font-medium">Titre</label>
            <input
              value={item.title}
              onChange={(e) => handleChange("title", e.target.value)}
              placeholder="Titre"
              className="border w-full p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block mb-1 text-sm font-medium">Description</label>
            <textarea
              value={item.description}
              onChange={(e) => handleChange("description", e.target.value)}
              placeholder="Description"
              className="border w-full p-2 rounded-md resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block mb-1 text-sm font-medium">Prix (TND)</label>
            <input
              type="number"
              value={item.price}
              onChange={(e) => handleChange("price", parseFloat(e.target.value))}
              placeholder="Prix"
              className="border w-full p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Images avec upload + preview */}
          <div>
            <label className="font-medium block mb-2">Images (max 4)</label>
            <div className="space-y-3">
              {(item.imageUrl || []).map((img, index) => (
                <div key={index} className="flex items-center gap-3">
                  {img && (
                    <img
                      src={img}
                      alt={`img-${index}`}
                      className="w-16 h-16 object-cover rounded-lg border"
                    />
                  )}
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleFileChange(index, e.target.files[0])}
                    className="text-sm flex-1"
                  />
                  <button
                    onClick={() => handleRemoveImage(index)}
                    className="text-red-600 text-xs px-3 py-1 border border-red-300 rounded hover:bg-red-100 transition"
                  >
                    Supprimer
                  </button>
                </div>
              ))}
              {(item.imageUrl?.length || 0) < 4 && (
                <button
                  type="button"
                  onClick={handleAddImage}
                  className="text-blue-600 text-sm hover:underline"
                >
                  + Ajouter une image
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Boutons */}
        <div className="flex justify-end gap-4 pt-6">
          <button
            onClick={onClose}
            className="px-4 py-2 text-gray-700 border border-gray-300 rounded-md hover:bg-gray-100 transition"
          >
            Annuler
          </button>
          <button
            onClick={onSubmit}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
          >
            Enregistrer
          </button>
        </div>
      </div>
    </div>
  );
}

export default EditeArticle;
