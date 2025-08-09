import React from 'react';
import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';
import remarkGfm from 'remark-gfm';
import '../styles/ReadmeViewer.css';

interface ReadmeViewerProps {
  content: string;
  loading: boolean;
  error?: string;
}

const ReadmeViewer: React.FC<ReadmeViewerProps> = ({ content, loading, error }) => {
  if (loading) return <div className="readme-loading">Loading README...</div>;
  if (error) return <div className="readme-error">{error}</div>;
  if (!content) return <div className="readme-empty">No README found.</div>;

  return (
    <div className="readme-viewer markdown-body">
      <ReactMarkdown rehypePlugins={[rehypeRaw]} remarkPlugins={[remarkGfm]}>
        {content}
      </ReactMarkdown>
    </div>
  );
};

export default ReadmeViewer;
