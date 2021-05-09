import { Item } from 'semantic-ui-react';
import Oglas from './Oglas';
import styles from './List.module.css';

interface AddListProps {
  adds: string[];
}


const AddList = ({ adds }: AddListProps) => {
  return (
    <Item.Group divided>
      {adds.map((add) => {
        return (
          // Oglas TODO
          <div>
            <div className={styles.bord}>
              <p className={styles.Og}>Oglas</p>
              <p className={styles.Start}>Čas Začetka: {new Date().toISOString()}</p>
              <p className={styles.End}>Čas Konca: {new Date().toISOString()}</p>
              <p className={styles.Mesto}>Lokacija: Ljubljana</p>
              <Oglas
                username="dummy"
                location="ljubljana"
                startTime={new Date().toISOString()}
                endTime={new Date().toISOString()}
              />
              <br></br>

            </div>
            <br></br>
          </div>
          
        );
      })}
    </Item.Group>
  );
};

export default AddList;
