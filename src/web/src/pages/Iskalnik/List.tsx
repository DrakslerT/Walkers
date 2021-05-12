import { Card, Divider, Header, Icon } from 'semantic-ui-react';
import Oglas from './Oglas';
import { useWindowSize } from '../../shared/useWindow';
import React from 'react';
import { IAdd } from './context/AddsContext';

interface AddListProps {
  adds: IAdd[];
}

const AddList = ({ adds }: AddListProps) => {
  const { width } = useWindowSize();
  if (!width) {
    return <div>Loading...</div>;
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
      {adds.length > 0 ? (
        <Card.Group itemsPerRow={width > 992 ? 3 : 1}>
          {adds.map((add) => {
            const startTime = new Date(add.CasZacetka).toDateString();
            const endTime = new Date(add.CasKonca).toDateString();

            return (
              <Oglas
                username={add.Ime_uporabnik}
                location={add.Lokacija}
                startTime={startTime}
                endTime={endTime}
              />
            );
          })}
        </Card.Group>
      ) : (
        <Header as="h3" size="large" icon>
          No results found <Icon name="meh outline" size="large"/>
        </Header>
      )}
    </>
  );
};

export default React.memo(AddList);
