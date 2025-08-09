import React, { useState } from 'react';
import SearchBar from '../components/SearchBar';
import { useGithub, GithubUser } from '../hooks/useGithub';
import { useNavigate } from 'react-router-dom';

const HomePage: React.FC = () => {
  const navigate = useNavigate();
  const { searchUsers } = useGithub();

  const [searched, setSearched] = useState(false);
  const [users, setUsers] = useState<GithubUser[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [query, setQuery] = useState('');

  const [totalCount, setTotalCount] = useState(0);
  const [perPage] = useState(10); // fixed per page
  const [page, setPage] = useState(1);

  const fetchPage = async (searchQuery: string, pageNumber: number) => {
    setLoading(true);
    setError('');
    try {
      const res = await searchUsers(searchQuery, perPage, pageNumber);
      setUsers(res.items);
      setTotalCount(res.total_count);
    } catch (err: any) {
      setUsers([]);
      setError(err.message);
    } finally {
      setLoading(false);
      setSearched(true);
    }
  };

  const handleSearch = (searchQuery: string) => {
    setQuery(searchQuery);
    setPage(1);
    fetchPage(searchQuery, 1);
  };

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
    fetchPage(query, newPage);
  };

  const totalPages = Math.min(100, Math.ceil(totalCount / perPage));

  const getPageNumbers = () => {
    const pages: (number | string)[] = [];
  
    if (totalPages <= 10) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      pages.push(1);
  
      let start = Math.max(2, page - 2);
      let end = Math.min(totalPages - 1, page + 2);
  
      if (page <= 4) {
        start = 2;
        end = 5;
      }
      if (page >= totalPages - 3) {
        start = totalPages - 4;
        end = totalPages - 1;
      }
  
      if (start > 2) pages.push('...');
      for (let i = start; i <= end; i++) pages.push(i);
      if (end < totalPages - 1) pages.push('...');
      pages.push(totalPages);
    }
  
    return pages;
  };
  

  return (
    <div className="home-page">
      <SearchBar onSearch={handleSearch} />

      {searched && !loading && users.length > 0 && (
        <div style={{ marginBottom: 12, color: '#555', fontSize: 15 }}>
          Total {totalCount} results found for "{query}"
        </div>
      )}

      {loading && <div>Loading...</div>}
      {error && <div style={{ color: 'red' }}>{error}</div>}

      {searched && !loading && (
        <>
          <div className="user-list">
            {users.length === 0 && <div>No users found.</div>}
            {users.map((user) => (
              <div
                key={user.login}
                className="user-list-item"
                onClick={() => navigate(`/user/${user.login}`)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  cursor: 'pointer',
                  gap: 12,
                  padding: 8,
                  borderBottom: '1px solid #eee'
                }}
              >
                <img
                  src={user.avatar_url}
                  alt={user.login}
                  width={36}
                  height={36}
                  style={{ borderRadius: '50%' }}
                />
                <span style={{ fontWeight: 500 }}>{user.login}</span>
                <a
                  href={user.html_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ marginLeft: 'auto', color: '#0366d6' }}
                >
                  GitHub
                </a>
              </div>
            ))}
          </div>

          {totalCount > perPage && (
            <div style={{ display: 'flex', justifyContent: 'center', gap: 4, marginTop: 16 }}>
              <button
                onClick={() => handlePageChange(page - 1)}
                disabled={page === 1}
                style={buttonStyle}
              >
                ‹
              </button>
              {getPageNumbers().map((p, idx) =>
                typeof p === 'number' ? (
                  <button
                    key={idx}
                    onClick={() => handlePageChange(p)}
                    style={{
                      ...buttonStyle,
                      backgroundColor: p === page ? '#0969da' : '#f6f8fa',
                      color: p === page ? '#fff' : '#24292f',
                      fontWeight: p === page ? 'bold' : 'normal'
                    }}
                  >
                    {p}
                  </button>
                ) : (
                  <span key={idx} style={{ padding: '6px 8px' }}>
                    {p}
                  </span>
                )
              )}
              <button
                onClick={() => handlePageChange(page + 1)}
                disabled={page === totalPages}
                style={buttonStyle}
              >
                ›
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

const buttonStyle: React.CSSProperties = {
  border: '1px solid #d0d7de',
  backgroundColor: '#f6f8fa',
  padding: '6px 12px',
  borderRadius: 6,
  cursor: 'pointer',
  fontSize: 14
};

export default HomePage;
