import React from 'react';
import { getAccessToken } from '../../shared/AccessToken';
import { ObjavaOglasa } from '../../components/modals/addAdd'

interface IskalnikProps {}

export const Iskalnik: React.FC<IskalnikProps> = ({}) => {
  const AccessToken = getAccessToken();
  return <ObjavaOglasa></ObjavaOglasa>;
};