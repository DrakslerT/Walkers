import React from 'react';
import { Container } from 'semantic-ui-react';
import { AddsContextProvider } from './context/AddsContext';
import Layout from './Layout';
import AddList from './List';
import Sidebar from './Sidebar';

export const Iskalnik: React.FC = () => {
  return (
    <AddsContextProvider>
      <Layout sidebar={<Sidebar />}>
        <Container>
          <AddList />
        </Container>
      </Layout>
    </AddsContextProvider>
  );
};
