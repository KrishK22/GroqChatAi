import React, { useEffect } from 'react'
import ChatHeader from './ChatHeader'
import ChatArea from './CharArea'
import MessageBox from './MessageBox'
import NoChat from './NoChat'

const ChatContainer = () => {

   


    return (
        <>
            <div className="flex flex-col flex-1 bg-base-200 rounded-tr-3xl rounded-br-3xl  ">
                <ChatHeader />
                <ChatArea />
                <MessageBox />
            </div>
        </>
    )
}

export default ChatContainer