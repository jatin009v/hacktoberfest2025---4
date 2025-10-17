import React, { useState, useEffect, useRef } from 'react'
import { MessageSquare, X, Send, Trash2 } from 'lucide-react'
import useChatbot from '../hooks/useChatbot'
import { motion, AnimatePresence } from 'framer-motion'

// Custom Robot Icon
function RobotIcon({ className }) {
  return (
    <svg
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
    >
      <rect x="3" y="7" width="18" height="14" rx="2" ry="2" />
      <circle cx="8" cy="13" r="1.5" fill="white" />
      <circle cx="16" cy="13" r="1.5" fill="white" />
      <path d="M8 18c1 1 4 1 5 0" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
      <rect x="10" y="3" width="4" height="2" rx="0.5" ry="0.5" />
    </svg>
  )
}

export default function Chatbot() {
  const [open, setOpen] = useState(false)
  const [input, setInput] = useState('')
  const { messages, sendMessage, loading, clearChat } = useChatbot()
  const messagesEndRef = useRef(null)

  // Scroll to bottom when messages update
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, loading])

  const onSend = async () => {
    if (!input.trim()) return
    const text = input
    setInput('') // clear input immediately
    await sendMessage(text)
  }

  return (
    <>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.25 }}
            className="fixed right-6 bottom-20 w-80 h-96 bg-white dark:bg-gray-800 rounded-xl shadow-lg flex flex-col z-50"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-2 border-b dark:border-gray-700 bg-primary text-white">
              <div className="flex items-center gap-2 font-semibold">
                <RobotIcon className="w-5 h-5 text-white" />
                Hubi
              </div>
              <div className="flex items-center gap-2">
                <button onClick={clearChat} className="p-1 rounded hover:bg-primary/20">
                  <Trash2 className="w-4 h-4"/>
                </button>
                <button onClick={() => setOpen(false)} className="p-1 rounded hover:bg-primary/20">
                  <X className="w-4 h-4"/>
                </button>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 p-3 overflow-auto space-y-2">
              {messages.map((m, i) => (
                <div
                  key={i}
                  className={`p-2 rounded-md max-w-[80%] flex items-start gap-2 ${
                    m.sender === 'user'
                      ? 'ml-auto bg-primary text-white'
                      : 'bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-100'
                  }`}
                >
                  {m.sender === 'bot' && <RobotIcon className="w-4 h-4 text-primary mt-1" />}
                  <span>{m.text}</span>
                </div>
              ))}
              {loading && <div className="text-sm text-gray-500">Hubi is typing…</div>}
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="p-3 border-t dark:border-gray-700 flex gap-2">
              <input
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && onSend()}
                placeholder="Ask Hubi something…"
                className="flex-1 px-3 py-2 rounded-md border dark:bg-gray-700 dark:border-gray-600"
              />
              <button onClick={onSend} className="px-3 py-2 bg-primary text-white rounded-md">
                <Send className="w-4 h-4"/>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Toggle button */}
      <button
        onClick={() => setOpen(o => !o)}
        className="fixed right-6 bottom-6 bg-primary text-white p-4 rounded-full shadow-lg z-50"
      >
        <MessageSquare className="w-5 h-5"/>
      </button>
    </>
  )
}

