
import React,{useEffect,useState} from 'react'; import { useParams,useNavigate } from 'react-router-dom'; import api from '../api';
export default function Product(){ const {slug}=useParams(); const [p,setP]=useState(null); const nav=useNavigate();
 useEffect(()=>{ api.get('/products/'+slug).then(r=>setP(r.data)).catch(()=>{}); },[slug]);
 if(!p) return <div>Loading...</div>;
 const add=()=>{ const cart=JSON.parse(localStorage.getItem('cart')||'[]'); cart.push({ productId:p._id, name:p.name, price:p.price, qty:1 }); localStorage.setItem('cart',JSON.stringify(cart)); nav('/cart'); };
 return (<div className="card"><h2>{p.name}</h2><p>{p.description}</p><div>${p.price}</div><button className="btn" onClick={add}>Add to cart</button></div>); }
