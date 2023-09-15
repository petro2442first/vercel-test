import { useState } from 'react';
import { Formik } from 'formik'

import { Input } from '../../elements/input/input';
import { Button } from '../../elements/button/button';

import qrcode from '../../assets/images/qrusdt.jpg';

import styles from './payment-form.module.scss';

export const PaymentForm = () => {
    const [step, setActiveStep] = useState(1);

    const isFirstStep = step === 0;
    const isSecondStep = step === 1;

    return (
        <div>
            <Formik
                initialValues={{ amount: '' }}
                validate={values => {
                    const errors = {};

                    if (!values.amount) {
                        errors.amount = 'Это обязательное поле'
                    } else if (values.amount < 30) {
                        errors.amount = 'Минимальная сумма пополнения - $30'
                    }

                    return errors;
                }}
                onSubmit={(values, { setSubmitting }) => {
                    setTimeout(() => {
                      alert(JSON.stringify(values, null, 2));
                      setSubmitting(false);
                    }, 400);
                }}
            >

            </Formik>
            {
                isFirstStep && (
                    <div className={styles.payment_step_1}>
                        <Input label="Укажите сумму пополнения:" style="primary" placeholder="$100"/>

                        <Button type="primary">Далее</Button>
                    </div>
                )
            }

            {
                isSecondStep && (
                    <div className={styles.payment_step_2}>
                        <div className={styles.payment_info}>
                            <div className={styles.payment_info_left}>
                                <img src={qrcode} className={styles.payment_qrcode} alt="" />
                            </div>
                            <div className={styles.payment_info_right}>
                                <p className={styles.payment_info_amount}>101 USDT <sup>TRC 20</sup></p>
                                <p className={styles.payment_info_disclaimer}>*Со всех автоматических переводов провайдером взымается комиссия в размере 1%.</p>


                                <p className={styles.payment_info_scanqr}>Для оплаты отсканируйте этот QR код через свой мобильный кошелек.</p>
                                <p className={styles.payment_info_text}>Или отправьте <span>92.12 USDT</span> на этот адрес:</p>
                                <div className={styles.payment_info_address}>
                                    <p>TAQGYPSb4gtmajmtPwT65J97yy14S5XKXg</p>
                                    <i className="fa-solid fa-copy"></i>
                                </div>

                                <p className={styles.payment_info_warning}>Внимание! Это временный адрес, не сохраняйте его!</p>

                                <div className={styles.payment_btns}>
                                    <Button>Скопировать адрес</Button>
                                    <Button>Открыть в Trust Wallet</Button>
                                </div>
                            </div>
                        </div>

                        <Button>Назад</Button>
                    </div>
                )
            }
            
        </div>
    )
}