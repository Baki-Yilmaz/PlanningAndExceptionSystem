'use client';

import { usePathname, useRouter } from "next/navigation";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Sidebar from "@/components/Sidebar";
import { Toaster } from 'react-hot-toast';
import { AuthProvider, useAuth } from '@/app/context/AuthContext';
import { LogOut } from "lucide-react";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// Header bileşenini layout içinde güvenle kullanabilmek için küçük bir iç bileşene ayırıyoruz
function MainLayoutContent({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const isLoginPage = pathname === '/login';
  const { user, logout } = useAuth();

  const getPageTitle = (path: string) => {
    switch (path) {
      case '/': return 'Kontrol Paneli';
      case '/dashboard': return 'Kontrol Paneli';
      case '/shops': return 'Mağaza Yönetimi';
      case '/stock': return 'Stok Yönetimi';
      case '/sales': return 'Satış Yönetimi';
      case '/plans': return 'Planlama';
      case '/actions': return 'İstisna ve Aksiyonlar';
      case '/reports': return 'Raporlar';
      default: return 'Yönetim Paneli';
    }
  };

  const handleLogout = () => {
    logout();
    router.push('/login');
  };

  return (
    <div className="h-full flex w-full bg-surface text-on-surface overflow-hidden">
      <Toaster position="top-right" reverseOrder={false} />
      
      {/* EĞER LOGIN SAYFASINDA DEĞİLSEK SIDEBAR'I GÖSTER */}
      {!isLoginPage && <Sidebar />}

      {/* Sağ Taraf: Eğer login'deysek tam ekran, değilsek yönetim paneli düzeni */}
      <div className={`flex-1 flex flex-col h-screen ${!isLoginPage ? 'ml-64' : ''}`}>
        
        {/* EĞER LOGIN SAYFASINDA DEĞİLSEK ÜST BAR'I GÖSTER */}
        {!isLoginPage && (
          <header className="fixed top-0 right-0 h-[72px] bg-white border-b border-slate-200 shadow-sm flex justify-between items-center px-8 w-[calc(100%-16rem)] z-10">
            <h2 className="text-xl font-bold text-primary">{getPageTitle(pathname)}</h2>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-3 pl-4 border-l border-slate-200">
                <div className="text-right">
                  {/* Dinamik Kullanıcı Adı ve Rolü */}
                  <span className="block text-sm font-semibold text-slate-800">
                    {user ? user.username : 'Misafir'}
                  </span>
                  <span className="block text-xs text-slate-500">
                    {user ? user.role : 'Yetkisiz'}
                  </span>
                </div>
                <div className="w-9 h-9 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold text-sm border border-primary/20">
                  {user && user.username ? user.username.charAt(0).toUpperCase() : 'M'}
                </div>

                <button
                  onClick={handleLogout}
                  title="Çıkış Yap"
                  className="ml-2 p-2 text-red-500 hover:bg-red-50 hover:text-red-700 transition-colors rounded-lg flex items-center border border-transparent hover:border-red-200">
                  <LogOut size={18} />    
                </button>              
              </div>
            </div>
          </header>
        )}

        <main className={`flex-1  bg-[#f8f9fa] ${!isLoginPage ? 'mt-[72px] p-8' : ''}`}>
          {children}
        </main>
        
      </div>
    </div>
  );
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="tr"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <head>
        <link 
          rel="stylesheet" 
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap" 
        />
      </head>
      <body className="h-full overflow-hidden">
        {/* 3. Tüm uygulamayı AuthProvider ile sarmalıyoruz */}
        <AuthProvider>
          <MainLayoutContent>{children}</MainLayoutContent>
        </AuthProvider>
      </body>
    </html>
  );
}