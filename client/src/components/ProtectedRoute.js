// src/components/ProtectedRoute.js
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const ProtectedRoute = ({ children }) => {
    const { user, loading } = useAuth();
    const navigate = useNavigate();

    console.log('ProtectedRoute - Loading:', loading, 'User:', !!user);

    // Check authentication and redirect if needed
    useEffect(() => {
        if (!loading) {
            const token = localStorage.getItem('authToken');
            const isAuthenticated = user !== null && token !== null;

            console.log('ProtectedRoute useEffect - Check:', { user: !!user, token: !!token, isAuthenticated });

            if (!isAuthenticated) {
                console.log('Not authenticated, navigating to login');
                navigate('/admin/login', { replace: true });
            }
        }
    }, [user, loading, navigate]);

    // Show loading while checking authentication
    if (loading) {
        return (
            <div style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '100vh',
                background: 'linear-gradient(135deg, #0a0f1c 0%, #1a2332 50%, #0f172a 100%)',
                color: '#f8fafc'
            }}>
                <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: '1rem'
                }}>
                    <div style={{
                        width: '40px',
                        height: '40px',
                        border: '4px solid rgba(59, 130, 246, 0.3)',
                        borderTop: '4px solid #3b82f6',
                        borderRadius: '50%',
                        animation: 'spin 1s linear infinite'
                    }}></div>
                    <p>Checking authentication...</p>
                </div>
                <style>{`
                    @keyframes spin {
                        0% { transform: rotate(0deg); }
                        100% { transform: rotate(360deg); }
                    }
                `}</style>
            </div>
        );
    }

    // Check if user exists and has a token
    const token = localStorage.getItem('authToken');
    const isAuthenticated = user !== null && token !== null;

    console.log('ProtectedRoute - Final render check:', { user: !!user, token: !!token, isAuthenticated });

    // If not authenticated, show nothing (redirect will happen via useEffect)
    if (!isAuthenticated) {
        console.log('Rendering nothing, redirect should happen');
        return null;
    }

    console.log('Authenticated, showing admin content');
    // If authenticated, show the protected content
    return children;
};

export default ProtectedRoute;