"use client";
import Footer from "@/app/components/Footer/Footer";
import "./subcategories.css";
import Search from "@/app/components/Search/Search";
import CatalogItem from "@/app/components/CatalogItem/CatalogItem";
import { useEffect, useState } from "react";
import OrdersBunner from "@/app/components/OrdersBunner/OrdersBunner";
import HotOffers from "@/app/components/HotOffers/HotOffers";
import Filter from "@/app/components/Filter/Filter";
import { IoClose } from "react-icons/io5";
import "next-range-slider/dist/main.css";
import { RangeSlider } from "next-range-slider";

export default function Subcategories({ params }) {
  const [filterActive, setFilterActive] = useState(false);

  const [lowPrice, setLowPrice] = useState(0);
  const [highPrice, setHighPrice] = useState(10000);
  const [provider, setProvider] = useState("");
  const [subCategory, setSubCategory] = useState(params);
  const [sortingMethod, setSortingMethod] = useState(null);

  const [categoriesList,setCategoriesList] = useState([])

  const clientToken = localStorage.getItem("token-SattyTatty");
  const [productList, setProductList] = useState([]);
  const getProductList = async () => {
    const request = await fetch(
      process.env.NEXT_PUBLIC_SERVER_URL + "/products/subcategory/" + params.id,
      {
        method: "GET",
        headers: {
          "ngrok-skip-browser-warning": "any",
          Authorization: "Bearer " + clientToken,
          "Content-type": "application/json",
        },
      }
    );
    const response = await request.json();
    if (!request.ok) {
      alert("Авторизуйтесь на сайте");
      localStorage.clear();
    }
    setProductList(response);
  };

  async function getCategories() {
    const request = await fetch(
      process.env.NEXT_PUBLIC_SERVER_URL + "/categories",
      {
        method: "GET",
        headers: {
          "ngrok-skip-browser-warning": "any",
          Authorization: "Bearer " + clientToken,
          'Content-type': 'application/json'
        }
      }
    );
    const response = await request.json()
    if(!request.ok){
      alert('Авторизуйтесь на сайте')
    }else if(request.ok){
      setCategoriesList(response)
    }
  }

  async function getFilter() {
    const request = await fetch(
      process.env.NEXT_PUBLIC_SERVER_URL + "/products/filter",
      {
        method: "POST",
        headers: {
          "ngrok-skip-browser-warning": "any",
          Authorization: "Bearer " + clientToken,
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          minPrice: lowPrice,
          maxPrice: highPrice,
          // providerIds: null,
          subCategoryIds: [+subCategory],
          sortingMethod: sortingMethod,
        }),
      }
    );
    const response = await request.json();
    if (!request.ok) {
      alert("Ошибка попробуйте позже");
    } else if (request.ok) {
      setProductList(response)
    }
  }

  useEffect(() => {
    getProductList();
    getCategories()
  }, []);

  return (
    <div className="main-subcategories">
      {filterActive ? (
        <div className="filter-window">
          <div className="filter-window_title">
            <h2>Фильтры</h2>
            <span
              onClick={() => {
                setFilterActive(false);
              }}
            >
              <IoClose size={25} />
            </span>
          </div>
          <div className="filter-window_filters">
            <div className="filters-section">
              <h4>Цена</h4>
              <RangeSlider
                min={0}
                max={10000}
                step={1}
                options={{
                  leftInputProps: {
                    value: lowPrice,
                    onChange: (e) => setLowPrice(Number(e.target.value)),
                  },
                  rightInputProps: {
                    value: highPrice,
                    onChange: (e) => setHighPrice(Number(e.target.value)),
                  },
                  range: {
                    background: "#d4f2d6",
                  },
                  thumb: {
                    background: "#53c95a",
                    focusBackground: "#53c95a",
                    width: "23px",
                    height: "23px",
                    transform: "translateY(-40%)",
                  },
                  track: {
                    background: "#ccc",
                    width: "100%",
                    height: "5px",
                  },
                }}
              />
              <div className="filters-section_price-range">
                <span>{lowPrice} ₸</span>
                <span>{highPrice} ₸</span>
              </div>
            </div>
            <div className="filters-section">
              <h4>Поставщики</h4>
              <select>
                <option value={null}>Выберите поставщика</option>
              </select>
            </div>
            <div className="filters-section">
              <h4>Категория</h4>
              <select onChange={(e)=>{setSubCategory(e.target.value)}}> 
                <option value={null}>Выберите категорию</option>
                {categoriesList.map((cat)=>(
                  <option key={cat.id} value={cat.id} >{cat.name}</option>
                ))}
              </select>
            </div>
            <div className="filters-section">
              <h4>Сортировка по</h4>
              <select onChange={(e)=>{setSortingMethod(e.target.value)}}>
                <option value={"asc"}>по нарастающей</option>
                <option value={"desc"}>по убыванию</option>
              </select>
            </div>
            <div onClick={getFilter} className="filter-done">
              <h4>Применить</h4>
              {/* <p>50 найденных</p> */}
            </div>
          </div>
        </div>
      ) : (
        <>
          <OrdersBunner />
          <HotOffers />
          <Search placeholder="Искать в SweetTasty" />
          <Filter active={filterActive} setActive={setFilterActive} />
          <div className="subcat-list">
            {productList.map((product) => (
              <div className="subcat-item">
                <CatalogItem
                  id={product.id}
                  text={product.name}
                  price={product.price}
                />
              </div>
            ))}
          </div>
          <Footer />
        </>
      )}
    </div>
  );
}
