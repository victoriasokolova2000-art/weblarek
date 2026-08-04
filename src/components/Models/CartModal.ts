import { CartItem } from '../../types/index';

export class CartModel {
    private items: CartItem[] = [];

    getItems(): CartItem[] {
        return this.items;
    }

    addItem(item: CartItem): void {
        const existing = this.items.find((i) => i.id === item.id);
        if (existing) {
            existing.quantity += item.quantity;
        } else {
            this.items.push({ ...item });
        }
    }

    removeItem(item: CartItem): void {
        this.items = this.items.filter((i) => i.id !== item.id);
    }

    clear(): void {
        this.items = [];
    }

    getTotalAmount(): number {
        return this.items.reduce((sum, i) => {
            if (i.price === null) return sum;
            return sum + i.price * i.quantity;
        }, 0);
    }

    getItemCount(): number {
        return this.items.reduce((count, i) => count + i.quantity, 0);
    }

    hasProduct(id: string): boolean {
        return this.items.some((i) => i.id === id);
    }
}
