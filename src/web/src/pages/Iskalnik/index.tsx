import React, { useEffect, useState } from 'react';
import { Container } from 'semantic-ui-react';
import { getAuthRequest } from '../../shared/http';
import { errorToast } from '../../shared/Toast';
import Layout from './Layout';
import AddList from './List';
import Sidebar from './Sidebar';

interface IskalnikProps {}

export const Iskalnik: React.FC<IskalnikProps> = ({}) => {
  const [loading, setLoading] = useState(false);
  const [adds, setAdds] = useState([]);
  useEffect(() => {
    setLoading(true);
    const authRequest = getAuthRequest();
    authRequest
      .get('/oglas/getOglasi')
      .then((response) => {
        setAdds(response.data.oglasi);
      })
      .catch((e) => {
        console.error(e);
        errorToast();
      })
      .finally(() => setLoading(false));
  }, []);
  return (
    <Layout sidebar={<Sidebar />}>
      <Container>
        {loading ? <div>loading... </div> : <AddList adds={adds} />}
      </Container>
    </Layout>
  );
};
