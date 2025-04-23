import { axiosInstance } from "../lib/utils";
import { create } from 'zustand'
import toast from 'react-hot-toast'
import { useAuthStore } from "./useAuthStore";

export const useMessageAuth = create((set, get) => ({
    selectedUser: null,
    messages: [],
    setSelectedUser: (selectedUser) => set({ selectedUser }),
    getMessages: async (userId) => {
        try {
            const res = await axiosInstance.get(`/message/getMessages/${userId}`)
            set({ messages: res.data })
        } catch (error) {
            toast.error(error?.response?.data?.message || 'Failed to fetch messages')
            console.log(`Error in getMessages  `, error)
        }
    },
    sendMessage: async (originalText, userId) => {
        try {
            const res = await axiosInstance.post(`/message/send-message/${userId}`, { originalText })
            // Add the new message to the messages array immediately
            set((state) => ({
                messages: [...state.messages, res.data.msg]
            }))
            return res.data.msg
        } catch (error) {
            toast.error(error?.response?.data?.message || 'Failed to send message')
            console.log(`Error in sendMessage  `, error)
            throw error
        }
    },
    subscribeToMessages: () => {
        const { selectedUser } = get()
        if (!selectedUser) return
        const socket = useAuthStore.getState().socket;

        if (!socket) {
            console.log('Socket not connected')
            return
        }

        // Listen for new messages from other users
        socket.on('newMessage', (newMessage) => {
            console.log('Received new message:', newMessage)
            // set((state) => ({
            //     messages: [...state.messages, newMessage]
            // }))
            set({ messages: [...get().messages, newMessage] })
        })

        // Listen for confirmation of sent messages
        // socket.on('messageSent', (sentMessage) => {
        //     console.log('Message sent confirmation:', sentMessage)
        //     // Check if message already exists to avoid duplicates
        //     set((state) => {
        //         const messageExists = state.messages.some(msg => msg._id === sentMessage._id)
        //         if (messageExists) {
        //             return state
        //         }
        //         return {
        //             messages: [...state.messages, sentMessage]
        //         }
        //     })
        // })
    },
    unSubscribeToMessages: () => {
        const socket = useAuthStore.getState().socket
        if (socket) {
            socket.off('newMessage')
        }
    }
}))