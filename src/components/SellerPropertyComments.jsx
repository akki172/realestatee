import { useEffect, useState } from "react";
import axios from "axios";
import "../css/SellerPropertyComments.css";

function SellerPropertyComments() {

    const [comments, setComments] = useState([]);
    const [loading, setLoading] = useState(true);

    const [replyText, setReplyText] = useState({});
    const [replyingId, setReplyingId] = useState(null);

    const token = localStorage.getItem("token");
    const sellerId = localStorage.getItem("userId");


    const loadComments = async () => {

        try {

            const response = await axios.get(
                `http://localhost:8080/api/comments/seller/${sellerId}`,
                {
                    headers: {
                        Authorization:
                            `Bearer ${token}`
                    }
                }
            );

            setComments(response.data);

        } catch (error) {

            console.error(
                "Error loading seller comments:",
                error
            );

        } finally {

            setLoading(false);
        }
    };


    useEffect(() => {

        if (sellerId && token) {
            loadComments();
        }

    }, []);


    const handleReplyChange = (
        commentId,
        value
    ) => {

        setReplyText({
            ...replyText,
            [commentId]: value
        });
    };


    const submitReply = async (commentId) => {

        const reply =
            replyText[commentId]?.trim();


        if (!reply) {

            alert(
                "Please enter a reply."
            );

            return;
        }


        try {

            setReplyingId(commentId);


            await axios.put(
                `http://localhost:8080/api/comments/${commentId}/reply?sellerId=${sellerId}`,
                reply,
                {
                    headers: {
                        Authorization:
                            `Bearer ${token}`,
                        "Content-Type":
                            "text/plain"
                    }
                }
            );


            setReplyText({
                ...replyText,
                [commentId]: ""
            });


            await loadComments();


        } catch (error) {

            console.error(
                "Reply error:",
                error
            );

            alert(
                error.response?.data?.message ||
                error.response?.data ||
                "Unable to send reply."
            );

        } finally {

            setReplyingId(null);
        }
    };


    if (loading) {

        return (
            <div className="seller-comments-loading">
                Loading comments...
            </div>
        );
    }


    return (

        <section className="seller-comments-section">

            <div className="seller-comments-header">

                <div>

                    <p className="seller-comments-eyebrow">
                        PROPERTY DISCUSSION
                    </p>

                    <h2>
                        Buyer Comments
                    </h2>

                    <p>
                        Respond to questions from buyers
                        about your properties.
                    </p>

                </div>


                <div className="seller-comments-count">

                    {comments.length}

                    <span>
                        Comments
                    </span>

                </div>

            </div>


            {comments.length === 0 ? (

                <div className="seller-comments-empty">

                    <div>
                        💬
                    </div>

                    <h3>
                        No comments yet
                    </h3>

                    <p>
                        Buyer questions about your
                        properties will appear here.
                    </p>

                </div>

            ) : (

                <div className="seller-comments-list">

                    {comments.map((item) => (

                        <div
                            className="seller-comment-card"
                            key={item.id}
                        >

                            {/* PROPERTY */}

                            <div className="seller-comment-property">

                                <span>
                                    PROPERTY
                                </span>

                                <h3>
                                    {item.propertyTitle}
                                </h3>

                            </div>


                            {/* BUYER */}

                            <div className="seller-comment-user">

                                <div className="seller-comment-avatar">

                                    {item.userName
                                        ? item.userName
                                            .charAt(0)
                                            .toUpperCase()
                                        : "U"}

                                </div>


                                <div>

                                    <strong>
                                        {item.userName}
                                    </strong>

                                    <small>

                                        {item.createdAt
                                            ? new Date(
                                                item.createdAt
                                            ).toLocaleDateString(
                                                "en-IN"
                                            )
                                            : ""}

                                    </small>

                                </div>

                            </div>


                            {/* COMMENT */}

                            <div className="seller-comment-text">

                                <p>
                                    {item.comment}
                                </p>

                            </div>


                            {/* EXISTING REPLY */}

                            {item.sellerReply ? (

                                <div className="seller-existing-reply">

                                    <div className="seller-reply-heading">

                                        <span>
                                            Your Response
                                        </span>

                                        {item.repliedAt && (

                                            <small>

                                                {new Date(
                                                    item.repliedAt
                                                ).toLocaleDateString(
                                                    "en-IN"
                                                )}

                                            </small>

                                        )}

                                    </div>


                                    <p>
                                        {item.sellerReply}
                                    </p>

                                </div>

                            ) : (

                                /* REPLY FORM */

                                <div className="seller-reply-form">

                                    <textarea
                                        value={
                                            replyText[
                                                item.id
                                            ] || ""
                                        }
                                        onChange={(e) =>
                                            handleReplyChange(
                                                item.id,
                                                e.target.value
                                            )
                                        }
                                        placeholder="Write a response to the buyer..."
                                        maxLength={1000}
                                    />


                                    <div className="seller-reply-footer">

                                        <small>
                                            {(replyText[
                                                item.id
                                            ] || "").length}
                                            /1000
                                        </small>


                                        <button
                                            onClick={() =>
                                                submitReply(
                                                    item.id
                                                )
                                            }
                                            disabled={
                                                replyingId ===
                                                item.id
                                            }
                                        >

                                            {replyingId ===
                                            item.id
                                                ? "Sending..."
                                                : "Reply to Buyer"}

                                        </button>

                                    </div>

                                </div>

                            )}

                        </div>

                    ))}

                </div>

            )}

        </section>
    );
}

export default SellerPropertyComments;