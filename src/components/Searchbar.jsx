import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { FiSearch } from 'react-icons/fi'

const Searchbar = () => {
  const navigate = useNavigate()
  const [searchTerm, setSearchTem] = useState()
  const handleSubmit = e => {
    e.preventDefault()
    navigate(`/search/${searchTerm}`)
  }

  return (
    <form
      autoComplete="off"
      className="p2- text-gray-400 focus-within:text-gray-600"
      onSubmit={handleSubmit}
    >
      <label htmlFor="search-field" className="sr-only">
        Search...
      </label>
      <div className="flex flex-row justify-start items-center">
        <FiSearch className="w-5 h-5 ml-4" />
        <input
          className="flex-1 bg-transparent border-none outline-none placeholder-gray-500 text-base text-white p-4"
          type="text"
          name="search-field"
          autoComplete="off"
          id="search-field"
          placeholder="搜索"
          value={searchTerm}
          onChange={e => setSearchTem(e.target.value)}
        />
      </div>
    </form>
  )
}

export default Searchbar
