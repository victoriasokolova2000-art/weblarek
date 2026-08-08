import { IProduct } from "../../types/index";

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
        return this.products.find((p) => p.id === id);
    }

    saveSelectedProduct(product: IProduct | null): void {
        this.selectedProduct = product;
    }
    getSelectedProduct(): IProduct | null {
        return this.selectedProduct;
    }
}