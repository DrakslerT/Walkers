import React from 'react';
import { Container } from 'semantic-ui-react';
import { useWindowSize } from '../../shared/useWindow';
import Layout from './Layout';
import AddList from './List';
import Sidebar from './Sidebar';

interface IskalnikProps {}

export const Iskalnik: React.FC<IskalnikProps> = ({}) => {
  const { width } = useWindowSize();
  return (
    <Layout sidebar={<Sidebar />}>
      <Container>
        <AddList adds={['a', 'b', 'c']} />
      </Container>
    </Layout>
  );
};
