import React, { useEffect, useState } from 'react';
import { Container, Divider, Header, Icon } from 'semantic-ui-react';
import Footer from '../../components/footer/Footer';
import Navbar from '../../components/navbar/Navbar';
import { getAuthRequest } from '../../shared/http';
import { errorToast } from '../../shared/Toast';
import { getUser } from '../../shared/UserInformation';

interface MyWalksProps {}

export const MyWalks: React.FC<MyWalksProps> = ({}) => {
  const [loading, setLoading] = useState(false);
  const [walks, setWalks] = useState([]);
  const user = getUser();

  const fetchWalks = async () => {
    setLoading(true);
    try {
      const authRequest = getAuthRequest();
      const response = await authRequest.get('walks');
      console.log(response.data);
    } catch (e) {
      console.error(e);
      errorToast();
    }
    setLoading(false);
  };
  useEffect(() => {
    fetchWalks();
  }, []);
  return (
    <>
      <Navbar />
      <main>
        <Container>
          <Header as="h1" icon textAlign="center">
            <Icon name="map" circular />
            <Header.Content>🚶‍♂️ My Walks 🚶‍♀️</Header.Content>
            <Header.Subheader>
              {user.username} here you can view your Walks!
            </Header.Subheader>
          </Header>
          <Divider />
        </Container>
      </main>
    </>
  );
};
