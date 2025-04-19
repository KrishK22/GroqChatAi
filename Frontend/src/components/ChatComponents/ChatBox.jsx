import React from 'react'
import ChatSidebar from './ChatSidebar'
import NoChat from './NoChat'
import ChatConstainer from './ChatContainer'
import { useMessageAuth } from '../../store/useMessageStore'

const ChatBox = () => {
    // let userselected = false
    const { selectedUser, setSelectedUser } = useMessageAuth()

    return (
        <>
            <div className="flex h-[calc(100vh-4rem)] bg-base-300   text-base-content mt-14 justify-center  " >
                <div className='flex w-full p-12 '>
                    <ChatSidebar />
                    {!selectedUser ? <NoChat /> : <ChatConstainer />}
                </div>


            </div>


        </>
    )
}

export default ChatBox
