import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import RepoList, { Repo } from '../components/RepoList';
import { useAppContext } from '../context/AppContext';
import { useGithub } from '../hooks/useGithub';

const UserPage: React.FC = () => {
  const { username } = useParams<{ username: string }>();
  const navigate = useNavigate();
  const {
    repos, setRepos,
    loading, setLoading,
    error, setError
  } = useAppContext();
  const { fetchRepos } = useGithub();

  useEffect(() => {
    if (username) {
      setLoading(true);
      fetchRepos(username)
        .then(setRepos)
        .catch((err: any) => {
          setRepos([]);
          setError(err.message);
        })
        .finally(() => setLoading(false));
    }
    // eslint-disable-next-line
  }, [username]);

  const handleSelectRepo = (repo: Repo) => {
    navigate(`/user/${username}/${repo.name}`);
  };

  return (
    <div className="user-page">
      <h2>Repositories for {username}</h2>
  
      {loading ? (
        <div>Loading repositories...</div>
      ) : error ? (
        <div style={{ color: 'red' }}>{error}</div>
      ) : (
        <RepoList repos={repos} onSelect={handleSelectRepo} />
      )}
    </div>
  );
};

export default UserPage; 