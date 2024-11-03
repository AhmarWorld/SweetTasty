import './SearchInput.css'
import { FaSearch } from "react-icons/fa";



function SearchInput({ inputValue, setInputValue,placeholder }) {

    const onChange = (value) => {
        setInputValue(value)
    }

    return (
        <form className='search-form' action="">
            <button className='search-button'><FaSearch size={20} color='#4f4f4f' /></button>
            <input
                className='search-input'
                onChange={(e) => { onChange(e.target.value) }}
                value={inputValue}
                type="text"
                placeholder={placeholder}
            />
        </form>
    )
}

export default SearchInput