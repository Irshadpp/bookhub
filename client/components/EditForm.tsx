"use client";
import { useState, useEffect } from 'react';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { fetchBookDetails, updateBook } from '@/lib/api'; // Assuming you have an API for fetching and updating books
import { toast } from 'react-toastify';

const bookSchema = z.object({
  title: z.string().trim().min(1, "Title is required"),
  author: z.string().trim().min(1, "Author is required"),
  publicationYear: z.number().int().nonnegative(),
  isbn: z.string().trim().optional(),
  description: z.string().trim().optional(),
  imageURL: z.string().url("Please upload a valid image").min(1, "Image is required"),
});

type BookFormData = z.infer<typeof bookSchema>;

export const EditForm = ({ id }: { id: string }) => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<BookFormData>({
    resolver: zodResolver(bookSchema),
  });
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [book, setBook] = useState<BookFormData | null>(null);

  useEffect(() => {
    const loadBookDetails = async () => {
      try {
        const response = await fetchBookDetails(id); // Fetch the book details by ID
        setBook(response.data); // Set the fetched book details
      } catch (error) {
        console.error("Error fetching book details:", error);
      }
    };

    loadBookDetails();
  }, [id]);

  // Set default values when book data is available
  useEffect(() => {
    if (book) {
      setValue("title", book.title);
      setValue("author", book.author);
      setValue("publicationYear", book.publicationYear);
      setValue("isbn", book.isbn || '');
      setValue("description", book.description || '');
      setValue("imageURL", book.imageURL || '');
    }
  }, [book, setValue]);

  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setUploading(true);
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET!);

    try {
      const response = await axios.post(`https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_NAME}/image/upload`, formData);
      const imageUrl = response.data.secure_url;
      setValue("imageURL", imageUrl);
    } catch (error) {
      console.error("Image upload failed:", error);
    } finally {
      setUploading(false);
    }
  };

  const handleFormSubmit = async (data: BookFormData) => {
    setError(null);
    setLoading(true);
    try {
      await updateBook(id, data); // Assuming you have an API method to update the book
      toast.success("Book edited successfully!");
      router.push(`/${id}`);
    } catch (error: any) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  if (!book) return <div>Loading...</div>;

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-2 max-w-lg p-6 rounded-lg shadow-md bg-gradient-to-br from-gray-50 to-gray-200">
      <div className="flex flex-col mb-4">
        <input
          {...register("title")}
          placeholder="Title"
          className="input-field border border-gray-300 focus:ring-2 focus:ring-blue-400 focus:border-blue-500 rounded-lg p-3 text-gray-800 shadow-sm"
        />
        {errors.title && <p className="text-red-600 text-sm mt-1">{errors.title.message}</p>}
      </div>

      <div className="flex flex-col mb-4">
        <input
          {...register("author")}
          placeholder="Author"
          className="input-field border border-gray-300 focus:ring-2 focus:ring-blue-400 focus:border-blue-500 rounded-lg p-3 text-gray-800 shadow-sm"
        />
        {errors.author && <p className="text-red-600 text-sm mt-1">{errors.author.message}</p>}
      </div>

      <div className="flex flex-col mb-4">
        <input
          type="number"
          {...register("publicationYear", { valueAsNumber: true })}
          placeholder="Publication Year"
          className="input-field border border-gray-300 focus:ring-2 focus:ring-blue-400 focus:border-blue-500 rounded-lg p-3 text-gray-800 shadow-sm"
        />
        {errors.publicationYear && <p className="text-red-600 text-sm mt-1">{errors.publicationYear.message}</p>}
      </div>

      <div className="flex flex-col mb-4">
        <input
          {...register("isbn")}
          placeholder="ISBN"
          className="input-field border border-gray-300 focus:ring-2 focus:ring-blue-400 focus:border-blue-500 rounded-lg p-3 text-gray-800 shadow-sm"
        />
        {errors.isbn && <p className="text-red-600 text-sm mt-1">{errors.isbn.message}</p>}
      </div>

      <div className="flex flex-col mb-4">
        <textarea
          {...register("description")}
          placeholder="Description"
          className="input-field border border-gray-300 focus:ring-2 focus:ring-blue-400 focus:border-blue-500 rounded-lg p-3 text-gray-800 shadow-sm resize-none h-24"
        />
        {errors.description && <p className="text-red-600 text-sm mt-1">{errors.description.message}</p>}
      </div>

      <div className="flex flex-col mb-4">
        <label className="text-gray-700 font-semibold mb-2">Upload Book Image</label>
        <input type="file" onChange={handleImageUpload} accept="image/*" className="file-input text-gray-700" />
        {uploading && <p className="text-blue-500 text-sm mt-1">Uploading...</p>}
        {errors.imageURL && <p className="text-red-600 text-sm mt-1">{errors.imageURL.message}</p>}
      </div>

      {error && <p className="text-red-600 text-sm mt-4">{error}</p>}

      <button
        type="submit"
        className="w-full bg-blue-600 text-white font-semibold px-4 py-3 rounded-lg shadow-lg hover:bg-blue-700 transition ease-in-out duration-200"
      >
         {loading ? 'Saving...' : 'Save Book'}
      </button>
    </form>
  );
};
