import { CallsTable } from "@components";
import { Sidebar } from "../../components/sidebar/sidebar";
import { PaymentsTable } from "../../components";

// import styles from './calls-page.module.scss';

export const PaymentsHistory = () => {
    return (
        <div>
            <h2>История пополнений</h2>
            <PaymentsTable />
        </div>
    )
}