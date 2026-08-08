export type ApiPostMethods = 'POST' | 'PUT' | 'DELETE';

export interface IApi {
    get<T extends object>(uri: string): Promise<T>;
    post<T extends object>(uri: string, data: object, method?: ApiPostMethods): Promise<T>;
}

export interface IProduct { 
    id: string;
    title: string;
    image: string;
    category: string;
    price: number | null;
    description: string;
}

export interface CartItem extends IProduct {
    quantity: number;
}

type TPayment = 'card' | 'cash';

export interface IBuyer { 
    payment: TPayment; 
    email: string; 
    phone: string; 
    address: string; 
}

export interface ValidationResult {
  isValid: boolean;
  errors: {
    payment?: string;
    address?: string;
    email?: string;
    phone?: string;
  };
}

export interface IProductsResponse {
    items: IProduct[];
    total?: number;
    page?: number;
}

export interface IOrderRequest {
  items: Array<{
    id: string;
    quantity: number;
    price: number;
  }>;
  buyer: IBuyer;
}

export interface IOrderResponse {
  orderId: string;
  status: 'confirmed' | 'pending' | 'failed';
  totalAmount: number;
  message?: string;
}