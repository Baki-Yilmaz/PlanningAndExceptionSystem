import {apiClient} from './api';

export interface ShopDto {
    shopCode: string;
    shopName: string;
    countryId: number;
}

export async function getShops() {
    return apiClient<ShopDto[]>('/Shops');
}

export async function createShop(data: ShopDto) {
    return apiClient<ShopDto>('/Shops', {
        method: 'POST',
        body: JSON.stringify(data),
    });
}