import type { IBorrowBook } from "@/type";
import { useForm, type SubmitHandler } from "react-hook-form";
import { toast } from "react-toastify";
import {  DialogFooter} from "../ui/dialog";
import { Button } from "../ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel } from "../ui/form";
import { Input } from "../ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { cn } from "@/lib/utils";
import { CalendarIcon } from "lucide-react";
import { Calendar } from "../ui/calendar";
import { useBorrowBookMutation } from "@/Redux/Api/baseApi";
import { useNavigate, useParams } from "react-router-dom";
import { format } from "date-fns";


export function BorrowBookPage (){
  const [borrowBook, {data}] = useBorrowBookMutation()
  const navigate = useNavigate()
  const {id} = useParams()
  console.log(id)

  const form = useForm<IBorrowBook>({
    defaultValues: {
      book:id,
      quantity: 1,
      dueDate: undefined,
    },
  });

 const onSubmit: SubmitHandler<IBorrowBook> = async (data) => {
  console.log(data)
    try {
      const res = await borrowBook(data).unwrap()

      if (res.data) {
        console.log('hocche')
        toast.success(`You have successfully borrowed"`);
        form.reset();
        navigate('/borrow-summary')
      }
    } catch (error) {
      toast.error("Failed to borrow book. Please fill out all fields");
      console.error("Failed to borrow book:", error);
    }
  };

  return (
    <div className=" container justify-center items-center m-auto py-8 ">
      <div>
        <h1 className="text-xl mb-9">Borrow Book</h1>
        <p className="mb-4">Available Copies:</p>
      </div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <div className="space-y-4">
              <FormField
                control={form.control}
                name="quantity"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Quantity</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        {...field}
                        onChange={(e) => field.onChange(parseInt(e.target.value, 10) || 0)}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="dueDate"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Due Date</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant={"outline"}
                            className={cn(
                              "w-full justify-start text-left font-normal",
                              !field.value && "text-muted-foreground"
                            )}
                          >
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {field.value ? (
                              format(field.value, "PPP")
                              ) : (
                              <span>Pick a date</span>
                            )}
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={field.value}
                          onSelect={field.onChange}
                          disabled={(date) => date < new Date() || date < new Date("1900-01-01")}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                  </FormItem>
                )}
              />
            </div>
            <DialogFooter>
              <Button type="submit">Confirm Borrow</Button>
            </DialogFooter>
          </form>
        </Form>
    </div>
  );
}

export default BorrowBookPage 