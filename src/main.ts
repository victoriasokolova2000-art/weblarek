import './scss/styles.scss';

import { apiProducts } from './utils/data';
import { CatalogModel } from './components/Models/CatalogModel';
import { CartModel } from './components/Models/CartModel';
import { BuyerModel } from './components/Models/BuyerModel';
import { ApiService } from './components/ApiService';
import { apiClient } from './components/client';

/* ============ Проверка CatalogModel (на локальных данных) ============ */
console.log('=== CatalogModel ===');

const catalog = new CatalogModel();

console.log('Каталог до сохранения:', catalog.getProducts());

catalog.saveProducts(apiProducts.items);
console.log('Массив товаров из каталога:', catalog.getProducts());

const productById = catalog.getProductById('c101ab44-ed99-4a54-990d-47aa2bb4e7d9');
console.log('Товар по id "c101ab44-...":', productById);
console.log('Товар по несуществующему id:', catalog.getProductById('no-such-id'));

console.log('Выбранный товар до сохранения:', catalog.getSelectedProduct());
if (productById) {
    catalog.saveSelectedProduct(productById);
}
console.log('Выбранный товар после сохранения:', catalog.getSelectedProduct());

/* ============ Проверка CartModel ============ */
console.log('=== CartModel ===');

const cart = new CartModel();
const [first, second, third] = catalog.getProducts();

console.log('Корзина до добавления товаров:', cart.getItems());
console.log('Количество товаров до добавления:', cart.getItemsCount());
console.log('Стоимость товаров до добавления:', cart.getTotalPrice());

cart.addItem(first);
cart.addItem(second);
cart.addItem(third); // товар с price: null — не должен влиять на сумму
console.log('Товары в корзине:', cart.getItems());
console.log('Количество товаров в корзине:', cart.getItemsCount());
console.log('Стоимость товаров в корзине:', cart.getTotalPrice());

console.log(`Товар "${first.title}" есть в корзине:`, cart.hasItem(first.id));
console.log('Товар с id "no-such-id" есть в корзине:', cart.hasItem('no-such-id'));

cart.removeItem(second);
console.log(`Корзина после удаления "${second.title}":`, cart.getItems());
console.log('Количество товаров после удаления:', cart.getItemsCount());
console.log('Стоимость товаров после удаления:', cart.getTotalPrice());

cart.clear();
console.log('Корзина после очистки:', cart.getItems());
console.log('Количество товаров после очистки:', cart.getItemsCount());

/* ============ Проверка BuyerModel ============ */
console.log('=== BuyerModel ===');

const buyer = new BuyerModel();

console.log('Данные покупателя до заполнения:', buyer.getData());
console.log('Ошибки валидации до заполнения:', buyer.validate());

// сохраняем только один вид оплаты
buyer.setData({ payment: 'card' });
console.log('Данные после сохранения вида оплаты:', buyer.getData());
console.log('Ошибки валидации после вида оплаты:', buyer.validate());

// сохраняем только адрес — вид оплаты должен сохраниться
buyer.setData({ address: 'Санкт-Петербург, ул. Восстания, 1' });
console.log('Данные после сохранения адреса:', buyer.getData());

buyer.setData({ email: 'test@example.ru', phone: '+79001234567' });
console.log('Данные после заполнения всех полей:', buyer.getData());
console.log('Ошибки валидации при полных данных:', buyer.validate());

buyer.clearData();
console.log('Данные после очистки:', buyer.getData());
console.log('Ошибки валидации после очистки:', buyer.validate());

/* ============ Загрузка каталога с сервера ============ */
console.log('=== Загрузка каталога с сервера ===');

const apiService = new ApiService(apiClient);

apiService
    .getProducts()
    .then((response) => {
        catalog.saveProducts(response.items);
        console.log('Каталог, загруженный с сервера:', catalog.getProducts());
    })
    .catch((error) => {
        console.error('Не удалось загрузить каталог с сервера:', error);
    });
