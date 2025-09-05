
import React, { useEffect, useState } from 'react';
import api from '../api';
import { Link } from 'react-router-dom';
export default function Home(){ const [list,setList]=useState([]); useEffect(()=>{ api.get('/products').then(r=>setList(r.data)).catch(()=>{}); },[]); return (<div><h2>Products</h2><div style={{display:'grid',gridTemplateColumns:'repeat(auto-fill,minmax(220px,1fr))',gap:12}}>{list.map(p=>(<div key={p._id} className="card"><h3>{p.name}</h3><div>${p.price}</div><Link to={'/product/'+p.slug}><button className="btn">View</button></Link></div>))}</div></div>); }
