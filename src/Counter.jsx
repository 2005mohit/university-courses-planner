import { useState } from "react";

const styles = {
  page: {
    minHeight: "100vh",
    background: "#0f0f1a",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    fontFamily: "'Segoe UI', system-ui, sans-serif",
    color: "#fff",
    padding: "24px",
  },
  card: {
    background: "#1a1a2e",
    border: "1px solid #2a2a4a",
    borderRadius: "24px",
    padding: "48px 56px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "32px",
    boxShadow: "0 8px 48px rgba(99,102,241,0.15)",
    maxWidth: "360px",
    width: "100%",
  },
  title: {
    fontSize: "13px",
    letterSpacing: "0.2em",
    textTransform: "uppercase",
    color: "#6366f1",
    fontWeight: 600,
    margin: 0,
  },
  countWrap: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "6px",
  },
  count: {
    fontSize: "96px",
    fontWeight: 700,
    lineHeight: 1,
    letterSpacing: "-4px",
    color: "#fff",
    transition: "color 0.2s",
    margin: 0,
  },
  label: {
    fontSize: "12px",
    color: "#555577",
    letterSpacing: "0.1em",
    textTransform: "uppercase",
  },
  buttons: {
    display: "flex",
    gap: "12px",
    alignItems: "center",
  },
  btn: (color) => ({
    width: "52px",
    height: "52px",
    borderRadius: "50%",
    border: "none",
    fontSize: "24px",
    fontWeight: 700,
    cursor: "pointer",
    background: color,
    color: "#fff",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    transition: "transform 0.1s, opacity 0.1s",
    lineHeight: 1,
  }),
  resetBtn: {
    background: "transparent",
    border: "1px solid #2a2a4a",
    borderRadius: "999px",
    color: "#555577",
    fontSize: "12px",
    letterSpacing: "0.1em",
    textTransform: "uppercase",
    padding: "8px 20px",
    cursor: "pointer",
    transition: "border-color 0.2s, color 0.2s",
  },
  history: {
    width: "100%",
    borderTop: "1px solid #2a2a4a",
    paddingTop: "20px",
    display: "flex",
    flexDirection: "column",
    gap: "8px",
  },
  histLabel: {
    fontSize: "11px",
    color: "#444466",
    letterSpacing: "0.1em",
    textTransform: "uppercase",
    margin: 0,
  },
  histList: {
    display: "flex",
    gap: "6px",
    flexWrap: "wrap",
  },
  histItem: (i, total) => ({
    fontSize: "13px",
    color: `rgba(99,102,241,${0.4 + (i / total) * 0.6})`,
    fontWeight: 600,
  }),

};

export default function Counter() {
  const [count, setCount] = useState(0);
  const [history, setHistory] = useState([0]);

  const update = (next) => {
    setCount(next);
    setHistory((h) => [...h.slice(-6), next]);
  };

  const countColor =
    count > 0 ? "#a5b4fc" : count < 0 ? "#f87171" : "#fff";

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <p style={styles.title}>React Counter</p>

        <div style={styles.countWrap}>
          <p style={{ ...styles.count, color: countColor }}>{count}</p>
          <span style={styles.label}>current value</span>
        </div>

        <div style={styles.buttons}>
          <button
            style={styles.btn("#ef4444")}
            onClick={() => update(count - 1)}
            onMouseEnter={(e) => (e.target.style.opacity = "0.8")}
            onMouseLeave={(e) => (e.target.style.opacity = "1")}
          >
            −
          </button>
          <button
            style={styles.btn("#6366f1")}
            onClick={() => update(count + 1)}
            onMouseEnter={(e) => (e.target.style.opacity = "0.8")}
            onMouseLeave={(e) => (e.target.style.opacity = "1")}
          >
            +
          </button>
        </div>

        <button
          style={styles.resetBtn}
          onClick={() => update(0)}
          onMouseEnter={(e) => {
            e.target.style.borderColor = "#6366f1";
            e.target.style.color = "#6366f1";
          }}
          onMouseLeave={(e) => {
            e.target.style.borderColor = "#2a2a4a";
            e.target.style.color = "#555577";
          }}
        >
          Reset
        </button>

        {history.length > 1 && (
          <div style={styles.history}>
            <p style={styles.histLabel}>History</p>
            <div style={styles.histList}>
              {history.map((v, i) => (
                <span key={i} style={styles.histItem(i, history.length)}>
                  {v}
                  {i < history.length - 1 && (
                    <span style={{ color: "#2a2a4a", marginLeft: "6px" }}>→</span>
                  )}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>


    </div>
  );
}
