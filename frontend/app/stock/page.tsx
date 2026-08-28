'use client';

import { useState, useEffect } from 'react';
import { PlusCircle, Package, Store } from 'lucide-react';
import { createProduct, getProducts, getCategories, getBrands, getShopsForStock, createInventory } from '@/services/productService';
import toast from 'react-hot-toast';

export default function StockPage() {
  // Panel 1: Ürün Ekleme State'leri
  const [skuCode, setSkuCode] = useState('');
  const [productName, setProductName] = useState('');
  const [unitPrice, setUnitPrice] = useState('');
  const [costPrice, setCostPrice] = useState('');
  const [brandId, setBrandId] = useState('');
  const [categoryId, setCategoryId] = useState('');
  const [productLoading, setProductLoading] = useState(false);

  // Panel 2: Stok / Envanter Ekleme State'leri
  const [selectedProductId, setSelectedProductId] = useState('');
  const [shopId, setShopId] = useState('');
  const [quantity, setQuantity] = useState('');
  const [inventoryLoading, setInventoryLoading] = useState(false);

  // Listeler
  const [brandsList, setBrandsList] = useState<any[]>([]);
  const [categoriesList, setCategoriesList] = useState<any[]>([]);
  const [shopsList, setShopsList] = useState<any[]>([]);
  const [productsList, setProductsList] = useState<any[]>([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [prodRes, brandRes, catRes, shopRes] = await Promise.all([
        getProducts(),
        getBrands().catch(() => []),
        getCategories().catch(() => []),
        getShopsForStock().catch(() => [])
      ]);

      setProductsList(Array.isArray(prodRes) ? prodRes : (prodRes as any).data || []);
      setBrandsList(Array.isArray(brandRes) ? brandRes : (brandRes as any).data || []);
      setCategoriesList(Array.isArray(catRes) ? catRes : (catRes as any).data || []);
      setShopsList(Array.isArray(shopRes) ? shopRes : (shopRes as any).data || []);
    } catch (error) {
      console.error('Veriler yüklenirken hata oluştu:', error);
    }
  };

  // 1. PANEL: Sadece Yeni Ürün Tanımlama
  const handleProductSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!brandId || !categoryId) {
      toast.error('Lütfen Marka ve Kategori seçin!');
      return;
    }

    setProductLoading(true);

    try {
      await createProduct({
        skuCode,
        productName,
        unitPrice: Number(unitPrice),
        costPrice: Number(costPrice),
        brandId: Number(brandId),
        categoryId: Number(categoryId),
      });

      toast.success('Yeni ürün başarıyla tanımlandı!');
      setSkuCode('');
      setProductName('');
      setUnitPrice('');
      setCostPrice('');
      fetchData();
    } catch (error: any) {
      toast.error(`Ürün eklenemedi: ${error.message}`);
    } finally {
      setProductLoading(false);
    }
  };

  // 2. PANEL: Mevcut Ürüne Mağaza ve Stok Adedi Ekleme
   const handleInventorySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedProductId || !shopId || !quantity) {
      toast.error('Lütfen Ürün, Mağaza ve Stok Adedi seçin/girin!');
      return;
    }

    setInventoryLoading(true);

    try {
      // 1. Seçilen ürünü ürün listesinden buluyoruz
      const selectedProd = productsList.find(p => p.id === Number(selectedProductId));

      if (!selectedProd) {
        throw new Error('Seçilen ürün listede bulunamadı!');
      }

      // 2. Ürünün kendi CategoryId'sini alarak envantere gönderiyoruz
      await createInventory({
        productId: Number(selectedProductId),
        categoryId: Number(selectedProd.categoryId), // <-- İşte eksik olan parça buydu!
        shopId: Number(shopId),
        quantity: Number(quantity),
      });

      toast.success(`${quantity} adet stok ilgili mağazaya eklendi!`);
      setSelectedProductId('');
      setShopId('');
      setQuantity('');
      fetchData();
    } catch (error: any) {
      toast.error(`Stok eklenemedi: ${error.message}`);
    } finally {
      setInventoryLoading(false);
    }
  };

  return (
    <div className="w-full max-w-7xl mx-auto h-full overflow-y-auto pr-2">
      <div className="mb-6">
        <h3 className="text-2xl font-bold text-on-surface mb-1">Stok & Ürün Yönetimi</h3>
        <p className="text-sm text-on-surface-variant">Yeni ürünler tanımlayın ve mağazalara stok girişleri yapın.</p>
      </div>

      {/* ÜST KISIM: YAN YANA İKİ PANEL */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        
        {/* PANEL 1: YENİ ÜRÜN EKLE */}
        <div className="bg-surface-container-lowest rounded-xl border border-outline-variant p-6 shadow-sm">
          <h4 className="text-base font-bold text-on-surface mb-4 flex items-center gap-2">
            <PlusCircle className="text-primary" size={20} />
            Yeni Ürün Giriş
          </h4>

          <form onSubmit={handleProductSubmit} className="space-y-3">
            <div>
              <label className="block text-xs font-semibold text-on-surface-variant uppercase tracking-wider mb-1">SKU Kodu</label>
              <input type="text" value={skuCode} onChange={(e) => setSkuCode(e.target.value)} required placeholder="Örn: SKU-1001" className="w-full px-3 py-2 border border-outline-variant rounded-lg bg-surface text-sm" />
            </div>

            <div>
              <label className="block text-xs font-semibold text-on-surface-variant uppercase tracking-wider mb-1">Ürün Adı</label>
              <input type="text" value={productName} onChange={(e) => setProductName(e.target.value)} required placeholder="Örn: Koşu Ayakkabısı" className="w-full px-3 py-2 border border-outline-variant rounded-lg bg-surface text-sm" />
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="block text-xs font-semibold text-on-surface-variant uppercase tracking-wider mb-1">Birim Fiyat (₺)</label>
                <input type="number" step="0.01" value={unitPrice} onChange={(e) => setUnitPrice(e.target.value)} required placeholder="0.00" className="w-full px-3 py-2 border border-outline-variant rounded-lg bg-surface text-sm" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-on-surface-variant uppercase tracking-wider mb-1">Maliyet (₺)</label>
                <input type="number" step="0.01" value={costPrice} onChange={(e) => setCostPrice(e.target.value)} required placeholder="0.00" className="w-full px-3 py-2 border border-outline-variant rounded-lg bg-surface text-sm" />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="block text-xs font-semibold text-on-surface-variant uppercase tracking-wider mb-1">Marka</label>
                <select value={brandId} onChange={(e) => setBrandId(e.target.value)} required className="w-full px-3 py-2 border border-outline-variant rounded-lg bg-surface text-sm">
                  <option value="">Seçin</option>
                  {brandsList.map((b) => <option key={b.id} value={b.id}>{b.name || b.brandName}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-xs font-semibold text-on-surface-variant uppercase tracking-wider mb-1">Kategori</label>
                <select value={categoryId} onChange={(e) => setCategoryId(e.target.value)} required className="w-full px-3 py-2 border border-outline-variant rounded-lg bg-surface text-sm">
                  <option value="">Seçin</option>
                  {categoriesList.map((c) => <option key={c.id} value={c.id}>{c.name || c.categoryName}</option>)}
                </select>
              </div>
            </div>

            <button type="submit" disabled={productLoading} className="w-full bg-primary text-white py-2 rounded-lg font-medium hover:bg-primary/90 transition-colors shadow-sm disabled:opacity-50 mt-2">
              {productLoading ? 'Kaydediliyor...' : 'Ürünü Kaydet'}
            </button>
          </form>
        </div>

        {/* PANEL 2: MAĞAZAYA STOK / ADET GİR */}
        <div className="bg-surface-container-lowest rounded-xl border border-outline-variant p-6 shadow-sm">
          <h4 className="text-base font-bold text-on-surface mb-4 flex items-center gap-2">
            <Store className="text-primary" size={20} />
            Stok Giriş
          </h4>

          <form onSubmit={handleInventorySubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-on-surface-variant uppercase tracking-wider mb-1">Ürün Seçin</label>
              <select value={selectedProductId} onChange={(e) => setSelectedProductId(e.target.value)} required className="w-full px-3 py-2 border border-outline-variant rounded-lg bg-surface text-sm">
                <option value="">Ürün Seçin</option>
                {productsList.map((p) => <option key={p.id} value={p.id}>{p.productName} ({p.skuCode})</option>)}
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-on-surface-variant uppercase tracking-wider mb-1">Mağaza Seçin</label>
              <select value={shopId} onChange={(e) => setShopId(e.target.value)} required className="w-full px-3 py-2 border border-outline-variant rounded-lg bg-surface text-sm">
                <option value="">Mağaza Seçin</option>
                {shopsList.map((s) => <option key={s.id} value={s.id}>{s.shopName || s.shopCode}</option>)}
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-on-surface-variant uppercase tracking-wider mb-1">Stok Adedi</label>
              <input type="number" value={quantity} onChange={(e) => setQuantity(e.target.value)} required placeholder="Örn: 100" className="w-full px-3 py-2 border border-outline-variant rounded-lg bg-surface text-sm" />
            </div>

            <div className="pt-6">
              <button type="submit" disabled={inventoryLoading} className="w-full bg-secondary text-white py-2 rounded-lg font-medium hover:bg-secondary/90 transition-colors shadow-sm disabled:opacity-50">
                {inventoryLoading ? 'Ekleniyor...' : 'Stok Gir'}
              </button>
            </div>
          </form>
        </div>

      </div>

      {/* ALT KISIM: KAYITLI ÜRÜNLER TABLOSU */}
      <div className="bg-surface-container-lowest rounded-xl border border-outline-variant p-6 shadow-sm">
        <h4 className="text-base font-bold text-on-surface mb-4 flex items-center gap-2">
          <Package className="text-primary" size={20} />
          Kayıtlı Ürünler Listesi ({productsList.length})
        </h4>

        <div className="w-full overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[600px]">
            <thead>
              <tr className="border-b border-outline-variant text-xs font-semibold text-on-surface-variant uppercase">
                <th className="py-3 px-4">SKU Kodu</th>
                <th className="py-3 px-4">Ürün Adı</th>
                <th className="py-3 px-4">Birim Fiyat</th>
                <th className="py-3 px-4">Maliyet</th>
                <th className="py-3 px-4">Marka ID</th>
                <th className="py-3 px-4">Kategori ID</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-outline-variant text-sm">
              {productsList.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-6 text-center text-on-surface-variant">Henüz kayıtlı ürün bulunmuyor.</td>
                </tr>
              ) : (
                productsList.map((prod) => (
                  <tr key={prod.id} className="hover:bg-surface-container-low transition-colors">
                    <td className="py-3 px-4 font-semibold text-primary">{prod.skuCode}</td>
                    <td className="py-3 px-4 font-medium text-on-surface">{prod.productName}</td>
                    <td className="py-3 px-4 text-on-surface">₺{prod.unitPrice}</td>
                    <td className="py-3 px-4 text-on-surface-variant">₺{prod.costPrice}</td>
                    <td className="py-3 px-4 text-on-surface-variant">{prod.brandId}</td>
                    <td className="py-3 px-4 text-on-surface-variant">{prod.categoryId}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}