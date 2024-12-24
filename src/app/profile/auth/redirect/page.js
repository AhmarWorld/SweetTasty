"use client";

import Footer from "@/app/components/Footer/Footer";
import "./redirect.css";
import Link from "next/link";
function Redirect() {
    return (
        <div className="authentication">
            <div className="authentication-title">
                <h1>Добро пожаловать в Marketly</h1>
                <p>
                    Войдите чтобы копить бонусы, сохранить адрес доставки и историю
                    заказов
                </p>
            </div>
            <div className="pervios_profile-buttons">
                <Link href="/profile/auth">
                    <button>Войти</button>
                </Link>
                <Link href="/profile">
                    <p>
                        Нет аккаунта? <u>Регистрация</u>
                    </p>
                </Link>
            </div>
            <Footer />
        </div>
    );
}

export default Redirect;
