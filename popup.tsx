import { useStorage } from "@plasmohq/storage/hook"
import { SELECTOR_STATUS, SELECTOR_TARGET } from "./consts"

function Popup() {
    const [sourceSelector, setSourceSelector] = useStorage("sourceSelector", SELECTOR_STATUS)
    const [targetSelector, setTargetSelector] = useStorage("targetSelector", SELECTOR_TARGET)

    const refreshActiveTab = () => {
        chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
            if (tabs[0]?.id) chrome.tabs.reload(tabs[0].id)
        })
    }

    const cardStyle: React.CSSProperties = {
        border: "1px solid #e5e7eb",
        borderRadius: "10px",
        padding: "14px 16px",
        marginBottom: "14px",
        background: "#ffffff",
        boxShadow: "0 1px 3px rgba(0,0,0,0.08)"
    }

    const labelRow: React.CSSProperties = {
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: "8px",
        marginBottom: "4px"
    }

    const labelStyle: React.CSSProperties = {
        fontWeight: 600,
        fontSize: "13px",
        color: "#111827",
        margin: 0
    }

    const resetBtn: React.CSSProperties = {
        fontSize: "12px",
        padding: "4px 8px",
        borderRadius: "6px",
        border: "0px solid #d1d5db",
        background: "#ee5058ff",
        color: "white",
        cursor: "pointer"
    }

    const inputStyle: React.CSSProperties = {
        width: "100%",
        boxSizing: "border-box",
        padding: "8px 10px",
        marginBottom: "12px",
        border: "1px solid #d1d5db",
        borderRadius: "6px",
        fontSize: "13px",
        fontFamily: "sans-serif",
        outline: "none"
    }

    return (
        <div
            style={{
                padding: "16px",
                minWidth: "420px",
                fontFamily: "system-ui, sans-serif",
                background: "#f3f4f6"
            }}
        >
            <h2 style={{ fontSize: "18px", marginBottom: "16px", fontWeight: 700, color: "#1f2937" }}>
                📌 Jira Status Position Restorer
            </h2>

            <div style={cardStyle}>
                <p style={{ margin: 0, fontSize: "14px", lineHeight: "1.5", color: "#374151" }}>
                    🔄 This extension restores the <b>Jira issue status dropdown</b> back to the{" "}
                    <b>top-right corner</b> of the issue view — where it had been for years, and the only logical place for it.
                </p>
            </div>

            <div style={cardStyle}>
                <p style={{ marginTop: 0, marginBottom: "8px", fontSize: "14px", fontWeight: 600, color: "#1f2937" }}>
                    ⚙️ Selectors
                </p>
                <p style={{ fontSize: "12px", marginTop: 0, marginBottom: "12px", color: "#6b7280" }}>
                    If Atlassian changes their DOM again, update the CSS selectors here. Saving will refresh the page automatically.
                </p>
                <div style={labelRow}>
                    <p style={labelStyle}>Source selector</p>
                    {(sourceSelector !== SELECTOR_STATUS) && <button
                        style={resetBtn}
                        onClick={() => {
                            setSourceSelector(SELECTOR_STATUS)
                            refreshActiveTab()
                        }}
                        title="Reset to default"
                    >
                        Reset
                    </button>}
                </div>
                <input
                    style={inputStyle}
                    value={sourceSelector}
                    onChange={(e) => {
                        setSourceSelector(e.target.value)
                        refreshActiveTab()
                    }}
                />
                <p style={{ fontSize: "11px", color: "#6b7280", marginTop: "-8px", marginBottom: "12px" }}>
                    CSS selector of the <b>status dropdown</b> element you want to move.
                </p>

                <div style={labelRow}>
                    <p style={labelStyle}>Target selector</p>
                    {(targetSelector !== SELECTOR_TARGET) && <button
                        style={resetBtn}
                        onClick={() => {
                            setTargetSelector(SELECTOR_TARGET)
                            refreshActiveTab()
                        }}
                        title="Reset to default"
                    >
                        Reset
                    </button>}
                </div>
                <input
                    style={inputStyle}
                    value={targetSelector}
                    onChange={(e) => {
                        setTargetSelector(e.target.value)
                        refreshActiveTab()
                    }}
                />
                <p style={{ fontSize: "11px", color: "#6b7280", marginTop: "-8px" }}>
                    CSS selector of the <b>container</b> where the dropdown should be placed.
                </p>
            </div>

            <div style={{ fontSize: "12px", color: "#6b7280", marginTop: "10px", textAlign: "center" }}>
                👤 Author: Jan Moser ·{" "}
                <a
                    href="https://www.linkedin.com/in/jan-moser-78b2339a/"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ color: "#2563eb", textDecoration: "none", fontWeight: 500, marginRight: "8px" }}
                >
                    LinkedIn
                </a>
                <a
                    href="https://github.com/janmoser87/jira-issue-status-restorer"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ color: "#2563eb", textDecoration: "none", fontWeight: 500 }}
                >
                    GitHub
                </a>
            </div>
        </div>
    )
}

export default Popup
