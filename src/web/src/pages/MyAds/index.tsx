import React, { useEffect, useState } from 'react';
import { Container, Divider, Header, Item } from 'semantic-ui-react';
import { Loader } from '../../components/Loader';
import { ObjavaOglasa } from '../../components/modals/addAdd';
import Navbar from '../../components/navbar/Navbar';
import { getAuthRequest } from '../../shared/http';
import { getUser } from '../../shared/UserInformation';
import { Ad } from './Ad';

// Create a new type due to only information regarding ads is included (no walker info)
export type IAd = {
  lokacija: string;
  CasKonca: string;
  CasZacetka: string;
  ID_oglas: number;
};

export const MyAds: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [overflow, setOverflow] = useState(false);
  const user = getUser();
  const [ads, setAds] = useState<IAd[] | undefined>(undefined);

  const fetchAdds = async () => {
    setLoading(true);
    try {
      const authRequest = getAuthRequest();
      const response = await authRequest.get('oglas/me');
      setAds(response.data);
      if (response.data && response.data.length >= 5 && user.userType === 1) {
        setOverflow(true);
      } else {
        setOverflow(false);
      }
    } catch (e) {
      console.error(e.message);
      setLoading(false);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchAdds();
  }, []);

  if (loading) {
    return <Loader />;
  }

  if (!ads) {
    return <Loader />;
  }

  return (
    <>
      <Navbar />
      <main>
        <Container>
          <Header
            as="h1"
            content="My Ads"
            size="huge"
            subheader={`${user.username} here you can view your Ads and edit or delete them!`}
          />
          <Divider />
          {overflow ? <Header as="h2" textAlign="center" >🏞️ You have max number of ads 🏞️</Header> : <ObjavaOglasa refetch={fetchAdds} />}
          <>
            {ads.map((ad) => (
              <Ad key={ad.ID_oglas} ad={ad} refetch={fetchAdds} />
            ))}
          </>
        </Container>
      </main>
    </>
  );
};
