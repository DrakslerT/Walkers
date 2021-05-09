import { Item } from 'semantic-ui-react';
import Oglas from './Oglas';

interface AddListProps {
  adds: string[];
}

const AddList = ({ adds }: AddListProps) => {
  return (
    <Item.Group divided>
      {adds.map((add) => {
        return (
          // Oglas TODO
          <Oglas
            username="dummy"
            location="ljubljana"
            startTime={new Date().toISOString()}
            endTime={new Date().toISOString()}
          />
        );
      })}
    </Item.Group>
  );
};

export default AddList;
