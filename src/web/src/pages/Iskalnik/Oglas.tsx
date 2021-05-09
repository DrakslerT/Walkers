import { Item } from 'semantic-ui-react';

interface Oglas {
  username?: string;
  startTime?: string;
  endTime?: string;
  location?: string;
}

const Oglas = ({ username, startTime, endTime, location }: Oglas) => (
  <Item>
    <Item.Content>
      <Item.Header as="a">{username}</Item.Header>
      <Item.Meta>Opis</Item.Meta>
      <Item.Description>
        <p>Lokacija: {location}</p>
        <p>Čas začetka: {startTime}</p>
        <p>Čas konca: {endTime}</p>
      </Item.Description>
      <Item.Extra></Item.Extra>
    </Item.Content>
  </Item>
);

export default Oglas;
