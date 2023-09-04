import './button.scss';

export const Button = ({
    type = 'primary',
    isLink,
    children
}) => {
    return isLink ? <a href="#" className="button">{children}</a> : <button className="button">{children}</button>
}