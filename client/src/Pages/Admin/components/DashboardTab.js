// src/Pages/Admin/components/DashboardTab.js
import React from 'react';

const DashboardTab = ({ stats, onAddProject, onViewMessages }) => {
    return (
        <div className="dashboard-content">
            <h2>Dashboard Overview</h2>
            
            <div className="stats-grid">
                <div className="stat-card">
                    <div className="stat-icon">📁</div>
                    <div className="stat-info">
                        <h3>Total Projects</h3>
                        <p className="stat-number">{stats.projects}</p>
                    </div>
                </div>

                <div className="stat-card">
                    <div className="stat-icon">📧</div>
                    <div className="stat-info">
                        <h3>Total Messages</h3>
                        <p className="stat-number">{stats.contacts}</p>
                    </div>
                </div>

                <div className="stat-card">
                    <div className="stat-icon">🔔</div>
                    <div className="stat-info">
                        <h3>Unread Messages</h3>
                        <p className="stat-number">{stats.unreadContacts}</p>
                    </div>
                </div>
            </div>

            <div className="quick-actions">
                <h3>Quick Actions</h3>
                <div className="action-buttons">
                    <button 
                        type="button"
                        className="action-btn primary"
                        onClick={onAddProject}
                    >
                        Add New Project
                    </button>
                    <button 
                        type="button"
                        className="action-btn secondary"
                        onClick={onViewMessages}
                    >
                        View Messages
                    </button>
                </div>
            </div>
        </div>
    );
};

export default DashboardTab;