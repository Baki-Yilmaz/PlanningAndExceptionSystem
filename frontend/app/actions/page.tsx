'use client';

import { useState, useEffect } from 'react';
import { AlertTriangle, RefreshCw, CheckCircle, X, ShieldCheck, Check, XCircle } from 'lucide-react';
import toast from 'react-hot-toast';
import { 
  calculateExceptions, 
  getPlanningExceptions, 
  createExceptionAction,
  getExceptionActions,
  approveAction
} from '../../services/planexceptionService';

export default function ExceptionsPage() {
  const [exceptionsList, setExceptionsList] = useState<any[]>([]);
  const [actionsList, setActionsList] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  // Modal ve Form State'leri
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedExceptionId, setSelectedExceptionId] = useState<number | null>(null);
  const [actionType, setActionType] = useState('');
  const [notes, setNotes] = useState('');
  const [submittingAction, setSubmittingAction] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [excRes, actRes] = await Promise.all([
        getPlanningExceptions(),
        getExceptionActions().catch(() => [])
      ]);
      
      setExceptionsList(Array.isArray(excRes) ? excRes : excRes.data || []);
      setActionsList(Array.isArray(actRes) ? actRes : actRes.data || []);
    } catch (error) {
      console.error('Veriler yüklenirken hata oluştu:', error);
    }
  };

  const handleCalculateExceptions = async () => {
    setLoading(true);
    try {
      await calculateExceptions();
      toast.success('Sapma hesaplamaları tamamlandı!');
      await fetchData();
    } catch (error: any) {
      toast.error(`Hesaplama başarısız: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const openActionModal = (exceptionId: number) => {
    setSelectedExceptionId(exceptionId);
    setActionType('');
    setNotes('');
    setIsModalOpen(true);
  };

  const handleActionSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedExceptionId || !actionType) {
      toast.error('Lütfen bir Aksiyon Tipi seçin!');
      return;
    }

    setSubmittingAction(true);
    try {
      await createExceptionAction({
        planningExceptionId: selectedExceptionId,
        actionType: actionType,
        createdById: 1002, 
        status: "Bekliyor" 
      } as any);

      toast.success('Aksiyon başarıyla kaydedildi!');
      setIsModalOpen(false);
      await fetchData(); 
    } catch (error: any) {
      toast.error(`Aksiyon kaydedilemedi: ${error.message}`);
    } finally {
      setSubmittingAction(false);
    }
  };

  const handleApproval = async (actionId: number, isApproved: boolean) => {
    try {
      await approveAction({
        exceptionActionId: actionId,
        approvedById: 1002, 
        approvalStatus: isApproved ? "Onaylandı" : "Reddedildi"
      });
      
      toast.success(isApproved ? 'Aksiyon onaylandı!' : 'Aksiyon reddedildi!');
      await fetchData(); 
    } catch (error: any) {
      toast.error(`Onay işlemi başarısız: ${error.message}`);
    }
  };

  return (
    <div className="w-full max-w-7xl mx-auto pb-12 relative space-y-8">
      
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-2xl font-bold text-on-surface mb-1">Sapma ve Aksiyon Yönetimi</h3>
          <p className="text-sm text-on-surface-variant">
            Gerçekleşen satışlar ile hedefleri karşılaştırıp, kural ihlallerini tespit edin.
          </p>
        </div>
        
        <button 
          onClick={handleCalculateExceptions} 
          disabled={loading}
          className="flex items-center gap-2 bg-primary text-white px-4 py-2.5 rounded-lg font-medium hover:bg-primary/90 transition-colors shadow-sm disabled:opacity-50"
        >
          <RefreshCw size={18} className={loading ? "animate-spin" : ""} />
          {loading ? 'Hesaplanıyor...' : 'Sapmaları Hesapla'}
        </button>
      </div>

      <div className="bg-surface-container-lowest rounded-xl border border-outline-variant p-6 shadow-sm flex flex-col">
        <h4 className="text-base font-bold text-on-surface mb-4 flex items-center gap-2">
          <AlertTriangle className="text-orange-500" size={20} />
          Tespit Edilen Sapmalar / Alarmlar
        </h4>

        <div className="overflow-x-auto flex-1">
          <table className="w-full text-left border-collapse min-w-[700px]">
            <thead>
              <tr className="border-b border-outline-variant text-xs font-semibold text-on-surface-variant uppercase">
                <th className="py-3 px-4">ID</th>
                <th className="py-3 px-4">Plan ID</th>
                <th className="py-3 px-4">Kural ID</th>
                <th className="py-3 px-4">Sapma (%)</th>
                <th className="py-3 px-4">Durum</th>
                <th className="py-3 px-4">Aksiyon</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-outline-variant text-sm">
              {exceptionsList.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-6 text-center text-on-surface-variant">
                    Harika! Şu an için kuralı ihlal eden bir sapma bulunmuyor.
                  </td>
                </tr>
              ) : (
                exceptionsList.map((exc) => (
                  <tr key={exc.id} className="hover:bg-surface-container-low transition-colors">
                    <td className="py-3 px-4 font-semibold text-primary">#{exc.id}</td>
                    <td className="py-3 px-4 text-on-surface">Plan #{exc.salesPlanId}</td>
                    <td className="py-3 px-4 text-on-surface-variant">Kural #{exc.exceptionRuleId}</td>
                    <td className="py-3 px-4">
                      <span className={`font-bold ${exc.actualDeviation < 0 ? 'text-red-500' : 'text-green-500'}`}>
                        %{exc.actualDeviation.toFixed(2)}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <span className="bg-orange-100 text-orange-700 px-2 py-1 rounded text-xs font-semibold">
                        {exc.status === 0 ? 'Yeni / Açık' : 
                         exc.status === 1 ? 'Beklemede' : 
                         exc.status === 2 ? 'Başarılı' : 
                         exc.status === 3 ? 'Başarısız' : exc.status}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <button 
                        onClick={() => openActionModal(exc.id)}
                        className="text-primary font-medium hover:underline text-sm flex items-center gap-1"
                      >
                        <CheckCircle size={16} /> Aksiyon Al
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      <div className="bg-surface-container-lowest rounded-xl border border-outline-variant p-6 shadow-sm flex flex-col">
        <h4 className="text-base font-bold text-on-surface mb-4 flex items-center gap-2">
          <ShieldCheck className="text-green-600" size={20} />
          Alınan Aksiyonlar ve Onay Süreci
        </h4>

        <div className="overflow-x-auto flex-1">
          <table className="w-full text-left border-collapse min-w-[700px]">
            <thead>
              <tr className="border-b border-outline-variant text-xs font-semibold text-on-surface-variant uppercase">
                <th className="py-3 px-4">Aksiyon ID</th>
                <th className="py-3 px-4">Sapma ID</th>
                <th className="py-3 px-4">Aksiyon Tipi</th>
                <th className="py-3 px-4">Talep Eden (ID)</th>
                <th className="py-3 px-4">Durum</th>
                <th className="py-3 px-4 text-right">Yönetici Onayı</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-outline-variant text-sm">
              {actionsList.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-6 text-center text-on-surface-variant">
                    Henüz alınmış bir aksiyon bulunmuyor.
                  </td>
                </tr>
              ) : (
                actionsList.map((act) => (
                  <tr key={act.id} className="hover:bg-surface-container-low transition-colors">
                    <td className="py-3 px-4 font-semibold text-primary">#{act.id}</td>
                    <td className="py-3 px-4 text-on-surface-variant">Sapma #{act.planningExceptionId}</td>
                    <td className="py-3 px-4 font-medium">{act.actionType}</td>
                    <td className="py-3 px-4 text-on-surface-variant">#{act.createdById}</td>
                    <td className="py-3 px-4">
                      <span className={`px-2 py-1 rounded text-xs font-semibold
                        ${act.status === 'Onaylandı' ? 'bg-green-100 text-green-700' : 
                          act.status === 'Reddedildi' ? 'bg-red-100 text-red-700' : 
                          'bg-yellow-100 text-yellow-700'}
                      `}>
                        {act.status}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-right">
                      {act.status === 'Bekliyor' ? (
                        <div className="flex justify-end gap-2">
                          <button 
                            onClick={() => handleApproval(act.id, true)}
                            className="flex items-center gap-1 bg-green-50 text-green-700 hover:bg-green-100 px-3 py-1.5 rounded transition-colors text-xs font-bold"
                          >
                            <Check size={14} /> Onayla
                          </button>
                          <button 
                            onClick={() => handleApproval(act.id, false)}
                            className="flex items-center gap-1 bg-red-50 text-red-700 hover:bg-red-100 px-3 py-1.5 rounded transition-colors text-xs font-bold"
                          >
                            <XCircle size={14} /> Reddet
                          </button>
                        </div>
                      ) : (
                        <span className="text-on-surface-variant text-xs italic">İşlem Tamamlandı</span>
                      )}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <div className="bg-surface-container-lowest w-full max-w-md rounded-2xl shadow-xl p-6 relative animate-in fade-in zoom-in-95 duration-200">
            
            <button 
              onClick={() => setIsModalOpen(false)}
              className="absolute top-4 right-4 text-on-surface-variant hover:text-on-surface"
            >
              <X size={20} />
            </button>

            <h3 className="text-xl font-bold text-on-surface mb-2">Aksiyon Belirle</h3>
            <p className="text-sm text-on-surface-variant mb-6">
              #{selectedExceptionId} numaralı sapma için alınacak aksiyonu seçin.
            </p>

            <form onSubmit={handleActionSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-on-surface-variant uppercase mb-1">
                  Aksiyon Tipi
                </label>
                <select 
                  value={actionType} 
                  onChange={(e) => setActionType(e.target.value)} 
                  required 
                  className="w-full px-3 py-2 border border-outline-variant rounded-lg bg-surface text-sm"
                >
                  <option value="">Seçiniz...</option>
                  <option value="Fiyat İndirimi">Fiyat İndirimi Uygula</option>
                  <option value="Stok Artırımı">Stok Artırımı İste</option>
                  <option value="Kampanya Başlat">Pazarlama Kampanyası Başlat</option>
                  <option value="Üretimi Durdur">Üretimi / Siparişi Durdur</option>
                  <option value="Yönetici Onayına Sun">Üst Yönetici Onayına Sun</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-on-surface-variant uppercase mb-1">
                  Yönetici Notu / Açıklama
                </label>
                <textarea 
                  value={notes} 
                  onChange={(e) => setNotes(e.target.value)} 
                  rows={3}
                  placeholder="Bu aksiyon neden alınıyor? Detayları yazın..."
                  className="w-full px-3 py-2 border border-outline-variant rounded-lg bg-surface text-sm resize-none"
                ></textarea>
              </div>

              <div className="flex justify-end gap-3 pt-4">
                <button 
                  type="button" 
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 text-sm font-semibold text-on-surface-variant hover:bg-surface-container-low rounded-lg transition-colors"
                >
                  İptal
                </button>
                <button 
                  type="submit" 
                  disabled={submittingAction}
                  className="px-4 py-2 text-sm font-semibold bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors shadow-sm disabled:opacity-50"
                >
                  {submittingAction ? 'Kaydediliyor...' : 'Aksiyonu Kaydet'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}