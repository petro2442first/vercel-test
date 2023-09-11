import { ActiveCallsTable } from "@components";
import { Sidebar } from "../../components/sidebar/sidebar";

import styles from './active-calls-page.module.scss';

export const ActiveCallsPage = () => {
    return (
        <div>
            <h2>Активные звонки</h2>
            <ActiveCallsTable />
        </div>
    )
}