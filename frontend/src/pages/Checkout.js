
import React,{useState} from 'react'; import api from '../api'; import { useNavigate } from 'react-router-dom';
export default function Checkout(){ const nav=useNavigate(); const [code,setCode]=useState(''); const cart = JSON.parse(localStorage.getItem('cart')||'[]'); const subtotal = cart.reduce((s,i)=> s+i.price*i.qty,0); const token = localStorage.getItem('token');
 const apply=async ()=>{ try{ const r=await api.post('/coupons/apply',{ code, subtotal }); alert('Discount: '+r.data.discount); }catch(e){ alert(e.response?.data?.message||'Invalid'); } };
 const place=async ()=>{ if(!token){ alert('Login'); return; } const items = cart.map(i=>({ productId:i.productId, qty:i.qty, price:i.price })); await api.post('/orders',{ items }, { headers:{ Authorization:'Bearer '+token } }); localStorage.removeItem('cart'); nav('/orders'); };
 return (<div className="card"><h2>Checkout</h2><input className="input" placeholder="Coupon" value={code} onChange={e=>setCode(e.target.value)}/><button className="btn" onClick={apply}>Apply</button><div>Subtotal: ${subtotal}</div><button className="btn" onClick={place}>Place Order</button></div>); }
