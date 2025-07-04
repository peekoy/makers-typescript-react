import Button from '@mui/material/Button';
import type { ButtonProps } from '@mui/material/Button';

const MuiButton = (props: ButtonProps) => {
  const { children, ...rest } = props;
  return <Button {...rest}>{children}</Button>;
};

export default MuiButton;
