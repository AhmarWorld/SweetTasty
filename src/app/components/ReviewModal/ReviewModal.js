'use client'

import "./ReviewModal.css";
import { useState } from "react";

export default function ReviewModal({ setReviewModal, orderReview, setReviewModalList }) {
    const [rating, setRating] = useState(0);
    const [hover, setHover] = useState(0);
    const [comment, setComment] = useState('');

    const handleClose = () => {
        setReviewModal(false);
    };

    const handleSubmit = async () => {
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/productReviews`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token-SattyTatty')}`
                },
                body: JSON.stringify({
                    productId: orderReview.products[0].productId,
                    rating: rating,
                    comment: comment,
                    orderId: orderReview.id
                })
            });

            if (response.ok) {
                handleClose();
            }
        } catch (error) {
            console.error('Ошибка при отправке отзыва:', error);
        }
    };

    return (
        <div className="review-modal">
            <div className="review-modal_content">
                <button 
                    className="review-modal_close"
                    onClick={handleClose}
                >
                    ✕
                </button>
                <h3>Оставить отзыв</h3>
                <p className="review-modal_order-number">Заказ №{orderReview.orderNumber}</p>
                <p className="review-modal_product-name">
                    {orderReview.products[0].productName}
                </p>
                
                <div className="review-modal_form">
                    <div className="review-modal_rating">
                        {[...Array(5)].map((_, index) => {
                            const ratingValue = index + 1;
                            return (
                                <button
                                    type="button"
                                    key={index}
                                    className={`rating-star ${ratingValue <= (hover || rating) ? 'active' : ''}`}
                                    onClick={() => setRating(ratingValue)}
                                    onMouseEnter={() => setHover(ratingValue)}
                                    onMouseLeave={() => setHover(0)}
                                >
                                    ★
                                </button>
                            );
                        })}
                    </div>
                    <textarea 
                        placeholder="Напишите ваш отзыв..."
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                        rows={5}
                    />
                    <button 
                        className="review-modal_submit"
                        onClick={handleSubmit}
                        disabled={!rating}
                    >
                        Отправить отзыв
                    </button>
                </div>

                <div className="review-modal_cafe-info">
                    <p className="review-modal_cafe-name">{orderReview.branchName}</p>
                    <p className="review-modal_cafe-address">{orderReview.branchAddress}</p>
                </div>
            </div>
            <div 
                className="review-modal_overlay"
                onClick={handleClose}
            />
        </div>
    );
}
