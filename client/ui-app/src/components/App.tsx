import React, {useState, useEffect} from 'react';
import { Header, Icon, List, Container } from 'semantic-ui-react'

import axios from 'axios';

const App: React.FC = () => {
  const [tags, setTags] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/api/tags')
      .then(response => setTags(response.data))
      .catch(error => console.log(error));
  }, [])

  return (
    <Container mt='2' style={{marginTop: '1rem'}}>
      <Header as='h1' icon textAlign='center' >
        <Icon name='settings' circular />
        <Header.Content>shtipkov.org</Header.Content>
      </Header>
      <List>
        {tags.map((t: any) => (
          <List.Item key={t.id}>{t.name}</List.Item>
        ))}
      </List>
    </Container>
  );
}

export default App;
