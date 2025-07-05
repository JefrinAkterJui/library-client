import React from 'react';
import { NavLink } from 'react-router-dom';
import { FaEdit, FaTrash, FaBookOpen } from 'react-icons/fa';
import type { IBook } from '@/type';

interface BookCardProps {
  book: IBook;
  onDelete: (_id: string) => void;
}

const BookCard: React.FC<BookCardProps> = ({ book, onDelete}) => {
  const isDeleting = false; 


  return (
    <div className="group flex flex-col overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm transition-all duration-300 hover:shadow-lg dark:border-gray-700 dark:bg-gray-800">
      <div className="relative">
        <img 
          className="h-64 w-full object-cover" 
          src={book.title} 
          alt={`Cover for ${book.title}`} 
          onError={(e) => { (e.target as HTMLImageElement).src = 'https://placehold.co/400x600/e5e7eb/9ca3af?text=No+Image'; }}
        />
        <div className="absolute top-3 right-3">
          {book.available ? (
            <span className="inline-flex items-center rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-800 ring-1 ring-inset ring-green-600/20 dark:bg-green-900/50 dark:text-green-200">
              Available ({book.copies})
            </span>
          ) : (
            <span className="inline-flex items-center rounded-full bg-red-100 px-3 py-1 text-xs font-semibold text-red-800 ring-1 ring-inset ring-red-600/20 dark:bg-red-900/50 dark:text-red-200">
              Unavailable
            </span>
          )}
        </div>
      </div>
      <div className="flex flex-1 flex-col justify-between p-4 md:p-6">
        <div>
          <p className="text-sm font-medium text-teal-600 dark:text-teal-400">
            {book.genre}
          </p>
          <NavLink to={`/books/${book._id}`} className="mt-1 block">
            <p className="text-lg font-bold text-gray-900 group-hover:text-[#B91C1C] dark:text-white dark:group-hover:text-blue-400">
              {book.title}
            </p>
            <p className="mt-2 text-sm text-gray-500">
              by {book.author}
            </p>
            <p className="mt-2 text-sm text-gray-800 ">
              by {book.description}
            </p>
          </NavLink>
        </div>
      </div>
      <div className="border-t border-gray-200 bg-gray-50 p-3 dark:border-gray-700 dark:bg-gray-800/30">
        <div className="flex items-center justify-between">
          <NavLink
            to={`/borrow/${book._id}`}
            className="flex flex-grow justify-center items-center gap-2 rounded-md px-4 py-2 text-sm font-medium text-blue-600 transition hover:bg-blue-100 dark:text-blue-400 dark:hover:bg-blue-900/50"
            title="Borrow This Book"
          >
            <FaBookOpen size={16} />
            <span>Borrow</span>
          </NavLink>
          <div className="flex items-center">
            <NavLink
              to={`/edit-book/${book._id}`}
              className="rounded-md p-2 text-sm font-medium text-gray-500 transition hover:bg-gray-200 hover:text-indigo-600 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-indigo-400"
              title="Edit"
            >
              <FaEdit size={16} />
            </NavLink>
            <button
              onClick={() => onDelete(book._id)}
              key={book._id}
              disabled={isDeleting}
              className="rounded-md p-2 text-sm font-medium text-gray-500 transition hover:bg-gray-200 hover:text-red-600 disabled:opacity-50 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-red-400"
              title="Delete"
            >
              <FaTrash size={14} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookCard
