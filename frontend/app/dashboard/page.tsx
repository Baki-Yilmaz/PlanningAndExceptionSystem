'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { ShieldCheck, Database, Store, Target, AlertTriangle, ShieldAlert } from 'lucide-react';
import { getShops } from '@/services/shopService'; 
// API'lerini import ediyoruz (Kendi dosya yoluna göre düzeltmen gerekebilir)
import { getSalesPlans } from '@/services/planService';
import { getPlanningExceptions, getExceptionActions } from '@/services/planexceptionService';

export default function Home() {
  const router = useRouter();
  
  // State'ler
  const [shopCount, setShopCount] = useState(0);
  const [stats, setStats] = useState({
    totalPlans: 0,
    activeExceptions: 0,
    pendingActions: 0
  });

  useEffect(() => {
    // Güvenlik kontrolü
    const auth = localStorage.getItem('auth');
    if (!auth) {
      router.push('/login');
      return;
    }

    async function fetchDashboardData() {
      try {
        // Mağazaları, Planları, Sapmaları ve Aksiyonları aynı anda çekiyoruz
        const [shopsRes, plansRes, excRes, actionsRes] = await Promise.all([
          getShops().catch(() => []),
          getSalesPlans().catch(() => []),
          getPlanningExceptions().catch(() => []),
          getExceptionActions().catch(() => [])
        ]);

        // Mağaza Sayısı
        const shops = Array.isArray(shopsRes) ? shopsRes : shopsRes.data || [];
        setShopCount(shops.length);

        // Satış Yönetimi / İstisna İstatistikleri
        const plans = Array.isArray(plansRes) ? plansRes : plansRes.data || [];
        const exceptions = Array.isArray(excRes) ? excRes : excRes.data || [];
        const actions = Array.isArray(actionsRes) ? actionsRes : actionsRes.data || [];

        // Filtrelemeler
        const openExceptions = exceptions.filter((e: any) => e.status === 0 || e.status === '0' || e.status === 'Açık');
        const pendingActions = actions.filter((a: any) => a.status === 'Bekliyor');

        setStats({
          totalPlans: plans.length,
          activeExceptions: openExceptions.length,
          pendingActions: pendingActions.length
        });

      } catch (error) {
        console.error('Dashboard verisi alınamadı:', error);
      }
    }

    fetchDashboardData();
  }, [router]);

  return (
    <div className="w-full max-w-7xl mx-auto pb-12">
      <div className="mb-8">
        <h3 className="text-3xl font-bold text-on-surface mb-1">Kontrol Paneli</h3>
        <p className="text-sm text-on-surface-variant">EnterpriseOS Yönetim Sistemine Hoş Geldiniz.</p>
      </div>

      {/* ÜST SIRA: Sistem ve Mağaza Bilgileri */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        
        {/* Kart 1: Mağaza Sayısı */}
        <div className="bg-surface-container-lowest rounded-xl p-6 border border-outline-variant shadow-sm transition-transform hover:-translate-y-1">
          <div className="flex items-center gap-4">
            <div className="bg-primary/10 p-3 rounded-xl text-primary">
              <Store size={24} />
            </div>
            <div>
              <p className="text-xs font-semibold text-on-surface-variant uppercase">Kayıtlı Mağaza</p>
              <h4 className="text-2xl font-bold text-on-surface">{shopCount} Adet</h4>
            </div>
          </div>
        </div>

        {/* Kart 2: Güvenlik */}
        <div className="bg-surface-container-lowest rounded-xl p-6 border border-outline-variant shadow-sm transition-transform hover:-translate-y-1">
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

        {/* Kart 3: Veritabanı */}
        <div className="bg-surface-container-lowest rounded-xl p-6 border border-outline-variant shadow-sm transition-transform hover:-translate-y-1">
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

      {/* ALT SIRA: Planlama ve İstisna Modülü İstatistikleri */}
      <h4 className="text-base font-bold text-on-surface mb-4 mt-8">Satış Planlama ve İstisna Özetleri</h4>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        
        {/* Kart 4: Toplam Planlar */}
        <div className="bg-surface-container-lowest rounded-xl p-6 border border-outline-variant shadow-sm transition-transform hover:-translate-y-1">
          <div className="flex items-center gap-4">
            <div className="bg-blue-100 p-3 rounded-xl text-blue-600">
              <Target size={24} />
            </div>
            <div>
              <p className="text-xs font-semibold text-on-surface-variant uppercase">Mevcut Planlar</p>
              <h4 className="text-2xl font-bold text-on-surface">{stats.totalPlans} Adet</h4>
            </div>
          </div>
        </div>

        {/* Kart 5: Açık Sapmalar */}
        <div className="bg-surface-container-lowest rounded-xl p-6 border border-outline-variant shadow-sm transition-transform hover:-translate-y-1">
          <div className="flex items-center gap-4">
            <div className="bg-red-100 p-3 rounded-xl text-red-600">
              <AlertTriangle size={24} />
            </div>
            <div>
              <p className="text-xs font-semibold text-on-surface-variant uppercase">Açık Sapmalar (Alarm)</p>
              <h4 className="text-2xl font-bold text-on-surface">{stats.activeExceptions} Adet</h4>
            </div>
          </div>
        </div>

        {/* Kart 6: Bekleyen Aksiyonlar */}
        <div className="bg-surface-container-lowest rounded-xl p-6 border border-outline-variant shadow-sm transition-transform hover:-translate-y-1">
          <div className="flex items-center gap-4">
            <div className="bg-orange-100 p-3 rounded-xl text-orange-600">
              <ShieldAlert size={24} />
            </div>
            <div>
              <p className="text-xs font-semibold text-on-surface-variant uppercase">Onay Bekleyenler</p>
              <h4 className="text-2xl font-bold text-on-surface">{stats.pendingActions} Adet</h4>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
}