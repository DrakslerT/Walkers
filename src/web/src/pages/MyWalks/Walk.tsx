import React, { useEffect, useState } from 'react';
import {
  Button,
  Modal,
  Header,
  Icon,
  Item,
  Form,
  Label,
  Segment,
} from 'semantic-ui-react';
import { MoreDogInfo } from './MoreDogInfo';
import { MoreWalkerInfo } from './MoreWalkerInfo';
import { IWalk } from './index';
import { handleDate } from '../../shared/utils';
import { getUser } from '../../shared/UserInformation';
import { getAuthRequest } from '../../shared/http';
import { errorToast, successToast } from '../../shared/Toast';
import { AddRatingModal } from '../../components/modals/AddRatingModal';
import queryString from 'query-string';

interface WalkProps {
  walk: IWalk;
  refetch: () => {};
}

export const Walk: React.FC<WalkProps> = ({ walk, refetch }) => {
  const user = getUser();
  const authRequest = getAuthRequest();
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [description, setDescription] = useState('');
  const [favourite, setFavourite] = useState(walk.Priljubljen === 1);
  const [disableFavBtn, setDisable] = useState(false);

  const handleSetFav = async () => {
    try {
      const payload = { idSprehoda: walk.ID_sprehod, response: !favourite };
      const response = await authRequest.post('addFavourite', payload);
      if (response.status === 200) {
        successToast();
      }
      // toggle it after and disable it to prevent spamming
      setFavourite(!favourite);
      setDisable(true);
    } catch (e) {
      console.error(e);
      errorToast();
    }
  };
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

  const handleSubmit = async () => {
    setLoading(true);
    const payload = { description, walkId: walk.ID_sprehod }; // dodaj payload
    if (description === '') {
      errorToast('You must enter a description. Try again!');
      return setOpen(false);
    }

    try {
      const authRequest = getAuthRequest();
      const response = await authRequest.post('/addReport', payload);
      if (response.status === 200) {
        successToast();
        setDescription('');
      }
      return setOpen(false);
    } catch (e) {
      errorToast(e.response.data.message + '🚦');
      console.error(e);
    }
    setLoading(false);
    setDescription('');
  };
  
  const handleAddCalendar = async () => {
    try {
      const payload = { ID_sprehod: walk.ID_sprehod };
      const response = await authRequest.post('calendar/addEvent', payload);
      if (response.status === 200) {
        if (response.data) {
          window.location.href = response.data;
        } else {
          successToast();
          refetch();
        }
      } else if (response.status === 201) {
        successToast();
      }
    } catch (e) {
      console.error(e);
      errorToast();
    }
  };

  const confirmToken = async (code: String) => {
    try {
      const payload = { code: code };
      const response = await authRequest.post('calendar/confirm', payload);
      if (response.status === 201) {
        successToast();
      }
    } catch (e) {
      console.error(e);
      errorToast();
    }
  };

  useEffect(() => {
    const windowUrl = window.location.search;
    const params = queryString.parse(windowUrl);
    const code = params.code;
    if (code) {
      confirmToken(code + '');
    }
  }, []);

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
              <Button
                color="blue"
                floated="right"
                onClick={() => handleAddCalendar()}
              >
                <Icon name="calendar plus" />
                Add to calendar
              </Button>
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
          {walk.rated && user.userType === 2 && (
            <Button
              color="red"
              labelPosition="right"
              label={
                favourite
                  ? `${walk.sprehajalec} is one of my favourites`
                  : `Set ${walk.sprehajalec} as favourite`
              }
              icon={favourite ? 'heart' : 'heart outline'}
              floated="right"
              onClick={handleSetFav}
              disabled={disableFavBtn}
            ></Button>
          )}
        </Item.Extra>

        <Modal
          onClose={() => setOpen(false)}
          onOpen={() => setOpen(true)}
          open={open}
          trigger={
            <Button icon labelPosition="left" color="red" floated="right">
              Report
              <Icon name="exclamation circle" />
            </Button>
          }
        >
          <Modal.Header>Report user</Modal.Header>
          <Modal.Content>
            <label>Describe the violation</label>
            <Form.Input
              placeholder="Enter a description..."
              name="description"
              type="text"
              onChange={(e) => setDescription(e.target.value)}
              required
            />
            <br />
          </Modal.Content>
          <Modal.Actions>
            <Button color="black" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button
              type="submit"
              content="Report"
              labelPosition="right"
              icon="checkmark"
              onClick={handleSubmit}
              positive
            />
          </Modal.Actions>
        </Modal>
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
            content={walk.last_GSM}
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
