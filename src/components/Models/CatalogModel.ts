import { IProduct } from '../../types/index';

/* Модель каталога. Хранит все товары, доступные для покупки,
и товар, выбранный для подробного отображения. */
export class CatalogModel {
    private products: IProduct[] = [];
    private selectedProduct: IProduct | null = null;

    saveProducts(products: IProduct[]): void {
        this.products = products;
    }

    getProducts(): IProduct[] {
        return this.products;
    }

    getProductById(id: string): IProduct | undefined {
        return this.products.find((product) => product.id === id);
    }

    saveSelectedProduct(product: IProduct): void {
        this.selectedProduct = product;
    }

    getSelectedProduct(): IProduct | null {
        return this.selectedProduct;
    }
}
