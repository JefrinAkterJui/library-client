import React from 'react';
import banner from '../../assets/banner.png'
import { Link } from 'react-router-dom';

const Banner: React.FC = () => {
  return (
    <section className="bg-white py-12 md:py-7 px-4">
      <div className='container mx-auto flex flex-col md:flex-row items-center justify-between gap-8 md:gap-12'>
        <div className="flex-1 order-2 md:order-1 text-center md:text-left">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-sans font-bold tracking-wide text-gray-700 mb-2">
            WORLD BOOK DAY
          </h1>
          <p className="text-sm md:text-base font-sans font-light tracking-[0.2em] text-gray-500 mb-6 mt-4">
            YOUR DIGITAL LIBRARY
          </p>
          <p className="max-w-lg mx-auto md:mx-0 text-base md:text-lg text-gray-600 font-sans leading-relaxed mb-8">
            Dive into a universe of stories and knowledge. Our platform helps you discover new books, track your reading progress, and manage your personal library effortlessly.
          </p>
          <Link
            to="/books"
            className="bg-[#b93636] text-white font-semibold py-3 px-10 rounded-lg hover:bg-red-700 transition-colors duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50 transform hover:scale-105"
          >
          See All Books
          </Link>
        </div>
        <div className="flex-1 order-1 md:order-2">
          <img 
            src={banner}
            alt="Illustration of a digital library for World Book Day" 
            className="w-full h-auto max-w-md md:max-w-full mx-auto"
          />
        </div>
      </div>
    </section>
  );
};

export default Banner;
