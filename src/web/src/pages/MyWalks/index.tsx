import React, { useEffect, useState } from 'react';
import { Container, Divider, Header, Icon, Item } from 'semantic-ui-react';
import { Loader } from '../../components/Loader';
import Navbar from '../../components/navbar/Navbar';
import { getAuthRequest } from '../../shared/http';
import { errorToast } from '../../shared/Toast';
import { getUser } from '../../shared/UserInformation';
import { IBreed } from '../Profile/context/ProfileContext';
import { Walk } from './Walk';

export type IWalk = {
  ID_sprehod: number;
  Status: number;
  DatumKreiranja: string;
  novaSpremembaLastnik: number;
  novaSpremembaSprehajalec: number;
  Priljubljen: number;
  Lokacija: string;
  CasZacetka: string;
  CasKonca: string;
  Ime_pes: string;
  ID_pasma: number;
  lastnik: string;
  last_email: string;
  last_GSM?: number | null;
  sprehajalec: string;
  spreh_email: string;
  spreh_GSM?: number | null;
  StSprehodov: number;
  OdzivniCas: number;
  PovprecnaOcena: number;
  breed: IBreed;
};

interface MyWalksProps {}

export const MyWalks: React.FC<MyWalksProps> = ({}) => {
  const [loading, setLoading] = useState(false);
  const [walks, setWalks] = useState<IWalk[] | undefined>(undefined);
  const user = getUser();
  const authRequest = getAuthRequest();

  const clearNotifications = async () => {
    try {
      await authRequest.post('walkNotifications');
      // Do nothing
    } catch (e) {
      console.error(e);
      errorToast();
    }
  };

  const fetchWalks = async () => {
    setLoading(true);
    try {
      const response = await authRequest.get('walks');
      setWalks(response.data);
      console.log(response.data);
    } catch (e) {
      console.error(e);
      errorToast();
    }
    setLoading(false);
  };
  useEffect(() => {
    fetchWalks();
    clearNotifications();
  }, []);

  if (loading || !walks) {
    return <Loader />;
  }

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
          <Item.Group divided>
            {walks.map((walk) => {
              return (
                <Walk key={walk.ID_sprehod} walk={walk} refetch={fetchWalks} />
              );
            })}
          </Item.Group>
        </Container>
      </main>
    </>
  );
};
