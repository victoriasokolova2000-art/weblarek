import { IApi } from '../types/index';
import {
  IProductsResponse,
  IOrderRequest,
  IOrderResponse,
} from '../types/index';

export class ApiService {
  constructor(private readonly api: IApi) {}

  async getProducts(): Promise<IProductsResponse> {
    // Делегируем реальный запрос классу Api
    return await this.api.get<IProductsResponse>('/product/');
  }

  async sendOrder(orderData: IOrderRequest): Promise<IOrderResponse> {
    return await this.api.post<IOrderResponse>('/order/', orderData, 'POST');
  }
}
