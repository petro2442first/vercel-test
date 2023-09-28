import classNames from "classnames/bind";
import styles from "./payments-table.module.scss";

const cx = classNames.bind(styles);

export const PaymentsTable = () => {
  return (
    <div>
      <div className={styles.paymentsTable}>
        <div className={styles.paymentsTable__row}>
          <div className={styles.paymentsTable__heading}>ID</div>
          <div className={styles.paymentsTable__heading}>Дата создания</div>
          <div className={styles.paymentsTable__heading}>Дата подтверждения</div>
          <div className={styles.paymentsTable__heading}>Сумма</div>
          <div className={styles.paymentsTable__heading}>Комиссия</div>
          <div className={styles.paymentsTable__heading}>Комментарий</div>
          <div className={styles.paymentsTable__heading}>Баланс после пополнения</div>
          <div className={styles.paymentsTable__heading}>Источник</div>
        </div>
        <div className={cx('success', styles.paymentsTable__row)}>
          <div className={styles.paymentsTable__item}>1</div>
          <div className={styles.paymentsTable__item}>01.02.2009 00:00:01</div>
          <div className={styles.paymentsTable__item}>01.02.2009 00:00:01</div>
          <div className={styles.paymentsTable__item}>100</div>
          <div className={styles.paymentsTable__item}>1</div>
          <div className={styles.paymentsTable__item}>hash</div>
          <div className={styles.paymentsTable__item}>100 - 200</div>
          <div className={styles.paymentsTable__item}>Web app</div>
        </div>
        <div className={cx('success', styles.paymentsTable__row)}>
          <div className={styles.paymentsTable__item}>1</div>
          <div className={styles.paymentsTable__item}>01.02.2009 00:00:01</div>
          <div className={styles.paymentsTable__item}>01.02.2009 00:00:01</div>
          <div className={styles.paymentsTable__item}>100</div>
          <div className={styles.paymentsTable__item}>1</div>
          <div className={styles.paymentsTable__item}>hash</div>
          <div className={styles.paymentsTable__item}>100 - 200</div>
          <div className={styles.paymentsTable__item}>Web app</div>
        </div>
      </div>
    </div>
  );
};
