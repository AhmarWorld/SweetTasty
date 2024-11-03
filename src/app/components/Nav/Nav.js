"use client";

import NavButtons from "../NavButtons/NavButtons";
import "./Nav.css";
import { BiHomeAlt } from "react-icons/bi";
import { PiShoppingCartDuotone } from "react-icons/pi";
import { MdOutlineMenu } from "react-icons/md";
import { useEffect, useState } from "react";
import { getCart } from "@/app/lib/basket";

const Nav = () => {
  const [ifToken, setIfToken] = useState(false);
  const [token, setToken] = useState("");
  const [basketCount, setBasketCount] = useState(0);

  useEffect(() => {
    if (ifToken) {
      (async () => {
        const basketData = await getCart(token, setIfToken);
        if (basketData) {
          setBasketCount(basketData?.items?.length);
        }
      })();
    }
  }, [ifToken]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const newToken = localStorage.getItem("token-SattyTatty");
      setToken(newToken);
    }
  }, [window]);

  useEffect(() => {
    if (token) {
      setIfToken(true);
    } else {
      setIfToken(false);
    }
  }, [token]);

  return (
    <nav>
      <NavButtons
        svg={<BiHomeAlt size={26} color="#333" />}
        text={"Главная"}
        href={"/"}
      />
      <NavButtons
        svg={
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="25"
            height="22"
            viewBox="0 0 25 22"
            fill="none"
          >
            <line
              x1="1.25"
              y1="7"
              x2="7.25"
              y2="7"
              stroke="#333333"
              stroke-width="2"
              stroke-linecap="round"
            ></line>{" "}
            <line
              x1="1.25"
              y1="14"
              x2="10.25"
              y2="14"
              stroke="#333333"
              stroke-width="2"
              stroke-linecap="round"
            ></line>{" "}
            <line
              x1="1.25"
              y1="21"
              x2="20.25"
              y2="21"
              stroke="#333333"
              stroke-width="2"
              stroke-linecap="round"
            ></line>{" "}
            <path
              d="M23.4772 14.7391L20.8062 11.013C21.8755 10.1493 22.6147 8.90277 22.8632 7.44204C23.4144 4.20302 21.1792 1.078 17.9139 0.522359C14.6485 -0.0332856 11.5587 2.25096 11.0076 5.48998C10.4564 8.72899 12.6916 11.854 15.9569 12.4097C17.4295 12.6602 18.8606 12.381 20.0363 11.6661L22.7073 15.3922C22.8669 15.6155 23.1871 15.6699 23.4116 15.5121C23.5829 15.2798 23.6369 14.9623 23.4772 14.7391ZM16.1299 11.3935C13.3767 10.925 11.5781 8.33172 12.032 5.6643C12.4859 2.99687 15.041 1.14444 17.7942 1.61293C20.5473 2.08141 22.3567 4.61119 21.892 7.34213C21.4273 10.0731 18.819 11.8511 16.1299 11.3935Z"
              fill="#333333"
            ></path>{" "}
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M10.564 5.41407C11.1553 1.9391 14.4701 -0.520544 17.9894 0.0783169C21.4964 0.675076 23.9004 4.02971 23.307 7.51711C23.0659 8.93353 22.3928 10.1691 21.4108 11.0835L23.8431 14.4765C24.157 14.9153 24.0128 15.4547 23.7738 15.7788L23.7304 15.8377L23.6705 15.8798C23.244 16.1797 22.6451 16.0779 22.3416 15.654C22.3415 15.6539 22.3417 15.6541 22.3416 15.654L19.9053 12.2552C18.7093 12.8741 17.3097 13.0959 15.8815 12.8529C12.3746 12.2561 9.9706 8.90147 10.564 5.41407ZM17.8385 0.965563C14.8271 0.453134 11.9623 2.56198 11.4513 5.56505C10.9424 8.55568 13.0088 11.4511 16.0325 11.9656C17.4017 12.1986 18.7224 11.938 19.8026 11.2812L20.1591 11.0645L23.0731 15.1296C23.0781 15.1367 23.0876 15.1448 23.102 15.149C23.1124 15.122 23.1187 15.0959 23.1213 15.0727C23.1265 15.0254 23.1153 15.0061 23.1114 15.0006C23.1114 15.0006 23.1115 15.0007 23.1114 15.0006L20.1931 10.9294L20.5236 10.6625C21.5056 9.86934 22.1891 8.72138 22.4197 7.36613C22.9286 4.3755 20.8622 1.48009 17.8385 0.965563ZM17.7188 2.05613C15.211 1.6294 12.888 3.31658 12.4757 5.73937C12.0634 8.16215 13.6977 10.5227 16.2054 10.9495C18.6567 11.3666 21.0267 9.74504 21.4485 7.26622C21.8709 4.78366 20.2303 2.4835 17.7188 2.05613ZM11.5885 5.58839C12.084 2.67632 14.8712 0.658646 17.8697 1.16888C20.8645 1.67848 22.8427 4.43787 22.3358 7.41719C21.8281 10.4002 18.9814 12.3348 16.0545 11.8367C13.056 11.3265 11.0929 8.50046 11.5885 5.58839Z"
              fill="#333333"
            ></path>
          </svg>
        }
        text={"Каталог"}
        href={"/catalog"}
      />

      <NavButtons
        svg={<PiShoppingCartDuotone size={26} color="#333" />}
        text={"Корзина"}
        href={"/cart"}
        count={basketCount}
      />
      <NavButtons
        svg={<MdOutlineMenu size={26} color="#333" />}
        text={"Меню"}
        href={ifToken ? "/profile/main" : "/profile"}
      />
    </nav>
  );
};

export default Nav;
