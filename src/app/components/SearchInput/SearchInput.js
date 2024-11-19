"use client";

import { useRouter } from "next/navigation";
import "./SearchInput.css";
import { FaSearch } from "react-icons/fa";
import { useEffect } from "react";

function SearchInput({ inputValue, setInputValue, placeholder }) {
  const router = useRouter();

  const onChange = (value) => {
    setInputValue(value);
  };

  //   useEffect(() => {
  //     let timeout;
  //     clearTimeout(timeout);
  //     if (inputValue.trim()) {
  //       e.preventDefault();
  //       if (e.key === "Enter") {
  //         router.push(`/catalog/search?name=${inputValue}`);
  //       }
  //     }
  //   }, [inputValue]);

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && inputValue.trim()) {
      e.preventDefault();
      router.push(`/catalog/search?name=${inputValue}`);
    }
  };

  useEffect(() => {
    document.addEventListener("keypress", handleKeyPress);
    return () => {
      document.removeEventListener("keypress", handleKeyPress);
    };
  }, [inputValue]);

  return (
    <form className="search-form" action="">
      <button className="search-button">
        <FaSearch size={20} color="#4f4f4f" />
      </button>
      <input
        className="search-input"
        onChange={(e) => {
          onChange(e.target.value);
        }}
        value={inputValue}
        type="text"
        placeholder={placeholder}
      />
    </form>
  );
}

export default SearchInput;
