import "./App.css";
import Dashboard from "./pages/Dashboard/Dashboard";
import Login from "./pages/Login/Login";
import Management from "./pages/Management/Management";
import Registration from "./pages/Registration/Registration";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate replace to="/login" />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/registration" element={<Registration />}></Route>
          <Route path="/dashboard" element={<Dashboard />}></Route>
          <Route path="/management" element={<Management />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
