'use client'; // URL yolunu okuyabilmek için client component yapıyoruz

import { usePathname } from "next/navigation";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Sidebar from "@/components/Sidebar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname(); // Şu an hangi sayfada olduğumuzu yakalıyoruz

  // URL'e göre üst menüde hangi başlığın yazacağını belirleyen küçük bir fonksiyon
  const getPageTitle = (path: string) => {
    switch (path) {
      case '/': return 'Dashboard';
      case '/sales': return 'Satış Yönetimi';
      case '/stock': return 'Stok Yönetimi';
      case '/plans': return 'Planlama';
      case '/reports': return 'Raporlar';
      case '/settings': return 'Ayarlar';
      default: return 'Yönetim Paneli';
    }
  };

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
      <body className="h-full flex bg-surface text-on-surface overflow-hidden">
        
        {/* Sabit Sol Sidebar */}
        <Sidebar />

        {/* Sağ Taraf: Üst Bar ve Sayfa İçerikleri */}
        <div className="flex-1 flex flex-col ml-64 h-screen">
          
          {/* Üst Navbar (Dinamik Başlık) */}
          <header className="fixed top-0 right-0 h-[72px] bg-white border-b border-slate-200 shadow-sm flex justify-between items-center px-8 w-[calc(100%-16rem)] z-10">
            <h2 className="text-xl font-bold text-primary">{getPageTitle(pathname)}</h2>
            <div className="flex items-center gap-4">
              <button className="p-2 text-slate-500 hover:text-primary transition-colors rounded-full hover:bg-slate-100">
                <span className="material-symbols-outlined">notifications</span>
              </button>
              <div className="flex items-center gap-2 pl-4 border-l border-slate-200">
                <span className="text-sm font-medium text-slate-700">Administrator</span>
                <img 
                  alt="Avatar" 
                  className="w-8 h-8 rounded-full object-cover border border-slate-200" 
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuCt3S_BQ9l4l7ur_yawDs-8YaQcqfhPJqbJxUUedicZoH5Oe9KokWjQfqqCaziLMeEU4e6lR2WEhuHj0Dm8wB7XdoYZanKdN5B-hmUZ9ijkNctzWl7QvRLyHoLD09BTJmx0-ocunV26mj7Xn_vnEvTi58tFs8q6p-JUZQJVLx7frnrnbD8r5P0T5ifLj-GCMhoQAry_MLuLTXBpqhm4lyBlkCOUrh45ay6Nor1NXffQwOZxKaSccf_2" 
                />
              </div>
            </div>
          </header>

          {/* Dinamik Sayfa İçeriği Alanı */}
          <main className="flex-1 overflow-y-auto mt-[72px] p-8 bg-[#f8f9fa]">
            {children}
          </main>
          
        </div>

      </body>
    </html>
  );
}