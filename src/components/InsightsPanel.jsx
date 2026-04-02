import { Info, AlertTriangle, AlertCircle, CheckCircle2 } from 'lucide-react';

export default function InsightsPanel({ insights }) {
  if (!insights || insights.length === 0) {
    return (
      <div className="insights-panel panel">
        <div className="panel-header">Insights Panel</div>
        <div className="empty-state">
          <CheckCircle2 size={32} className="empty-state-icon" color="var(--success-color)" />
          <p>No structural issues or notable insights found.</p>
        </div>
      </div>
    );
  }

  const getIconAndClass = (insightStr) => {
    if (insightStr.includes('is null')) return { icon: <Info size={16} />, className: 'insight-null' };
    if (insightStr.includes('empty array') || insightStr.includes('empty object') || insightStr.includes('empty string')) 
      return { icon: <AlertCircle size={16} />, className: 'insight-empty' };
    if (insightStr.includes('depth > 5')) return { icon: <AlertTriangle size={16} />, className: 'insight-depth' };
    return { icon: <Info size={16} />, className: 'insight-null' };
  };

  return (
    <div className="insights-panel panel">
      <div className="panel-header">
        <span>Insights</span>
        <span style={{color: 'var(--accent-color)'}}>{insights.length} notes</span>
      </div>
      <div className="insights-content">
        {insights.map((insight, idx) => {
          const { icon, className } = getIconAndClass(insight);
          // Split for rendering strong tag around path
          const [pathPart, ...rest] = insight.split('`');
          const finalInsight = rest.length > 0 ? (
            <span>{pathPart} <strong>{rest[0]}</strong> {rest.slice(1).join('`')}</span>
          ) : insight;

          return (
            <div key={idx} className={`insight-item ${className}`}>
              <div className="insight-icon">{icon}</div>
              <div>{finalInsight}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
