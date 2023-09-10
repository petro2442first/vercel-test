import { Outlet } from "react-router-dom"
import { Sidebar } from "../../components/sidebar/sidebar"
import styles from './default-page.module.scss';

export const DefaultPage = () => {
    return (
        <div className={styles.page}>
            <Sidebar />
            <main className={styles.main}>
                <Outlet />
            </main>
        </div>
    )
}