import { useGetBorrowSummeryQuery } from "@/Redux/Api/baseApi"
import { NavLink } from "react-router-dom";

const BorrowSummary = () => {

    const { data, isLoading, isError } = useGetBorrowSummeryQuery(undefined);
    if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <h1 className="text-2xl">Loading...</h1>
      </div>
    );
    }

  if (isError || !data) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <h1 className="text-2xl text-red-500">Could not fetch summary.</h1>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen font-sans">
  <div className="container mx-auto px-4 py-12">
    <div className="text-center mb-10">
      <h1 className="text-4xl font-extrabold text-gray-800 tracking-tight">
        My Borrowed Books
      </h1>
      <p className="text-lg text-gray-600 mt-2">
        Here is the summary of all the books you have borrowed.
      </p>
    </div>

    <div className="max-w-2xl mx-auto space-y-6">
      { data.data.map((summary, index) => (
        <div key={index} className="bg-white rounded-xl shadow-md overflow-hidden transition-transform duration-300 hover:scale-105 hover:shadow-xl">
          <div className="p-6">
            <div className="flex justify-between items-start">
              <div className="flex-1">
                <p className="text-xs font-semibold text-blue-600 uppercase tracking-wider">
                  Book Title
                </p>
                <h2 className="text-2xl font-bold text-gray-900 mt-1">
                  {summary.book.title}
                </h2>
                <p className="text-sm text-gray-500 mt-2 font-mono">
                  ISBN: {summary.book.isbn}
                </p>
              </div>
              <div className="text-right ml-4">
                <p className="text-xs font-semibold text-blue-600 uppercase tracking-wider">
                  Quantity
                </p>
                <p className="text-3xl font-extrabold text-gray-900 mt-1">
                  {summary.totalQuantity}
                </p>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
    <div className="text-center mt-12">
      <NavLink to={'/books'} className="bg-gray-800 text-white font-bold py-3 px-8 rounded-lg hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50 transition-colors duration-300">
        Back to All Books
      </NavLink>
    </div>

  </div>
</div>
  )
}

export default BorrowSummary