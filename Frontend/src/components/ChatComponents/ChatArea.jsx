import React, { useEffect, useRef } from 'react'
import { useMessageAuth } from '../../store/useMessageStore'
import { useAuthStore } from '../../store/useAuthStore'

const DEFAULT_PROFILE_PIC = "https://ui-avatars.com/api/?background=random"

const ChatArea = () => {
  const { selectedUser, getMessages, messages, subscribeToMessages, unSubscribeToMessages } = useMessageAuth()
  const { authUser } = useAuthStore()
  const messagesEndRef = useRef(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    if (selectedUser?._id) {
      subscribeToMessages()
      getMessages(selectedUser._id)
      console.log("Subscribed to messages for user:", selectedUser._id, messages);
      return () => unSubscribeToMessages();
    }
  }, [selectedUser?._id, getMessages, subscribeToMessages, unSubscribeToMessages])

  useEffect(() => {
    scrollToBottom()
  }, [messages])



  if (!selectedUser) {
    return (
      <div className="flex-1 flex items-center justify-center bg-base-100">
        <div className="text-center">
          <h3 className="text-xl font-semibold text-gray-600">Select a contact to start chatting</h3>
        </div>
      </div>
    )
  }

  return (
    <>
      <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-base-100">
        {messages?.map((message, index) => {
          const isCurrentUser = message.senderId === authUser?.user?._id;
          const profilePic = isCurrentUser
            ? authUser?.user?.profilePic || `${DEFAULT_PROFILE_PIC}&name=${encodeURIComponent(authUser?.user?.fullName || 'U')}`
            : selectedUser?.profilePic || `${DEFAULT_PROFILE_PIC}&name=${encodeURIComponent(selectedUser?.fullName || 'U')}`;

          const selectedLanguage = authUser?.user?.selectedLanguage || 'English';
          return (
            <div
              key={message._id || index}
              className={`chat ${isCurrentUser ? "chat-end" : "chat-start"} transition duration-200`}
            >
              <div className="chat-image avatar">
                <div className="w-10 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                  <img
                    src={profilePic}
                    alt={isCurrentUser ? authUser?.user?.fullName || 'You' : selectedUser?.fullName || 'User'}
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = `${DEFAULT_PROFILE_PIC}&name=${encodeURIComponent(
                        isCurrentUser ? authUser?.user?.fullName?.[0] || 'U' : selectedUser?.fullName?.[0] || 'U'
                      )}`;
                    }}
                  />
                </div>
              </div>
              <div className="chat-header text-sm font-semibold text-gray-700 mb-1">
                {isCurrentUser ? authUser?.user?.fullName || 'You' : selectedUser?.fullName || 'User'}
                <time className="ml-2 text-xs font-normal text-gray-500">

                  {new Date(message.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </time>
              </div>
              <div className={`chat-bubble ${isCurrentUser ? 'bg-primary text-primary-content' : 'bg-base-200 text-base-content'} max-w-xs shadow-md`}>
                {message.translatedText?.[selectedLanguage] || message.originalText || "No message content"}



                {console.log(message)}
              </div>
            </div>
          );
        })}
        <div ref={messagesEndRef} />
      </div>
    </>
  )
}

export default ChatArea