'use client';

import { useState, useEffect } from 'react';
import { PlusCircle, ShoppingCart } from 'lucide-react';
import { createActualSale, getActualSales, getPlanningMonths, getProductsForSales, getShopsForSales } from '@/services/salesService';
import toast from 'react-hot-toast';

export default function SalesPage() {
  const [shopId, setShopId] = useState('');
  const [planningMonthId, setPlanningMonthId] = useState('');
  const [productId, setProductId] = useState('');
  const [soldQuantity, setSoldQuantity] = useState('');
  
  // Otomatik hesaplanan alanlar (Salt okunur / Readonly)
  const [totalCost, setTotalCost] = useState('');
  const [totalAmount, setTotalAmount] = useState('');
  const [profit, setProfit] = useState('');
  
  const [shopsList, setShopsList] = useState<any[]>([]);
  const [monthsList, setMonthsList] = useState<any[]>([]);
  const [productsList, setProductsList] = useState<any[]>([]);
  const [salesList, setSalesList] = useState<any[]>([]);
  
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [salesRes, shopRes, monthRes, prodRes] = await Promise.all([
        getActualSales(),
        getShopsForSales().catch(() => []),
        getPlanningMonths().catch(() => []),
        getProductsForSales().catch(() => [])
      ]);

      setSalesList(Array.isArray(salesRes) ? salesRes : (salesRes as any).data || []);
      setShopsList(Array.isArray(shopRes) ? shopRes : (shopRes as any).data || []);
      setMonthsList(Array.isArray(monthRes) ? monthRes : (monthRes as any).data || []);
      setProductsList(Array.isArray(prodRes) ? prodRes : (prodRes as any).data || []);
    } catch (error) {
      console.error('Veriler yüklenirken hata oluştu:', error);
    }
  };

  // Ürün veya Miktar değiştiğinde Maliyet, Tutar ve Kâr'ı anında hesapla
  const handleProductOrQuantityChange = (selectedProductId: string, quantity: string) => {
    setProductId(selectedProductId);
    setSoldQuantity(quantity);

    if (!selectedProductId || !quantity || Number(quantity) <= 0) {
      setTotalCost('');
      setTotalAmount('');
      setProfit('');
      return;
    }

    const product = productsList.find((p) => p.id === Number(selectedProductId));
    if (product) {
      const qty = Number(quantity);
      const calculatedCost = qty * (product.costPrice || 0);
      const calculatedAmount = qty * (product.unitPrice || 0);
      const calculatedProfit = calculatedAmount - calculatedCost;

      setTotalCost(calculatedCost.toFixed(2));
      setTotalAmount(calculatedAmount.toFixed(2));
      setProfit(calculatedProfit.toFixed(2));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!shopId || !planningMonthId || !productId) {
      toast.error('Lütfen Mağaza, Planlama Ayı ve Ürün seçin!');
      return;
    }

    setLoading(true);

    try {
      await createActualSale({
        shopID: Number(shopId),
        planningMonthId: Number(planningMonthId),
        productId: Number(productId),
        soldQuantity: Number(soldQuantity),
        totalCost: Number(totalCost),
        totalAmount: Number(totalAmount),
        profit: Number(profit),
      });

      toast.success('Satış başarıyla kaydedildi!');
      
      setProductId('');
      setSoldQuantity('');
      setTotalCost('');
      setTotalAmount('');
      setProfit('');
      
      fetchData();
    } catch (error: any) {
      toast.error(`Kayıt başarısız: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="mb-8">
        <h3 className="text-3xl font-bold text-on-surface mb-1">Satış Yönetimi</h3>
        <p className="text-sm text-on-surface-variant">Gerçekleşen satış kayıtlarını oluşturun ve mevcut satışları inceleyin.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* SOL TARAF: Form */}
        <div className="lg:col-span-1 bg-surface-container-lowest rounded-xl border border-outline-variant p-6 shadow-sm">
          <h4 className="text-lg font-bold text-on-surface mb-4 flex items-center gap-2">
            <PlusCircle className="text-primary" size={22} />
            Yeni Satış Ekle
          </h4>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-on-surface-variant uppercase tracking-wider mb-1">Mağaza</label>
              <select value={shopId} onChange={(e) => setShopId(e.target.value)} required className="w-full px-3 py-2 border border-outline-variant rounded-lg bg-surface text-sm">
                <option value="">Mağaza Seçin</option>
                {shopsList.map((shop) => (
                  <option key={shop.id} value={shop.id}>{shop.shopName || shop.shopCode}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-on-surface-variant uppercase tracking-wider mb-1">Planlama Ayı</label>
              <select value={planningMonthId} onChange={(e) => setPlanningMonthId(e.target.value)} required className="w-full px-3 py-2 border border-outline-variant rounded-lg bg-surface text-sm">
                <option value="">Ay Seçin</option>
                {monthsList.map((month) => (
                  <option key={month.id} value={month.id}>
                    {month.monthName || `Ay #${month.id}`}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-on-surface-variant uppercase tracking-wider mb-1">Ürün</label>
              <select 
                value={productId} 
                onChange={(e) => handleProductOrQuantityChange(e.target.value, soldQuantity)} 
                required 
                className="w-full px-3 py-2 border border-outline-variant rounded-lg bg-surface text-sm"
              >
                <option value="">Ürün Seçin</option>
                {productsList.map((prod) => (
                  <option key={prod.id} value={prod.id}>{prod.productName}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-on-surface-variant uppercase tracking-wider mb-1">Satılan Miktar</label>
              <input 
                type="number" 
                step="1" 
                value={soldQuantity} 
                onChange={(e) => handleProductOrQuantityChange(productId, e.target.value)} 
                required 
                placeholder="Örn: 10" 
                className="w-full px-3 py-2 border border-outline-variant rounded-lg bg-surface text-sm" 
              />
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="block text-xs font-semibold text-on-surface-variant uppercase tracking-wider mb-1">Toplam Maliyet (₺)</label>
                <input type="text" value={totalCost} readOnly placeholder="0.00" className="w-full px-3 py-2 border border-outline-variant rounded-lg bg-slate-100 text-sm text-slate-500 cursor-not-allowed" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-on-surface-variant uppercase tracking-wider mb-1">Toplam Tutar (₺)</label>
                <input type="text" value={totalAmount} readOnly placeholder="0.00" className="w-full px-3 py-2 border border-outline-variant rounded-lg bg-slate-100 text-sm text-slate-500 cursor-not-allowed" />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-on-surface-variant uppercase tracking-wider mb-1">Net Kâr (₺)</label>
              <input type="text" value={profit} readOnly placeholder="0.00" className="w-full px-3 py-2 border border-outline-variant rounded-lg bg-slate-100 text-sm font-semibold text-green-600 cursor-not-allowed" />
            </div>

            <button type="submit" disabled={loading} className="w-full bg-primary text-white py-2.5 rounded-lg font-medium hover:bg-primary/90 transition-colors shadow-sm disabled:opacity-50">
              {loading ? 'Kaydediliyor...' : 'Satışı Kaydet'}
            </button>
          </form>
        </div>

        {/* SAĞ TARAF: Tablo */}
        <div className="lg:col-span-2 bg-surface-container-lowest rounded-xl border border-outline-variant p-6 shadow-sm flex flex-col">
          <h4 className="text-lg font-bold text-on-surface mb-4 flex items-center gap-2">
            <ShoppingCart className="text-primary" size={22} />
            Mevcut Satış Kayıtları
          </h4>

          <div className="overflow-x-auto flex-1">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-outline-variant text-xs font-semibold text-on-surface-variant uppercase">
                  <th className="py-3 px-4">ID</th>
                  <th className="py-3 px-4">Mağaza ID</th>
                  <th className="py-3 px-4">Ürün ID</th>
                  <th className="py-3 px-4">Miktar</th>
                  <th className="py-3 px-4">Tutar</th>
                  <th className="py-3 px-4">Kâr</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-outline-variant text-sm">
                {salesList.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="py-6 text-center text-on-surface-variant">Henüz kayıtlı satış bulunmuyor.</td>
                  </tr>
                ) : (
                  salesList.map((sale) => (
                    <tr key={sale.id} className="hover:bg-surface-container-low transition-colors">
                      <td className="py-3 px-4 font-medium text-on-surface">#{sale.id}</td>
                      <td className="py-3 px-4 text-on-surface-variant">{sale.shopId}</td>
                      <td className="py-3 px-4 text-on-surface-variant">{sale.productId}</td>
                      <td className="py-3 px-4 text-on-surface-variant">{sale.soldQuantity}</td>
                      <td className="py-3 px-4 text-on-surface font-semibold">₺{sale.totalAmount}</td>
                      <td className="py-3 px-4 text-green-600 font-semibold">₺{sale.profit}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </div>
  );
}