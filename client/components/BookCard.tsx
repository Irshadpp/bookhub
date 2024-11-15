"use client";
import { useRouter } from 'next/navigation';
import Image from 'next/image';
type BookCardProps = {
  id: string;
  title: string;
  imageUrl: string;
};

const BookCard = ({ id, title, imageUrl }: BookCardProps) => {
  const router = useRouter();

  // Navigate to the book's details page
  const handleClick = () => {
    router.push(`/${id}`);
  };

  return (
    <div
    onClick={handleClick}
    className="rounded-lg shadow-lg bg-white overflow-hidden hover:shadow-xl transition-shadow duration-300 cursor-pointer transform hover:scale-105"
  >
    <div className="relative h-96 w-full bg-gray-200 overflow-hidden">
      <Image
        src={imageUrl}
        alt={title}
        layout="fill" 
        objectFit="cover"
        className="rounded-t-lg"
      />
    </div>
    <div className="p-4">
      <h2 className="text-lg font-semibold text-gray-800 truncate">
        {title}
      </h2>
    </div>
  </div>
  );
};

export default BookCard;
