import style from './style.module.css'
import cn from 'classnames'

export const CustomButton = ({
  children,
  isPrimary = false,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement> & { isPrimary?: boolean }) => {
  return (
    <button
      {...props}
      className={cn(style.commonButton, isPrimary && style.primary)}
    >
      {children}
    </button>
  );
};
