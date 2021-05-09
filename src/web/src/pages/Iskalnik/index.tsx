import React from 'react';
import { Container } from 'semantic-ui-react';
import { getUser } from '../../shared/UserInformation';
import { useWindowSize } from '../../shared/useWindow';
import Layout from './Layout';
import AddList from './List';
import Sidebar from './Sidebar';

interface IskalnikProps {}

export const Iskalnik: React.FC<IskalnikProps> = ({}) => {
  const { width } = useWindowSize();
  const user = getUser();
  return (
    <Layout sidebar={<Sidebar />}>
      <Container>
        {user.username}
        {user.userType}
        <AddList adds={['a', 'b', 'c']} />
      </Container>
    </Layout>
  );
};
