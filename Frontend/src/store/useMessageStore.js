import { axiosInstance } from "../lib/utils";
import { create } from 'zustand'
import toast from 'react-hot-toast'

export const useMessageAuth = create((set, get) => ({
    selectedUser: null,
    messages: [],
    setSelectedUser: (selectedUser) => set({ selectedUser }),
    getMessages: async (userId) => {
        const { messages } = get()
        try {
            const res = await axiosInstance.get(`/message/getMessages/${userId}`)
            set({ messages: res.data })
        } catch (error) {
            toast.error(error?.response?.data?.message || 'Failed to add contact')
            console.log(`Error in getMessages  `, error)
        }
    },
    sendMessage: async (originalText, userId) => {
        try {

            const res = await axiosInstance.post(`/message/send-message/${userId}`, { originalText })
            

        } catch (error) {
            toast.error(error?.response?.data?.message || 'Failed to add contact')
            console.log(`Error in Add Contacts  `, error)
        }
    }



}))