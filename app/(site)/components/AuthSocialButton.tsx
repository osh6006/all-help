import { IconType } from "react-icons";

interface AuthSocialButtonProps {
  icon: IconType;
  onClick: () => void;
  color?: string;
}

const AuthSocialButton: React.FC<AuthSocialButtonProps> = ({
  icon: Icon,
  onClick,
  color,
}) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`
        inline-flex
        w-full
        justify-center
        bg-white
        px-4
        py-2
        text-gray-500
        shadow-sm
        ring-1
        ring-inset
        ring-gray-300
        hover:outline-offset-0
        ${color}
  `}
    >
      <Icon />
    </button>
  );
};

export default AuthSocialButton;
