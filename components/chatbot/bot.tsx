import { useState } from "react";

export default function Chatbot() {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([{ sender: "bot", text: "Hello! How can I help you today?" }]);
    const [input, setInput] = useState("");

    const toggleChat = () => {
        setIsOpen(!isOpen);
    };

    const sendMessage = async () => {
        if (!input.trim()) return;

        // Add the user message to the chat
        setMessages((prev) => [...prev, { sender: "user", text: input }]);

        try {
            // Send the user message to the chatbot API
            const response = await fetch("http://localhost:5005/webhooks/rest/webhook", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ sender: "user", message: input }),
            });

            if (!response.ok) throw new Error("Failed to connect to chatbot API");

            const data = await response.json();

            console.log("ád", data);
            

            // Add each bot response to the chat
            data.forEach((msg) => {
                setMessages((prev) => [
                    ...prev,
                    { sender: "bot", text: msg.text || "No response received." },
                ]);
            });
        } catch (error) {
            setMessages((prev) => [
                ...prev,
                { sender: "bot", text: "Sorry, something went wrong. Please try again later." },
            ]);
            console.error(error);
        }

        setInput(""); // Clear the input field
    };

    return (
        <div className="fixed bottom-4 right-4">
            {/* Chat Button */}
            {!isOpen && (
                <button
                    onClick={toggleChat}
                    className="bg-blue-500 hover:bg-blue-600 text-white rounded-full p-4 shadow-lg"
                >
                    💬
                </button>
            )}

            {/* Chat Interface */}
            {isOpen && (
                <div className="relative bg-white w-80 h-96 rounded-lg shadow-lg flex flex-col">
                    {/* Header */}
                    <div className="bg-blue-500 text-white p-3 flex justify-between items-center rounded-t-lg">
                        <span className="font-bold">Chat Bot</span>
                        <button
                            onClick={toggleChat}
                            className="text-black font-semibold"
                        >
                            ✖
                        </button>
                    </div>

                    {/* Chat Body */}
                    <div className="flex-grow p-4 overflow-y-auto">
                        {messages.map((msg, idx) => (
                            <div
                                key={idx}
                                className={`mb-2 ${msg.sender === "user" ? "text-right" : "text-left"
                                    }`}
                            >
                                <span
                                    className={`inline-block px-3 py-2 rounded-lg ${msg.sender === "user"
                                            ? "bg-blue-100 text-blue-800"
                                            : "bg-gray-100 text-gray-800"
                                        }`}
                                >
                                    {msg.text}
                                </span>
                            </div>
                        ))}
                    </div>

                    {/* Input Field */}
                    <div className="p-3 border-t border-gray-200 flex gap-2">
                        <input
                            type="text"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            onKeyDown={(e) => e.key === "Enter" && sendMessage()}
                            className="w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                            placeholder="Type your message..."
                        />
                        <button
                            onClick={sendMessage}
                            className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-2 rounded-lg"
                        >
                            Send
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}
