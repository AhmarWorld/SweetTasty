'use client'

import "./ReviewModalList.css";
import { useState, useEffect } from "react";
import ReviewModal from "../ReviewModal/ReviewModal";

function ReviewModalList({ userId, setReviewModalList, orderReview }) {
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [reviewModal, setReviewModal] = useState(false);
    const [reviews, setReviews] = useState(new Set());

    const getReviews = async (id) => {
        try {
            const response = await fetch(
                process.env.NEXT_PUBLIC_SERVER_URL + `/productReviews/product/${id}`,
                {
                    method: "GET",
                    headers: {
                        "ngrok-skip-browser-warning": "any",
                        Authorization: "Bearer " + localStorage.getItem('token-SattyTatty'),
                        "Content-type": "application/json",
                    },
                }
            );
            const data = await response.json();
            if (response.ok) {
                data.forEach(review => {
                    if (review.userId === userId) {
                        setReviews(prev => new Set([...prev, review.productId]));
                    }
                });
            }
        } catch (error) {
            console.error("Ошибка при получении отзывов:", error);
        }
    };

    const handleProductSelect = (product) => {
        if (reviews.has(product.productId)) {
            return;
        }
        setSelectedProduct({
            ...orderReview,
            products: [product]
        });
        setReviewModal(true);
    };

    useEffect(() => {
        orderReview.products.forEach(product => {
            getReviews(product.productId);
        });
    }, []);

    return (
        <>
            {!reviewModal && (
                <div className="review-modal-list">
                    <div className="review-modal-list_content">
                        <button 
                            className="review-modal-list_close"
                            onClick={() => setReviewModalList(false)}
                        >
                            ✕
                        </button>
                        <h3>Выберите товар для отзыва</h3>
                        <p className="review-modal-list_order-number">Заказ №{orderReview.orderNumber}</p>
                        <p className="review-modal-list_subtitle">Нажмите на продукт, чтобы оставить отзыв</p>
                        
                        <ul className="review-modal-list_items">
                            {orderReview.products.map((product) => (
                                <li 
                                    key={product.productId}
                                    onClick={() => handleProductSelect(product)}
                                    className={`review-modal-list_item ${reviews.has(product.productId) ? 'reviewed' : ''}`}
                                >
                                    <span>{product.productName}</span>
                                    {/* {reviews.has(product.productId) && (
                                        <span className="review-modal-list_reviewed-badge">
                                            Отзыв оставлен
                                        </span>
                                    )} */}
                                </li>
                            ))}
                        </ul>

                        <div className="review-modal-list_cafe-info">
                            <p className="review-modal-list_cafe-name">{orderReview.branchName}</p>
                            <p className="review-modal-list_cafe-address">{orderReview.branchAddress}</p>
                        </div>
                    </div>
                    <div 
                        className="review-modal-list_overlay" 
                        onClick={() => setReviewModalList(false)}
                    />
                </div>
            )}
            {reviewModal && selectedProduct && (
                <ReviewModal 
                    orderReview={selectedProduct} 
                    setReviewModal={setReviewModal}
                    setReviewModalList={setReviewModalList}
                />
            )}
        </>
    );
}

export default ReviewModalList;