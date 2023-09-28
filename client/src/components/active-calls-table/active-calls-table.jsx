import classNames from "classnames/bind";
import styles from "./active-calls-table.module.scss";

const cx = classNames.bind(styles);

export const ActiveCallsTable = () => {
  return (
    <div>
      <div className={styles.callsTable}>
        <div className={styles.callsTable__row}>
          <div className={styles.callsTable__heading}>Время</div>
          <div className={styles.callsTable__heading}>От кого</div>
          <div className={styles.callsTable__heading}>Номер</div>
          <div className={styles.callsTable__heading}>Длительность</div>
          <div className={styles.callsTable__heading}>Статус</div>
          <div className={styles.callsTable__heading}>Направление</div>
          <div className={styles.callsTable__heading}>Подслушать</div>
        </div>
        <div className={cx('answered', styles.callsTable__row)}>
          <div className={styles.callsTable__item}>01.02.2009 00:00:01</div>
          <div className={styles.callsTable__item}>1001</div>
          <div className={styles.callsTable__item}>+33757005467</div>
          <div className={styles.callsTable__item}>45:12</div>
          <div className={styles.callsTable__item}>В диалоге</div>
          <div className={styles.callsTable__item}>Vilnus</div>
          <div className={styles.callsTable__item}>ryjgrf</div>
        </div>
        <div className={cx('pending', styles.callsTable__row)}>
          <div className={styles.callsTable__item}>01.02.2009 00:00:01</div>
          <div className={styles.callsTable__item}>1001</div>
          <div className={styles.callsTable__item}>+33757005467</div>
          <div className={styles.callsTable__item}>45:12</div>
          <div className={styles.callsTable__item}>Отвеченный</div>
          <div className={styles.callsTable__item}>Vilnus</div>
          <div className={styles.callsTable__item}>ryjgrf</div>
        </div>
      </div>
    </div>
  );
};
