import { useState, useEffect, useCallback } from 'react';
import { FileJson } from 'lucide-react';
import InputEditor from './components/InputEditor';
import ActionButtons from './components/ActionButtons';
import OutputViewer from './components/OutputViewer';
import JSONTree from './components/JSONTree';
import InsightsPanel from './components/InsightsPanel';
import { analyzeJSON } from './utils/jsonAnalyzer';
import './index.css';

function App() {
  const [rawInput, setRawInput] = useState('');
  const [jsonObject, setJsonObject] = useState(null);
  const [formattedJson, setFormattedJson] = useState('');

  const [isValid, setIsValid] = useState(false);
  const [errorMsg, setErrorMsg] = useState(null);

  const [viewMode, setViewMode] = useState('raw'); // 'raw' | 'tree'
  const [searchQuery, setSearchQuery] = useState('');
  const [insights, setInsights] = useState([]);

  // Process JSON explicitly on "Beautify" or whenever input changes minimally (but usually handled by Beautify button as per requirements)
  const processJSON = useCallback((inputStr) => {
    if (!inputStr || inputStr.trim() === '') {
      setJsonObject(null);
      setFormattedJson('');
      setIsValid(false);
      setErrorMsg(null);
      setInsights([]);
      return;
    }

    try {
      const parsed = JSON.parse(inputStr);
      setJsonObject(parsed);
      setFormattedJson(JSON.stringify(parsed, null, 2));
      setIsValid(true);
      setErrorMsg(null);

      // Generate Insights
      const results = analyzeJSON(parsed);
      setInsights(results);
    } catch (e) {
      setIsValid(false);
      setErrorMsg(e.message);
      setJsonObject(null);
      setFormattedJson('');
      setInsights([]);
    }
  }, []);

  // Update when input changes internally
  useEffect(() => {
    processJSON(rawInput);
  }, [rawInput, processJSON]);


  const handleBeautify = () => {
    if (isValid && formattedJson) {
      // Typically, beautify would format the INPUT editor. We don't have bi-directional binding 
      // right now, so it just ensures output is refreshed
      processJSON(rawInput);
    }
  };

  const handleCopy = () => {
    if (isValid && formattedJson) {
      navigator.clipboard.writeText(formattedJson);
    }
  };

  return (
    <>
      <header className="app-header">
        <div className="brand-title">
          <FileJson size={24} className="brand-logo" />
          Beautify
        </div>
      </header>

      <main className="main-layout">
        <InputEditor
          initialValue={rawInput}
          onChange={setRawInput}
        />

        <div className="right-section panel">
          <InsightsPanel insights={insights} />

          <div className="output-panel">
            <ActionButtons
              onBeautify={handleBeautify}
              onCopy={handleCopy}
              viewMode={viewMode}
              setViewMode={setViewMode}
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              hasValidJson={isValid}
            />

            {errorMsg && (
              <div className="error-banner">
                <strong>Invalid JSON:</strong> {errorMsg}
              </div>
            )}

            {!errorMsg && !isValid && (
              <div className="output-content" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-muted)' }}>
                <p>Paste or type JSON on the left to begin inspecting.</p>
              </div>
            )}

            {isValid && viewMode === 'raw' && (
              <OutputViewer
                rawFormattedJson={formattedJson}
                searchQuery={searchQuery}
              />
            )}

            {isValid && viewMode === 'tree' && (
              <JSONTree jsonObject={jsonObject} />
            )}
          </div>
        </div>
      </main>
    </>
  );
}

export default App;
