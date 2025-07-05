import { useGetSingleBookQuery } from '@/Redux/Api/baseApi';
import { useParams, useNavigate } from 'react-router-dom';

const BookDetails = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const { data: response, isLoading, isError } = useGetSingleBookQuery(id);

    if (isLoading) {
        return <div className="text-center py-20">Loading...</div>;
    }
    if (isError || !response?.data) {
        return <div className="text-center py-20 text-red-500">Book not found.</div>;
    }
    const book = response.data;

    return (
        <div className="bg-gray-100 ">
            <div className="container mx-auto p-4 sm:p-8">
                <button
                    onClick={() => navigate('/books')}
                    className="mb-6 text-blue-600 hover:text-blue-800 font-semibold flex items-center"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                    </svg>
                    Back to All Books
                </button>

                <div className="bg-white rounded-2xl shadow-xl p-8 grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div className="md:col-span-1">
                        <img 
                            className="h-64 w-full object-cover" 
                            src={book.title} 
                            alt={`Cover for ${book.title}`} 
                            onError={(e) => { (e.target as HTMLImageElement).src = 'https://placehold.co/400x600/e5e7eb/9ca3af?text=No+Image'; }}
                        />
                    </div>
                    <div className="md:col-span-2 flex flex-col">
                        <span className="bg-blue-100 text-blue-800 text-sm font-semibold px-3 py-1 rounded-full self-start">
                            {book.genre}
                        </span>

                        <h1 className="text-4xl font-extrabold text-gray-900 mt-4 tracking-tight">{book.title}</h1>
                        <h2 className="text-xl text-gray-500 mt-2">by {book.author}</h2>

                        <p className="mt-6 text-gray-700 leading-relaxed">
                            {book.description}
                        </p>
                        
                        <div className="mt-6 border-t border-gray-200 pt-6">
                            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                                <div>
                                    <p className="font-semibold text-gray-800">Availability</p>
                                    <p className="text-sm text-gray-600">{book.copies} copies in stock</p>
                                </div>
                                {book.available ? (
                                    <span className="text-sm font-bold text-green-800 bg-green-100 px-4 py-2 rounded-full">Available</span>
                                ) : (
                                    <span className="text-sm font-bold text-red-800 bg-red-100 px-4 py-2 rounded-full">Unavailable</span>
                                )}
                            </div>
                             <p className="text-xs text-gray-400 mt-4 font-mono text-center">ISBN: {book.isbn}</p>
                        </div>
                        <div className="mt-2 pt-2 flex items-center space-x-3">
                             <button
                                disabled={!book.available}
                                onClick={() => navigate(`/borrow/${id}`)}
                                className="w-full bg-gray-900 text-white font-bold py-3 rounded-lg hover:bg-gray-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
                            >
                                Borrow Now
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BookDetails;