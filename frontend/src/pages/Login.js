
import React,{useState} from 'react'; import api from '../api'; import { useNavigate } from 'react-router-dom';
export default function Login({onLogin}){ const [email,setEmail]=useState(''); const [pw,setPw]=useState(''); const nav=useNavigate();
 const submit=async e=>{ e.preventDefault(); try{ const r=await api.post('/auth/login',{ email, password:pw }); localStorage.setItem('token', r.data.token); localStorage.setItem('user', JSON.stringify(r.data.user)); onLogin?.(r.data.user); nav('/'); }catch(e){ alert(e.response?.data?.message||'Error'); } };
 return (<form className="card" onSubmit={submit}><h2>Login</h2><input className="input" placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)}/><br/><input className="input" placeholder="Password" type="password" value={pw} onChange={e=>setPw(e.target.value)}/><br/><button className="btn">Login</button></form>); }
