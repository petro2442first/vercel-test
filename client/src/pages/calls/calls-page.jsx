import { CallsTable } from "@components";
import { Sidebar } from "../../components/sidebar/sidebar";

import styles from './calls-page.module.scss';

export const CallsPage = () => {
    return (
        <div>
            <h2>Звонки</h2>
            <CallsTable />
        </div>
    )
}