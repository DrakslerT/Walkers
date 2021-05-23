import React from 'react';
import { Popup, Rating } from 'semantic-ui-react';
import { IWalk } from '.';
import { handleResponseTime } from '../../shared/utils';

interface MoreWalkerInfoProps {
  walk: IWalk;
}

export const MoreWalkerInfo: React.FC<MoreWalkerInfoProps> = ({ walk }) => {
  return (
    <Popup
      trigger={
        <span style={{ textDecoration: 'underline' }}>{walk.sprehajalec}</span>
      }
      basic
    >
      <Popup.Header>
      {walk.sprehajalec} stats after {walk.StSprehodov} walks 🐕🚶
      </Popup.Header>
      <Popup.Content>
        <Rating
          icon="star"
          defaultRating={walk.PovprecnaOcena}
          maxRating={5}
          disabled
        />
        <br />
        Responds: <b>{handleResponseTime(walk.OdzivniCas)}</b>
      </Popup.Content>
    </Popup>
  );
};
