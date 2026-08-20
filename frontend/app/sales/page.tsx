'use client'; // Bu sayfanın tarayıcı tarafında (Client Component) çalışacağını belirtir

import { useState, useEffect } from 'react';
import { PlusCircle, ShoppingCart } from 'lucide-react';
// Staj sorumlunun istediği gibi, tüm API işlemlerini özel servisimizden çağırıyoruz
import { createActualSale, getActualSales } from '@/services/salesService';

export default function SalesPage() {
  // --- STATE (Hafıza) TANIMLAMALARI ---
  const [shopId, setShopId] = useState('1');
  const [planningWeekId, setPlanningWeekId] = useState('1');
  const [productId, setProductId] = useState('');
  const [soldQuantity, setSoldQuantity] = useState('');
  const [totalCost, setTotalCost] = useState('');
  const [totalAmount, setTotalAmount] = useState('');
  const [profit, setProfit] = useState('');
  const [loading, setLoading] = useState(false);

  // Veritabanından çekilen satış listesini tutacağımız state
  const [salesList, setSalesList] = useState<any[]>([]);

  // --- SAYFA YÜKLENDİĞİNDE ÇALIŞACAK FONKSİYON ---
  // useEffect: Sayfa ilk açıldığında (mount olduğunda) verileri getirmek için kullanılır
  useEffect(() => {
    fetchSales();
  }, []);

  // Satışları backend'den çeken fonksiyon
 const fetchSales = async () => {
    try {
      const response: any = await getActualSales();
      
      console.log("Backend'den gelen ham veri:", response);

      if (Array.isArray(response)) {
        setSalesList(response);
      } 
      else if (response && Array.isArray(response.data)) {
        setSalesList(response.data);
      } 
      else {
        setSalesList([]);
      }

    } catch (error) {
      console.error('Satışlar yüklenirken hata oluştu:', error);
      setSalesList([]);
    }
  };

  // --- FORM GÖNDERME (KAYDETME) İŞLEMİ ---
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Servisimiz aracılığıyla backend'e kayıt atıyoruz
      await createActualSale({
        shopID: Number(shopId),
        planningWeekId: Number(planningWeekId),
        productId: Number(productId),
        soldQuantity: Number(soldQuantity),
        totalCost: Number(totalCost),
        totalAmount: Number(totalAmount),
        profit: Number(profit),
      });

      alert('Satış başarıyla kaydedildi!');
      
      // Form alanlarını sıfırlıyoruz
      setProductId('');
      setSoldQuantity('');
      setTotalCost('');
      setTotalAmount('');
      setProfit('');

      // Kayıttan hemen sonra tablonun güncel halini tekrar çekiyoruz (Listeyi yenileme)
      fetchSales();

    } catch (error: any) {
      console.error('Kayıt hatası:', error);
      alert(`Kayıt başarısız: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      {/* Sayfa Başlığı */}
      <div className="mb-8">
        <h3 className="text-3xl font-bold text-on-surface mb-1">Satış Yönetimi</h3>
        <p className="text-sm text-on-surface-variant">Yeni satış kaydı oluşturun ve mevcut satışları listeleyin.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* SOL TARAF: Yeni Satış Formu */}
        <div className="lg:col-span-1 bg-surface-container-lowest rounded-xl border border-outline-variant p-6 shadow-sm">
          <h4 className="text-lg font-bold text-on-surface mb-4 flex items-center gap-2">
            <PlusCircle className="text-primary" size={22} />
            Yeni Satış Ekle
          </h4>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-on-surface-variant uppercase tracking-wider mb-1">Mağaza ID</label>
              <input type="number" value={shopId} onChange={(e) => setShopId(e.target.value)} required className="w-full px-3 py-2 border border-outline-variant rounded-lg bg-surface text-sm" />
            </div>
            <div>
              <label className="block text-xs font-semibold text-on-surface-variant uppercase tracking-wider mb-1">Hafta ID</label>
              <input type="number" value={planningWeekId} onChange={(e) => setPlanningWeekId(e.target.value)} required className="w-full px-3 py-2 border border-outline-variant rounded-lg bg-surface text-sm" />
            </div>
            <div>
              <label className="block text-xs font-semibold text-on-surface-variant uppercase tracking-wider mb-1">Ürün ID</label>
              <input type="number" value={productId} onChange={(e) => setProductId(e.target.value)} required placeholder="Örn: 1" className="w-full px-3 py-2 border border-outline-variant rounded-lg bg-surface text-sm" />
            </div>
            <div>
              <label className="block text-xs font-semibold text-on-surface-variant uppercase tracking-wider mb-1">Miktar</label>
              <input type="number" step="0.01" value={soldQuantity} onChange={(e) => setSoldQuantity(e.target.value)} required placeholder="0" className="w-full px-3 py-2 border border-outline-variant rounded-lg bg-surface text-sm" />
            </div>
            <div>
              <label className="block text-xs font-semibold text-on-surface-variant uppercase tracking-wider mb-1">Maliyet</label>
              <input type="number" step="0.01" value={totalCost} onChange={(e) => setTotalCost(e.target.value)} required placeholder="0.00" className="w-full px-3 py-2 border border-outline-variant rounded-lg bg-surface text-sm" />
            </div>
            <div>
              <label className="block text-xs font-semibold text-on-surface-variant uppercase tracking-wider mb-1">Tutar</label>
              <input type="number" step="0.01" value={totalAmount} onChange={(e) => setTotalAmount(e.target.value)} required placeholder="0.00" className="w-full px-3 py-2 border border-outline-variant rounded-lg bg-surface text-sm" />
            </div>
            <div>
              <label className="block text-xs font-semibold text-on-surface-variant uppercase tracking-wider mb-1">Kâr</label>
              <input type="number" step="0.01" value={profit} onChange={(e) => setProfit(e.target.value)} required placeholder="0.00" className="w-full px-3 py-2 border border-outline-variant rounded-lg bg-surface text-sm" />
            </div>

            <button type="submit" disabled={loading} className="w-full bg-primary text-white py-2.5 rounded-lg font-medium hover:bg-primary/90 transition-colors shadow-sm disabled:opacity-50">
              {loading ? 'Kaydediliyor...' : 'Satışı Kaydet'}
            </button>
          </form>
        </div>

        {/* SAĞ TARAF: Dinamik Satış Tablosu */}
        <div className="lg:col-span-2 bg-surface-container-lowest rounded-xl border border-outline-variant p-6 shadow-sm flex flex-col">
          <h4 className="text-lg font-bold text-on-surface mb-4 flex items-center gap-2">
            <ShoppingCart className="text-primary" size={22} />
            Mevcut Satış Kayıtları ({salesList.length})
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
                    <td colSpan={6} className="py-6 text-center text-on-surface-variant">
                      Henüz kayıtlı satış bulunmuyor. Sol taraftan ekleme yapabilirsin!
                    </td>
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