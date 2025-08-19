import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Shorten from "./pages/Shorten";
import Settings from "./pages/Settings";
import Navbar from "./layouts/Navbar";
import { PrivateRoute } from "./components/auth/PrivateRoute";
import VerifyEmail from "./pages/VerifyEmail";
import ResetPassword from "./pages/ResetPassword";
import NoPage from "./pages/NoPage";
import Statistics from "./pages/Statistics";
import useTokenExpiryChecker from "./hooks/useTokenExpiryChecker";
import Footer from "./layouts/Footer";
import RegisterVerifyEmail from "./pages/RegisterVerifyEmail";
import { InactivePage } from "./pages/InactivePage";

function App() {

  useTokenExpiryChecker();

  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")) || "")

  useEffect(() => {
    const handleStorage = () => {
      setUser(JSON.parse(localStorage.getItem("user")));
    };
    window.addEventListener("storage", handleStorage);
    return () => window.removeEventListener("storage", handleStorage);
  }, []);

  return (
    <div className="min-h-screen">
      <Navbar user={user} setUser={setUser} />
      <Routes>
        <Route
          exact
          path="/"
          element={<Home setUser={setUser} />}
        />
        <Route path="/inactive" element={<InactivePage />} />
        <Route element={<PrivateRoute />} >
          <Route path="/shorten" element={<Shorten />} />
          <Route path="/settings" exact element={<Settings setUser={setUser} />} />
        </Route>
        <Route path="/verify-register/:token" element={<RegisterVerifyEmail />} />
        <Route path="/forgot-password" exact element={<VerifyEmail />} />
        <Route path="/reset-password/:token" exact element={<ResetPassword />} />
        <Route path="/statistics" exact element={<Statistics />} />
        <Route path="*" exact element={<NoPage />} />
      </Routes>
      <Footer />
    </div>
  )
}

export default App