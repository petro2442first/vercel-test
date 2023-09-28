import classNames from 'classnames/bind';
import styles from './button.module.scss';

const cx = classNames.bind(styles);

export const Button = ({
    type,
    isLink,
    children,
    className,
    ...props
}) => {
    return isLink
        ? <a href="#" className={cx(type, styles.button, className)} {...props}>{children}</a> 
        : <button className={cx(type, styles.button, className)} {...props}>{children}</button>;
}