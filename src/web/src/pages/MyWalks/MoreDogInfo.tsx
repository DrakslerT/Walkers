import React from 'react';
import { Popup } from 'semantic-ui-react';
import { IWalk } from '.';

interface MoreDogInfoProps {
  walk: IWalk;
}

export const MoreDogInfo: React.FC<MoreDogInfoProps> = ({ walk }) => {
  return (
    <Popup
      trigger={
        <span style={{ textDecoration: 'underline' }}>{walk.Ime_pes}</span>
      }
      header={`Information about ${walk.Ime_pes}`}
      content={`He is of breed Samoyed for which is typical <Temperament>, weight(kg) <w> and height(cm) <h>. ${walk.Ime_pes} is owned by ${walk.lastnik}`}
      basic
    />
  );
};
