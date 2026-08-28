import { useEffect, useState } from "react";
import axios from "axios";
import "../css/PropertyComments.css";

function PropertyComments({ propertyId }) {

    const [comments, setComments] = useState([]);
    const [comment, setComment] = useState("");
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);


    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("userId");


    const loadComments = async () => {

        try {

            const response = await axios.get(
                `http://localhost:8080/api/comments/property/${propertyId}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            setComments(response.data);

        } catch (error) {

            console.error(
                "Error loading comments:",
                error
            );

        } finally {

            setLoading(false);
        }
    };


    useEffect(() => {

        if (propertyId) {
            loadComments();
        }

    }, [propertyId]);


    const submitComment = async () => {

        if (!token || !userId) {

            alert(
                "Please login to comment."
            );

            return;
        }


        if (!comment.trim()) {

            alert(
                "Please enter your comment."
            );

            return;
        }


        try {

            setSubmitting(true);

            await axios.post(
                "http://localhost:8080/api/comments",
                {
                    propertyId: Number(propertyId),
                    userId: Number(userId),
                    comment: comment.trim()
                },
                {
                    headers: {
                        Authorization:
                            `Bearer ${token}`,
                        "Content-Type":
                            "application/json"
                    }
                }
            );


            setComment("");

            await loadComments();

        } catch (error) {

            console.error(
                "Comment submission error:",
                error
            );

            alert(
                error.response?.data?.message ||
                "Unable to post comment."
            );

        } finally {

            setSubmitting(false);
        }
    };


    return (

        <section className="property-comments">

            <div className="comments-header">

                <div>

                    <p className="comments-eyebrow">
                        PROPERTY DISCUSSION
                    </p>

                    <h2>
                        Questions & Comments
                    </h2>

                </div>

                <span>
                    {comments.length}{" "}
                    {comments.length === 1
                        ? "comment"
                        : "comments"}
                </span>

            </div>


            {/* =========================
                WRITE COMMENT
            ========================= */}

            <div className="comment-form">

                <textarea
                    value={comment}
                    onChange={(e) =>
                        setComment(e.target.value)
                    }
                    placeholder="Ask the seller a question about this property..."
                    maxLength={1000}
                />

                <div className="comment-form-bottom">

                    <small>
                        {comment.length}/1000
                    </small>

                    <button
                        onClick={submitComment}
                        disabled={submitting}
                    >
                        {submitting
                            ? "Posting..."
                            : "Post Comment"}
                    </button>

                </div>

            </div>


            {/* =========================
                COMMENTS
            ========================= */}

            <div className="comments-list">

                {loading ? (

                    <p className="comments-empty">
                        Loading comments...
                    </p>

                ) : comments.length === 0 ? (

                    <div className="comments-empty">

                        <div>
                            💬
                        </div>

                        <p>
                            No questions yet.
                        </p>

                        <small>
                            Be the first to ask
                            the seller something.
                        </small>

                    </div>

                ) : (

                    comments.map((item) => (

                        <div
                            className="comment-card"
                            key={item.id}
                        >

                            <div className="comment-user">

                                <div className="comment-avatar">
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


                            <p className="comment-text">
                                {item.comment}
                            </p>


                            {/* SELLER RESPONSE */}

                            {item.sellerReply && (

                                <div className="seller-reply">

                                    <div className="seller-reply-title">
                                        <span>
                                            Seller Response
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

                            )}

                        </div>

                    ))

                )}

            </div>

        </section>
    );
}

export default PropertyComments;