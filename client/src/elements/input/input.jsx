import classNames from 'classnames/bind';
import styles from './input.module.scss';

const cx = classNames.bind(styles);

export const Input = ({
    type,
    placeholder,
    label,
    style,
    ...props
}) => {

    return label ? (
        <label className={styles.label_input}>
            <p>{label}</p>
            <input className={cx(style, styles.input)} type={type} placeholder={placeholder} {...props}/>
        </label>
    ) : <input className={cx(style, styles.input)} type={type} placeholder={placeholder} {...props}/>;
}