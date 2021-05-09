import { Item } from 'semantic-ui-react';
import Oglas from './Oglas';

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
  return (
    <Item.Group divided>
      {adds.map((add) => {
        return (
          <Oglas
            username={add.Ime_uporabnik}
            location={add.Lokacija}
            startTime={add.CasZacetka}
            endTime={add.CasKonca}
          />
        );
      })}
    </Item.Group>
  );
};

export default AddList;
