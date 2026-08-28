import { useState } from "react";
import axios from "axios";
import "../css/AIAssistence.css";

function AIAssistant() {

    const [open, setOpen] = useState(false);

    const [message, setMessage] = useState("");

    const [messages, setMessages] = useState([
        {
            sender: "ai",
            text: "Hi! 👋 I'm your DOMLEA AI Assistant. What kind of property are you looking for?"
        }
    ]);

    const [loading, setLoading] = useState(false);


    // =========================================
    // CONVERSATION DATA
    // =========================================

    const [conversation, setConversation] = useState({
        propertyType: null,
        city: null,
        maxPrice: null,
        bedrooms: null
    });


    // =========================================
    // SEND MESSAGE
    // =========================================

    const sendMessage = async () => {

        if (!message.trim()) {
            return;
        }


        const userMessage = message;


        // =========================================
        // SHOW USER MESSAGE
        // =========================================

        setMessages(prev => [
            ...prev,
            {
                sender: "user",
                text: userMessage
            }
        ]);


        setMessage("");

        setLoading(true);


        try {

            const token =
                localStorage.getItem("token");


            // =========================================
            // SEND MESSAGE + CONVERSATION DATA
            // =========================================

            const response = await axios.post(

                "http://localhost:8080/api/ai/chat",

                {
                    message: userMessage,

                    propertyType:
                        conversation.propertyType,

                    city:
                        conversation.city,

                    maxPrice:
                        conversation.maxPrice,

                    bedrooms:
                        conversation.bedrooms
                },

                {
                    headers: token
                        ? {
                            Authorization:
                                `Bearer ${token}`
                        }
                        : {}
                }

            );


            const data =
                response.data;


            // =========================================
            // UPDATE CONVERSATION
            // =========================================

            setConversation(prev => ({

                propertyType:
                    data.propertyType ??
                    prev.propertyType,

                city:
                    data.city ??
                    prev.city,

                maxPrice:
                    data.maxPrice ??
                    prev.maxPrice,

                bedrooms:
                    data.bedrooms ??
                    prev.bedrooms

            }));


            // =========================================
            // SHOW AI RESPONSE
            // =========================================

            setMessages(prev => [

                ...prev,

                {
                    sender: "ai",

                    text:
                        data.message,

                    properties:
                        data.properties || []

                }

            ]);


        } catch (error) {

            console.error(
                "AI Assistant Error:",
                error
            );


            setMessages(prev => [

                ...prev,

                {
                    sender: "ai",

                    text:
                        "Sorry, I couldn't process your request right now."
                }

            ]);

        } finally {

            setLoading(false);

        }

    };


    // =========================================
    // ENTER KEY
    // =========================================

    const handleKeyDown = (event) => {

        if (event.key === "Enter") {

            sendMessage();

        }

    };


    // =========================================
    // CLOSE / OPEN
    // =========================================

    return (

        <>

            {/* =================================
                FLOATING AI BUTTON
            ================================= */}

            {!open && (

                <button
                    className="ai-floating-button"
                    onClick={() => setOpen(true)}
                >

                    🤖

                    <span>
                        Need help?
                    </span>

                </button>

            )}


            {/* =================================
                AI CHAT
            ================================= */}

            {open && (

                <div className="ai-chat-container">


                    {/* =================================
                        HEADER
                    ================================= */}

                    <div className="ai-chat-header">

                        <div>

                            <strong>
                                🤖 DOMLEA AI
                            </strong>

                            <small>
                                Your property assistant
                            </small>

                        </div>


                        <button
                            onClick={() =>
                                setOpen(false)
                            }
                        >

                            ✕

                        </button>

                    </div>


                    {/* =================================
                        MESSAGES
                    ================================= */}

                    <div className="ai-chat-messages">


                        {messages.map(
                            (item, index) => (

                                <div
                                    key={index}

                                    className={
                                        item.sender === "user"
                                            ? "ai-message user-message"
                                            : "ai-message"
                                    }
                                >


                                    <p>
                                        {item.text}
                                    </p>


                                    {/* =================================
                                        PROPERTY RESULTS
                                    ================================= */}

                                    {item.properties &&
                                        item.properties.length > 0 && (

                                            <div className="ai-property-results">


                                                {item.properties.map(
                                                    property => (

                                                        <div
                                                            className="ai-property-card"

                                                            key={
                                                                property.id
                                                            }
                                                        >


                                                            {/* IMAGE */}

                                                            {property.imageUrls &&
                                                                property.imageUrls.length > 0 && (

                                                                    <img
                                                                        src={
                                                                            property.imageUrls[0]
                                                                        }

                                                                        alt={
                                                                            property.title
                                                                        }
                                                                    />

                                                                )}


                                                            {/* TITLE */}

                                                            <h4>

                                                                {
                                                                    property.title
                                                                }

                                                            </h4>


                                                            {/* CITY */}

                                                            <p>

                                                                {
                                                                    property.city
                                                                }

                                                            </p>


                                                            {/* PRICE */}

                                                            <strong>

                                                                ₹{Number(
                                                                    property.price || 0
                                                                ).toLocaleString(
                                                                    "en-IN"
                                                                )}

                                                            </strong>


                                                            {/* VIEW PROPERTY */}

                                                            <button

                                                                onClick={() =>
                                                                    window.location.href =
                                                                        `/property/${property.id}`
                                                                }

                                                            >

                                                                View Property

                                                            </button>


                                                        </div>

                                                    )

                                                )}

                                            </div>

                                        )}

                                </div>

                            )

                        )}


                        {/* =================================
                            LOADING
                        ================================= */}

                        {loading && (

                            <div className="ai-message">

                                <p>

                                    🤖 Thinking...

                                </p>

                            </div>

                        )}

                    </div>


                    {/* =================================
                        INPUT
                    ================================= */}

                    <div className="ai-chat-input">


                        <input

                            type="text"

                            placeholder="Tell me what you're looking for..."

                            value={message}

                            onChange={(e) =>
                                setMessage(
                                    e.target.value
                                )
                            }

                            onKeyDown={
                                handleKeyDown
                            }

                        />


                        <button

                            onClick={
                                sendMessage
                            }

                            disabled={loading}

                        >

                            ➤

                        </button>


                    </div>

                </div>

            )}

        </>

    );

}


export default AIAssistant;