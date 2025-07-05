import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import AddItems from "./pages/Additems";
import Articles from "./pages/Articles";
import Orders from "./pages/Orders";
import "./App.css";
import { ToastContainer, toast } from 'react-toastify';
import AddArticle from "./components/AddArticle";
import Login from "./pages/Login";
import PrivateRoute from "./PrivateRoutes";
import NotFound from "./pages/NotFound";
function App() {
  return (
  <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        
    <Route element={<PrivateRoute />}>
      <Route path="/" element={<Dashboard />}>
        <Route path="product-list" element={<Articles />} />
        <Route path="add-article" element={<AddArticle />} />
        <Route path="order-list" element={<Orders />} />
      </Route>
    </Route>
      <Route path="*" element={<NotFound />} />

      </Routes>
    </Router>
  );
}

export default App;
