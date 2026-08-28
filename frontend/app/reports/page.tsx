'use client';

import { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useRouter } from 'next/navigation';
import { 
  TrendingUp, 
  Target, 
  AlertOctagon, 
  CheckCircle2, 
  BarChart3, 
  PieChart 
} from 'lucide-react';

import { getSalesPlans, getCategoriesForPlan } from '../../services/planService';
import { getPlanningExceptions, getExceptionActions } from '../../services/planexceptionService';
import { getActualSales } from '../../services/salesService'; 
import { getProducts } from '@/services/productService';
import KpiCard from '@/components/KpiCard';


export default function ReportsPage() {
  const { hasRole, user } = useAuth();
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  const [kpiData, setKpiData] = useState({
    totalTarget: 0,
    totalActual: 0,
    totalPlans: 0,
    openExceptions: 0,
    resolvedActions: 0,
    rejectedActions: 0,
    avgRealization: 0
  });
  const [categoryPerformance, setCategoryPerformance] = useState<any[]>([]);

  const isAuthorized = hasRole(['Admin', 'admin', 'Manager', 'manager']);

  useEffect(() => {
    if (user && !isAuthorized) {
      router.push('/dashboard');
    } else if (user && isAuthorized) {
      fetchRealReportData();
    }
  }, [user, isAuthorized, router]);

  const fetchRealReportData = async () => {
    try {
      // YENİ: getActualSales() servisini de Promise.all içine ekledik
      const [plansRes, excRes, actRes, catRes, actualSalesRes, productRes] = await Promise.all([
        getSalesPlans().catch(() => []),
        getPlanningExceptions().catch(() => []),
        getExceptionActions().catch(() => []),
        getCategoriesForPlan().catch(() => []),
        getActualSales().catch(() => []), 
        getProducts().catch(() => [])
      ]);

      const plans = Array.isArray(plansRes) ? plansRes : (plansRes as any).data || [];
      const exceptions = Array.isArray(excRes) ? excRes : (excRes as any).data || [];
      const actions = Array.isArray(actRes) ? actRes : (actRes as any).data || [];
      const categories = Array.isArray(catRes) ? catRes : (catRes as any).data || [];
      const actualSales = Array.isArray(actualSalesRes) ? actualSalesRes : (actualSalesRes as any).data || [];
      const products = Array.isArray(productRes) ? productRes : (productRes as any).data || [];

      // Kategori ID'lerini isimlerle eşleştirmek için Map
      const categoryNameMap: Record<number, string> = {};
      categories.forEach((c: any) => {
        categoryNameMap[c.id] = c.name || c.categoryName || `Kategori ${c.id}`;
      });

      const productCategoryMap: Record<number, number> = {};
      products.forEach((p: any) => {
        productCategoryMap[p.id] = p.categoryId;
        });

      // KPI'lar (Planlar ve Sapmalar)
      const totalTarget = plans.reduce((sum: number, plan: any) => sum + (Number(plan.targetProfit) || 0), 0);
      const openExc = exceptions.filter((e: any) => e.status === 0 || e.status === 'Yeni / Açık').length;
      const resolvedAct = actions.filter((a: any) => a.status === 'Onaylandı' || a.status === 'İşlem Tamamlandı').length;
      const rejectedAct = actions.filter((a: any) => a.status === 'Reddedildi' || a.status === 'Başarısız').length;

      const totalActual = actualSales.reduce((sum: number, sale: any) => sum + (Number(sale.profit) || 0), 0);

      // KATEGORİ BAZLI HESAPLAMA (Hedef ve Gerçekleşen)
      const categoryStats: Record<string, { target: number; actual: number }> = {};
      
      // Önce kategorilerin hedeflerini (Target) map'liyoruz
      plans.forEach((plan: any) => {
        const catName = categoryNameMap[plan.categoryId] || `Kategori ${plan.categoryId}`;
        if (!categoryStats[catName]) categoryStats[catName] = { target: 0, actual: 0 };
        categoryStats[catName].target += Number(plan.targetProfit) || 0;
      });

      // Sonra gerçekleşen satışları (Actual) ilgili kategoriye ekliyoruz
      actualSales.forEach((sale: any) => {
        const cId = sale.product?.categoryID || productCategoryMap[sale.productId];

        if (cId){
            const catName = categoryNameMap[cId] || 'Kategori ${cId}';
            if (!categoryStats[catName]) categoryStats [catName] = {target: 0, actual: 0};
            categoryStats[catName].actual += Number(sale.profit) || 0;
        }
      });

      const colors = ['bg-blue-500', 'bg-green-500', 'bg-red-500', 'bg-orange-500', 'bg-purple-500'];
      
      const formattedCatData = Object.keys(categoryStats).map((key, index) => {
        return {
          category: key,
          target: categoryStats[key].target,
          actual: categoryStats[key].actual,
          color: colors[index % colors.length]
        };
      });

      setCategoryPerformance(formattedCatData);

      const avgRealization = totalTarget > 0 ? (totalActual / totalTarget) * 100 : 0;

      setKpiData({
        totalTarget,
        totalActual,
        totalPlans: plans.length,
        openExceptions: openExc,
        resolvedActions: resolvedAct,
        rejectedActions: rejectedAct,
        avgRealization
      });

    } catch (error) {
      console.error('Rapor verileri çekilemedi:', error);
    } finally {
      setLoading(false);
    }
  };

  if (!user || loading) {
    return <div className="p-8 text-center text-on-surface-variant font-medium animate-pulse">Gerçek Veriler Yükleniyor...</div>;
  }

  if (!isAuthorized) return null;

  return (
    <div className="w-full max-w-7xl mx-auto pb-12 space-y-8">
      
      {/* BAŞLIK */}
      <div className="flex justify-between items-end">
        <div>
          <h3 className="text-2xl font-bold text-on-surface mb-1">Yönetim Raporları</h3>
          <p className="text-sm text-on-surface-variant">Sistemdeki planlar üzerinden hesaplanmış gerçek zamanlı KPI'lar.</p>
        </div>
      </div>

      {/* 1. SATIR: ÜST DÜZEY KPI KARTLARI */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
        
        
        <KpiCard
          title='Toplam Hedef'
          value={`₺${kpiData.totalTarget.toLocaleString('tr-TR')}`}
          subtitle={`${kpiData.totalPlans} Aktif Plan`}
          icon={<Target size={64} />}
        /> 

        <KpiCard
          title='Ortalama Gerçekleşme'
          value={`%${(kpiData.avgRealization || 0).toFixed(1)}`}
          subtitle={`Sistem Geneli`}
          icon={<TrendingUp size={64} />}
          iconColor='text-primary'
          valueColor='text-primary'
        />

        <KpiCard
          title='Açık Sapmalar'
          value={`${kpiData.openExceptions} Adet`}
          subtitle= "Acil Aksiyon Bekliyor"
          icon={<AlertOctagon size={64} />}
          iconColor='text-orange-500'
          valueColor='text-orange-600'
          subtitleColor='text-orange-700'
        />

        <KpiCard
          title='Onaylanan Aksiyonlar'
          value={`${kpiData.openExceptions} Adet`}
          subtitle= "Başarıyla Çözüldü"
          icon={<CheckCircle2 size={64} />}
          iconColor='text-green-500'
          valueColor='text-green-600'
          subtitleColor='text-green-600'
        />

        <KpiCard
          title='Reddedilen Aksiyonlar'
          value={`${kpiData.rejectedActions} Adet`}
          subtitle= "Reddedildi"
          icon={<span className="material-symbols-outlined" style={{ fontSize: '64px', fontWeight: 300}}>block</span>}
          iconColor='text-red-500'
          valueColor='text-red-600'
          subtitleColor='text-red-600'
        />
        
      </div>

      {/* 2. SATIR: GRAFİK VE LİSTELER */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* SOL: Kategori Performansları */}
        <div className="lg:col-span-2 bg-surface-container-lowest rounded-xl border border-outline-variant p-6 shadow-sm">
          <h4 className="text-base font-bold text-on-surface mb-6 flex items-center gap-2">
            <PieChart className="text-primary" size={20} />
            Kategori Bazlı Plan Bütçeleri
          </h4>
          
          <div className="space-y-6">
            {categoryPerformance.length === 0 ? (
              <p className="text-sm text-on-surface-variant">Henüz kategori verisi bulunmuyor.</p>
            ) : (
              categoryPerformance.map((cat, index) => {
                const percentage = cat.target > 0 ? Math.min(100, (cat.actual / cat.target) * 100) : 0;
                return (
                  <div key={index}>
                    <div className="flex justify-between items-end mb-2">
                      <span className="text-sm font-semibold text-on-surface">{cat.category}</span>
                      <div className="text-right">
                        <span className="text-sm font-bold text-on-surface">₺{cat.actual.toLocaleString('tr-TR', { maximumFractionDigits: 0 })}</span>
                        <span className="text-xs text-on-surface-variant ml-1">/ ₺{cat.target.toLocaleString('tr-TR', { maximumFractionDigits: 0 })}</span>
                      </div>
                    </div>
                    <div className="w-full bg-surface-container h-3 rounded-full overflow-hidden">
                      <div 
                        className={`h-full rounded-full transition-all duration-1000 ${cat.color}`} 
                        style={{ width: `${percentage}%` }}
                      ></div>
                    </div>
                    <div className="mt-1 flex justify-between">
                      <span className="text-xs text-on-surface-variant">Gerçekleşme: %{percentage.toFixed(1)}</span>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>

        {/* SAĞ: Aksiyon Dağılımı (Sadeleştirilmiş) */}
        <div className="lg:col-span-1 space-y-8">
          <div className="bg-surface-container-lowest rounded-xl border border-outline-variant p-6 shadow-sm">
            <h4 className="text-base font-bold text-on-surface mb-4">Sistem Özeti</h4>
            <p className="text-sm text-on-surface-variant mb-4">
              Bu ekran, veritabanınızdaki aktif planların, kural ihlallerinin (sapmaların) ve alınan aksiyonların genel görünümünü yansıtır.
            </p>
            <button onClick={() => router.push('/actions')} className="w-full bg-surface-container-low border border-outline-variant text-primary px-4 py-2 rounded-lg font-medium hover:bg-surface-container transition-colors text-sm flex items-center justify-center gap-2">
              <BarChart3 size={16} /> Tüm Aksiyonları Görüntüle
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}