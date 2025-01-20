import { ButtonHTMLAttributes, ForwardedRef, forwardRef, PropsWithChildren } from 'react';
import { useNavigate } from 'react-router-dom';
import './Button.css';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary';
  to?: string;
}

export const Button = forwardRef(
  (
    {
      children,
      className = '',
      variant = 'primary',
      to,
      onClick,
      ...restProps
    }: PropsWithChildren<ButtonProps>,
    ref: ForwardedRef<HTMLButtonElement>
  ) => {
    const navigate = useNavigate();

    const buttonClasses = [
      'utrecht-button',
      variant === 'secondary' && 'utrecht-button--secondary',
      className,
    ]
      .filter(Boolean)
      .join(' ');

    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
      if (onClick) {
        onClick(e);
      }
      if (to) {
        navigate(to);
      }
    };

    return (
      <button ref={ref} className={buttonClasses} onClick={handleClick} {...restProps}>
        {children}
      </button>
    );
  }
);

Button.displayName = 'Button';

export const SecondaryButton = (props: ButtonProps) => {
  return <Button {...props} variant="secondary" />;
};
