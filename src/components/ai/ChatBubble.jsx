import "../../styles/ai/ChatBubble.css";

const ChatBubble = ({ role, text }) => <div className={`chat-bubble chat-bubble--${role}`}>{text}</div>;

export default ChatBubble;