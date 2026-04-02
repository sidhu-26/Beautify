import { useMemo } from 'react';

export default function OutputViewer({ rawFormattedJson, searchQuery }) {
  const highlightedContent = useMemo(() => {
    if (!searchQuery.trim() || !rawFormattedJson) {
      return rawFormattedJson;
    }

    try {
      // Escape for regex to prevent invalid regex crashes
      const safeQuery = searchQuery.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      const parts = rawFormattedJson.split(new RegExp(`(${safeQuery})`, 'gi'));
      
      return parts.map((part, index) => 
        part.toLowerCase() === searchQuery.toLowerCase() ? 
          <span key={index} className="highlight">{part}</span> : 
          part
      );
    } catch {
      return rawFormattedJson;
    }
  }, [rawFormattedJson, searchQuery]);

  return (
    <div className="output-content">
      <pre className="raw-json-output">
        {highlightedContent}
      </pre>
    </div>
  );
}
