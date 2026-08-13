import { IApi } from '../types/index';
import {
  IProductsResponse,
  IOrderRequest,
  IOrderResponse,
} from '../types/index';

/* Класс слоя коммуникации. Через композицию использует объект,
соответствующий интерфейсу IApi, и делегирует ему запросы к серверу. */
export class ApiService {
    private readonly api: IApi;

    constructor(api: IApi) {
        this.api = api;
    }

    /* Получает с сервера объект с массивом товаров каталога. */
    getProducts(): Promise<IProductsResponse> {
        return this.api.get<IProductsResponse>('/product/');
    }

    /* Отправляет на сервер заказ и возвращает подтверждение покупки. */
    createOrder(order: IOrderRequest): Promise<IOrderResponse> {
        return this.api.post<IOrderResponse>('/order/', order);
    }
}
