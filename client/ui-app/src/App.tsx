import React, {useState, useEffect} from 'react';
import { Header, Icon, List } from 'semantic-ui-react'
import axios from 'axios';

import './App.css';

const App: React.FC = () => {
  const [tags, setTags] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/api/tags')
      .then(response => setTags(response.data))
      .catch(error => console.log(error));
  }, [])

  return (
    <div>
      <Header as='h2'>
        <Icon name='plug' />
        <Header.Content>Uptime Guarantee</Header.Content>
      </Header>
      <List>
        {tags.map((t: any) => (
          <List.Item key={t.id}>{t.name}</List.Item>
        ))}
      </List>
    </div>
  );
}

export default App;
