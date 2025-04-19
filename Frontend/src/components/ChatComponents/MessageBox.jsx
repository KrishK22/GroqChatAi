import React, { useRef, useState } from 'react'
import { useMessageAuth } from '../../store/useMessageStore'
import { useAuthStore } from '../../store/useAuthStore'

const MessageBox = () => {
  const inputRef = useRef()
  const { selectedUser, sendMessage } = useMessageAuth()

  const handleButton = async () => {
    const input = inputRef.current.value.trim()

    try {
      await sendMessage(input, selectedUser._id)
      inputRef.current.value = ''
    } catch (error) {
      console.error('Error sending message:', error)
    }
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleButton()
    }
  }

  if (!selectedUser) {
    return null
  }

  return (
    <div className="bg-base-100 border-t border-base-300 p-4 rounded-br-3xl">
      <div className="flex items-center gap-3">
        {/* Emoji Button (optional) */}
        <button className="btn btn-ghost btn-circle tooltip" data-tip="Emoji">
          <span className="text-lg">😊</span>
        </button>

        {/* Input Field */}
        <input
          type="text"
          placeholder="Type your message..."
          className="input input-bordered input-md w-full rounded-full"
          ref={inputRef}
          onKeyPress={handleKeyPress}
        />

        {/* Attachment Button (optional) */}
        <button className="btn btn-ghost btn-circle tooltip" data-tip="Attach file">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828L18 10.828a4 4 0 00-5.656-5.656L5.636 11.172a6 6 0 008.485 8.485" />
          </svg>
        </button>

        {/* Send Button */}
        <button
          className={`btn btn-primary btn-circle `}
          onClick={handleButton}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </div>
  )
}

export default MessageBox