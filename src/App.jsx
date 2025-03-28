import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  Link,
  useNavigate,
} from "react-router-dom";
import Login from "./components/pages/Login";
import Register from "./components/pages/Register";
import Posts from "./components/pages/Posts";
import Profile from "./components/pages/Profile";
import ProfileDetails from "./components/pages/ProfileDetails";
import Dashboard from "./components/pages/Dashboard";

const isAuth = () => localStorage.getItem("token") !== null;

const ProtectedRoute = ({ children }) => {
  return isAuth() ? children : <Navigate to="/login" />;
};

const Navbar = () => {
  const navigate = useNavigate();
  const isAuthenticated = isAuth();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <nav className="bg-gray-700 h-[70px]">
      <ul className="flex justify-end items-center h-full gap-10 mr-6 text-white font-semibold text-lg">
        <li>
          <Link to="/profile">Developers</Link>
        </li>

        {!isAuthenticated && (
          <>
            <li>
              <Link to="/register">Register</Link>
            </li>
            <li>
              <Link to="/login">Login</Link>
            </li>
          </>
        )}

        {isAuthenticated && (
          <>
            <li>
              <Link to="/posts">Posts</Link>
            </li>
            <li>
              <Link to="/dashboard">Dashboard</Link>
            </li>
            <li>
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 text-white hover:text-red-400 transition-all"
              >
                <i className="fa-solid fa-right-from-bracket"></i> Logout
              </button>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};

const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/profile/:id" element={<ProfileDetails />} />

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/posts"
          element={
            <ProtectedRoute>
              <Posts />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
