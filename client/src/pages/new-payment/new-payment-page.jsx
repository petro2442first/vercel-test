import { CallsTable } from "@components";
import { PaymentForm } from "../../components/payment-form/payment-form";

import styles from './new-payment-page.module.scss';

const availableTokens = [
    'USDT',
    'BTC',
    'TRX'
]

export const NewPaymentPage = () => {
    return (
        <div>
            <h2>Пополнить</h2>
            <div className={styles.description}>
                <p>Средства поступят на ваш счет в течение пары минут после успешной оплаты. В данный момент доступна оплата только в USDT.</p>
                <p>Минимальная сумма пополнения - 30 USDT.</p>
            </div>
            {/* <p>Выберите валюту пополнения:</p>

            <ul>
                {
                    availableTokens.map(token => {
                        return <li>{token}</li>
                    })
                }
            </ul> */}
            <PaymentForm />
        </div>
    )
}