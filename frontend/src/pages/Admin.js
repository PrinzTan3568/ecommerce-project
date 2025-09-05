
import React,{useEffect,useState} from 'react'; import api from '../api';
export default function Admin(){ const [stats,setStats]=useState(null); const [products,setProducts]=useState([]); const token=localStorage.getItem('token');
 useEffect(()=>{ api.get('/products').then(r=>setProducts(r.data)); api.get('/stats/overview', { headers:{ Authorization:'Bearer '+token }}).then(r=>setStats(r.data)).catch(()=>{}); },[token]);
 const add=async ()=>{ const body={ name:'New', slug:'new-'+Date.now(), price:9.9, stock:10 }; const r=await api.post('/products', body, { headers:{ Authorization:'Bearer '+token }}); setProducts([r.data,...products]); };
 return (<div><h2>Admin</h2>{stats && <div className="card">Users: {stats.users} Orders: {stats.orders} Sales: ${stats.sales}</div>}<div className="card"><button className="btn" onClick={add}>Add Demo Product</button>{products.map(p=>(<div key={p._id}>{p.name} - ${p.price}</div>))}</div></div>); }
