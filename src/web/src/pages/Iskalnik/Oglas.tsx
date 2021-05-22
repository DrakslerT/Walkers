import { Card, Icon, Header, Label, Rating, Button } from 'semantic-ui-react';
import { handleResponseTime } from '../../shared/utils';
import styles from './Iskalnik.module.css';

interface IOglas {
  username?: string;
  startTime?: string;
  endTime?: string;
  location?: string;
  rating: number;
  responseTime: number;
  numOfWalks: number;
  asOwner: boolean;
}

const Oglas = ({
  username,
  startTime,
  endTime,
  location,
  rating,
  responseTime,
  numOfWalks,
  asOwner,
}: IOglas) => (
  <Card color="blue" className={styles.card_hover_effect} raised>
    <Label color="blue" ribbon size="large">
      <Icon name="map marker alternate" />
      {location}
    </Label>
    <Card.Content /> {/* Empty content to show the ribbon */}
    <Card.Header>
      <Header
        as="h3"
        size="large"
        textAlign="left"
        className={styles.card_header}
      >
        <Icon name="user circle outline" size="tiny" />
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
    <Card.Content>
      <b>Avg. rating: </b>
      <Rating
        maxRating={5}
        defaultRating={rating}
        icon="star"
        size="huge"
        disabled
      />
    </Card.Content>
    <Card.Content style={{ userSelect: 'none' }}>
      <Icon name="flag checkered" />
      Number of walks: <b>{numOfWalks > 0 ? numOfWalks : 'No walks yet'}</b>
    </Card.Content>
    <Card.Content style={{ userSelect: 'none' }}>
      <Icon name="talk" />
      Avg. response time: <b>{handleResponseTime(responseTime)}</b>
    </Card.Content>
    {asOwner && (
      <Card.Content extra>
        <Button fluid positive>
          I'm interested
        </Button>
      </Card.Content>
    )}
  </Card>
);

export default Oglas;
