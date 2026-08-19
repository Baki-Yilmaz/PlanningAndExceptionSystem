'use client';

import { useState } from 'react';
import { PlusCircle, ShoppingCart } from 'lucide-react';

export default function SalesPage() {
  // Modelindeki alanlara uygun state'ler
  const [shopId, setShopId] = useState('1');
  const [planningWeekId, setPlanningWeekId] = useState('1');
  const [productId, setProductId] = useState('');
  const [soldQuantity, setSoldQuantity] = useState('');
  const [totalCost, setTotalCost] = useState('');
  const [totalAmount, setTotalAmount] = useState('');
  const [profit, setProfit] = useState('');
  const [loading, setLoading] = useState(false);

  // Form gönderildiğinde gerçek backend'e istek atacak fonksiyon
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const saleData = {
      shopId: Number(shopId),
      planningWeekId: Number(planningWeekId),
      productId: Number(productId),
      soldQuantity: Number(soldQuantity),
      totalCost: Number(totalCost),
      totalAmount: Number(totalAmount),
      profit: Number(profit),
      shop: {id: Number(shopId)},
      week: {id: Number(planningWeekId)},
      product: {id: Number(productId)}
    };

    try {
      // Backend'e POST isteği gönderiyoruz
      const response = await fetch('https://localhost:7016/api/ActualSales', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(saleData),
      });

      // Eğer backend hata döndürürse detayını yakalayalım
      if (!response.ok) {
        const errorText = await response.text();
        console.error("Backend Hatası:", errorText);
        alert(`Kayıt başarısız! Sunucu yanıtı: ${errorText || response.statusText}`);
        return;
      }

      alert('Satış başarıyla kaydedildi!');
      // Formu sıfırla
      setProductId('');
      setSoldQuantity('');
      setTotalCost('');
      setTotalAmount('');
      setProfit('');
    } catch (error) {
      console.error('Bağlantı hatası:', error);
      alert('Backend sunucusuna ulaşılamadı!');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="mb-8">
        <h3 className="text-3xl font-bold text-on-surface mb-1">Satış Yönetimi</h3>
        <p className="text-sm text-on-surface-variant">Yeni satış kaydı oluşturun ve mevcut satışları listeleyin.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Form Alanı */}
        <div className="lg:col-span-1 bg-surface-container-lowest rounded-xl border border-outline-variant p-6 shadow-sm">
          <h4 className="text-lg font-bold text-on-surface mb-4 flex items-center gap-2">
            <PlusCircle className="text-primary" size={22} />
            Yeni Satış Ekle
          </h4>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-on-surface-variant uppercase tracking-wider mb-1">
                Mağaza ID (ShopId)
              </label>
              <input 
                type="number" 
                value={shopId}
                onChange={(e) => setShopId(e.target.value)}
                required
                className="w-full px-3 py-2 border border-outline-variant rounded-lg bg-surface text-sm"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-on-surface-variant uppercase tracking-wider mb-1">
                Planlama Hafta ID (PlanningWeekId)
              </label>
              <input 
                type="number" 
                value={planningWeekId}
                onChange={(e) => setPlanningWeekId(e.target.value)}
                required
                className="w-full px-3 py-2 border border-outline-variant rounded-lg bg-surface text-sm"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-on-surface-variant uppercase tracking-wider mb-1">
                Ürün ID (ProductId)
              </label>
              <input 
                type="number" 
                value={productId}
                onChange={(e) => setProductId(e.target.value)}
                required
                placeholder="Örn: 1"
                className="w-full px-3 py-2 border border-outline-variant rounded-lg bg-surface text-sm"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-on-surface-variant uppercase tracking-wider mb-1">
                Satılan Miktar (SoldQuantity)
              </label>
              <input 
                type="number" 
                step="0.01"
                value={soldQuantity}
                onChange={(e) => setSoldQuantity(e.target.value)}
                required
                placeholder="0"
                className="w-full px-3 py-2 border border-outline-variant rounded-lg bg-surface text-sm"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-on-surface-variant uppercase tracking-wider mb-1">
                Toplam Maliyet (TotalCost)
              </label>
              <input 
                type="number" 
                step="0.01"
                value={totalCost}
                onChange={(e) => setTotalCost(e.target.value)}
                required
                placeholder="0.00"
                className="w-full px-3 py-2 border border-outline-variant rounded-lg bg-surface text-sm"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-on-surface-variant uppercase tracking-wider mb-1">
                Toplam Tutar (TotalAmount)
              </label>
              <input 
                type="number" 
                step="0.01"
                value={totalAmount}
                onChange={(e) => setTotalAmount(e.target.value)}
                required
                placeholder="0.00"
                className="w-full px-3 py-2 border border-outline-variant rounded-lg bg-surface text-sm"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-on-surface-variant uppercase tracking-wider mb-1">
                Kâr (Profit)
              </label>
              <input 
                type="number" 
                step="0.01"
                value={profit}
                onChange={(e) => setProfit(e.target.value)}
                required
                placeholder="0.00"
                className="w-full px-3 py-2 border border-outline-variant rounded-lg bg-surface text-sm"
              />
            </div>

            <button 
              type="submit" 
              disabled={loading}
              className="w-full bg-primary text-white py-2.5 rounded-lg font-medium hover:bg-primary/90 transition-colors shadow-sm disabled:opacity-50"
            >
              {loading ? 'Kaydediliyor...' : 'Satışı Kaydet'}
            </button>
          </form>
        </div>

        {/* Liste Alanı */}
        <div className="lg:col-span-2 bg-surface-container-lowest rounded-xl border border-outline-variant p-6 shadow-sm flex flex-col">
          <h4 className="text-lg font-bold text-on-surface mb-4 flex items-center gap-2">
            <ShoppingCart className="text-primary" size={22} />
            Mevcut Satış Kayıtları
          </h4>
          <p className="text-sm text-on-surface-variant">
            Burada backend&apos;den çekilecek olan liste yer alacak. Kayıt yaptıktan sonra veritabanını kontrol edebilirsin.
          </p>
        </div>

      </div>
    </div>
  );
}