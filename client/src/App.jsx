import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Shorten from "./pages/Shorten";
import Navbar from "./layouts/Navbar";
import { PrivateRoute } from "./components/auth/PrivateRoute";
import VerifyEmail from "./pages/VerifyEmail";
import ResetPassword from "./pages/ResetPassword";
import NoPage from "./pages/NoPage";
function App() {
  return (
    <div>
      <Router>
        <Navbar />
        <Routes>
          <Route
            exact
            path="/"
            element={<Home />}
          />
          <Route element={<PrivateRoute />} >
            <Route path="/shorten" element={<Shorten />} />
          </Route>
          <Route path="/forgot-password" exact element={<VerifyEmail />} />
          <Route path="/reset-password/:token" exact element={<ResetPassword />} />
          <Route path="*" exact element={<NoPage />} />
        </Routes>
      </Router>
    </div >
  )
}

export default App