import { IProduct } from '../../types/index';

/* Модель корзины. Хранит товары, выбранные покупателем для покупки. */
export class CartModel {
    private items: IProduct[] = [];

    getItems(): IProduct[] {
        return this.items;
    }

    addItem(item: IProduct): void {
        this.items.push(item);
    }

    removeItem(item: IProduct): void {
        this.items = this.items.filter((product) => product.id !== item.id);
    }

    clear(): void {
        this.items = [];
    }

    getTotalPrice(): number {
        return this.items.reduce((sum, product) => sum + (product.price ?? 0), 0);
    }

    getItemsCount(): number {
        return this.items.length;
    }

    hasItem(id: string): boolean {
        return this.items.some((product) => product.id === id);
    }
}
