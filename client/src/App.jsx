import { useState } from "react";

function App() {
  const [prompt, setPrompt] = useState("");
  const [plan, setPlan] = useState(null);
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [history, setHistory] = useState([]);

  const handleGenerate = async (customPrompt) => {
    const finalPrompt = customPrompt || prompt;

    if (!finalPrompt) return;

    setLoading(true);
    setError("");

    try {
      const response = await fetch("http://localhost:5000/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt: finalPrompt }),
      });

      if (!response.ok) {
        throw new Error("Server error");
      }

      const data = await response.json();

      setPlan(data.plan);
      setCode(data.html);

      // Save to history (avoid duplicates)
      setHistory((prev) =>
        prev.includes(finalPrompt) ? prev : [finalPrompt, ...prev]
      );

    } catch (err) {
      setError("Something went wrong. Check backend.");
    }

    setLoading(false);
  };

  return (
    <div
      style={{
        fontFamily: "Arial",
        background: "#f4f6f9",
        minHeight: "100vh",
        padding: "30px",
      }}
    >
      <h1 style={{ textAlign: "center" }}>AI UI Generator 🚀</h1>

      {/* INPUT AREA */}
      <div style={{ textAlign: "center", marginBottom: "20px" }}>
        <input
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Describe your UI..."
          style={{
            width: "400px",
            padding: "10px",
            borderRadius: "6px",
            border: "1px solid #ccc",
          }}
        />
        <button
          onClick={() => handleGenerate()}
          style={{
            marginLeft: "10px",
            padding: "10px 20px",
            borderRadius: "6px",
            border: "none",
            background: "#4f46e5",
            color: "white",
            cursor: "pointer",
          }}
        >
          {loading ? "Generating..." : "Generate"}
        </button>
      </div>

      {error && (
        <div style={{ textAlign: "center", color: "red", marginBottom: "20px" }}>
          {error}
        </div>
      )}

      <div style={{ display: "flex", gap: "20px" }}>
        {/* HISTORY PANEL */}
        <div
          style={{
            width: "250px",
            background: "white",
            padding: "15px",
            borderRadius: "8px",
            height: "400px",
            overflowY: "auto",
          }}
        >
          <h3>History</h3>
          {history.length === 0 && <p>No prompts yet</p>}

          {history.map((item, index) => (
            <div
              key={index}
              onClick={() => handleGenerate(item)}
              style={{
                padding: "8px",
                marginBottom: "8px",
                background: "#f3f4f6",
                borderRadius: "6px",
                cursor: "pointer",
              }}
            >
              {item}
            </div>
          ))}
        </div>

        {/* PLAN PANEL */}
        <div
          style={{
            flex: 1,
            background: "white",
            padding: "15px",
            borderRadius: "8px",
          }}
        >
          <h3>Plan</h3>
          <pre style={{ fontSize: "12px" }}>
            {plan ? JSON.stringify(plan, null, 2) : "No plan yet"}
          </pre>
        </div>

        {/* CODE PANEL */}
        <div
          style={{
            flex: 1,
            background: "white",
            padding: "15px",
            borderRadius: "8px",
          }}
        >
          <h3>Generated Code</h3>
          <pre style={{ fontSize: "12px" }}>
            {code || "No code generated yet"}
          </pre>
        </div>
      </div>

      {/* LIVE PREVIEW */}
      <div
        style={{
          marginTop: "30px",
          background: "white",
          padding: "20px",
          borderRadius: "8px",
        }}
      >
        <h3>Live Preview</h3>
        <div dangerouslySetInnerHTML={{ __html: code }} />
      </div>
    </div>
  );
}

export default App;
