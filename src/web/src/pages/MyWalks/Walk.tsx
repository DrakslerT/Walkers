import React from 'react';
import { Button, Header, Icon, Item, Label, Segment } from 'semantic-ui-react';
import { MoreDogInfo } from './MoreDogInfo';
import { MoreWalkerInfo } from './MoreWalkerInfo';
import { IWalk } from './index';
import { handleDate } from '../../shared/utils';

interface WalkProps {
  walk: IWalk;
}

export const Walk: React.FC<WalkProps> = ({ walk }) => {
  return (
    <Item>
      <Item.Content>
        <Item.Header as="h2">
          <Icon name="paw" />
          Walk for <MoreDogInfo walk={walk} /> with{' '}
          <MoreWalkerInfo walk={walk} />
          {walk.novaSprememba && (
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
              <Header as="h3" content="Contact information:" />
              <Label
                basic
                icon="mail"
                content="hello@world.com"
                color="blue"
                size="huge"
              />
              <Label
                basic
                icon="phone"
                content="041221333"
                color="blue"
                size="huge"
              />
            </>
          )}
          {walk.Status === null && (
            <>
              <Button color="red" floated="right">
                <Icon name="delete" />
                Decline
              </Button>
              <Button color="green" floated="right">
                <Icon name="check" />
                Accept
              </Button>
            </>
          )}
        </Item.Extra>
      </Item.Content>
    </Item>
  );
};
