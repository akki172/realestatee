import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function NotificationBell() {

    const navigate = useNavigate();

    const userId = localStorage.getItem("userId");
    const token = localStorage.getItem("token");

    const [notifications, setNotifications] = useState([]);
    const [unreadCount, setUnreadCount] = useState(0);
    const [open, setOpen] = useState(false);


    // =========================================
    // LOAD NOTIFICATIONS
    // =========================================

    const loadNotifications = async () => {

        if (!userId || !token) {
            return;
        }

        try {

            const response = await axios.get(
                `http://localhost:8080/api/notifications/${userId}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            setNotifications(response.data);

        } catch (error) {

            console.error(
                "Error loading notifications:",
                error
            );
        }
    };


    // =========================================
    // LOAD UNREAD COUNT
    // =========================================

    const loadUnreadCount = async () => {

        if (!userId || !token) {
            return;
        }

        try {

            const response = await axios.get(
                `http://localhost:8080/api/notifications/${userId}/unread-count`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            setUnreadCount(response.data);

        } catch (error) {

            console.error(
                "Error loading unread count:",
                error
            );
        }
    };


    // =========================================
    // INITIAL LOAD
    // =========================================

    useEffect(() => {

        loadNotifications();
        loadUnreadCount();

    }, [userId]);


    // =========================================
    // MARK ONE AS READ
    // =========================================

    const markAsRead = async (notification) => {

        try {

            await axios.put(
                `http://localhost:8080/api/notifications/${notification.id}/read`,
                {},
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            setNotifications(prev =>
                prev.map(item =>
                    item.id === notification.id
                        ? {
                            ...item,
                            read: true
                        }
                        : item
                )
            );

            if (!notification.read) {
                setUnreadCount(prev =>
                    Math.max(prev - 1, 0)
                );
            }


            // Open related property

          if (notification.propertyId) {

    // Seller payment / sold notification
    if (
        notification.type === "PAYMENT_SUCCESS" ||
        notification.type === "PROPERTY_SOLD"
    ) {

        navigate("/seller/bookings");

    }

    // New property notification
    else if (
        notification.type === "NEW_PROPERTY"
    ) {

        navigate(
            `/property/${notification.propertyId}`
        );

    }

    // Buyer purchase / other property notification
    else {

        navigate(
            `/property/${notification.propertyId}`
        );
    }

    setOpen(false);
}

        } catch (error) {

            console.error(
                "Error marking notification:",
                error
            );
        }
    };


    // =========================================
    // MARK ALL AS READ
    // =========================================

    const markAllAsRead = async () => {

        try {

            await axios.put(
                `http://localhost:8080/api/notifications/${userId}/read-all`,
                {},
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            setNotifications(prev =>
                prev.map(item => ({
                    ...item,
                    read: true
                }))
            );

            setUnreadCount(0);

        } catch (error) {

            console.error(
                "Error marking all notifications:",
                error
            );
        }
    };


    // =========================================
    // UI
    // =========================================

    return (

        <div
            className="notification-wrapper"
            style={{
                position: "relative",
                display: "flex",
                alignItems: "center"
            }}
        >

            {/* =========================
                NOTIFICATION BELL
            ========================= */}

            <button
                type="button"
                className="notification-bell"
                onClick={() => setOpen(!open)}
                style={{
                    display: "inline-flex",
                    position: "relative",
                    width: "45px",
                    height: "45px",
                    alignItems: "center",
                    justifyContent: "center",
                    background: "white",
                    border: "1px solid #ccc",
                    borderRadius: "50%",
                    cursor: "pointer",
                    fontSize: "20px",
                    visibility: "visible",
                    opacity: 1,
                    padding: 0
                }}
            >

                🔔

                {unreadCount > 0 && (

                    <span
                        className="notification-badge"
                        style={{
                            position: "absolute",
                            top: "-2px",
                            right: "-2px",
                            minWidth: "18px",
                            height: "18px",
                            padding: "0 4px",
                            borderRadius: "50%",
                            background: "#d32f2f",
                            color: "white",
                            fontSize: "10px",
                            fontWeight: "700",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center"
                        }}
                    >
                        {unreadCount > 99
                            ? "99+"
                            : unreadCount}
                    </span>

                )}

            </button>


            {/* =========================
                DROPDOWN
            ========================= */}

            {open && (

                <div className="notification-dropdown">

                    <div className="notification-header">

                        <strong>
                            Notifications
                        </strong>

                        {unreadCount > 0 && (

                            <button
                                type="button"
                                onClick={markAllAsRead}
                            >
                                Mark all read
                            </button>

                        )}

                    </div>


                    <div className="notification-list">

                        {notifications.length === 0 ? (

                            <div className="notification-empty">

                                <span>
                                    🔔
                                </span>

                                <p>
                                    No notifications
                                </p>

                            </div>

                        ) : (

                            notifications.map(
                                notification => (

                                    <div
                                        key={notification.id}
                                        className={
                                            notification.read
                                                ? "notification-item"
                                                : "notification-item unread"
                                        }
                                        onClick={() =>
                                            markAsRead(
                                                notification
                                            )
                                        }
                                    >

                                        <div className="notification-icon">

                                           {notification.type === "COMMENT"
    ? "💬"
    : notification.type === "PAYMENT_SUCCESS"
        ? "💰"
        : notification.type === "PROPERTY_SOLD"
            ? "🎉"
            : notification.type === "PROPERTY_PURCHASED"
                ? "🏠"
                : notification.type === "NEW_PROPERTY"
                    ? "🏠"
                    : "🔔"}
                                        </div>


                                        <div className="notification-content">

                                            <p>
                                                {notification.message}
                                            </p>

                                            <small>

                                                {notification.createdAt
                                                    ? new Date(
                                                        notification.createdAt
                                                    ).toLocaleString(
                                                        "en-IN"
                                                    )
                                                    : ""}

                                            </small>

                                        </div>

                                    </div>

                                )
                            )

                        )}

                    </div>

                </div>

            )}

        </div>
    );
}


// =========================================
// EXPORT
// =========================================

export default NotificationBell;