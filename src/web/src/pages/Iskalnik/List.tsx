import { Card, Divider, Header } from 'semantic-ui-react';
import Oglas from './Oglas';
import { useWindowSize } from '../../shared/useWindow';
import React, { useContext, useEffect } from 'react';
import { AddsContext, AddsContextType } from './context/AddsContext';
import { Loader } from '../../components/Loader';
import { handleDate } from '../../shared/utils';
import { getUser } from '../../shared/UserInformation';

const AddList = () => {
  const { adds, isFetching, updateAdds } = useContext(
    AddsContext
  ) as AddsContextType;
  const user = getUser();

  /** Fetch Adds on initial load */
  useEffect(() => {
    updateAdds();
  }, []);

  const { width } = useWindowSize();

  if (!width) {
    return <Loader />;
  }

  return (
    <>
      <Header
        content="Available walkers"
        as="h1"
        size="huge"
        subheader="You can filter the results on you left"
      />
      <Divider />
      {isFetching ? (
        <Loader msg="Fetching Ads" />
      ) : (
        <Card.Group itemsPerRow={width > 992 ? 3 : 1}>
          {adds.map((add) => {
            const startTime = handleDate(add.CasZacetka);
            const endTime = handleDate(add.CasKonca);
            return (
              <Oglas
                key={add.Index}
                username={add.Ime_uporabnik}
                location={add.Lokacija}
                startTime={startTime}
                endTime={endTime}
                rating={add.PovprecnaOcena}
                responseTime={add.OdzivniCas}
                numOfWalks={add.StSprehodov}
                asOwner={user.userType === 2}
              />
            );
          })}
        </Card.Group>
      )}
    </>
  );
};

export default React.memo(AddList);
