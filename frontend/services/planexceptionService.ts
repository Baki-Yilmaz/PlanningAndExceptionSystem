import { apiClient } from './api';

// 1. Sapmaları Hesapla (Yazdığımız SP'yi tetikler)
export async function calculateExceptions() {
  return apiClient<any>('/PlanningExceptions/calculate', {
    method: 'POST'
  });
}

export async function getExceptionRules() {
  return apiClient<any[]>('/ExceptionRule');
}

// 2. Oluşan Sapmaları (Alarmları) Listele
export async function getPlanningExceptions() {
  return apiClient<any[]>('/PlanningExceptions');
}

// Aksiyon Kaydet (ExceptionAction tablosuna)
export async function createExceptionAction(data: {
  planningExceptionId: number;
  actionType: string;
  notes?: string; 
  // status vb. alanlar C# modeline göre eklenebilir
}) {
  return apiClient<any>('/ExceptionActions', {
    method: 'POST',
    body: JSON.stringify(data),
  });
}

// Alınan Aksiyonları (Onay bekleyen veya onaylananları) Listele
export async function getExceptionActions() {
  return apiClient<any[]>('/ExceptionActions');
}

// Aksiyonu Onayla veya Reddet (ActionApprovals tablosuna kaydet)
export async function approveAction(data: {
  exceptionActionId: number;
  approvedById: number;
  approvalStatus: string; // "Onaylandı" veya "Reddedildi"
}) {
  return apiClient<any>('/ActionApprovals', {
    method: 'POST',
    body: JSON.stringify(data),
  });
}