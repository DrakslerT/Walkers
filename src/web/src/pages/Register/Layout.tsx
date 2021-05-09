import React from 'react';
import { Grid } from 'semantic-ui-react';

interface LayoutProps {
  children: React.ReactElement | React.ReactElement[];
}

export const RegisterLayout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <Grid
      centered
      style={{ height: '100vh', maxWidth: '800px' }}
      verticalAlign="middle"
      textAlign="center"
      container
    >
      <Grid.Column>{children}</Grid.Column>
    </Grid>
  );
};
