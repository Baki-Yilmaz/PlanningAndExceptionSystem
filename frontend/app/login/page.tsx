'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Lock, Mail } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const {login} = useAuth();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const base64Credentials = btoa(`${email}:${password}`);

      const response = await fetch('https://localhost:7016/api/Auth/login-check', {
        method: 'GET',
        headers: {
          'Authorization': `Basic ${base64Credentials}`,
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        const userData = await response.json();
        const userRole = userData.role || "Staff";

        login(email, password, userRole);
        alert('Giriş başarılı!');
        router.push('/dashboard');
      } else {
        alert('Giriş başarısız: Kullanıcı adı veya şifre hatalı!');
      }
    } catch (error) {
      console.error('Giriş hatası:', error);
      alert('Sunucuya bağlanılamadı!');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-surface p-4">
      <div className="max-w-md w-full bg-surface-container-lowest rounded-2xl border border-outline-variant p-8 shadow-sm">
        
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-primary mb-2">EnterpriseOS</h2>
          <p className="text-sm text-on-surface-variant">Lütfen hesabınıza giriş yapın</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-on-surface-variant uppercase tracking-wider mb-1">
              Kullanıcı Adı / E-posta
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-2.5 text-outline" size={18} />
              <input 
                type="text" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="Kullanıcı adınızı girin"
                className="w-full pl-10 pr-3 py-2 border border-outline-variant rounded-lg bg-surface text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-on-surface-variant uppercase tracking-wider mb-1">
              Şifre
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-2.5 text-outline" size={18} />
              <input 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder="••••••••"
                className="w-full pl-10 pr-3 py-2 border border-outline-variant rounded-lg bg-surface text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
              />
            </div>
          </div>

          <button 
            type="submit" 
            disabled={loading}
            className="w-full bg-primary text-white py-2.5 rounded-lg font-medium hover:bg-primary/90 transition-colors shadow-sm disabled:opacity-50 mt-2"
          >
            {loading ? 'Giriş Yapılıyor...' : 'Giriş Yap'}
          </button>
        </form>

      </div>
    </div>
  );
}