"use client"
import { useState, useEffect, useCallback } from 'react';
import { debounce } from 'lodash';
import { useRouter } from 'next/navigation';
import { searchBooks } from '../lib/api';

const Navbar = () => {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [isSearching, setIsSearching] = useState<boolean>(false);
  const router = useRouter();

  // Debounced search handler
  const debouncedSearch = useCallback(
    debounce(async (query: string) => {
      if (query) {
        setIsSearching(true);
        try {
          const response = await searchBooks(query);
          setSearchResults(response.data);
        } catch (error) {
          console.error("Error fetching search results:", error);
        } finally {
          setIsSearching(false);
        }
      } else {
        setSearchResults([]);
      }
    }, 300),
    []
  );

  useEffect(() => {
    debouncedSearch(searchQuery);
    return debouncedSearch.cancel;
  }, [searchQuery, debouncedSearch]);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  const handleCreateBook = () => {
    router.push('/create');
  };

  const handleSelectResult = (id: string) =>{
    router.push(`/${id}`)
    setSearchResults([]);
  }

  return (
    <nav className="flex items-center justify-between p-4 bg-indigo-600 text-white shadow-md">
      {/* Logo */}
      <div className="text-xl font-semibold cursor-pointer" onClick={() => router.push('/')}>
        BookHub
      </div>

      {/* Search Bar */}
      <div className="relative">
        <input
          type="text"
          placeholder="Search books..."
          value={searchQuery}
          onChange={handleSearchChange}
          className="p-2 pl-3 w-64 text-black rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400"
        />
        {/* Show results in a dropdown if any */}
        {searchResults.length > 0 && (
          <div className="absolute top-12 left-0 w-full bg-white text-black rounded-md shadow-lg overflow-hidden z-10">
            {isSearching ? (
              <p className="p-2 text-center text-gray-500">Searching...</p>
            ) : (
              searchResults.map((result, index) => (
                <div
                  key={index}
                  className="p-2 hover:bg-gray-100 cursor-pointer"
                  onClick={() => handleSelectResult(result.id)} // Navigate to book detail page
                >
                  {result.title} by {result.author}
                </div>
              ))
            )}
          </div>
        )}
      </div>

      {/* Create Book Button */}
      <button
        onClick={handleCreateBook}
        className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded-md"
      >
        Create Book
      </button>
    </nav>
  );
};

export default Navbar;
