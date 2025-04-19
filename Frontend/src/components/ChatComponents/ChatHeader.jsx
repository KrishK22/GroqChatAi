import React from 'react'
import { useMessageAuth } from '../../store/useMessageStore'

const ChatHeader = () => {
  const { selectedUser } = useMessageAuth()
  // console.log(selectedUser)
  const DEFAULT_PROFILE_PIC = "https://ui-avatars.com/api/?background=random"

  return (
    <div className="sticky top-0 z-10 navbar bg-base-100 border-b border-base-300 px-6 py-4 rounded-tr-3xl">
      <div className="flex-1">
        <div className="flex items-center gap-4">
          <div className="avatar">
            <div className="w-12 h-12 rounded-full overflow-hidden">
              <img src={selectedUser.profilePic || `${DEFAULT_PROFILE_PIC}&name=${encodeURIComponent(selectedUser.fullName)}`} alt={selectedUser.fullName} className="object-cover" />
            </div>
          </div>
          <div>
            <h3 className="font-semibold text-xl  text-base-content">{selectedUser.fullName}</h3>
            <span className="text-sm text-green-500">Online</span>
          </div>
        </div>
      </div>
      <div className="flex-none gap-2">
        <button className="btn btn-sm btn-ghost hover:bg-base-300 focus:outline-none focus:ring-2 focus:ring-blue-500">Call</button>
        <button className="btn btn-sm btn-ghost hover:bg-base-300 focus:outline-none focus:ring-2 focus:ring-blue-500">More</button>
      </div>
    </div>


  )
}

export default ChatHeader