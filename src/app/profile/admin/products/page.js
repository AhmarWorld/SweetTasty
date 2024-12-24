"use client";

import "./products.css";
import { useState, useEffect } from "react";
import ProfileNavItem from "@/app/components/ProfileNavItem/ProfileNavItem";
import Footer from "@/app/components/Footer/Footer";
import AdminProduct from "@/app/components/AdminProduct/AdminProduct";
import Link from "next/link";

function Products() {
  const [products, setProducts] = useState([]);

  const loadProducts = async (token) => {
    const response = await fetch(
      process.env.NEXT_PUBLIC_SERVER_URL + "/products",
      {
        headers: {
          "ngrok-skip-browser-warning": "any",
          Authorization: "Bearer " + token,
        },
        method: "GET",
      }
    );
    const data = await response.json();
    setProducts(data);
  };

  useEffect(() => {
    if (typeof window != "undefined") {
      const token = localStorage.getItem("token-SattyTatty");
      loadProducts(token);
    }
  }, []);

  return (
    <div className="profile-main">
      <h3 id="profile-admin_title">Администратор</h3>
      <div className="profile-select">
        <ul>
          <ProfileNavItem href={"/profile/admin"} text={"Админ"} />
          <ProfileNavItem href={"/profile/admin/products"} text={"Продукты"} />
          <ProfileNavItem href={"/profile/admin/stats"} text={"Статистика"} />
        </ul>
      </div>
      <div className="admin_product-table">
        {products.map((item) => (
          <Link className="admin_product-table_link" href={"/profile/admin/products/" + item.id}>
            <AdminProduct item={item}></AdminProduct>
          </Link>
        ))}
      </div>
      <Footer />
    </div>
  );
}

export default Products;
