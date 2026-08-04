import './scss/styles.scss';

import { apiProducts } from './utils/data';
import { CatalogModel } from './components/Models/CatalogModel';
import { CartModel } from './components/Models/CartModal';
import { BuyerModel } from './components/Models/BuyerModel';

console.log('=== Проверка CatalogModel ===');

const catalog = new CatalogModel();

catalog.saveProducts(apiProducts);

const allProducts = catalog.getProducts();
console.log('Все товары:', allProducts.length, 'шт.', allProducts);

const productById = catalog.getProductById('2');
console.log(productById);

if (productById) {
    catalog.saveSelectedProduct(productById);
}

const selected = catalog.getSelectedProduct();
console.log('Выбранный товар:', selected?.title);


console.log('\n=== Проверка CartModel ===');

const cart = new CartModel();

if (allProducts[0]) {
  cart.addItem({ ...allProducts[0], quantity: 2 });
}
if (allProducts[2]) {
  cart.addItem({ ...allProducts[2], quantity: 1 });
}

console.log('Товары в корзине:', cart.getItems());


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