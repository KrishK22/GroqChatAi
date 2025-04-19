import React, { useEffect, useRef, useState } from 'react'
import { useAuthStore } from '../../store/useAuthStore'
import { useMessageAuth } from '../../store/useMessageStore'

const DEFAULT_PROFILE_PIC = "https://ui-avatars.com/api/?background=random"

const ChatSidebar = () => {
  const emailAddContactRef = useRef()
  const { AddContact, authUser, contacts, setContacts } = useAuthStore()
  const { selectedUser, setSelectedUser } = useMessageAuth()
  const [isAddingContact, setIsAddingContact] = useState(false)
  const [localContacts, setLocalContacts] = useState([])

  // Sync local contacts with store contacts
  useEffect(() => {
    setLocalContacts(contacts)
  }, [contacts])

  // Initial sync with authUser contacts
  useEffect(() => {
    if (authUser?.user?.myContacts) {
      setLocalContacts(authUser.user.myContacts)
      setContacts(authUser.user.myContacts)
    }
  }, [authUser, setContacts])

  const handleAddContact = async () => {
    const email = emailAddContactRef.current.value
    if (email && !isAddingContact) {
      try {
        setIsAddingContact(true)
        await AddContact(email)
        emailAddContactRef.current.value = ''
      } finally {
        setIsAddingContact(false)
      }
    }
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !isAddingContact) {
      handleAddContact()
    }
  }

  console.log("Selected User ID:", selectedUser?._id)


  return (
    <>
      <div className="w-80 bg-base-100 p-6 rounded-tl-3xl rounded-bl-3xl flex flex-col">
        <div className='flex justify-between'>
          <h2 className="text-2xl font-bold mb-4">Chats</h2>

          <div className="dropdown dropdown-end">
            <div tabIndex={0} role="button" className="btn btn-primary btn-sm gap-2 rounded-lg shadow-md hover:shadow-lg transition duration-300 min-w-fit px-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
              </svg>
              Add Contacts
            </div>

            <ul tabIndex={0} className="dropdown-content z-[1] menu p-4 shadow bg-base-100 rounded-box w-64 space-y-2">
              <li>
                <input
                  type="email"
                  placeholder="Email Address"
                  className="input input-bordered w-full"
                  ref={emailAddContactRef}
                  disabled={isAddingContact}
                  onKeyPress={handleKeyPress}
                />
              </li>
              <li className="flex justify-end">
                <button
                  className={`btn btn-sm btn-primary mt-2 ${isAddingContact ? 'loading' : ''}`}
                  onClick={handleAddContact}
                  disabled={isAddingContact}
                >
                  {isAddingContact ? 'Adding...' : 'Add'}
                </button>
              </li>
            </ul>
          </div>
        </div>

        <div className='space-y-2 overflow-auto'>
          {localContacts.map((contact, index) => {
            return (
              <div key={index} className="card card-compact bg-base-200 hover:bg-primary hover:text-primary-content transition duration-200 cursor-pointer" onClick={() => setSelectedUser(contact)}>
                <div className="card-body flex flex-row items-center gap-4 py-3">
                  <div className="avatar online">
                    <div className="w-10 rounded-full">
                      <img
                        src={contact.profilePic || `${DEFAULT_PROFILE_PIC}&name=${encodeURIComponent(contact?.fullName || 'U')}`}
                        alt={contact.fullName || 'User'}
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src = `${DEFAULT_PROFILE_PIC}&name=${encodeURIComponent(contact?.fullName?.[0] || 'U')}`;
                        }}
                      />
                    </div>
                  </div>
                  <div>
                    <h3 className="font-semibold text-base">{contact.fullName || 'Unknown User'}</h3>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </>
  )
}

export default ChatSidebar

