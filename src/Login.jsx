import React, { useState, useEffect } from "react";
import './Login.css'
import { signInWithEmailAndPassword, signOut } from "firebase/auth";
import { auth } from "./utils/firebase";
import { Link, useNavigate } from "react-router-dom";

function Login() {
    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('');
    const [message, setMessage] = useState('');
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [currentUser, setCurrentUser] = useState(null);
    const navigate = useNavigate();
    
    useEffect(() => {
        // Set up authentication state observer
        const unsubscribe = auth.onAuthStateChanged((user) => {
            setCurrentUser(user);
            setIsLoggedIn(!!user);
        });

        // Cleanup subscription on unmount
        return () => unsubscribe();
    }, []);

    const handleSubmit = async(e) => {
        e.preventDefault();
        try {
            await signInWithEmailAndPassword(auth, email, pass);
            setMessage("User logged in successfully");
            setIsLoggedIn(true);
            // Clear form fields after successful login
            setEmail('');
            setPass('');
        } catch (error) {
            setMessage(error.message);
        }
    };

    const handleSignOut = async() => {
        try {
            await signOut(auth);
            setMessage("Signed out successfully");
            setIsLoggedIn(false);
            setCurrentUser(null);
            navigate('/login');
        } catch (error) {
            setMessage("Error signing out: " + error.message);
        }
    };

    if (isLoggedIn && currentUser) {
        return (
            <div className="login">
                <h4>Welcome, {currentUser.email}!</h4>
                <div className="logged-in-container">
                    <p>You are currently logged in.</p>
                    <button 
                        onClick={handleSignOut}
                        className="button"
                    >
                        Sign Out
                    </button>
                </div>
                {message && <p className="message">{message}</p>}
            </div>
        );
    }

    return (
        <div className="login">
            <h4>Log In</h4>
            <p className="user">
                New User? <Link to="/signup">Sign Up here!</Link>
            </p>
            <form onSubmit={handleSubmit}>
                <div className="area">
                    <label>Your email</label>
                    <input
                        type="email"
                        className="input"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div className="area">
                    <label>Your Password</label>
                    <input
                        type="password"
                        className="input"
                        value={pass}
                        onChange={(e) => setPass(e.target.value)}
                        required
                    />
                </div>
                <button type="submit" className="button">Log In</button>

                {message && <p className="message">{message}</p>}
            </form>
        </div>
    );
}

export default Login;