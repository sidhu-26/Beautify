import ReactJson from '@microlink/react-json-view';

export default function JSONTree({ jsonObject }) {
  if (!jsonObject) {
    return (
      <div className="output-content" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-muted)' }}>
        <p>No valid JSON data to display.</p>
      </div>
    );
  }

  return (
    <div className="output-content">
      <ReactJson 
        src={jsonObject} 
        theme="twilight"
        iconStyle="triangle"
        enableClipboard={true}
        displayDataTypes={false}
        displayObjectSize={true}
        indentWidth={4}
        collapsed={false}
        style={{ backgroundColor: 'transparent', fontFamily: '"JetBrains Mono", monospace' }}
      />
    </div>
  );
}
