import React, { useEffect, useState } from 'react';
import axiosInstance from '../utils/axiosInstance';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../assets/settingsStyle.css';

const Settings = ({ user }) => {
    const [settings, setSettings] = useState({ name: '', email: '' });

    const handleChange = (e) => {
        setSettings({ ...settings, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axiosInstance.post('/user/settings', settings);
            toast.success('Settings updated successfully!');
        } catch (error) {
            console.error('Error updating settings', error);
            toast.error('Error updating settings');
        }
    };

    useEffect(() => {
        if (user) {
            setSettings({ name: user.name, email: user.email });
        }
    }, [user]);

    return (
        <div className="settings-container">
            <h2 className="settings-header">Settings</h2>
            <form onSubmit={handleSubmit} className="settings-form">
                <input
                    type="text"
                    name="name"
                    value={settings.name}
                    onChange={handleChange}
                    placeholder="Name"
                    className="form-input"
                />
                <input
                    type="email"
                    name="email"
                    value={settings.email}
                    onChange={handleChange}
                    placeholder="Email"
                    className="form-input"
                />
                <button type="submit" className="form-button">Save Settings</button>
            </form>
            <ToastContainer />
        </div>
    );
};

export default Settings;
