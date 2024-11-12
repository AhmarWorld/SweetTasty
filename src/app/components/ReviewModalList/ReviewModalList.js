'use client'

import "./ReviewModalList.css";
import { useState, useEffect } from "react";
import ReviewModal from "../ReviewModal/ReviewModal";

function ReviewModalList({ setReviewModalList, orderReview, getOrderList }) {
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [reviewModal, setReviewModal] = useState(false);

    const handleProductSelect = (product) => {
        setSelectedProduct({
            ...orderReview,
            products: [product]
        });
        setReviewModal(true);
        getOrderList();
    };

    useEffect(() => {
        getOrderList()
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
                                    key={product.id}
                                    onClick={() => { if (!product.reviewed) handleProductSelect(product) }}
                                    className={`review-modal-list_item ${product.reviewed ? "reviewed" : ''}`}
                                >
                                    <span>{product.productName}</span>
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
                    getOrderList={getOrderList}
                />
            )}
        </>
    );
}

export default ReviewModalList;