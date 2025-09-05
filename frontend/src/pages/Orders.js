
import React,{useEffect,useState} from 'react'; import api from '../api';
export default function Orders(){ const [list,setList]=useState([]); useEffect(()=>{ const token=localStorage.getItem('token'); if(!token) return; api.get('/orders', { headers:{ Authorization:'Bearer '+token }}).then(r=>setList(r.data)); },[]); return (<div><h2>Orders</h2>{list.map(o=>(<div key={o._id} className="card">Order: {o._id} - Total: ${o.total}</div>))}</div>); }
