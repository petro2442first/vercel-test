import styles from './dashboard.module.scss';

export const Dashboard = () => {
    return (
        <div className={styles.dashboard}>
            <div className={styles.dashboard__greeting}>
                <p>Привет, User!</p>
                <p>Вот ваша быстрая статистика по звонкам:</p>
            </div>
            <div className={styles.dashboard__stat}>
                <div>
                    <p className={styles.dashboard__stat_heading}>В этом месяце:</p>

                    <div className={styles.dashboard__stat_item}>
                        <div className={styles.dashboard__stat_icon}>
                            <i className="fa-solid fa-phone"></i>
                        </div>
                        <div className={styles.dashboard__stat_text}>
                            <span>94</span>
                            <span>Звонков</span>
                        </div>
                    </div>

                    <div className={styles.dashboard__stat_item}>
                        <div className={styles.dashboard__stat_icon}>
                            <i className="fa-regular fa-clock"></i>
                        </div>
                        <div className={styles.dashboard__stat_text}>
                            <span>94</span>
                            <span>Минут</span>
                        </div>
                    </div>
                </div>

                <div>
                    <p className={styles.dashboard__stat_heading}>За сегодня:</p>

                    <div className={styles.dashboard__stat_item}>
                        <div className={styles.dashboard__stat_icon}>
                            <i className="fa-solid fa-phone"></i>
                        </div>
                        <div className={styles.dashboard__stat_text}>
                            <span>94</span>
                            <span>Звонков</span>
                        </div>
                    </div>

                    <div className={styles.dashboard__stat_item}>
                        <div className={styles.dashboard__stat_icon}>
                            <i className="fa-regular fa-clock"></i>
                        </div>
                        <div className={styles.dashboard__stat_text}>
                            <span>94</span>
                            <span>Минут</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}