import { NavLink } from 'react-router-dom';
import classNames from 'classnames/bind';

import logo from '@assets/images/logo@2x.png';
import styles from './sidebar.module.scss';

const cx = classNames.bind(styles);

export const Sidebar = () => {
    return (
        <aside className={styles.sidebar}>
            <div className={styles.sidebar__logo}>
                <img src={logo} alt="" />
                <p>RocketCall</p>
            </div>
            <div className={styles.sidebar__menu}>
                <NavLink 
                    to={'/'} 
                    className={({ isActive }) => cx(styles.sidebar__link, {
                        active: isActive
                    })}
                >
                    <div className={styles.sidebar__iconContainer}>
                        <i className="fa-solid fa-house"></i>
                    </div>
                    <span>Dashboard</span>
                </NavLink>

                <NavLink 
                    to={'/calls'} 
                    className={({ isActive }) => cx(styles.sidebar__link, {
                        active: isActive
                    })}
                >
                    <div className={styles.sidebar__iconContainer}>
                        <i className="fa-solid fa-phone"></i>
                    </div>
                    <span>Звонки</span>
                </NavLink>

                <NavLink 
                    to={'/2'} 
                    className={({ isActive }) => cx(styles.sidebar__link, {
                        active: isActive
                    })}
                >
                    <div className={styles.sidebar__iconContainer}>
                        <i className="fa-solid fa-chart-pie"></i>
                    </div>
                    <span>Статистика</span>
                </NavLink>
                
                <NavLink 
                    to={'/active-calls'} 
                    className={({ isActive }) => cx(styles.sidebar__link, {
                        active: isActive
                    })}
                >
                    <div className={styles.sidebar__iconContainer}>
                        <i className="fa-solid fa-phone-volume"></i>
                    </div>
                    <span>Активные звонки</span>
                </NavLink>

                <NavLink 
                    to={'/4'} 
                    className={({ isActive }) => cx(styles.sidebar__link, {
                        active: isActive
                    })}
                >
                    <div className={styles.sidebar__iconContainer}>
                        <i className="fa-solid fa-file-invoice-dollar"></i>
                    </div>
                    <span>Пополнить</span>
                </NavLink>

                <NavLink 
                    to={'/5'} 
                    className={({ isActive }) => cx(styles.sidebar__link, {
                        active: isActive
                    })}
                >
                    <div className={styles.sidebar__iconContainer}>
                        <i className="fa-solid fa-table"></i>
                    </div>
                    <span>История пополнений</span>
                </NavLink>
            </div>
            <footer className={styles.sidebar__footer}>
                <div className={styles.sidebar__footer_icon}>
                    <i className="fa-solid fa-user"></i>
                </div>
                <div className={styles.sidebar__footer_userinfo}>
                    <span>User</span>
                    <span>Office manager</span>
                </div>
                <div className={styles.sidebar__footer_logout}>
                    <i className="fa-solid fa-right-from-bracket"></i>
                </div>
            </footer>
        </aside>
    )
}