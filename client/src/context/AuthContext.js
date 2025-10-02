// src/context/AuthContext.js
import React, { createContext, useState, useContext, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    // Check if user is logged in when app starts
    useEffect(() => {
        checkAuthStatus();
    }, []);

    const checkAuthStatus = () => {
        try {
            const token = localStorage.getItem('authToken');
            const userData = localStorage.getItem('userData');

            console.log('Checking auth status - Token:', !!token, 'UserData:', !!userData);

            if (token && userData) {
                const parsedUser = JSON.parse(userData);
                console.log('User found:', parsedUser);
                setUser(parsedUser);
            } else {
                console.log('No auth data found');
                setUser(null);
            }
        } catch (error) {
            console.error('Error checking auth status:', error);
            // Clear invalid data
            localStorage.removeItem('authToken');
            localStorage.removeItem('userData');
            setUser(null);
        } finally {
            setLoading(false);
        }
    };

    const login = async (email, password) => {
        try {
            // Replace with your actual login API endpoint
            const response = await fetch('http://localhost:5001/api/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || 'Login failed');
            }

            // Store token and user data
            localStorage.setItem('authToken', data.token);
            localStorage.setItem('userData', JSON.stringify(data.user));

            setUser(data.user);
            return { success: true };

        } catch (error) {
            console.error('Login error:', error);
            return { success: false, error: error.message };
        }
    };

    const logout = () => {
        localStorage.removeItem('authToken');
        localStorage.removeItem('userData');
        setUser(null);
    };

    const isAuthenticated = () => {
        const token = localStorage.getItem('authToken');
        const hasUser = user !== null;
        console.log('isAuthenticated check - Token:', !!token, 'User:', !!hasUser);
        return hasUser && token;
    };

    const isAdmin = () => {
        return user && (user.role === 'admin' || user.isAdmin === true);
    };

    const value = {
        user,
        login,
        logout,
        loading,
        isAuthenticated: isAuthenticated(),
        isAdmin: isAdmin(),
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};