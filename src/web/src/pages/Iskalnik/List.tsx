import { Card, Divider, Header } from 'semantic-ui-react';
import Oglas from './Oglas';
import styles from './List.module.css';
import { useWindowSize } from '../../shared/useWindow';
import React from 'react';

interface AddListProps {
  adds: {
    CasKonca: string;
    CasZacetka: string;
    ID_oglas: number;
    ID_uporabnik: number;
    Ime_uporabnik: string;
    Index: number;
    JeAktiven: { type: 'Buffer'; data: [49] };
    Lokacija: string;
    Lokacija_lat?: number;
    Lokacija_lng?: number;
    OdzivniCas: number;
    PovprecnaOcena: number;
    StSprehodov: number;
    Tip: number;
  }[];
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
      <Card.Group divided itemsPerRow={width > 992 ? 3 : 1}>
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
    </>
  );
};

export default React.memo(AddList);
