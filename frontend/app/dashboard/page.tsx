'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import {  Store, Target, AlertTriangle, ShieldAlert, } from 'lucide-react';

import { getShops } from '@/services/shopService'; 
import { getSalesPlans, getCategoriesForPlan } from '@/services/planService';
import { getActualSales } from '@/services/salesService';
import { getProducts } from '@/services/productService';
import { getPlanningExceptions, getExceptionActions } from '@/services/planexceptionService';

import DashboardCard from '../../components/DashboardCard';

export default function Home() {
  const router = useRouter();
  
  const [shopCount, setShopCount] = useState(0);
  const [stats, setStats] = useState({
    totalPlans: 0,
    activeExceptions: 0,
    pendingActions: 0
  });
  const [categoryChartData, setCategoryChartData] = useState<any[]>([]);

  useEffect(() => {
    const auth = localStorage.getItem('auth_credentials') || localStorage.getItem('auth');
    if (!auth) {
      router.push('/login');
      return;
    }

    async function fetchDashboardData() {
      try {
        const [shopsRes, plansRes, excRes, actionsRes, catRes, salesRes, prodRes] = await Promise.all([
          getShops().catch(() => []),
          getSalesPlans().catch(() => []),
          getPlanningExceptions().catch(() => []),
          getExceptionActions().catch(() => []),
          getCategoriesForPlan().catch(() => []),
          getActualSales().catch(() => []),
          getProducts().catch(() => [])
        ]);

        const shops = Array.isArray(shopsRes) ? shopsRes : (shopsRes as any).data || [];
        setShopCount(shops.length);

        const plans = Array.isArray(plansRes) ? plansRes : (plansRes as any).data || [];
        const exceptions = Array.isArray(excRes) ? excRes : (excRes as any).data || [];
        const actions = Array.isArray(actionsRes) ? actionsRes : (actionsRes as any).data || [];
        const categories = Array.isArray(catRes) ? catRes : (catRes as any).data || [];
        const actualSales = Array.isArray(salesRes) ? salesRes : (salesRes as any).data || [];
        const products = Array.isArray(prodRes) ? prodRes : (prodRes as any).data || [];

        const categoryNameMap: Record<number, string> = {};
        categories.forEach((c: any) => {
          categoryNameMap[c.id] = c.name || c.categoryName || `Kategori ${c.id}`;
        });

        const productCategoryMap: Record<number, number> = {};
        products.forEach((p: any) => {
          productCategoryMap[p.id] = p.categoryId;
        });

        const catStats: Record<string, {target: number; actual: number}> = {};

        plans.forEach((plan: any) => {
          const catName = categoryNameMap[plan.categoryId] || `Kategori $[plan.categoryId]`;
          if (!catStats[catName]) catStats[catName] = {target:0, actual:0};
          catStats[catName].target += Number(plan.targetProfit) || 0;
        });

        actualSales.forEach((sale: any) => {
          const cId = sale.product?.categoryId || productCategoryMap[sale.productId];
          if (cId) {
            const catName = categoryNameMap[cId] || `Kategori ${cId}`;
            if (!catStats[catName]) catStats[catName] = { target: 0, actual: 0 };
            catStats[catName].actual += Number(sale.profit) || 0;
          }
        });

        const chartArray = Object.keys(catStats).map(key => ({
          category: key,
          target: catStats[key].target,
          actual: catStats[key].actual
        }));

        setCategoryChartData(chartArray);

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
      <div className="w-full max-w-7xl mx-auto h-[calc(100vh-100px)] flex flex-col overflow-hidden">

      <div className="grid grid-cols-1 md:grid-cols-4 gap-3 mb-6">
        
        <DashboardCard 
          title="Kayıtlı Mağaza"
          value={shopCount}
          icon={<Store size={24} />}
        />

        <DashboardCard
          title="Mevcut Planlar"
          value={stats.totalPlans}
          icon={<Target size={24} />}
          iconColor='text-blue-600'
        />

        <DashboardCard
          title="Açık Sapmalar"
          value={stats.activeExceptions}
          icon={<AlertTriangle size={24} />}
          iconColor='text-red-600'
        />

        <DashboardCard
          title="Onay Bekleyenler"
          value={stats.pendingActions}
          icon={<ShieldAlert size={24} />}
          iconColor='text-orange-300'
        />

      
      <div className="bg-surface-container-lowest rounded-xl border border-outline-variant p-6 shadow-sm mt-8">
        <h4 className="text-base font-bold text-on-surface mb-1">Kategori Bazlı Satış Performansı</h4>
        <p className="text-xs text-on-surface-variant mb-6">Kategorilerin hedef bütçeye göre gerçekleşme oranları.</p>

        {categoryChartData.length === 0 ? (
          <p className="text-sm text-on-surface-variant text-center py-6">Gösterilecek grafik verisi bulunmuyor.</p>
        ) : (
          <div className="space-y-6">
            {categoryChartData.map((item, index) => {
              const percentage = item.target > 0 ? Math.min(100, (item.actual / item.target) * 100) : 0;
              
              const colors = ['bg-blue-500', 'bg-green-500', 'bg-indigo-500', 'bg-orange-500', 'bg-purple-500'];
              const barColor = colors[index % colors.length];

              return (
                <div key={index}>
                  <div className="flex justify-between items-end mb-2">
                    <span className="text-sm font-semibold text-on-surface">{item.category}</span>
                    <div className="text-right">
                      <span className="text-sm font-bold text-on-surface">
                        ₺{item.actual.toLocaleString('tr-TR', { maximumFractionDigits: 0 })}
                      </span>
                      <span className="text-xs text-on-surface-variant ml-1">
                        / ₺{item.target.toLocaleString('tr-TR', { maximumFractionDigits: 0 })}
                      </span>
                    </div>
                  </div>

                  <div className="w-full bg-surface-container h-3 rounded-full overflow-hidden">
                    <div 
                      className={`h-full rounded-full transition-all duration-1000 ${barColor}`} 
                      style={{ width: `${percentage}%` }}
                    ></div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
      </div>
    </div>
  );
}