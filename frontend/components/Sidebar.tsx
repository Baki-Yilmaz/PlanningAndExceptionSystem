'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {useAuth} from '@/app/context/AuthContext';

export default function Sidebar() {
  const pathname = usePathname();
  const {hasRole} = useAuth();

  // Link aktifse mavi, aktif değilse gri stil uygulanır.
  const getLinkClass = (path: string) => {
    const isActive =
      path === '/' ? pathname === '/' : pathname.startsWith(path);

    return `flex items-center px-4 py-2.5 rounded-r-lg transition-colors ${
      isActive
        ? 'bg-surface-container-low text-primary font-bold border-l-4 border-primary'
        : 'text-on-surface-variant hover:bg-surface-container'
    }`;
  };

  return (
    <nav className="fixed left-0 top-0 h-screen w-64 bg-surface border-r border-outline-variant shadow-sm flex flex-col p-4 z-20">
      {/* Logo ve uygulama başlığı */}
      <div className="flex items-center gap-3 mb-8 mt-2 px-2">
        <div>
          <h1 className="text-lg font-bold text-primary leading-tight">
            EnterpriseOS
          </h1>
          <p className="text-xs text-on-surface-variant">
            Plan Yönetim Paneli
          </p>
        </div>
      </div>

      {/* Sayfa menüleri */}
      <ul className="flex-1 space-y-1 overflow-y-auto pr-2">
        {/* Dashboard */}
        <li>
          <Link href="/dashboard" className={getLinkClass('/dashboard')}>
            <span className="material-symbols-outlined mr-3">dashboard</span>
            <span>Kontrol Paneli</span>
          </Link>
        </li>

        {/* Mağaza ekleme ve mağaza bilgileri */}
        {hasRole(['admin', 'Manager']) && (
        <li>
          <Link href="/shops" className={getLinkClass('/shops')}>
            <span className="material-symbols-outlined mr-3">
              store
            </span>
            <span>Mağaza Yönetimi</span>
          </Link>
        </li>
        )}

        {/* Stok giriş ve stok takibi */}
        <li>
          <Link href="/stock" className={getLinkClass('/stock')}>
            <span className="material-symbols-outlined mr-3">
              inventory_2
            </span>
            <span>Stok Yönetimi</span>
          </Link>
        </li>

        {/* Gerçekleşen satış girişleri */}
        <li>
          <Link href="/sales" className={getLinkClass('/sales')}>
            <span className="material-symbols-outlined mr-3">
              payments
            </span>
            <span>Satış Yönetimi</span>
          </Link>
        </li>

        {/* Satış planı oluşturma */}
        <li>
          <Link href="/plans" className={getLinkClass('/plans')}>
            <span className="material-symbols-outlined mr-3">
              event_note
            </span>
            <span>Planlama</span>
          </Link>
        </li>

        {/* Sapmaları inceleme ve aksiyon alma */}
        <li>
          <Link href="/actions" className={getLinkClass('/actions')}>
            <span className="material-symbols-outlined mr-3">
              bolt
            </span>
            <span>Sapma ve Aksiyonlar</span>
          </Link>
        </li>

        {/* Plan, satış, sapma ve aksiyon raporları */}
        {hasRole(['admin', 'Manager']) && (
        <li>
          <Link href="/reports" className={getLinkClass('/reports')}>
            <span className="material-symbols-outlined mr-3">
              analytics
            </span>
            <span>Raporlar</span>
          </Link>
        </li>
        )}
      </ul>
    </nav>
  );
}