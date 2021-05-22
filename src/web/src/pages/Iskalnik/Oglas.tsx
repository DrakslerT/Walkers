import { Card, Icon, Header, Label, Rating, Button, Confirm } from 'semantic-ui-react';
import { handleResponseTime } from '../../shared/utils';
import { getAuthRequest } from '../../shared/http';
import { errorToast, successToast } from '../../shared/Toast';
import React, { useContext, useState } from 'react';
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
  IDoglas: number
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
  IDoglas,
}: IOglas) => {
const [requestModalOpen, setRequestModalOpen] = useState(false);

const sendWalkRequest = async () => {
  try {
    const authRequest = getAuthRequest();
    const response = await authRequest.post('/sendWalkRequest', {IDoglasa: IDoglas});
    if (response.status === 200) {
      successToast();
      return setRequestModalOpen(false);
    }
  } catch (e) {
    errorToast(e.response.data.message + '🚦');
    return setRequestModalOpen(false);
  }
  return setRequestModalOpen(false);
}
return (
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
        <Button 
        fluid positive
        onClick={() => setRequestModalOpen(true)}
        >
          I'm interested
        </Button>
        <Confirm
        header={"Walk request"}
        content={'Are you sure you want to send a walk request for this Ad?'}
        open={requestModalOpen}
        onCancel={() => setRequestModalOpen(false)}
        onConfirm={sendWalkRequest}
        cancelButton="No, take me back."
        confirmButton="Yes"
        closeOnEscape
        size="large"
      />
      </Card.Content>
    )}
  </Card>
);
    }

export default Oglas;
