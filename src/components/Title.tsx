import React from 'react';
import Typography, { TypographyOwnProps } from '@mui/material/Typography';

const Title: React.FC<
  {
    children: React.ReactNode;
  } & TypographyOwnProps
> = ({ children, ...props }) => {
  return (
    <Typography component="h2" variant="h6" color="primary" gutterBottom {...props}>
      {children}
    </Typography>
  );
};

export default Title;
