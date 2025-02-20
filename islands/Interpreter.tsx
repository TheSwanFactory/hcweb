import { useState, useEffect } from "preact/hooks";
import { execute } from "@swanfactory/hclang";

interface HistoryItem {
  code: string;
  result: string;
  timestamp: number;
}

function evaluateCode(code: string): string {
  console.log(`Evaluating code: ${code}`);
  console.log(execute);
  try {
    const result = execute(code);
    console.log(`Result: ${result}`);
    return result.toString();
  } catch (error: unknown) {
    console.error(error);
    return `Error: ${error instanceof Error ? error.message : String(error)}`;
  }
}

export default function Interpreter() {
  const [text, setText] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [result, setResult] = useState<string>("");
  const [history, setHistory] = useState<HistoryItem[]>([]);

  useEffect(() => {
    const savedHistory = localStorage.getItem('hc-history');
    if (savedHistory) {
      setHistory(JSON.parse(savedHistory));
    }
  }, []);

  const handleEvaluation = (code: string): void => {
    setError("");
    setIsLoading(true);
    try {
      const evalResult = evaluateCode(code);
      setResult(evalResult);
      
      const newHistoryItem = {
        code,
        result: evalResult,
        timestamp: Date.now()
      };
      
      const updatedHistory = [newHistoryItem, ...history].slice(0, 50); // Keep last 50 items
      setHistory(updatedHistory);
      localStorage.setItem('hc-history', JSON.stringify(updatedHistory));
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : String(e));
    } finally {
      setIsLoading(false);
    }
  };

  const handleHistoryClick = (historyItem: HistoryItem) => {
    setText((prev) => prev + "\n" + historyItem.code);
  };

  return (
    <div>
      <textarea
        value={text}
        onChange={(e) => setText((e.target as HTMLTextAreaElement).value)}
        placeholder="Enter code to evaluate"
        rows={10}
        cols={50}
      />
      <br />
      <button onClick={() => handleEvaluation(text)} disabled={isLoading}>
        Evaluate
      </button>
      <div>
        {isLoading && <div>Evaluating...</div>}
        {error && <div style={{ color: "red" }}>{error}</div>}
        {result && !error && (
          <div>
            <pre>{result}</pre>
          </div>
        )}
      </div>
      <div style={{ marginTop: "20px" }}>
        <h3>History</h3>
        <div style={{ maxHeight: "200px", overflowY: "auto" }}>
          {history.map((item, index) => (
            <div 
              key={item.timestamp}
              onClick={() => handleHistoryClick(item)}
              style={{ 
                cursor: "pointer", 
                padding: "8px",
                margin: "4px",
                border: "1px solid #ccc",
                borderRadius: "4px"
              }}
            >
              <pre style={{ margin: 0 }}>{item.code}</pre>
              <small style={{ color: "#666" }}>
                {new Date(item.timestamp).toLocaleString()}
              </small>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
