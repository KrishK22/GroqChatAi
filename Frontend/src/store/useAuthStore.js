import { axiosInstance } from "../lib/utils";
import { create } from 'zustand'
import toast, { ToastBar } from 'react-hot-toast'

const BASE_URL = "http://localhost:3000"

export const useAuthStore = create((set, get) => ({
    authUser: null,
    isCheckingAuth: false,
    isSigninUp: false,
    isLogginIn: false,
    updatedContact: null,
    contacts: [],

    // setContacts: (contacts) => {
    //     set({ contacts: contacts || [] })
    // },


    checkAuth: async () => {
        set({ isCheckingAuth: true })
        try {
            const res = await axiosInstance.get('/auth/check')
            const userContacts = res.data?.user?.myContacts || []
            set({
                authUser: res.data,
                contacts: userContacts
            })
            return userContacts
        } catch (error) {
            console.log('error in checkauth frontend ', error)
            set({ authUser: null, contacts: [] })
            return []
        } finally {
            set({ isCheckingAuth: false })
        }
    },

    signUp: async (data) => {
        set({ isSigninUp: true })
        try {
            const res = await axiosInstance.post('/auth/signup', data)
            const userContacts = res.data?.user?.myContacts || []
            set({
                authUser: res.data,
                contacts: userContacts
            })
            toast.success("Signed Up successfully")
        } catch (error) {
            toast.error(error.response.data.message)
            console.log(`Error in signUp `, error)
        } finally {
            set({ isSigninUp: false })
        }
    },

    logIn: async (data) => {
        set({ isLogginIn: true })
        try {
            const res = await axiosInstance.post('/auth/login', data)
            const userContacts = res.data?.user?.myContacts || []
            set({
                authUser: res.data,
                contacts: userContacts
            })
            toast.success("Logged In")
        } catch (error) {
            toast.error(error.response.data.message)
            console.log(`Error in Loggin In`, error)
        } finally {
            set({ isLogginIn: false })
        }
    },

    logOut: async () => {
        try {
            await axiosInstance.post('/auth/logout')
            set({ authUser: null, contacts: [] })
            toast.success("Logged Out Successfully")
        } catch (error) {
            toast.error(error.response.data.message)
            console.log(`Error in loggingOut `, error)
        }
    },

    setContacts: (contact) => set((state) => ({
        contacts: [...state.contacts, contact]
    })),
    AddContact: async (email) => {
        try {
            const res = await axiosInstance.patch('/contacts/add-new-contact', { email })
            console.log("hu", res)
            if (res.data && res.data.updatedContact) {
                const updatedContacts = res.data.updatedContact.myContacts || []
                // set((state) => ({
                //     authUser: {
                //         ...state.authUser,
                //         user: res.data.user
                //     },
                //     contacts: updatedContacts
                // }))
                set((state) => ({
                    authUser: {
                        ...state.authUser,
                        user: res.data.updatedContact
                    },
                    contacts: updatedContacts
                }))


                if (res.data.updatedContact?.fullName) {
                    toast.success(`${res.data.updatedContact.fullName} added in your contacts`)
                } else {
                    toast.success('Contact added successfully')
                }

                const { checkAuth } = get()
                const freshContacts = await checkAuth()

                if (freshContacts && freshContacts.length > 0) {
                    set({ contacts: freshContacts })
                }
            }
        } catch (error) {
            toast.error(error?.response?.data?.message || 'Failed to add contact')
            console.log(`Error in Add Contacts  `, error)
        }
    },
    updateLang: async (lang) => {
        try {
            await axiosInstance.patch('/message/updateLanguage', { lang })
            toast.success("Native Language Updated")
        } catch (error) {
            toast.error(error?.response?.data?.message || 'Failed to add contact')
            console.log(`Error in updatlANG  `, error)
        }
    }
}))