'use client'

import { useState } from 'react'
import SearchInput from '../SearchInput/SearchInput'
import './Search.css'

function Search({placeholder}) {

    const [inputValue, setInputValue] = useState('')

    return (
        <div className='search'>
            <SearchInput
                inputValue={inputValue}
                setInputValue={setInputValue}
                placeholder={placeholder}
            />
        </div>
    )
}

export default Search