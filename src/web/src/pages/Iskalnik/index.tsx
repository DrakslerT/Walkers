import React from 'react';
import { getAccessToken } from '../../shared/AccessToken';

interface IskalnikProps {}

export const Iskalnik: React.FC<IskalnikProps> = ({}) => {
  const AccessToken = getAccessToken();
  return <h1>{AccessToken}</h1>;
};
