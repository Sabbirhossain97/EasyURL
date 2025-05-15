import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Shorten from "./pages/Shorten";
import Navbar from "./layouts/Navbar";
import PrivateRoute from "./components/auth/PrivateRoute";

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
        </Routes>
      </Router>
    </div >
  )
}

export default App