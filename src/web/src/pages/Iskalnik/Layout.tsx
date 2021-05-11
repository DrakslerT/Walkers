import { Grid } from 'semantic-ui-react';
import Footer from '../../components/footer/Footer';
import Navbar from '../../components/navbar/Navbar';

interface LayoutProps {
  sidebar?: React.ReactElement;
  children: any;
}

const Layout = ({ sidebar, children }: LayoutProps) => {
  return (
    <>
      <Navbar />
      <main>
        <Grid style={{ minHeight: '100vh' }}>
          <Grid.Column
            computer={4}
            only="computer"
            style={{ backgroundColor: 'lightgray' }}
          >
            {sidebar}
          </Grid.Column>
          <Grid.Column
            computer={12}
            tablet={16}
            style={{ backgroundColor: 'snow' }}
          >
            {children}
          </Grid.Column>
        </Grid>
        <Footer />
      </main>
    </>
  );
};

export default Layout;
