import { IBuyer, TBuyerErrors } from '../../types/index';

/* Модель покупателя. Хранит данные, которые покупатель указывает
при оформлении заказа, и проверяет их заполненность. */
export class BuyerModel {
    private payment: IBuyer['payment'] = '';
    private email: string = '';
    private phone: string = '';
    private address: string = '';

    /* Сохраняет переданные поля, не затрагивая те, которых нет в параметре. */
    setData(data: Partial<IBuyer>): void {
        if (data.payment !== undefined) this.payment = data.payment;
        if (data.email !== undefined) this.email = data.email;
        if (data.phone !== undefined) this.phone = data.phone;
        if (data.address !== undefined) this.address = data.address;
    }

    getData(): IBuyer {
        return {
            payment: this.payment,
            email: this.email,
            phone: this.phone,
            address: this.address,
        };
    }

    clearData(): void {
        this.payment = '';
        this.email = '';
        this.phone = '';
        this.address = '';
    }

    /* Возвращает объект с текстами ошибок. Поле, прошедшее проверку,
    в объекте отсутствует. Пустой объект означает, что все данные валидны. */
    validate(): TBuyerErrors {
        const errors: TBuyerErrors = {};

        if (!this.payment) errors.payment = 'Не выбран вид оплаты';
        if (!this.address.trim()) errors.address = 'Укажите адрес доставки';
        if (!this.email.trim()) errors.email = 'Укажите емэйл';
        if (!this.phone.trim()) errors.phone = 'Укажите телефон';

        return errors;
    }
}
