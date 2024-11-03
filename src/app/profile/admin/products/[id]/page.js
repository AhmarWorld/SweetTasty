"use client";

import "./product.css";
import { useState, useEffect } from "react";
import ProfileNavItem from "@/app/components/ProfileNavItem/ProfileNavItem";
import Footer from "@/app/components/Footer/Footer";

export default function Product({ params }) {
  const [product, setProduct] = useState({});
  const [betaImg, setBetaImg] = useState("");

  const loadProduct = async (token) => {
    const response = await fetch(
      process.env.NEXT_PUBLIC_SERVER_URL + "/products/" + params.id,
      {
        headers: {
          "ngrok-skip-browser-warning": "any",
          Authorization: "Bearer " + token,
        },
        method: "GET",
      }
    );
    const data = await response.json();
    setProduct(data);
  };

  useEffect(() => {
    if(product.image){
      let newImg = product?.image.split("/").splice(3).join("/");
      setBetaImg(newImg);
    }
  }, [product]);

  useEffect(() => {
    if (typeof window != "undefined") {
      const token = localStorage.getItem("token-SattyTatty");
      loadProduct(token);
    }
  }, [window]);

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
      <div className="admin_product-info">
        <img src={process.env.NEXT_PUBLIC_SERVER_URL + "/" + betaImg} />
        <h2>{product.name}</h2>
        <form
          className="admin_product-img_form"
          enctype="multipart/form-data"
          action={
            process.env.NEXT_PUBLIC_SERVER_URL + "/image/uploadProductImage"
          }
          method="POST"
        >
          <input type="file" name="image" />
          <input type="text" name="productId" value={params.id} hidden />
          <button className="admin_product-form_button">Отправить</button>
        </form>
      </div>
      <Footer />
    </div>
  );
}
