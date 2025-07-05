import React from "react";
import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 text-gray-700 p-6">
      <h1 className="text-6xl font-bold text-blue-600 mb-4">404</h1>
      <p className="text-2xl font-semibold mb-2">Page introuvable</p>
      <p className="text-center text-gray-500 mb-6">
        Oups ! La page que vous cherchez n'existe pas ou a été déplacée.
      </p>
      <Link
        to="/"
        className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition"
      >
        Retour à l'accueil
      </Link>
    </div>
  );
}
