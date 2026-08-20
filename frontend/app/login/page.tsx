'use client';
import { useRouter } from 'next/navigation'; import { auth } from '../../lib/auth';
export default function Login() { const router = useRouter(); return <main className="login"><p className="kicker">EDGE / CONTROL</p><h1>Sign in to your gateway.</h1><button onClick={() => { auth.setToken('demo-token'); router.push('/dashboard'); }}>Continue with demo access</button></main>; }
