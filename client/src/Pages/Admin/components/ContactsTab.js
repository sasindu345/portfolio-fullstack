// src/Pages/Admin/components/ContactsTab.js - FIXED
import React from 'react';

const ContactsTab = ({ contacts = [], loading, onMarkAsRead, onMarkAsUnread, onDeleteContact }) => {
    // Safety check - ensure contacts is always an array
    const safeContacts = Array.isArray(contacts) ? contacts : [];

    const formatDate = (dateString) => {
        if (!dateString) return 'N/A';
        try {
            return new Date(dateString).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'short',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
            });
        } catch (error) {
            return 'Invalid date';
        }
    };

    return (
        <div className="contacts-content">
            <div className="content-header">
                <h2>Contact Messages</h2>
                <div className="contacts-stats">
                    <span>Total: {safeContacts.length}</span>
                    <span>Unread: {safeContacts.filter(c => !c.isRead).length}</span>
                </div>
            </div>

            {loading && <div className="loading">Loading messages...</div>}

            {!loading && safeContacts.length > 0 && (
                <div className="contacts-list">
                    {safeContacts.map(contact => (
                        <div
                            key={contact._id}
                            className={`contact-item ${!contact.isRead ? 'unread' : ''}`}
                        >
                            <div className="contact-header">
                                <div className="contact-info">
                                    <strong>{contact.name || 'Anonymous'}</strong>
                                    <span className="email">{contact.email || 'No email'}</span>
                                    <span className="date">{formatDate(contact.createdAt)}</span>
                                </div>
                                <div className="contact-actions">
                                    {!contact.isRead ? (
                                        <button
                                            type="button"
                                            className="action-btn small secondary"
                                            onClick={() => onMarkAsRead(contact._id)}
                                        >
                                            Mark Read
                                        </button>
                                    ) : (
                                        <button
                                            type="button"
                                            className="action-btn small secondary"
                                            onClick={() => onMarkAsUnread(contact._id)}
                                        >
                                            Mark Unread
                                        </button>
                                    )}
                                    <button
                                        type="button"
                                        className="action-btn small danger"
                                        onClick={() => onDeleteContact(contact._id)}
                                    >
                                        Delete
                                    </button>
                                </div>
                            </div>

                            <div className="contact-message">
                                <p>{contact.message || 'No message content'}</p>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {!loading && safeContacts.length === 0 && (
                <div className="empty-state">
                    <h3>No messages yet</h3>
                    <p>Contact messages will appear here.</p>
                </div>
            )}
        </div>
    );
};

export default ContactsTab;