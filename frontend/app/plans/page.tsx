'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { PlusCircle, Calendar } from 'lucide-react';
import { createSalesPlan, getSalesPlans, getCategoriesForPlan, getPlanningMonthsForPlan, getUsersForPlan } from '../../services/planService';
import toast from 'react-hot-toast';

export default function PlansPage() {
  const [salesPlanCode, setSalesPlanCode] = useState('');
  const [targetProfit, setTargetProfit] = useState('');
  const [categoryId, setCategoryId] = useState('');
  const [planningMonthId, setPlanningMonthId] = useState('');
  const [userId, setUserId] = useState(''); 

  const [categoriesList, setCategoriesList] = useState<any[]>([]);
  const [monthsList, setMonthsList] = useState<any[]>([]);
  const [usersList, setUsersList] = useState<any[]>([]);
  const [plansList, setPlansList] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

const {hasRole} = useAuth();
const canCreatePlan = hasRole(['admin', 'Manager', 'Planner']);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [plansRes, catRes, monthRes, userRes] = await Promise.all([
        getSalesPlans(),
        getCategoriesForPlan().catch(() => []),
        getPlanningMonthsForPlan().catch(() => []),  
        getUsersForPlan().catch(() => [])
      ]);

      const plans = Array.isArray(plansRes) ? plansRes : (plansRes as any).data || [];
      setPlansList(plans);
      setCategoriesList(Array.isArray(catRes) ? catRes : (catRes as any).data || []);
      setMonthsList(Array.isArray(monthRes) ? monthRes : (monthRes as any).data || []);
      setUsersList(Array.isArray(userRes) ? userRes : (userRes as any).data || []);

      generateSequentialCode(plans.length + 1);
    } catch (error) {
      console.error('Veriler yüklenirken hata oluştu:', error);
    }
  };

  const categoryMap: Record<number, string> = {};
  categoriesList.forEach((c: any) => {
    categoryMap[c.id] = c.name || c.categoryName || `Kategori ${c.id}`;
  });

  const userNameMap: Record<number, string> = {};
  usersList.forEach((u: any) => {
    userNameMap[u.id] = u.name || u.email || `Kullanıcı #${u.id}`;
  });

  const generateSequentialCode = (nextNumber: number) => {
    const year = new Date().getFullYear();
    const paddedNum = String(nextNumber).padStart(3, '0');
    setSalesPlanCode(`PLN-${year}-${paddedNum}`);
  };

   const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!categoryId || !planningMonthId || !userId) {
      toast.error('Lütfen Yönetici, Planlama Ayı ve Kategori seçin!');
      return;
    }

    setLoading(true);

    try {
      await createSalesPlan({
        salesPlanCode,
        targetProfit: Number(targetProfit),
        userId: Number(userId),
        categoryId: Number(categoryId),
        planningMonthId: Number(planningMonthId)
        // targetQuantity SİLİNDİ!
        // Sahte model validation nesneleri (user:{}, category:{} vs) SİLİNDİ! Artık sadece ID'ler gidiyor.
      } as any);

      toast.success('Satış planı başarıyla oluşturuldu!');
      
      setTargetProfit('');
      setCategoryId('');
      setPlanningMonthId('');
      setUserId('');
      
      fetchData();
    } catch (error: any) {
      toast.error(`Plan oluşturulamadı: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-7xl mx-auto pb-12">
      <div className="mb-6">
        <h3 className="text-2xl font-bold text-on-surface mb-1">Satış Planlama Yönetimi</h3>
        <p className="text-sm text-on-surface-variant">Kategori bazlı aylık kâr/bütçe hedefleri belirleyin.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* SOL TARAF: Plan Formu */}
        <div className="lg:col-span-1 bg-surface-container-lowest rounded-xl border border-outline-variant p-6 shadow-sm">
          <h4 className="text-base font-bold text-on-surface mb-4 flex items-center gap-2">
            <PlusCircle className="text-primary" size={20} />
            Yeni Satış Planı Oluştur
          </h4>

        {canCreatePlan ? (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-on-surface-variant uppercase tracking-wider mb-1">Plan Kodu</label>
              <input type="text" value={salesPlanCode} onChange={(e) => setSalesPlanCode(e.target.value)} required className="w-full px-3 py-2 border border-outline-variant rounded-lg bg-surface text-sm font-semibold text-primary" />
            </div>

            {/* YÖNETİCİ SEÇİMİ */}
            <div>
              <label className="block text-xs font-semibold text-on-surface-variant uppercase tracking-wider mb-1">Yönetici / Planlamacı</label>
              <select value={userId} onChange={(e) => setUserId(e.target.value)} required className="w-full px-3 py-2 border border-outline-variant rounded-lg bg-surface text-sm">
                <option value="">Yönetici Seçin</option>
                {usersList.map((u) => (
                  <option key={u.id} value={u.id}>{u.name || u.email}</option>
                ))}
              </select>
            </div>

            {/* PLANLAMA AYI SEÇİMİ */}
            <div>
              <label className="block text-xs font-semibold text-on-surface-variant uppercase tracking-wider mb-1">Planlama Ayı</label>
              <select value={planningMonthId} onChange={(e) => setPlanningMonthId(e.target.value)} required className="w-full px-3 py-2 border border-outline-variant rounded-lg bg-surface text-sm">
                <option value="">Ay Seçin</option>
                {monthsList.map((month) => (
                  // API'den gelen obje ismine göre .name veya .monthName kısmını kendi modeline göre değiştirebilirsin
                  <option key={month.id} value={month.id}>{month.name || month.monthName || `Ay #${month.id}`}</option>
                ))}
              </select>
            </div>

            {/* HEDEF MİKTAR (targetQuantity) İNPUTU SİLİNDİ */}

            <div>
              <label className="block text-xs font-semibold text-on-surface-variant uppercase tracking-wider mb-1">Hedef Kâr / Bütçe (₺)</label>
              <input type="number" step="0.01" value={targetProfit} onChange={(e) => setTargetProfit(e.target.value)} required placeholder="0.00" className="w-full px-3 py-2 border border-outline-variant rounded-lg bg-surface text-sm" />
            </div>

            {/* KATEGORİ SEÇİMİ */}
            <div>
              <label className="block text-xs font-semibold text-on-surface-variant uppercase tracking-wider mb-1">Kategori</label>
              <select value={categoryId} onChange={(e) => setCategoryId(e.target.value)} required className="w-full px-3 py-2 border border-outline-variant rounded-lg bg-surface text-sm">
                <option value="">Kategori Seçin</option>
                {categoriesList.map((cat) => (
                  <option key={cat.id} value={cat.id}>{cat.name || cat.categoryName}</option>
                ))}
              </select>
            </div>

            <button type="submit" disabled={loading} className="w-full bg-primary text-white py-2.5 rounded-lg font-medium hover:bg-primary/90 transition-colors shadow-sm disabled:opacity-50">
              {loading ? 'Oluşturuluyor...' : 'Planı Kaydet'}
            </button>
          </form>
        ) : (
          <div className="bg-red-500 border border-red-200 text-black-800 p-10 rounded-lg text-bm text-center">
              <span className="material-symbols-outlined block text-3xl mb-auto mx-auto">lock</span>
              <p>Yeni plan oluşturma yetkiniz bulunmamaktadır.</p>
            </div>
          )}
        </div>

        {/* SAĞ TARAF: Planlar Tablosu */}
        <div className="lg:col-span-2 bg-surface-container-lowest rounded-xl border border-outline-variant p-6 shadow-sm flex flex-col">
          <h4 className="text-base font-bold text-on-surface mb-4 flex items-center gap-2">
            <Calendar className="text-primary" size={20} />
            Mevcut Satış Planları
          </h4>

          <div className="overflow-x-auto flex-1">
            <table className="w-full text-left border-collapse min-w-[500px]">
              <thead>
                <tr className="border-b border-outline-variant text-xs font-semibold text-on-surface-variant uppercase">
                  <th className="py-3 px-4">Plan Kodu</th>
                  <th className="py-3 px-4">Hedef Kâr</th>
                  <th className="py-3 px-4">Kategori</th>
                  <th className="py-3 px-4">Yönetici</th>
                  <th className="py-3 px-4">Planlama Ayı</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-outline-variant text-sm">
                {plansList.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="py-6 text-center text-on-surface-variant">Henüz oluşturulmuş bir satış planı bulunmuyor.</td>
                  </tr>
                ) : (
                  plansList.map((plan) => {
                    const categoryName = categoriesList.find((c: any) => c.id === plan.categoryId)?.name || c.categoryName || `Kategori #${plan.categoryId}`;
                    const userName = usersList.find((u: any) => u.id === plan.userId)?.name || usersList.find((u: any) => u.id === plan.userId)?.email || `Yönetici #${plan.userId}`;
                    const monthName = monthsList.find((m: any) => m.id === plan.planningMonthId)?.name || monthsList.find((m: any) => m.id === plan.planningMonthId)?.monthName || `Ay #${plan.planningMonthId || '-'}`;

                    return (
                      <tr key={plan.id} className="hover:bg-surface-container-low transition-colors">
                        <td className="py-3 px-4 font-semibold text-primary">{plan.salesPlanCode}</td>
                        <td className="py-3 px-4 text-green-600 font-semibold">₺{Number(plan.targetProfit).toLocaleString('tr-TR')}</td>
                        <td className="py-3 px-4 font-medium text-on-surface">{categoryName}</td>
                        <td className="py-3 px-4 text-on-surface-variant">{userName}</td>
                        <td className="py-3 px-4 text-on-surface-variant">{monthName}</td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </div>
  );
}