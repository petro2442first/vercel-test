import classNames from "classnames/bind";
import styles from "./calls-table.module.scss";

const cx = classNames.bind(styles);

export const CallsTable = () => {
  return (
    <div>
      <div className={styles.callsTable}>
        <div className={styles.callsTable__row}>
          <div className={styles.callsTable__heading}>Время</div>
          <div className={styles.callsTable__heading}>От кого</div>
          <div className={styles.callsTable__heading}>Номер</div>
          <div className={styles.callsTable__heading}>Длительность</div>
          <div className={styles.callsTable__heading}>Статус</div>
          <div className={styles.callsTable__heading}>Цена</div>
          <div className={styles.callsTable__heading}>Запись</div>
          <div className={styles.callsTable__heading}>Сброс</div>
        </div>
        <div className={cx('success', styles.callsTable__row)}>
          <div className={styles.callsTable__item}>01.02.2009 00:00:01</div>
          <div className={styles.callsTable__item}>1001</div>
          <div className={styles.callsTable__item}>+33757005467</div>
          <div className={styles.callsTable__item}>45:12</div>
          <div className={styles.callsTable__item}>Отвеченный</div>
          <div className={styles.callsTable__item}>0.204</div>
          <div className={styles.callsTable__item}>
            <span className={styles.callsTable__playRecording}>
                <i className="fa-solid fa-play"></i>
            </span>
            <span className={styles.callsTable__downloadRecording}>
                <i className="fa-solid fa-file-arrow-down"></i>
            </span>
          </div>
          <div className={styles.callsTable__item}>Абонент</div>
        </div>
        <div className={cx('failed', styles.callsTable__row)}>
          <div className={styles.callsTable__item}>01.02.2009 00:00:01</div>
          <div className={styles.callsTable__item}>1001</div>
          <div className={styles.callsTable__item}>+33757005467</div>
          <div className={styles.callsTable__item}>45:12</div>
          <div className={styles.callsTable__item}>Нет ответа</div>
          <div className={styles.callsTable__item}>0.000</div>
          <div className={styles.callsTable__item}>-</div>
          <div className={styles.callsTable__item}>Менеджер</div>
        </div>
      </div>
    </div>
  );
};
