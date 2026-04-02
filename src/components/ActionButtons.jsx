import { Search, Copy, Check, Wand2 } from 'lucide-react';
import { useState } from 'react';

export default function ActionButtons({ 
  onBeautify, 
  onCopy, 
  viewMode, 
  setViewMode, 
  searchQuery, 
  setSearchQuery,
  hasValidJson
}) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    onCopy();
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="panel-header" style={{ borderBottom: '1px solid var(--border-color)', borderTop: 'none' }}>
      <div className="toggle-group">
        <button 
          className={`toggle-btn ${viewMode === 'raw' ? 'active' : ''}`}
          onClick={() => setViewMode('raw')}
        >
          Raw Format
        </button>
        <button 
          className={`toggle-btn ${viewMode === 'tree' ? 'active' : ''}`}
          onClick={() => setViewMode('tree')}
        >
          Tree View
        </button>
      </div>

      <div className="action-buttons">
        {viewMode === 'raw' && (
          <div className="search-container">
            <Search size={14} color="var(--text-muted)" />
            <input 
              type="text" 
              className="search-input" 
              placeholder="Search..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        )}
        
        <button className="btn" onClick={handleCopy} disabled={!hasValidJson} title="Copy formatted JSON">
          {copied ? <Check size={16} className="brand-logo"/> : <Copy size={16} />}
          {copied ? 'Copied!' : 'Copy'}
        </button>
        
        <button className="btn btn-primary" onClick={onBeautify} disabled={!hasValidJson}>
          <Wand2 size={16} />
          Beautify
        </button>
      </div>
    </div>
  );
}
