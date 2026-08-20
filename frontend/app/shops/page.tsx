'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { ShieldCheck, Database, Store } from 'lucide-react';

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    // Tarayıcı hafızasında giriş bilgisi var mı kontrol ediyoruz
    const auth = localStorage.getItem('auth');
    if (!auth) {
      // Eğer giriş yapmadıysa direkt login sayfasına fırlat
      router.push('/login');
    }
  }, [router]);

  return (
    <div>
      <div className="mb-8">
        <h3 className="text-3xl font-bold text-on-surface mb-1">Kontrol Paneli</h3>
        <p className="text-sm text-on-surface-variant">EnterpriseOS Yönetim Sistemine Hoş Geldiniz.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-surface-container-lowest rounded-xl p-6 border border-outline-variant shadow-sm">
          <div className="flex items-center gap-4">
            <div className="bg-primary/10 p-3 rounded-xl text-primary">
              <Store size={24} />
            </div>
            <div>
              <p className="text-xs font-semibold text-on-surface-variant uppercase">Sistem Durumu</p>
              <h4 className="text-lg font-bold text-on-surface">Aktif Mağaza Modülü</h4>
            </div>
          </div>
        </div>

        <div className="bg-surface-container-lowest rounded-xl p-6 border border-outline-variant shadow-sm">
          <div className="flex items-center gap-4">
            <div className="bg-green-500/10 p-3 rounded-xl text-green-600">
              <ShieldCheck size={24} />
            </div>
            <div>
              <p className="text-xs font-semibold text-on-surface-variant uppercase">Güvenlik</p>
              <h4 className="text-lg font-bold text-on-surface">Basic Auth Korumalı</h4>
            </div>
          </div>
        </div>

        <div className="bg-surface-container-lowest rounded-xl p-6 border border-outline-variant shadow-sm">
          <div className="flex items-center gap-4">
            <div className="bg-tertiary/10 p-3 rounded-xl text-tertiary">
              <Database size={24} />
            </div>
            <div>
              <p className="text-xs font-semibold text-on-surface-variant uppercase">Veritabanı</p>
              <h4 className="text-lg font-bold text-on-surface">SQL Server Bağlı</h4>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}