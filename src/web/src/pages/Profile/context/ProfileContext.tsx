import React, { useMemo } from 'react';
import { createContext, useState } from 'react';
import { getAuthRequest } from '../../../shared/http';

interface IProfileContextProvider {
  children: React.ReactElement[] | React.ReactElement;
}

export type IProfile = {
  Aktiviran: {
    data: number;
    type: string;
  };
  DatumDeaktivacije?: string;
  DatumSpremembe?: string;
  DatumUstvaritve?: string;
  Email: string;
  GSM?: number;
  Geslo?: string;
  ID_uporabnik: number;
  Ime_uporabnik: string;
  Tip: number;
  stats: {
    OdzivniCas: number;
    PovprecnaOcena: number;
    StSprehodov: number;
  };
  dogs: IDog[];
};

export type IDog = {
  ID_pes: number;
  Ime_pes: string;
  Opis_pes?: string;
  Pasma_ime: string;
  Spol?: {
    data: number;
    type: string;
  };
  Temperament: string;
  Teza: string;
  Visina: string;
  WikiPasmeUrl?: string;
};

export type ProfileContextType = {
  profile: IProfile | undefined;
  isFetching: boolean;
  updateProfile: () => void;
};

export const ProfileContext = createContext<ProfileContextType>({
  profile: undefined,
  isFetching: false,
  updateProfile: () => {},
});

export const ProfileContextProvider = ({
  children,
}: IProfileContextProvider) => {
  const [profile, setProfile] = useState<IProfile | undefined>(undefined);
  const [isFetching, setIsFetching] = useState(false);

  const updateProfile = async () => {
    setIsFetching(true);
    const authRequest = await getAuthRequest();
    authRequest
      .get('profile')
      .then((response) => {
        setProfile(response.data);
      })
      .catch((e) => {
        console.error(e);
      })
      .finally(() => setIsFetching(false));
  };

  const ProviderValue = useMemo(
    () => ({
      profile,
      isFetching,
      updateProfile: updateProfile,
    }),
    [profile, isFetching, updateProfile]
  );

  return (
    <ProfileContext.Provider value={ProviderValue}>
      {children}
    </ProfileContext.Provider>
  );
};
