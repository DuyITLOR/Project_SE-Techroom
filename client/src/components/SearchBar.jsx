import React, {useState}from 'react'

const SearchBar = ({inputText, Icon, onSearch}) => {
    const [searchTerm, setSearchTerm] = useState('');

    const handleSearch = (e) => {
        if(searchTerm.trim() !== '') {
            console.log(`Searching for: ${searchTerm}`);
            onSearch(searchTerm);
        }
    }

    const handleKeyDown = (e) => {
        if(e.key === 'Enter') {
            handleSearch(e);
        }
    }

  return (
    <div>
        <div className='flex items-center justify-center w-full h-[40px] sm:h-[60px] px-2 bg-white rounded-lg shadow-md font-family'>
            <div className='flex items-center w-full  bg-gray-100 backdrop-blur-2xl border border-white/30 rounded-xl shadow-md'>
                <button type ='button' onClick = {handleSearch} className='focus:outline-amber-600'>
                    <Icon className='w-6 h-6 sm:w-10 sm:h-10 text-gray-500 px-2 hover:scale-100 transition' />
                </button>

                <input
                type='text'
                value = {searchTerm}
                onChange = {(e) => setSearchTerm(e.target.value)}
                onKeyDown={handleKeyDown}
                className='w-full h-full px-2 text-xs sm:text-xl text-gray-700 placeholder-gray-400 focus:outline-none '
                placeholder= {inputText}
                />

            </div>
        </div>
    </div>
  )
}

export default SearchBar