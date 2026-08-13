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
    payment: TPayment | ''; 
    email: string; 
    phone: string; 
    address: string; 
}

export type TBuyerErrors = Partial<Record<keyof IBuyer, string>>;

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
    total: number;
}

export interface IOrderRequest extends IBuyer {
    payment: TPayment;
    total: number;
    items: string[];
}

export interface IOrderResponse {
    id: string;
    total: number;
}