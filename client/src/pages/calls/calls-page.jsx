import { CallTable } from "../../components/calls-table/calls-table";
import { Sidebar } from "../../components/sidebar/sidebar";

import styles from './calls-page.module.scss';

export const CallsPage = () => {
    return (
        <div>
            <h2>Звонки</h2>
            <CallTable />
        </div>
    )
}