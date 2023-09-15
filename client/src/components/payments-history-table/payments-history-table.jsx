import classNames from "classnames/bind";
import styles from "./calls-table.module.scss";

const cx = classNames.bind(styles);

export const PaymentsHistoryTable = () => {
  return (
    <div>
      <div className={styles.paymentsTable}>
        <div className={styles.paymentsTable__row}>
          <div className={styles.paymentsTable__heading}>Время</div>
          <div className={styles.paymentsTable__heading}>От кого</div>
          <div className={styles.paymentsTable__heading}>Номер</div>
          <div className={styles.paymentsTable__heading}>Длительность</div>
          <div className={styles.paymentsTable__heading}>Статус</div>
          <div className={styles.paymentsTable__heading}>Цена</div>
          <div className={styles.paymentsTable__heading}>Запись</div>
          <div className={styles.paymentsTable__heading}>Сброс</div>
        </div>
        <div className={cx('success', styles.paymentsTable__row)}>
          <div className={styles.paymentsTable__item}>01.02.2009 00:00:01</div>
          <div className={styles.paymentsTable__item}>1001</div>
          <div className={styles.paymentsTable__item}>+33757005467</div>
          <div className={styles.paymentsTable__item}>45:12</div>
          <div className={styles.paymentsTable__item}>Отвеченный</div>
          <div className={styles.paymentsTable__item}>0.204</div>
          <div className={styles.paymentsTable__item}>
            <span className={styles.paymentsTable__playRecording}>
                <i className="fa-solid fa-play"></i>
            </span>
            <span className={styles.paymentsTable__downloadRecording}>
                <i className="fa-solid fa-file-arrow-down"></i>
            </span>
          </div>
          <div className={styles.paymentsTable__item}>Абонент</div>
        </div>
        <div className={cx('failed', styles.paymentsTable__row)}>
          <div className={styles.paymentsTable__item}>01.02.2009 00:00:01</div>
          <div className={styles.paymentsTable__item}>1001</div>
          <div className={styles.paymentsTable__item}>+33757005467</div>
          <div className={styles.paymentsTable__item}>45:12</div>
          <div className={styles.paymentsTable__item}>Нет ответа</div>
          <div className={styles.paymentsTable__item}>0.000</div>
          <div className={styles.paymentsTable__item}>-</div>
          <div className={styles.paymentsTable__item}>Менеджер</div>
        </div>
      </div>
    </div>
  );
};
