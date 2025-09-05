
import React, { useState, useEffect } from 'react';
import { Routes, Route, Link, useNavigate } from 'react-router-dom';
import Home from './pages/Home';
import Product from './pages/Product';
import Login from './pages/Login';
import Register from './pages/Register';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import Orders from './pages/Orders';
import Admin from './pages/Admin';
import Live from './pages/Live';
import api from './api';

export default function App(){
  const [user,setUser]=useState(()=> JSON.parse(localStorage.getItem('user')||'null'));
  const nav=useNavigate();
  const logout=()=>{ localStorage.removeItem('token'); localStorage.removeItem('user'); setUser(null); nav('/'); };
  return (<div><nav className="nav"><Link to="/">Home</Link><Link to="/orders">Orders</Link><Link to="/live">Live</Link>{user?.role==='admin' && <Link to="/admin">Admin</Link>}<div style={{marginLeft:'auto'}}>{user? <><span>Hi {user.name}</span><button onClick={logout} className="btn">Logout</button></>:<><Link to="/login">Login</Link> · <Link to="/register">Register</Link></>}</div></nav><div className="container"><Routes><Route path="/" element={<Home/>}/><Route path="/product/:slug" element={<Product/>}/><Route path="/login" element={<Login onLogin={setUser}/>}/><Route path="/register" element={<Register onLogin={setUser}/>}/><Route path="/cart" element={<Cart/>}/><Route path="/checkout" element={<Checkout/>}/><Route path="/orders" element={<Orders/>}/><Route path="/admin" element={<Admin/>}/><Route path="/live" element={<Live/>}/></Routes></div></div>);
}
