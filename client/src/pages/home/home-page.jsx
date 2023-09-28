import { Dashboard } from '../../components/dashboard/dashboard';
import { Sidebar } from '../../components/sidebar/sidebar';
import styles from './home.module.scss'; 

export const HomePage = () => {
    return (
        <div>
            <h2>Dashboard</h2>
            <Dashboard />
        </div>
    )
}