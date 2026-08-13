import { Api } from '../components/base/Api';
import { IApi } from '../types/index';
import { API_URL } from '../utils/constants';

// Создаём экземпляр Api и приводим к интерфейсу IApi
export const apiClient: IApi = new Api(API_URL);