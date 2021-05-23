import React, { useEffect, useState } from 'react';
import { Dropdown } from 'semantic-ui-react';
import { getAuthRequest } from '../../shared/http';
import { IBreed } from '../../pages/Profile/context/ProfileContext';
import { errorToast } from '../../shared/Toast';

interface BreedDropdownProps {
  emitBreed: (breedId: number) => void;
  multiple?: boolean;
}

type BreedOptionsType = {
    key: number,
    text: string,
    value: number,
}

export const BreedDropdown: React.FC<BreedDropdownProps> = ({
  emitBreed,
  multiple = false,
}) => {
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const authRequest = getAuthRequest();
  const [selectedBreed, setSelectedBreed] = useState<number|undefined>(undefined);
  const [breedOptions, setBreedOptions] = useState<BreedOptionsType[]>([])

  const fetchBreeds = async() => {
      setLoading(true)
      try {
        const response = await authRequest.get('pasme/getPasme')
        const breedList:BreedOptionsType[] = []
        const breeds: IBreed[] = response.data.pasme
        breeds.map( (breed: IBreed)  => {
            const b: BreedOptionsType = {
                key: breed.ID_pasma,
                text: breed.Pasma_ime,
                value: breed.ID_pasma
            }
            return breedList.push(b)
        })
        setBreedOptions(breedList)
      } catch (e) {
        console.error(e)
        errorToast()
      }

    setLoading(false)
  }

  useEffect(() => {
    if (breedOptions.length === 0){
        fetchBreeds()
    }
  }, [])


  return (
    <Dropdown
    loading={loading}
    fluid
      multiple={multiple}
      onChange={(e, data) => {
          if (data.value && typeof data.value === 'number' ){
              setSelectedBreed(data.value)
              emitBreed(data.value)
          }
      }}
      onSearchChange={(e, data) => {
        setSearchQuery(data.searchQuery)
    }}
      options={breedOptions}
      placeholder="Pick your friends breed 🐶"
      search
      searchQuery={searchQuery}
      selection
      clearable
      value={selectedBreed}
    />
  );
};
