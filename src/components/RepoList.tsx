import React from 'react';
import '../styles/RepoList.css';

export interface Repo {
  id: number;
  name: string;
  description: string;
  html_url: string;
}

interface RepoListProps {
  repos: Repo[];
  onSelect: (repo: Repo) => void;
  selectedRepoName?: string;
}

const RepoList: React.FC<RepoListProps> = ({ repos, onSelect, selectedRepoName }) => {
  if (!repos.length) {
    return <div className="repo-list-empty">No repositories found.</div>;
  }
  return (
    <ul className="repo-list">
      {repos.map(repo => (
        <li
          key={repo.id}
          className={`repo-list-item${selectedRepoName === repo.name ? ' selected' : ''}`}
          onClick={() => onSelect(repo)}
        >
          <div className="repo-name">{repo.name}</div>
          {repo.description && <div className="repo-description">{repo.description}</div>}
        </li>
      ))}
    </ul>
  );
};

export default RepoList; 