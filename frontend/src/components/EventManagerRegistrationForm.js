import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';  // Import useNavigate hook
import { registerEventManager } from '../services/EventManagerService';
import styles from '../Styles/EventManagerRegistrationForm.module.css';  // Import CSS module

const EventManagerRegistrationForm = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const navigate = useNavigate();  // Initialize the useNavigate hook

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await registerEventManager({ name, email, password });
            setMessage(response.data.message);
        } catch (error) {
            setMessage('Error registering Event Manager');
        }
    };

    const handleBackToEvents = () => {
        navigate('/events');  // Redirect to /events when button is clicked
    };

    return (
        <div className={styles.container}>
            <div className={styles.formContainer}>
                <h2 className={styles.header}>Register as Event Manager</h2>
                <form onSubmit={handleSubmit} className={styles.form}>
                    <input
                        type="text"
                        placeholder="Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className={styles.input}
                        required
                    />
                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className={styles.input}
                        required
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className={styles.input}
                        required
                    />
                    <button type="submit" className={styles.submitButton}>Register</button>
                </form>
                {message && <p className={styles.message}>{message}</p>}

                {/* Back to Events Button */}
                <button onClick={handleBackToEvents} className={styles.backButton}>
                    Back to Events
                </button>
            </div>
        </div>
    );
};

export default EventManagerRegistrationForm;
