import { IconType } from "react-icons";

interface ButtonProps {
    label: string;
    onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
    disabled?: boolean;
    icon?: IconType;
}

const Button: React.FC<ButtonProps> = ({
    label,
    onClick,
    disabled,
    icon: Icon
}) => {
    return (
        <button
            type="submit"
            onClick={onClick}
            disabled={disabled}
            className='relative w-full py-3 transition bg-gray-700 border-gray-700rounded-lg disabled:opacity-70 disabled:cursor-not-allowed hover:opacity-80 '
        >
            <p className="font-semibold text-white">{label}</p>
        </button>
    )
}

export default Button