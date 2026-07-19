import { useState } from "react";
import { askAI } from "../../api/aiApi";
import ChatBubble from "./ChatBubble";
import "../../styles/ai/ChatPanel.css";

const ChatPanel = ({ bookId, currentPage }) => {
  const [messages, setMessages] = useState([]);
  const [suggestions, setSuggestions] = useState(["لخصي هذا الفصل", "اشرحي هذه الصفحة", "أعطيني أسئلة مراجعة"]);
  const [input, setInput] = useState("");

  const handleAsk = async (question) => {
    if (!question.trim()) return;
    setMessages((prev) => [...prev, { role: "user", text: question }]);
    setInput("");
    const { data } = await askAI({ question, bookId, currentPage });
    setMessages((prev) => [...prev, { role: "ai", text: data.answer }]);
    setSuggestions(data.suggestions || []);
  };

  return (
    <div className="chat-panel">
      <div className="chat-panel__messages">
        {messages.map((m, i) => <ChatBubble key={i} role={m.role} text={m.text} />)}
      </div>

      <div className="chat-panel__suggestions">
        {suggestions.map((s) => (
          <button key={s} className="chat-panel__chip" onClick={() => handleAsk(s)}>{s}</button>
        ))}
      </div>

      <form className="chat-panel__input-row" onSubmit={(e) => { e.preventDefault(); handleAsk(input); }}>
        <input className="chat-panel__input" value={input} onChange={(e) => setInput(e.target.value)} placeholder="اسألي عن هذا الكتاب..." />
        <button type="submit" className="chat-panel__send">إرسال</button>
      </form>
    </div>
  );
};

export default ChatPanel;