import { Grid } from 'semantic-ui-react';

interface LayoutProps {
  sidebar?: React.ReactElement;
  children: any;
}

const Layout = ({ sidebar, children }: LayoutProps) => {
  return (
    <Grid style={{ minHeight: '100vh' }}>
      <Grid.Column
        computer={3}
        tablet={2}
        style={{ backgroundColor: 'lightgray' }}
      >
        {sidebar}
      </Grid.Column>
      <Grid.Column
        computer={13}
        tablet={14}
        style={{ backgroundColor: 'snow' }}
      >
        {children}
      </Grid.Column>
    </Grid>
  );
};

export default Layout;
