"use client";
import { deleteBook, fetchBookDetails } from '@/lib/api';
import { useRouter } from 'next/navigation';
import { use, useEffect, useState } from 'react';
import Image from 'next/image';
import Swal from 'sweetalert2';

type BookDetailsPageProps = {
  params: Promise<{ id: string }>; // Dynamic route param for the book ID
};

const BookDetailsPage = ({ params }: BookDetailsPageProps) => {
  const [book, setBook] = useState<any>(null);
  const router = useRouter();

  const { id } = use(params)

  useEffect(() => {
    if (!id) return;    
    const loadBookDetails = async () => {
      try {
        const response = await fetchBookDetails(id);
        setBook(response.data);
      } catch (error) {
        console.error("Error fetching book details:", error);
      }
    };

    loadBookDetails();
  }, [id]);

  const handleEdit = () => {
    router.push(`/edit/${id}`);
  };

  const handleDelete = async () => {
    try {
      const result = await Swal.fire({
        title: 'Are you sure?',
        text: "This action cannot be undone!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#d33',
        cancelButtonColor: '#3085d6',
        confirmButtonText: 'Yes, delete it!'
      });
  
      if (result.isConfirmed) {
        await deleteBook(id);
        await Swal.fire('Deleted!', 'The book has been deleted.', 'success');
        router.push('/');
      }
    } catch (error) {
      console.error("Error deleting book:", error);
      Swal.fire('Error', 'There was an issue deleting the book.', 'error');
    }
  };

  if (!book) return <div>Loading...</div>;

  return (
    <div className="max-w-4xl mx-auto p-2">
      <div className="bg-white shadow-lg rounded-lg p-4 space-y-2">
        {/* Book Image */}
        <div className="flex justify-center">
          <Image
            src={book.imageURL}
            alt={book.title}
            width={256}
            height={384}
            className="object-cover rounded-lg"
          />
        </div>

        {/* Book Information */}
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-800">{book.title}</h1>
          <p className="text-xl text-gray-600 mt-2">{book.author}</p>
          <p className="text-md text-gray-500 mt-4">{book.description}</p>
          <p className="text-md text-gray-500 mt-2">ISBN: {book.isbn}</p>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-center space-x-4 mt-6">
          <button
            onClick={handleEdit}
            className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none"
          >
            Edit
          </button>
          <button
            onClick={handleDelete}
            className="px-6 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 focus:outline-none"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default BookDetailsPage;
