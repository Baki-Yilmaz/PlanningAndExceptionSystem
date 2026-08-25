import { apiClient } from './api';

export interface SalesPlanDto {
  salesPlanCode: string;
  targetQuantity: number;
  targetProfit: number;
  userId: number;
  categoryId: number;
}

export async function getSalesPlans() {
  return apiClient<any[]>('/SalesPlans');
}

export async function createSalesPlan(data: SalesPlanDto) {
  return apiClient<any>('/SalesPlans', {
    method: 'POST',
    body: JSON.stringify(data),
  });
}

export async function getCategoriesForPlan() {
  return apiClient<any[]>('/Categories');
}

export async function getPlanningMonthsForPlan() {
  return apiClient<any[]>('/PlanningMonths');
}

export async function getUsersForPlan() {
  return apiClient<any[]>('/Users');
}