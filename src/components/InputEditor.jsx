import { useRef, useState, useEffect } from 'react';
import Editor from '@monaco-editor/react';

export default function InputEditor({ onChange, initialValue }) {
  const [value, setValue] = useState(initialValue || '');
  const editorRef = useRef(null);
  
  // Debounce logic
  useEffect(() => {
    const timer = setTimeout(() => {
      onChange(value);
    }, 300);
    return () => clearTimeout(timer);
  }, [value, onChange]);

  function handleEditorChange(val) {
    setValue(val);
  }

  function handleEditorDidMount(editor, monaco) {
    editorRef.current = editor;
  }

  return (
    <div className="panel editor-panel">
      <div className="panel-header">
        <span>JSON Input</span>
      </div>
      <Editor
        height="100%"
        defaultLanguage="json"
        theme="vs-dark"
        value={value}
        onChange={handleEditorChange}
        onMount={handleEditorDidMount}
        options={{
          minimap: { enabled: false },
          fontSize: 14,
          wordWrap: 'on',
          scrollBeyondLastLine: false,
          formatOnPaste: true,
          padding: { top: 16 }
        }}
      />
    </div>
  );
}
