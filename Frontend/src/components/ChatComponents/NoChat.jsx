import React from 'react'

const NoChat = () => {
    return (
        <div className="flex-1 flex items-center justify-center bg-base-100 text-base-content p-6 rounded-tr-3xl rounded-br-3xl">
            <div className="text-center max-w-md opacity-70">
                <div className="mb-6">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="mx-auto w-16 h-16 text-primary"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M7 8h10M7 12h4m1 8c-4.418 0-8-3.582-8-8s3.582-8 8-8 8 3.582 8 8-3.582 8-8 8z" />
                    </svg>
                </div>

                <h2 className="text-2xl font-bold mb-2">No Conversation Selected</h2>
                <p className="text-sm text-gray-500">
                    Select a conversation from the sidebar to start chatting. Your messages will appear here.
                </p>
            </div>
        </div>

    )
}

export default NoChat