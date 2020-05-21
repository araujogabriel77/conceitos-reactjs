import React, { useState, useEffect } from "react";
import api from './services/api';
import "./styles.css";

function App() {
  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
    async function getRepositories() {
      await api.get('/repositories').then(response => {
        setRepositories(response.data);
      })
    }
    getRepositories();
  }, []);

  async function handleAddRepository() {
    const newRepository = {
      title: 'Teste',
      url: 'https://github.com/repo-test',
      techs: ['html5', 'css3']
    }

    const response = await api.post('/repositories', newRepository);

    if (response.status === 200) {
      setRepositories([...repositories, response.data]);
    }
  }

  async function handleRemoveRepository(id) {
    await api.delete(`/repositories/${id}`)
    const updatedRepositories = repositories.filter(item => item.id !== id);

    setRepositories(updatedRepositories);
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map(repository => (
          <li
            key={repository.id}
          >
            {repository.title}
            <button onClick={() => handleRemoveRepository(repository.id)}>
              Remover
          </button>
          </li>
        ))}

      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
