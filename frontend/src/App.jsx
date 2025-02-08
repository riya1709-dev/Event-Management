import {BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom"

import Login from "./pages/Auth/Login";
import SignUp from "./pages/Auth/SignUp";
import Home from "./pages/Home/Home";

const App = () => {
  return (
    <div  className='text-3xl'>
      <Router>
        <Routes>
          <Route path="/" exact element={<Root/>} />
          <Route path="/dashboard" exact element={<Home/>} />
          <Route path="/login" exact element={<Login/>} />
          <Route path="/signup" exact element={<SignUp/>} />
        </Routes>
        </Router>
    </div>
  );
}
//defne root component to handle initial redirect
const Root=()=>{
  const isAuthenticated= !!localStorage.getItem("token");
  return isAuthenticated? (
    <Navigate to="/dashboard" />
  ):(
    <Navigate to="/login" />
  )
}
export default App;
