import {apiClient} from './api';

export interface ActualSaleDto {
    shopID: number;
    planningMonthId: number;
    productId: number;
    soldQuantity: number;
    totalCost: number;
    totalAmount: number;
    profit: number;
}

export async function getActualSales(){
    return apiClient<any[]>('/ActualSales');
}

export async function createActualSale(data: ActualSaleDto) {
  return apiClient<any>('/ActualSales', {
    method: 'POST',
    body: JSON.stringify(data),
  });
}

export async function getPlanningMonths(){
    return apiClient<any[]>('/PlanningMonths');
}

export async function getProductsForSales(){
    return apiClient<any[]>('/Products');
}

export async function getShopsForSales(){
    return apiClient<any[]>('/Shops');
} 