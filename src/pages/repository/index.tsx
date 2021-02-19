import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';

import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';

import Logo from '../../img/logo-github.svg';
import api from '../../services/api';

import { Header, RepositoryInfo, Issues } from './styles';
import Loader from '../../components/Loader';

interface DetailsRepositoryParams {
  repository: string;
}

interface Repository {
  full_name: string;
  description: string;
  stargazers_count: number;
  forks_count: number;
  open_issues_count: number;
  owner: {
    login: string;
    avatar_url: string;
  }
}

interface Issue {
  id: number,
  title: string,
  html_url: string,
  user: {
    login: string;
  }
}

const Repository: React.FC = () => {
  const [repo, setRepo] = useState<Repository | null>(null);
  const [issues, setIssues] = useState<Issue[]>([]);

  const { repository } = useParams<DetailsRepositoryParams>();

  useEffect(() => {
    api.get(`/repos/${repository}`).then((response) => {
      setRepo(response.data);
    });

    api.get(`repos/${repository}/issues`).then((response) => {
      setIssues(response.data);
    });

  }, [repository]);


  return (
    <>
      <Header>
        <img src={Logo} alt="Logo do github" />
        <Link to="/">
          <FiChevronLeft /> Voltar
        </Link>
      </Header>

      {repo && (
        <RepositoryInfo>
          <header>
            <img src={repo.owner.avatar_url} alt={repo.owner.login} />
            <div>
              <strong>{repo.full_name}</strong>
              <p>{repo.description}</p>
            </div>
          </header>
          <ul>
            <li>
              <strong>{repo.stargazers_count}</strong>
              <span>Stars</span>
            </li>
            <li>
              <strong>{repo.forks_count}</strong>
              <span>Forks</span>
            </li>
            <li>
              <strong>{repo.open_issues_count}</strong>
              <span>Issues abertas</span>
            </li>
          </ul>
        </RepositoryInfo>
      )}

      <Issues>
        {issues.length ? issues.map((issue) => (
          <a key={issue.id} target="_blank" rel="noreferrer" href={issue.html_url}>
            <div>
              <strong>{issue.title}</strong>
              <p>{issue.user.login}</p>
            </div>

            <FiChevronRight size={20} />
          </a>
        ))
          : <Loader />
        }
      </Issues>

    </>
  )
}

export default Repository;
