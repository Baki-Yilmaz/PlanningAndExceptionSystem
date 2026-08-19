'use client'; // Hangi sayfada olduğumuzu anlamak (usePathname) için şarttır

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Sidebar() {
  const pathname = usePathname(); // Şu anki aktif URL'i yakalıyoruz

  // Aktif sayfaya göre linkin stilini değiştiren yardımcı fonksiyon
  const getLinkClass = (path: string) => {
    const isActive = pathname === path;
    return `flex items-center px-4 py-2.5 rounded-r-lg transition-colors ${
      isActive 
        ? 'bg-surface-container-low text-primary font-bold border-l-4 border-primary' 
        : 'text-on-surface-variant hover:bg-surface-container'
    }`;
  };

  return (
    <nav className="fixed left-0 top-0 h-screen w-64 bg-surface dark:bg-surface-container-low border-r border-outline-variant shadow-sm flex flex-col p-4 z-20">
      {/* Logo ve Başlık Alanı */}
      <div className="flex items-center gap-3 mb-8 mt-2 px-2">
        <img 
          alt="Brand Logo" 
          className="w-10 h-10 rounded object-cover" 
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuDfa5r4XEHWISm749rMvVPAHlv5WNaUPLPICxLMpk1Nf-_VJDhAKi1UGb4Vt6GVseZbgKM6pCkl1iFcsjftmjjuQZj91tKsXHPiR-Tfi-7afczMFqMaGcnjOiJjJOcR6yUcLYMvXcEESlCGaohOw1Omql0hkUycNbVg_EVw4040SIm2exJmP-RJwSxvbqBtcuouQiTo7LppwQCMP5t2ZrO--GdMWyAvq_qaisMd4z-OYxMbpijQvYad" 
        />
        <div>
          <h1 className="text-lg font-bold text-primary leading-tight">EnterpriseOS</h1>
          <p className="text-xs text-on-surface-variant">Staj Yönetim Paneli</p>
        </div>
      </div>

      {/* Menü Linkleri (Türkçe ve Aktif Kontrollü) */}
      <ul className="flex-1 space-y-1 overflow-y-auto pr-2">
        <li>
          <Link href="/" className={getLinkClass('/')}>
            <span className="material-symbols-outlined mr-3">dashboard</span>
            <span>Kontrol Paneli</span>
          </Link>
        </li>
        <li>
          <Link href="/sales" className={getLinkClass('/sales')}>
            <span className="material-symbols-outlined mr-3">payments</span>
            <span>Satış Yönetimi</span>
          </Link>
        </li>
        <li>
          <Link href="/stock" className={getLinkClass('/stock')}>
            <span className="material-symbols-outlined mr-3">inventory_2</span>
            <span>Stok Yönetimi</span>
          </Link>
        </li>
        <li>
          <Link href="/plans" className={getLinkClass('/plans')}>
            <span className="material-symbols-outlined mr-3">event_note</span>
            <span>Planlama</span>
          </Link>
        </li>
        <li>
          <Link href="/reports" className={getLinkClass('/reports')}>
            <span className="material-symbols-outlined mr-3">analytics</span>
            <span>Raporlar</span>
          </Link>
        </li>
        <li className="mt-8">
          <Link href="/settings" className={getLinkClass('/settings')}>
            <span className="material-symbols-outlined mr-3">settings</span>
            <span>Ayarlar</span>
          </Link>
        </li>
      </ul>
    </nav>
  );
}