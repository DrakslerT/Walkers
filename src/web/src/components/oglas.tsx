import React from 'react'
import { Item } from 'semantic-ui-react'

const Oglas = ({userName, startTime, endTime, location}) => (
    <Item>
      <Item.Content>
        <Item.Header as='a'>{userName}</Item.Header>
        <Item.Meta>Opis</Item.Meta>
        <Item.Description>
            <p>Lokacija: {{location}}</p>
            <p>Čas začetka: {{startTime}}</p>
            <p>Čas konca: {{endTime}}</p>
        </Item.Description>
        <Item.Extra></Item.Extra>
      </Item.Content>
    </Item>
)

export default Oglas