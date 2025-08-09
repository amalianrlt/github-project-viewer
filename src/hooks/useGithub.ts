import { useCallback } from 'react';
import { Repo } from '../components/RepoList';
import { decodeBase64ToUTF8 } from '../helper/decodeBase64ToUTF8';

export interface GithubUser {
  login: string;
  avatar_url: string;
  html_url: string;
}

export const useGithub = () => {
  const fetchRepos = useCallback(async (username: string): Promise<Repo[]> => {
    const res = await fetch(`https://api.github.com/users/${username}/repos`);
    if (!res.ok) throw new Error('Failed to fetch repositories');
    return res.json();
  }, []);

  const fetchReadme = useCallback(async (username: string, repo: string): Promise<string> => {
    const res = await fetch(`https://api.github.com/repos/${username}/${repo}/readme`);
    if (res.status === 404) {
      return 'No README found';
    }
    if (!res.ok) throw new Error('Failed to fetch README');
    const data = await res.json();
    if (!data.content) throw new Error('No README found');
    return decodeBase64ToUTF8(data.content);
  }, []);

  const searchUsers = useCallback(async (query: string, perPage: number, page: number): Promise<{ items: GithubUser[]; total_count: number, page: number, per_page: number }>  => {
    const res = await fetch(`https://api.github.com/search/users?q=${encodeURIComponent(query)}&per_page=${perPage}&page=${page}`);
    if (!res.ok) throw new Error('Failed to search users');
    const data = await res.json();
      return {
        items: data.items.map((user: any) => ({
          login: user.login,
          avatar_url: user.avatar_url,
          html_url: user.html_url,
        })),
        total_count: data.total_count,
        page: page,
        per_page: perPage,
      };

  }, []);

  return { fetchRepos, fetchReadme, searchUsers };
}; 