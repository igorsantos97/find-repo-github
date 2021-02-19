import React, { FormEvent, useState, useEffect } from 'react';
import { FiChevronRight } from 'react-icons/fi';
import { Link } from 'react-router-dom';

import Logo from '../../img/logo-github.svg';
import api from '../../services/api';

import { toast } from 'react-toastify';

import { Title, Form, Repositories, Error } from './styles';

interface Repository {
  full_name: string,
  description: string,
  owner: {
    login: string,
    avatar_url: string
  }
}

const Home: React.FC = () => {
  const [inputError, setInputError] = useState('');
  const [newRepo, setNewRepo] = useState('');
  const [repositories, setRepositories] = useState<Repository[]>(() => {
    const storageRepositories = localStorage.getItem('@githubexplorer');

    if (storageRepositories) {
      return JSON.parse(storageRepositories);
    }
    return [];
  });

  useEffect(() => {
    localStorage.setItem('@githubexplorer', JSON.stringify(repositories))
  }, [repositories]);

  async function handleClick(e: FormEvent) {
    e.preventDefault();

    try {
      if (!newRepo) {
        toast.error('Este campo está vazio');
        setInputError('Digite o autor/repositório');
        return;
      }
      const response = await api.get(`repos/${newRepo}`);
      const respository = response.data;

      setRepositories([...repositories, respository]);
      setNewRepo('');
      toast.success('Repositório adicionado com sucesso');
    } catch (e) {
      setInputError('Nome de repositório inválido');
      return toast.error('Oops algo deu erro');
    }
  }

  return (
    <>
      <img src={Logo} alt="Logo do Github" />
      <Title>Encontre repositórios no GitHub</Title>

      <Form hasError={!!inputError} onSubmit={handleClick}>
        <input
          value={newRepo}
          onChange={(e) => setNewRepo(e.target.value)}
          placeholder="Digite o nome do repositório"
        />
        <button type="submit">Pesquisar</button>

      </Form>
      {inputError && <Error>{inputError}</Error>}

      <Repositories>
        {repositories.map(repo => (
          <Link key={repo.full_name} to={`/repository/${repo.full_name}`}>
            <img src={repo.owner.avatar_url}
              alt={repo.owner.login}
            />
            <div>
              <strong>{repo.full_name}</strong>
              <p>{repo.description}</p>
            </div>
            <FiChevronRight size={40} />
          </Link>
        ))}
      </Repositories>
    </>
  )
}

export default Home;
