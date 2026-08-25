// services/productService.ts
import { apiClient } from './api';

export interface ProductDto {
  skuCode: string;
  productName: string;
  unitPrice: number;
  costPrice: number;
  brandId: number;
  categoryId: number;
}

// Tüm ürünleri listele (GET)
export async function getProducts() {
  return apiClient<any[]>('/Products');
}

// Yeni ürün/stok kaydet (POST)
export async function createProduct(data: ProductDto) {
  return apiClient<any>('/Products', {
    method: 'POST',
    body: JSON.stringify(data),
  });
}

export async function getCategories(){
    return apiClient<any[]>('/Categories');
}

export async function getBrands(){
    return apiClient<any[]>('/Brands');
}

export async function getShopsForStock(){
    return apiClient<any[]>('/Shops');
}

export async function createInventory(data: { productId: number; categoryId: number; shopId: number; quantity: number }) {
  return apiClient<any>('/Inventories', {
    method: 'POST',
    body: JSON.stringify(data),
  });
}
