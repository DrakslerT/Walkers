import React, { useMemo } from 'react';
import { createContext, useState } from 'react';
import { getAuthRequest } from '../../../shared/http';
import { errorToast } from '../../../shared/Toast';

interface IAddsContextProvider {
  children: React.ReactElement[] | React.ReactElement;
}

export type IAdd = {
  CasKonca: string;
  CasZacetka: string;
  ID_oglas: number;
  ID_uporabnik: number;
  Ime_uporabnik: string;
  Index: number;
  JeAktiven: { type: 'Buffer'; data: [49] };
  Lokacija: string;
  Lokacija_lat?: number;
  Lokacija_lng?: number;
  OdzivniCas: number;
  PovprecnaOcena: number;
  StSprehodov: number;
  Tip: number;
};

export type AddsContextType = {
  adds: IAdd[];
  isFetching: boolean;
  updateAdds: (q?: string) => void;
};

export const AddsContext = createContext<AddsContextType>({
  adds: [],
  isFetching: false,
  updateAdds: () => {},
});

export const AddsContextProvider = ({ children }: IAddsContextProvider) => {
  const [adds, setAdds] = useState<IAdd[]>([]);
  const [isFetching, setIsFetching] = useState(false);

  const updateAdds = async (q = '') => {
    setIsFetching(true);
    const authRequest = await getAuthRequest();
    let query = '/oglas/getOglasi';

    /** Appends query params to request url */
    if ('' !== q) {
      query += q;
    }

    try {
      const response = await authRequest.get(query);
      setAdds(response.data.oglasi);
    } catch (e) {
      console.error(e);
      setAdds([]);
      errorToast()
    }
    setIsFetching(false);
  };

  const ProviderValue = useMemo(
    () => ({
      adds,
      isFetching,
      updateAdds,
    }),
    [adds, isFetching, updateAdds]
  );

  return (
    <AddsContext.Provider value={ProviderValue}>
      {children}
    </AddsContext.Provider>
  );
};
