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
      basic
    >
      <Popup.Header>Information about {walk.Ime_pes} 🐕</Popup.Header>
      <Popup.Content>
        Is of breed <b>{walk.breed.Pasma_ime}</b> for which is typical{' '}
        <b>{walk.breed.Temperament}</b>, weight <b>{walk.breed.Teza}kg</b> and
        height <b>{walk.breed.Visina}cm</b>. {walk.Ime_pes} is owned by{' '}
        <b>{walk.lastnik}</b>.
      </Popup.Content>
    </Popup>
  );
};
