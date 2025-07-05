import { useForm, type SubmitHandler } from "react-hook-form";
import { Form, FormControl, FormField, FormItem, FormLabel } from '../ui/form';
import { Input } from '../ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Checkbox } from '../ui/checkbox';
import { Textarea } from '../ui/textarea';
import { DialogFooter } from '../ui/dialog';
import { Button } from '../ui/button';
import type { IBook } from "@/type";
import { useCreateBookMutation } from "@/Redux/Api/baseApi";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export function AddBookDialog() {
  const form = useForm<IBook>({
    defaultValues: {
      title: "",
      author: "",
      genre: "",
      isbn: "",
      description: "",
      copies: 1,
      available: true, 
    }
  });
  const [createBook] = useCreateBookMutation()
  const navigate = useNavigate()

  const onSubmit: SubmitHandler<IBook> = async (data) => {
    try {
      const res = await createBook({ ...data }).unwrap();

      if (res.success) {
        toast.success("Book created successfully!"); 
        form.reset();
        navigate('/books');
      }
    } catch (error) {
      toast.error("Failed to create book. Please fill out all fields");
      console.error("Failed to create book:", error);
    }
  };

  return (
    <div className='container justify-center items-center m-auto py-8'>
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
                <Select onValueChange={field.onChange} defaultValue={field.value}>
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
        <DialogFooter className="pt-4">
          <Button className="bg-[#B91C1C]" type="submit">Add Book</Button>
        </DialogFooter>
      </form>
      </Form>
    </div>
  );
}

export default AddBookDialog;
