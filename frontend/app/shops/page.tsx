'use client';

import { useState, useEffect } from 'react';
import { PlusCircle, Store } from 'lucide-react';
import { createShop, getShops, getCountries } from '@/services/shopService';
import toast from 'react-hot-toast';

export default function ShopsPage() {
  const [shopCode, setShopCode] = useState('');
  const [shopName, setShopName] = useState('');
  const [countryId, setCountryId] = useState('');
  
  const [countriesList, setCountriesList] = useState<any[]>([]);
  const [shopsList, setShopsList] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [shopRes, countryRes] = await Promise.all([
        getShops(),
        getCountries().catch(() => [])
      ]);

      setShopsList(Array.isArray(shopRes) ? shopRes : shopRes.data || []);
      setCountriesList(Array.isArray(countryRes) ? countryRes : countryRes.data || []);
    } catch (error) {
      console.error('Veriler yüklenirken hata oluştu:', error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!countryId) {
      toast.error('Lütfen bir Ülke seçin!');
      return;
    }

    setLoading(true);

    try {
      await createShop({
        shopCode,
        shopName,
        countryId: Number(countryId),
      });

      toast.success('Mağaza başarıyla eklendi!');
      setShopCode('');
      setShopName('');
      setCountryId('');
      fetchData();
    } catch (error: any) {
      toast.error(`Hata: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="mb-8">
        <h3 className="text-3xl font-bold text-on-surface mb-1">Mağaza Yönetimi</h3>
        <p className="text-sm text-on-surface-variant">Sisteme yeni mağazalar tanımlayın ve mevcut mağazaları listeleyin.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* SOL TARAF: Mağaza Ekleme Formu */}
        <div className="lg:col-span-1 bg-surface-container-lowest rounded-xl border border-outline-variant p-6 shadow-sm">
          <h4 className="text-lg font-bold text-on-surface mb-4 flex items-center gap-2">
            <PlusCircle className="text-primary" size={22} />
            Yeni Mağaza Ekle
          </h4>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-on-surface-variant uppercase tracking-wider mb-1">Mağaza Kodu</label>
              <input type="text" value={shopCode} onChange={(e) => setShopCode(e.target.value)} required placeholder="Örn: IST-01" className="w-full px-3 py-2 border border-outline-variant rounded-lg bg-surface text-sm" />
            </div>

            <div>
              <label className="block text-xs font-semibold text-on-surface-variant uppercase tracking-wider mb-1">Mağaza Adı</label>
              <input type="text" value={shopName} onChange={(e) => setShopName(e.target.value)} required placeholder="Örn: Kadıköy Şube" className="w-full px-3 py-2 border border-outline-variant rounded-lg bg-surface text-sm" />
            </div>

            <div>
              <label className="block text-xs font-semibold text-on-surface-variant uppercase tracking-wider mb-1">Ülke</label>
              <select 
                value={countryId} 
                onChange={(e) => setCountryId(e.target.value)} 
                required 
                className="w-full px-3 py-2 border border-outline-variant rounded-lg bg-surface text-sm"
              >
                <option value="">Ülke Seçin</option>
                {countriesList.map((country) => (
                  <option key={country.id} value={country.id}>
                    {country.countryName || country.name}
                  </option>
                ))}
              </select>
            </div>

            <button type="submit" disabled={loading} className="w-full bg-primary text-white py-2.5 rounded-lg font-medium hover:bg-primary/90 transition-colors shadow-sm disabled:opacity-50">
              {loading ? 'Kaydediliyor...' : 'Mağazayı Kaydet'}
            </button>
          </form>
        </div>

        {/* SAĞ TARAF: Mağazalar Tablosu */}
        <div className="lg:col-span-2 bg-surface-container-lowest rounded-xl border border-outline-variant p-6 shadow-sm flex flex-col">
          <h4 className="text-lg font-bold text-on-surface mb-4 flex items-center gap-2">
            <Store className="text-primary" size={22} />
            Kayıtlı Mağazalar
          </h4>

          <div className="overflow-x-auto flex-1">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-outline-variant text-xs font-semibold text-on-surface-variant uppercase">
                  <th className="py-3 px-4">ID</th>
                  <th className="py-3 px-4">Mağaza Kodu</th>
                  <th className="py-3 px-4">Mağaza Adı</th>
                  <th className="py-3 px-4">Ülke ID</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-outline-variant text-sm">
                {shopsList.length === 0 ? (
                  <tr>
                    <td colSpan={4} className="py-6 text-center text-on-surface-variant">Henüz kayıtlı mağaza bulunmuyor.</td>
                  </tr>
                ) : (
                  shopsList.map((shop) => (
                    <tr key={shop.id} className="hover:bg-surface-container-low transition-colors">
                      <td className="py-3 px-4 font-medium text-on-surface">#{shop.id}</td>
                      <td className="py-3 px-4 font-semibold text-primary">{shop.shopCode}</td>
                      <td className="py-3 px-4 text-on-surface">{shop.shopName}</td>
                      <td className="py-3 px-4 text-on-surface-variant">{shop.countryId}</td>
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