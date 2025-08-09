import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import ReadmeViewer from '../components/ReadmeViewer';
import { useAppContext } from '../context/AppContext';
import { useGithub } from '../hooks/useGithub';

const RepoPage: React.FC = () => {
  const { username, repo } = useParams<{ username: string; repo: string }>();
  const {
    readme, setReadme,
    loading, setLoading,
    error, setError
  } = useAppContext();
  const { fetchReadme } = useGithub();

  useEffect(() => {
    if (username && repo) {
      setLoading(true);
      setError('');
      setReadme('');
      fetchReadme(username, repo)
        .then(setReadme)
        .catch((err: any) => setError(err.message))
        .finally(() => setLoading(false));
    }
    // eslint-disable-next-line
  }, [username, repo]);

  return (
    <div className="repo-page">
      <h2>README: {repo}</h2>
      <ReadmeViewer content={readme} loading={loading} error={error} />
    </div>
  );
};

export default RepoPage; 