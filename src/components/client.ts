import { Api } from '../components/base/Api';
import { IApi } from '../types/index';

const baseUrl = import.meta.env.VITE_API_ORIGIN || 'https://larek-api.nomoreparties.co';

// Создаём экземпляр Api и приводим к интерфейсу IApi
export const apiClient: IApi = new Api(baseUrl);