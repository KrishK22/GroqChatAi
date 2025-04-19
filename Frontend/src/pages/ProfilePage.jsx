import { motion } from 'framer-motion';
import { FaGithub, FaLinkedin, FaTwitter } from 'react-icons/fa';
import React, { useEffect, useMemo, useRef } from 'react';
import { useAuthStore } from '../store/useAuthStore';


const ProfilePage = () => {
    const DEFAULT_PROFILE_PIC = "https://ui-avatars.com/api/?background=random"
    const editLanguageRef = useRef()
    const { updateLang } = useAuthStore()

    const ChangeLanguage = () => {
        const language = editLanguageRef.current.value;
        updateLang(language)
    }


    const { authUser } = useAuthStore()

    const user = useMemo(() => authUser?.user, [authUser]);


    return (
        <div className="min-h-screen bg-gradient-to-br from-base-200 to-base-100 flex items-center justify-center p-6">
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="card card-side bg-base-100 shadow-2xl rounded-2xl w-full max-w-5xl overflow-hidden"
            >
                {/* Left Section: Profile Image with Gradient BG */}
                <div className="bg-gradient-to-br from-primary to-secondary p-10 flex flex-col items-center justify-center w-80">
                    <motion.img
                        whileHover={{ scale: 1.05 }}
                        src={user.profilePic || `${DEFAULT_PROFILE_PIC}&name=${encodeURIComponent(authUser.user.fullName)}`}
                        alt="Profile"
                        className="rounded-full w-36 h-36 object-cover border-4 border-white shadow-xl"
                    />
                    <h3 className="mt-5 text-white font-bold text-xl text-center">{user.fullName}</h3>
                </div>

                {/* Right Section: Details */}
                <div className="card-body space-y-4">
                    <motion.h2
                        className="card-title text-2xl font-semibold"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.3 }}
                    >
                        {user.fullName}
                    </motion.h2>

                    <p className="text-gray-500">{user.email}</p>

                    <div className="flex items-center gap-3">
                        <span className="font-semibold">Language:</span>
                        <select ref={editLanguageRef} onChange={ChangeLanguage} className="select select-bordered w-full max-w-xs">
                            <option disabled selected>{user.selectedLanguage}</option>
                            <option>English</option>
                            <option>Hindi</option>
                            <option>Spanish</option>
                            <option>French</option>
                            <option>German</option>
                        </select>

                    </div>

                    <div>
                        <h3 className="font-bold text-lg mb-2">My Contacts</h3>
                        <ul className="grid gap-2 max-h-40 overflow-y-auto pr-2">
                            {user.myContacts.map((contact, index) => (
                                <motion.li
                                    key={index}
                                    className="bg-base-200 p-3 rounded-lg border border-base-300 hover:shadow transition"
                                    whileHover={{ scale: 1.02 }}
                                >
                                    <p className="font-semibold">{contact.fullName}</p>
                                    <p className="text-sm text-gray-500">{contact.email}</p>
                                </motion.li>
                            ))}
                        </ul>
                    </div>
                </div>
            </motion.div>
        </div>


    );
};

export default ProfilePage;
