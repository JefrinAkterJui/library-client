import { useDeleteBookMutation, useGetBookQuery } from "@/Redux/Api/baseApi";
import type { IBook } from "@/type";
import BookCard from "../Cards/BookCard";
import Swal from 'sweetalert2';


const AllBooksPage: React.FC = () => {
  const { data, isLoading } = useGetBookQuery(undefined);
  const [deleteBook] = useDeleteBookMutation()
  
if (isLoading) {
    return <p className="container">Loading....</p>; 
}
const handelDelete = async (id: string) => {
  const result = await Swal.fire({
    title: "Are you sure?",
    text: "You won't be able to revert this!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes, delete it!"
  });
  if (result.isConfirmed) {
    try {
      await deleteBook(id).unwrap();
      Swal.fire({
        title: "Deleted!",
        text: "Your file has been deleted.",
        icon: "success"
      });
    } catch (error) {
      Swal.fire({
        title: "Failed!",
        text: "Something went wrong during deletion.",
        icon: "error"
      });
      console.log(error);
    }
  }
};

  return (
    <section className="bg-gray-50 dark:bg-gray-900 py-12 md:py-20 px-4">
      <div className="container mx-auto">
        <div className="text-left mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-white">All Books</h2>
          <p className="mt-2 text-gray-600 dark:text-gray-300">Browse, borrow, and manage your library collection.</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {
            data && data.data?.map((book: IBook) => (
              <BookCard book={book} key={book._id} onDelete={handelDelete}/>
            ))
          }
        </div>
      </div>
    </section>
  );
};

export default AllBooksPage;