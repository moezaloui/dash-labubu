import React, { useState } from 'react';
import axios from 'axios';

const AddItems = () => {
  const [productName, setProductName] = useState('');
  const [productDescription, setProductDescription] = useState('');
  const [productCategory, setProductCategory] = useState('Men');
  const [subCategory, setSubCategory] = useState('Topwear');
  const [productPrice, setProductPrice] = useState('25');
  const [selectedSizes, setSelectedSizes] = useState([]);
  const [isBestseller, setIsBestseller] = useState(false);
  const [uploadedImages, setUploadedImages] = useState([null, null, null, null]);
  const [imagePreviews, setImagePreviews] = useState([null, null, null, null]);

  const sizes = ['S', 'M', 'L', 'XL', 'XXL'];

  const handleSizeSelect = (size) => {
    setSelectedSizes(prev =>
      prev.includes(size) ? prev.filter(s => s !== size) : [...prev, size]
    );
  };

  const handleImageUpload = (e, index) => {
    const file = e.target.files[0];
    if (file) {
      const updatedFiles = [...uploadedImages];
      const updatedPreviews = [...imagePreviews];
      updatedFiles[index] = file;
      updatedPreviews[index] = URL.createObjectURL(file);
      setUploadedImages(updatedFiles);
      setImagePreviews(updatedPreviews);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('name', productName);
    formData.append('description', productDescription);
    formData.append('category', productCategory);
    formData.append('subCategory', subCategory);
    formData.append('price', productPrice);
    formData.append('bestseller', isBestseller);
    selectedSizes.forEach(size => formData.append('sizes[]', size));
    uploadedImages.forEach(img => img && formData.append('images', img));

    try {
      const res = await axios.post('https://server-salem.vercel.app/api/products', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      alert('Produit ajouté avec succès ✅');
      // Reset form
      setProductName('');
      setProductDescription('');
      setProductCategory('Men');
      setSubCategory('Topwear');
      setProductPrice('25');
      setSelectedSizes([]);
      setIsBestseller(false);
      setUploadedImages([null, null, null, null]);
      setImagePreviews([null, null, null, null]);
    } catch (err) {
      console.error(err);
      alert('Erreur lors de l\'ajout');
    }
  };

  return (
    <div className="p-4 bg-white rounded-md shadow max-w-2xl mx-auto font-sans text-gray-700">
      <h2 className="text-lg font-semibold mb-4 text-gray-900 tracking-tight">Ajouter un nouvel article</h2>

      <div className="mb-4">
        <label className="block text-gray-800 text-xs font-medium mb-1">Upload Image</label>
        <div className="grid grid-cols-4 gap-2">
          {imagePreviews.map((preview, index) => (
            <label
              key={index}
              htmlFor={`image-upload-${index}`}
              className="flex flex-col items-center justify-center w-full h-20 border border-gray-200 rounded-sm cursor-pointer bg-gray-50 hover:bg-gray-100 overflow-hidden relative"
            >
              {preview ? (
                <img src={preview} alt={`Aperçu ${index}`} className="w-full h-full object-cover" />
              ) : (
                <>
                  <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                      d="M7 16l-4-4m0 0l4-4m-4 4h18m-6 4l4-4m-4 4l-4-4" />
                  </svg>
                  <span className="text-[10px] text-gray-500 mt-1">Upload</span>
                </>
              )}
              <input
                id={`image-upload-${index}`}
                type="file"
                className="hidden"
                accept="image/*"
                onChange={(e) => handleImageUpload(e, index)}
              />
            </label>
          ))}
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="product-name" className="block text-gray-900 text-xs font-semibold mb-1">Product name</label>
          <input type="text" id="product-name" className="w-full p-1.5 border rounded-sm text-sm"
            placeholder="Nom du produit" value={productName} onChange={e => setProductName(e.target.value)} required />
        </div>

        <div>
          <label htmlFor="product-description" className="block text-gray-900 text-xs font-semibold mb-1">Product description</label>
          <textarea id="product-description" className="w-full p-1.5 border rounded-sm text-sm"
            placeholder="Description" value={productDescription} onChange={e => setProductDescription(e.target.value)} />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <div>
            <label htmlFor="product-category" className="block text-xs font-semibold mb-1">Product category</label>
            <select id="product-category" className="w-full p-1.5 border rounded-sm text-sm"
              value={productCategory} onChange={e => setProductCategory(e.target.value)}>
              <option value="Men">Men</option>
              <option value="Women">Women</option>
              <option value="Kids">Kids</option>
            </select>
          </div>
          <div>
            <label htmlFor="sub-category" className="block text-xs font-semibold mb-1">Sub category</label>
            <select id="sub-category" className="w-full p-1.5 border rounded-sm text-sm"
              value={subCategory} onChange={e => setSubCategory(e.target.value)}>
              <option value="Topwear">Topwear</option>
              <option value="Bottomwear">Bottomwear</option>
              <option value="Winterwear">Winterwear</option>
            </select>
          </div>
          <div>
            <label htmlFor="product-price" className="block text-xs font-semibold mb-1">Product Price</label>
            <input type="number" id="product-price" className="w-full p-1.5 border rounded-sm text-sm"
              min="0" value={productPrice} onChange={e => setProductPrice(e.target.value)} />
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold mb-1">Product Sizes</label>
          <div className="flex gap-1 flex-wrap">
            {sizes.map(size => (
              <button key={size} type="button" onClick={() => handleSizeSelect(size)}
                className={`py-1 px-3 border rounded-sm text-xs font-medium
                  ${selectedSizes.includes(size)
                    ? 'bg-gray-600 text-white border-gray-600'
                    : 'bg-gray-100 text-gray-700 border-gray-300 hover:bg-gray-200'}`}>
                {size}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label htmlFor="is-bestseller" className="flex items-center cursor-pointer text-xs font-semibold">
            <input type="checkbox" id="is-bestseller" className="h-3 w-3 mr-1"
              checked={isBestseller} onChange={e => setIsBestseller(e.target.checked)} />
            Add to bestseller
          </label>
        </div>

        <button type="submit"
          className="w-full bg-black text-white py-2 rounded-sm text-sm font-semibold hover:bg-gray-900 transition">
          ADD
        </button>
      </form>
    </div>
  );
};

export default AddItems;
