import { useEffect, useState } from "react";
import axios from "axios";
import "../css/PropertyReview.css";

function PropertyReviews({ propertyId }) {

    const [reviews, setReviews] = useState([]);

    const [rating, setRating] = useState(5);
    const [comment, setComment] = useState("");

    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);

    const loadReviews = async () => {

        try {

            const token = localStorage.getItem("token");

const response = await axios.get(
    `http://localhost:8080/api/reviews/property/${propertyId}`,
    {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
);

            setReviews(response.data);

        } catch (error) {

            console.error(
                "Error loading reviews:",
                error
            );

        } finally {

            setLoading(false);

        }
    };


    useEffect(() => {

        if (propertyId) {
            loadReviews();
        }

    }, [propertyId]);


    const submitReview = async () => {

        const userId =
            localStorage.getItem("userId");

        if (!userId) {

            alert(
                "Please login to write a review."
            );

            return;
        }


        if (!comment.trim()) {

            alert(
                "Please write your experience."
            );

            return;
        }


        try {

            setSubmitting(true);
const token = localStorage.getItem("token");
const userId = localStorage.getItem("userId");

if (!token || !userId) {
    alert("Please login again.");
    return;
}

await axios.post(
    "http://localhost:8080/api/reviews",
    {
        propertyId: Number(propertyId),
        userId: Number(userId),
        rating: Number(rating),
        comment: comment.trim()
    },
    {
        headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json"
        }
    }
);

            setComment("");
            setRating(5);

            await loadReviews();

            alert(
                "Your experience was added successfully."
            );

        } catch (error) {

            console.error(
                "Review submission error:",
                error
            );

            alert(
                error.response?.data?.message ||
                "Unable to submit review."
            );

        } finally {

            setSubmitting(false);

        }
    };


    const renderStars = (value) => {

        return "★".repeat(value) +
            "☆".repeat(5 - value);

    };


    const averageRating =
        reviews.length > 0
            ? (
                reviews.reduce(
                    (sum, review) =>
                        sum + review.rating,
                    0
                ) / reviews.length
            ).toFixed(1)
            : "0.0";


    return (

        <section className="reviews-section">

            <div className="reviews-heading">

                <div>

                    <p className="reviews-eyebrow">
                        USER EXPERIENCES
                    </p>

                    <h2>
                        What people say
                    </h2>

                </div>


                {reviews.length > 0 && (

                    <div className="reviews-summary">

                        <strong>
                            ⭐ {averageRating}
                        </strong>

                        <span>
                            {reviews.length}{" "}
                            {reviews.length === 1
                                ? "review"
                                : "reviews"}
                        </span>

                    </div>

                )}

            </div>


            {/* WRITE REVIEW */}

            <div className="review-form">

                <h3>
                    Share your experience
                </h3>


                <div className="review-rating">

                    <label>
                        Your rating
                    </label>

                    <select
                        value={rating}
                        onChange={(e) =>
                            setRating(
                                e.target.value
                            )
                        }
                    >

                        <option value="5">
                            5 — Excellent
                        </option>

                        <option value="4">
                            4 — Very Good
                        </option>

                        <option value="3">
                            3 — Good
                        </option>

                        <option value="2">
                            2 — Fair
                        </option>

                        <option value="1">
                            1 — Poor
                        </option>

                    </select>

                </div>


                <textarea
                    placeholder="Write about the property, location, seller experience, facilities, etc."
                    value={comment}
                    onChange={(e) =>
                        setComment(
                            e.target.value
                        )
                    }
                    maxLength={1000}
                />


                <div className="review-form-footer">

                    <span>
                        {comment.length}/1000
                    </span>

                    <button
                        onClick={submitReview}
                        disabled={submitting}
                    >
                        {submitting
                            ? "Submitting..."
                            : "Share Experience"}
                    </button>

                </div>

            </div>


            {/* REVIEWS */}

            <div className="reviews-list">

                {loading ? (

                    <p className="reviews-message">
                        Loading experiences...
                    </p>

                ) : reviews.length === 0 ? (

                    <div className="reviews-message">

                        <span>
                            ⭐
                        </span>

                        <p>
                            No experiences yet.
                        </p>

                        <small>
                            Be the first person to
                            share your experience.
                        </small>

                    </div>

                ) : (

                    reviews.map((review) => (

                        <article
                            className="review-card"
                            key={review.id}
                        >

                            <div className="review-card-top">

                                <div>

                                    <h4>
                                        {review.userName}
                                    </h4>

                                    <span className="review-stars">

                                        {renderStars(
                                            review.rating
                                        )}

                                    </span>

                                </div>


                                <span className="review-date">

                                    {review.createdAt
                                        ? new Date(
                                            review.createdAt
                                        ).toLocaleDateString(
                                            "en-IN"
                                        )
                                        : ""}

                                </span>

                            </div>


                            <p className="review-comment">

                                {review.comment}

                            </p>

                        </article>

                    ))

                )}

            </div>

        </section>

    );
}

export default PropertyReviews;