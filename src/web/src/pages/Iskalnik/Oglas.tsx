import { Card, Icon, Header, Label, Rating, FormButton } from 'semantic-ui-react';
import styles from './Iskalnik.module.css';
import { getUser } from '../../shared/UserInformation';

interface IOglas {
  username?: string;
  startTime?: string;
  endTime?: string;
  location?: string;
  OdzivniCas?: string;
  isDeleted?: boolean;
}

const user = getUser();
console.log(user);

const Oglas = ({username, startTime, endTime, location }: IOglas) => (
  <Card color="blue" id = "card">
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
        defaultRating={3}
        icon="star"
        size="huge"
        disabled
      />
    </Card.Content>
    <Card.Content style={{ userSelect: 'none' }}>
      <Icon name="talk" />
      Avg. response time: <b>Weekly</b>
    </Card.Content>
    {user.userType === 1 && ( 

        <Card.Content>
        <FormButton color="red" onClick = {() => document.getElementById("card")?.remove()}>
          <Icon name="delete"/>
          <b>Delete</b>
        </FormButton>
      </Card.Content>
      
      )}
    
  </Card>
);

export default Oglas;
