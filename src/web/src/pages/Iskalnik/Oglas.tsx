import { Card, Icon, Header, Label, Rating } from 'semantic-ui-react';
import styles from './Iskalnik.module.css';

interface Oglas {
  username?: string;
  startTime?: string;
  endTime?: string;
  location?: string;
}

const Oglas = ({ username, startTime, endTime, location }: Oglas) => (
  <Card color="blue">
    <Label color="blue" ribbon size="large" icon>
      <Icon name="map" />
      {location}
    </Label>
    {/* Empty content to show the ribbon */}
    <Card.Content />
    <Card.Header>
      <Header
        as="h3"
        size="large"
        textAlign="left"
        className={styles.card_header}
      >
        <Icon name="user" size="tiny" />
        {username}
      </Header>
    </Card.Header>
    <Card.Content>
      <Icon name="calendar" size="large" />
      <span>
        <b>Start:</b> {startTime}
      </span>
    </Card.Content>
    <Card.Content>
      <Icon name="calendar times" size="large" />
      <span>
        <b>End:</b> {endTime}
      </span>
    </Card.Content>
    <Card.Content description>
      <b>Avg. rating: </b>
      <Rating
        maxRating={5}
        defaultRating={3}
        icon="star"
        size="huge"
        disabled
      />
    </Card.Content>
    <Card.Content description style={{ userSelect: 'none' }}>
      <Icon name="talk" />
      Avg. response time: <b>Weekly</b>
    </Card.Content>
  </Card>
);

export default Oglas;
