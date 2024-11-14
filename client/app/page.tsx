"use client";
import { useEffect, useState } from 'react';
import BookCard from '../components/BookCard';
import { fetchBooks } from '@/lib/api';

export default function HomePage() {
  const [books, setBooks] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const limit = 8;
  useEffect(() => {
    const loadBooks = async () => {
      try {
        const response = await fetchBooks(currentPage, limit);
        const data = response.data;
        setBooks(data.books);
        setTotalPages(data.totalPages);
      } catch (error) {
        console.error("Error fetching books:", error);
      }
    };

    loadBooks();
  }, [currentPage]);

  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  return (
    <div className="p-6">
      <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4">
        {books.map((book: any) => (
          <BookCard 
            key={book.id} 
            id={book.id} 
            title={book.title} 
            imageUrl={book.imageURL} 
          />
        ))}
      </div>
      <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
    </div>
  );
}

const Pagination = ({ currentPage, totalPages, onPageChange }: any) => {
  return (
    <div className="flex justify-center items-center mt-6 space-x-2">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:bg-gray-300"
      >
        Previous
      </button>
      <span className="text-lg font-semibold text-gray-700">
        Page {currentPage} of {totalPages}
      </span>
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:bg-gray-300"
      >
        Next
      </button>
    </div>
  );
};
