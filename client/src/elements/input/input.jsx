import './input.scss';

export const Input = ({
    type,
    placeholder,
    label
}) => {
    return label ? (
        <label className="label-input">
            <p>{label}</p>
            <input className="input" type={type} placeholder={placeholder} />
        </label>
    ) : <input className="input" type={type} placeholder={placeholder} />;
}