import { useEffect } from 'react';
import { useForm, type SubmitHandler } from "react-hook-form";
import { Form, FormControl, FormField, FormItem, FormLabel } from '../ui/form';
import { Input } from '../ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Checkbox } from '../ui/checkbox';
import { Textarea } from '../ui/textarea';
import { Button } from '../ui/button';
import type { IBook } from "@/type";
import { useEditBookMutation, useGetSingleBookQuery,} from "@/Redux/Api/baseApi";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";

export function EditBook() {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();

    const form = useForm<IBook>();

    const { data: bookResponse, isLoading: isFetching } = useGetSingleBookQuery(id);
    const [updateBook, { isLoading: isUpdating }] = useEditBookMutation();

    useEffect(() => {
        if (bookResponse?.data) {
            form.reset(bookResponse.data);
        }
    }, [bookResponse, form]);
    
    const onSubmit: SubmitHandler<IBook> = async (data) => {
        try {
            const payload = { id, body: { ...data } };
            await updateBook(payload).unwrap();
            toast.success("Book updated successfully!");
            navigate(`/books`); 
        } catch (error) {
            toast.error("Failed to update book.");
            console.error("Update Error:", error);
        }
    };

    if (isFetching) {
        return <div className="text-center py-20">Loading book data...</div>;
    }

    return (
        <div className='container justify-center items-center m-auto py-8'>
             <h1 className="text-3xl font-bold mb-8 text-center">Edit Book</h1>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <FormField
                            control={form.control}
                            name="title"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Book Title</FormLabel>
                                    <FormControl>
                                        <Input placeholder="e.g., The Midnight Library" {...field} />
                                    </FormControl>
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="author"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Author</FormLabel>
                                    <FormControl>
                                        <Input placeholder="e.g., Matt Haig" {...field} />
                                    </FormControl>
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="genre"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Genre</FormLabel>
                                    <Select onValueChange={field.onChange} value={field.value}>
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select a genre" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            <SelectItem value="FICTION">FICTION</SelectItem>
                                            <SelectItem value="NON_FICTION">NON_FICTION</SelectItem>
                                            <SelectItem value="SCIENCE">SCIENCE</SelectItem>
                                            <SelectItem value="HISTORY">HISTORY</SelectItem>
                                            <SelectItem value="BIOGRAPHY">BIOGRAPHY</SelectItem>
                                            <SelectItem value="FANTASY">FANTASY</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="isbn"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>ISBN</FormLabel>
                                    <FormControl>
                                        <Input placeholder="e.g., 978-1-78689-273-7" {...field} />
                                    </FormControl>
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="copies"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Number of Copies</FormLabel>
                                    <FormControl>
                                        <Input type="number" min="0" {...field} onChange={e => field.onChange(parseInt(e.target.value, 10) || 0)}/>
                                    </FormControl>
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="available"
                            render={({ field }) => (
                                <FormItem className="flex flex-row items-end space-x-3 rounded-md border p-4 h-full">
                                    <FormControl>
                                        <Checkbox
                                            checked={field.value}
                                            onCheckedChange={field.onChange}
                                        />
                                    </FormControl>
                                    <div className="space-y-1 leading-none">
                                        <FormLabel>
                                            Available for borrowing
                                        </FormLabel>
                                    </div>
                                </FormItem>
                            )}
                        />
                    </div>
                    <FormField
                        control={form.control}
                        name="description"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Description</FormLabel>
                                <FormControl>
                                    <Textarea
                                        placeholder="A short summary of the book..."
                                        className="resize-none"
                                        {...field}
                                    />
                                </FormControl>
                            </FormItem>
                        )}
                    />
                    <div className="pt-4 flex justify-end">
                        <Button className="bg-[#B91C1C]" type="submit" disabled={isUpdating}>
                            {isUpdating ? 'Saving...' : 'Save Changes'}
                        </Button>
                    </div>
                </form>
            </Form>
        </div>
    );
}

export default EditBook;