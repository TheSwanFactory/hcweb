import { useState } from "preact/hooks";
import { execute } from "@swanfactory/hclang";

function evaluateCode(code: string): string {
  console.log(`Evaluating code: ${code}`);
  console.log(execute);
  try {
    const result = code.toUpperCase();
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

  const handleEvaluation = (code: string): void => {
    setError("");
    setIsLoading(true);
    try {
      const evalResult = evaluateCode(code);
      setResult(evalResult);
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : String(e));
    } finally {
      setIsLoading(false);
    }
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
    </div>
  );
}
