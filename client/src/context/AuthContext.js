// src/context/AuthContext.js
import React, { createContext, useState, useContext, useEffect } from 'react';
import API_BASE_URL from "../config/apiConfig";

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

            // Treat "undefined", "null", empty strings as invalid
            const validToken = token && token !== 'undefined' && token !== 'null' && token.trim() !== '';
            const validUserData = userData && userData !== 'undefined' && userData !== 'null';

            console.log('Checking auth status - Token:', !!validToken, 'UserData:', !!validUserData);

            if (validToken && validUserData) {
                const parsedUser = JSON.parse(userData);
                console.log('User found:', parsedUser);
                setUser(parsedUser);
            } else {
                console.log('No auth data found');
                setUser(null);
            }
        } catch (error) {
            console.error('Error checking auth status:', error);
            localStorage.removeItem('authToken');
            localStorage.removeItem('userData');
            setUser(null);
        } finally {
            setLoading(false);
        }
    };

    const login = async (email, password) => {
        try {
            const response = await fetch(`${API_BASE_URL}/api/auth/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });

            const data = await response.json();
            console.log('Login response:', data); // Debug log

            if (!response.ok) {
                throw new Error(data.message || 'Login failed');
            }

            // Handle different token field names from API
            const token = data.token || data.accessToken || data.authToken || data.jwt;
            const userPayload = data.user || data.admin || data.data?.user;

            console.log('Extracted token:', !!token, 'User:', !!userPayload); // Debug log

            if (!token) {
                console.error('Server response:', data);
                throw new Error('No token returned from server');
            }

            // Store token FIRST
            localStorage.setItem('authToken', token);
            console.log('Token saved to localStorage:', localStorage.getItem('authToken')); // Debug log

            if (userPayload) {
                localStorage.setItem('userData', JSON.stringify(userPayload));
                setUser(userPayload);
            } else {
                // Fallback: create minimal user object
                const minimalUser = { role: 'admin', email };
                localStorage.setItem('userData', JSON.stringify(minimalUser));
                setUser(minimalUser);
            }

            console.log('Login successful - Token stored:', !!localStorage.getItem('authToken'));
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
        const validToken = token && token !== 'undefined' && token !== 'null' && token.trim() !== '';
        const hasUser = user !== null;
        console.log('isAuthenticated check - Token:', !!validToken, 'User:', !!hasUser);
        return Boolean(hasUser && validToken);
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