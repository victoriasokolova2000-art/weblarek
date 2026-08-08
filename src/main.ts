import './scss/styles.scss';

import { apiProducts } from './utils/data';
import { CatalogModel } from './components/Models/CatalogModel';
import { CartModel } from './components/Models/CartModal';
import { BuyerModel } from './components/Models/BuyerModel';
import { ApiService } from './components/ApiService';
import { apiClient } from './components/client';
import { IProductsResponse } from './types/index';

console.log('=== Проверка CatalogModel (на локальных данных)===');

const catalog = new CatalogModel();
//проверка состояния
console.log('catalog.getProducts():', catalog.getProducts());
//сохраняем массив товаров из apiProducts
catalog.saveProducts(apiProducts.items);
//проверка сохранения массива
const allProducts = catalog.getProducts();
console.log('Все товары:', allProducts.length, 'шт.', allProducts);
//поиск по ID
const productById = catalog.getProductById("c101ab44-ed99-4a54-990d-47aa2bb4e7d9");
console.log('[getProductById("2")] Результат:', productById);
//проверка сохранения и получения выбранного товара
if (productById) {
    catalog.saveSelectedProduct(productById);
}

const selected = catalog.getSelectedProduct();
console.log('Выбранный товар:', selected?.title);


console.log('\n=== Проверка CartModel ===');

const cart = new CartModel();
//добавляем товары в корзину
if (allProducts[0]) {
  cart.addItem({ ...allProducts[0], quantity: 2 });
}
if (allProducts[2]) {
  cart.addItem({ ...allProducts[1], quantity: 1 });
}

console.log('Товары в корзине:', cart.getItems());
//общая сумма покупки
console.log('[getTotalAmount] Общая сумма в корзине:', cart.getTotalAmount());
//очищаем корзину
cart.clear();
console.log('Корзина после clear():', cart.getItems());

console.log('\n=== Проверка BuyerModel ===');

const buyer = new BuyerModel();
console.log('Полные данные покупателя:', buyer.getData());

const validationResult = buyer.validate();
console.log('Результат валидации: ', validationResult);

buyer.clearData();
const validationAfterClear = buyer.validate();
console.log('Валидация после clearData():', validationAfterClear);

console.log('\n=== Загрузка католога с сервера (API) ===');

const apiService = new ApiService(apiClient);

async function loadProductsFromApi() {
  console.log('Запрос товаров с сервера (/product/)...');
  let productsResponse: IProductsResponse;
  try {
    productsResponse = await apiService.getProducts();
  } catch (e) {
    console.error('Не удалось получить товары с сервера:', e);
    return;
  }
  console.log('Ответ сервера (/product/):', productsResponse);

  const items = productsResponse.items;

  if(!Array.isArray(items)) {
    console.error('Ошибка структуры ответа: поле items не является массивом');
    return;
  }

  catalog.saveProducts(items);

  console.log('Сохранено товаров в CatalogModel из API:', catalog.getProducts().length);
  console.log('Каталог после загрузки с API:', catalog.getProducts());

  const firstProduct = catalog.getProducts()[0];
  if (firstProduct) {
    const found = catalog.getProductById(firstProduct.id);
    console.log('Проверка поиска по ID (реальные данные):', found?.title);
  } else {
    console.warn('В каталоге нет товаров после загрузки с сервера');
  }
}

loadProductsFromApi().catch(err => {
  console.error('Критическая ошибка при загрузке каталога:', err);
});