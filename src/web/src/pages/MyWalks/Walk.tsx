import React from 'react';
import { Button, Header, Icon, Item, Label, Segment } from 'semantic-ui-react';
import { MoreDogInfo } from './MoreDogInfo';
import { MoreWalkerInfo } from './MoreWalkerInfo';
import { IWalk } from './index';
import { handleDate } from '../../shared/utils';
import { getUser } from '../../shared/UserInformation';
import { getAuthRequest } from '../../shared/http';
import { errorToast, successToast } from '../../shared/Toast';
import { AddRatingModal } from '../../components/modals/AddRatingModal';

interface WalkProps {
  walk: IWalk;
  refetch: () => {};
}

export const Walk: React.FC<WalkProps> = ({ walk, refetch }) => {
  const user = getUser();
  const authRequest = getAuthRequest();
  /** Can rate if walk is over, is accepted, user is owner and walk has not been rated */
  const canRate =
    new Date() > new Date(walk.CasKonca) && // Comment this out for testing
    walk.Status === 1 &&
    user.userType === 2 &&
    walk.rated === 0;

  const changesForMe = () => {
    if (user.userType === 1 && walk.novaSpremembaSprehajalec) {
      return true;
    }

    if (user.userType === 2 && walk.novaSpremembaLastnik) {
      return true;
    }
    return false;
  };

  const handleResponse = async (r: boolean) => {
    try {
      const payload = { idSprehoda: walk.ID_sprehod, response: r };
      const response = await authRequest.post('walkResponse', payload);
      if (response.status === 200) {
        successToast();
        refetch();
      }
    } catch (e) {
      console.error(e);
      errorToast();
    }
  };

  return (
    <Item>
      <Item.Content>
        <Item.Header as="h2">
          <Icon name="paw" />
          Walk for <MoreDogInfo walk={walk} /> with{' '}
          <MoreWalkerInfo walk={walk} />
          {changesForMe() && (
            <Label color="blue" tag>
              New!
            </Label>
          )}
        </Item.Header>
        <Item.Meta>
          Walk request was issued on: <b>{handleDate(walk.DatumKreiranja)}</b>
        </Item.Meta>
        <Item.Description>
          <Segment color="blue" raised>
            <Icon name="map marker alternate" />
            Where: <b>{walk.Lokacija}</b>
          </Segment>
          <Segment color="blue" raised>
            <Icon name="calendar" />
            From: <b>{handleDate(walk.CasZacetka)}</b>
          </Segment>
          <Segment color="blue" raised>
            <Icon name="calendar times" />
            To: <b>{handleDate(walk.CasKonca ?? '')}</b>
          </Segment>
        </Item.Description>

        {/* ACTIONS */}
        <Item.Extra>
          {walk.Status === 1 && (
            <>
              <Header color="green" size="large">
                This walk was accepted
              </Header>
              <ContactInfo walk={walk} userType={user.userType} />
            </>
          )}
          {walk.Status === null && user.userType === 1 && (
            <>
              <Button
                color="red"
                floated="right"
                onClick={() => handleResponse(false)}
              >
                <Icon name="delete" />
                Decline
              </Button>
              <Button
                color="green"
                floated="right"
                onClick={() => handleResponse(true)}
              >
                <Icon name="check" />
                Accept
              </Button>
            </>
          )}
          {walk.Status === null && user.userType === 2 && (
            <div>
              <Icon name="time" />
              Waiting for response...
            </div>
          )}
          {walk.Status === 0 && (
            <Header color="red" size="large">
              This walk was declined
            </Header>
          )}
          {canRate && <AddRatingModal refetch={refetch} walk={walk} />}
        </Item.Extra>
      </Item.Content>
    </Item>
  );
};

type ContactInfoProps = {
  walk: IWalk;
  userType: number | undefined;
};

const ContactInfo: React.FC<ContactInfoProps> = ({ walk, userType }) => {
  if (userType === 1 || userType === 4) {
    // Show owner info
    return (
      <>
        <Header as="h3" content="Contact information:" />
        <Label
          basic
          icon="mail"
          content={`${walk.last_email}`}
          color="blue"
          size="huge"
        />
        {walk.last_GSM && (
          <Label
            basic
            icon="phone"
            content="041221333"
            color="blue"
            size="huge"
          />
        )}
      </>
    );
  } else {
    // Show walker info
    return (
      <>
        <Header as="h3" content="Contact information:" />
        <Label
          basic
          icon="mail"
          content={`${walk.spreh_email}`}
          color="blue"
          size="huge"
        />
        {walk.spreh_GSM && (
          <Label
            basic
            icon="phone"
            content={`${walk.spreh_GSM}`}
            color="blue"
            size="huge"
          />
        )}
      </>
    );
  }
};
