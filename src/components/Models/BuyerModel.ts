import { IBuyer, ValidationResult  } from "../../types/index.ts";

export class BuyerModel {
    private data: IBuyer | null = null;

    setData (buyer: IBuyer): void {
        this.data = buyer;
    }

    updateField<K extends keyof IBuyer>(field: K, value: IBuyer[K]): void {
        if (!this.data) {
            const empty: Partial<IBuyer> = {};
            (empty as any)[field] = value;
            this.data = empty as IBuyer;
            return;
        }
        this.data[field] = value;
    }

    getData(): IBuyer | null {
        return this.data;
    }

    clearData(): void {
        this.data = null;
    }

    validate(): ValidationResult {
        const errors: NonNullable<ValidationResult['errors']> = {};
        if (!this.data) {
        return {
            isValid: false,
            errors: {
            payment: 'Поле "Способ оплаты" не может быть пустым',
            address: 'Поле "Адрес" не может быть пустым',
            email: 'Поле "Email" не может быть пустым',
            phone: 'Поле "Телефон" не может быть пустым',
            },
      };
    }

    const { payment, address, email, phone } = this.data;

    if (!payment || payment.trim() === '') {
      errors.payment = 'Поле "Способ оплаты" не может быть пустым';
    }
    if (!address || address.trim() === '') {
      errors.address = 'Поле "Адрес" не может быть пустым';
    }
    if (!email || email.trim() === '') {
      errors.email = 'Поле "Email" не может быть пустым';
    }
    if (!phone || phone.trim() === '') {
      errors.phone = 'Поле "Телефон" не может быть пустым';
    }

    const isValid = Object.keys(errors).length === 0;

    return { isValid, errors };
    }
}