import "./App.css";
import SignIn from "./pages/signIn";
import SignUp from "./pages/signUp";
import ForgotPassword from "./pages/forgetPassword";
import Verification from "./pages/verification"
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
function App() {
  return (
    <Router>
      <main className=" min-h-screen bg-noble-black-700 max-w-7xl mx-auto">
        <Routes>
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/forget-password" element={<ForgotPassword />} />
          <Route path="/verification-code" element={<Verification />} />
        </Routes>
      </main>
    </Router>
  );
}

export default App;
