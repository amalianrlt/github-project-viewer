import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Repo } from '../components/RepoList';

interface AppContextProps {
  username: string;
  setUsername: (username: string) => void;
  repos: Repo[];
  setRepos: (repos: Repo[]) => void;
  selectedRepo: Repo | null;
  setSelectedRepo: (repo: Repo | null) => void;
  readme: string;
  setReadme: (readme: string) => void;
  loading: boolean;
  setLoading: (loading: boolean) => void;
  error: string;
  setError: (error: string) => void;
}

const AppContext = createContext<AppContextProps | undefined>(undefined);

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [username, setUsername] = useState('');
  const [repos, setRepos] = useState<Repo[]>([]);
  const [selectedRepo, setSelectedRepo] = useState<Repo | null>(null);
  const [readme, setReadme] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  return (
    <AppContext.Provider
      value={{
        username,
        setUsername,
        repos,
        setRepos,
        selectedRepo,
        setSelectedRepo,
        readme,
        setReadme,
        loading,
        setLoading,
        error,
        setError,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
}; 