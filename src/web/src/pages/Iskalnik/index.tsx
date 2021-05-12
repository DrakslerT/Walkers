import React, { useContext, useEffect, useState } from 'react';
import { Container } from 'semantic-ui-react';
import { Loader } from '../../components/Loader';
import { getAuthRequest } from '../../shared/http';
import { errorToast } from '../../shared/Toast';
import { AddsContext, AddsContextType } from './context/AddsContext';

import Layout from './Layout';
import AddList from './List';
import Sidebar from './Sidebar';

interface IskalnikProps {}

export const Iskalnik: React.FC<IskalnikProps> = ({}) => {
  const { adds, isFetching, updateAdds } = useContext(
    AddsContext
  ) as AddsContextType;
  /** Fetch Adds on initial load */
  useEffect(() => {
    updateAdds();
  }, []);
  return (
    <Layout sidebar={<Sidebar />}>
      <Container>
        {isFetching ? <Loader msg="Fetching Ads" /> : <AddList adds={adds} />}
      </Container>
    </Layout>
  );
};
