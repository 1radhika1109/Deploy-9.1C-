import React, { useState, useEffect } from "react";
import './Login.css';
import { signInWithEmailAndPassword, signOut, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "./utils/firebase";
import { Link, useNavigate } from "react-router-dom";
import { Mail, Lock, LogOut, AlertCircle } from 'lucide-react';

function Login() {
    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('');
    const [message, setMessage] = useState('');
    const [messageType, setMessageType] = useState(''); // 'success' or 'error'
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [currentUser, setCurrentUser] = useState(null);
    const navigate = useNavigate();
    
    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((user) => {
            setCurrentUser(user);
            setIsLoggedIn(!!user);
        });
        return () => unsubscribe();
    }, []);

    const handleSubmit = async(e) => {
        e.preventDefault();
        try {
            await signInWithEmailAndPassword(auth, email, pass);
            setMessage("Successfully logged in!");
            setMessageType('success');
            setIsLoggedIn(true);
            setEmail('');
            setPass('');
        } catch (error) {
            setMessage(error.message);
            setMessageType('error');
        }
    };

    const handleGoogleSignIn = async() => {
        try {
            const provider = new GoogleAuthProvider();
            await signInWithPopup(auth, provider);
            setMessage("Successfully logged in with Google!");
            setMessageType('success');
        } catch (error) {
            setMessage(error.message);
            setMessageType('error');
        }
    };

    const handleSignOut = async() => {
        try {
            await signOut(auth);
            setMessage("Signed out successfully");
            setMessageType('success');
            setIsLoggedIn(false);
            setCurrentUser(null);
            navigate('/login');
        } catch (error) {
            setMessage("Error signing out: " + error.message);
            setMessageType('error');
        }
    };

    if (isLoggedIn && currentUser) {
        return (
            <div className="auth-container">
                <div className="auth-card logged-in">
                    <div className="user-profile">
                        {currentUser.photoURL ? (
                            <img 
                                src={currentUser.photoURL} 
                                alt="Profile" 
                                className="profile-image"
                            />
                        ) : (
                            <div className="profile-initial">
                                {currentUser.email[0].toUpperCase()}
                            </div>
                        )}
                        <h2>Welcome!</h2>
                        <p className="user-email">{currentUser.email}</p>
                    </div>
                    <button 
                        onClick={handleSignOut}
                        className="sign-out-btn"
                    >
                        <LogOut size={18} />
                        Sign Out
                    </button>
                    {message && (
                        <div className={`message ${messageType}`}>
                            {messageType === 'error' && <AlertCircle size={18} />}
                            {message}
                        </div>
                    )}
                </div>
            </div>
        );
    }

    return (
        <div className="auth-container">
            <div className="auth-card">
                <h2>Welcome Back</h2>
                <p className="auth-subtitle">Please enter your details to sign in</p>
                
                <form onSubmit={handleSubmit} className="auth-form">
                    <div className="input-group">
                        <Mail size={18} className="input-icon" />
                        <input
                            type="email"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div className="input-group">
                        <Lock size={18} className="input-icon" />
                        <input
                            type="password"
                            placeholder="Password"
                            value={pass}
                            onChange={(e) => setPass(e.target.value)}
                            required
                        />
                    </div>
                    
                    <button type="submit" className="sign-in-btn">
                        Sign In
                    </button>

                    <div className="divider">
                        <span>OR</span>
                    </div>

                    <button 
                        type="button" 
                        className="google-btn"
                        onClick={handleGoogleSignIn}
                    >
                        <img 
                            src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA0OCA0OCI+PHBhdGggZmlsbD0iI0ZGQzEwNyIgZD0iTTQzLjYxMSAyMC4wODNIMTQuMTU3djcuODMzaDI5LjQ1NHoiLz48cGF0aCBmaWxsPSIjRkYzRDAwIiBkPSJNMzQuNjU3IDMzLjMwN2wtMjAuNS0xMy4yMjQtNy44MzMgMTMuMjI0eiIvPjxwYXRoIGZpbGw9IiMzRjUxQjUiIGQ9Ik0xNC4xNTcgMjcuOTE3TDQzLjYxMSAyMC4wODN2Ny44MzN6Ii8+PHBhdGggZmlsbD0iIzRDQUY1MCIgZD0iTTM0LjY1NyAxNC43MDhsLTIwLjUtMTMuMjI0LTcuODMzIDEzLjIyNHoiLz48L3N2Zz4=" 
                            alt="Google" 
                            className="google-icon" 
                        />
                        Continue with Google
                    </button>
                    
                    {message && (
                        <div className={`message ${messageType}`}>
                            {messageType === 'error' && <AlertCircle size={18} />}
                            {message}
                        </div>
                    )}
                </form>
                
                <p className="signup-link">
                    Don't have an account? <Link to="/signup">Sign up</Link>
                </p>
            </div>
        </div>
    );
}

export default Login;