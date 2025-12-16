"use client";

import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";

const promptSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().optional(),
  engagementDate: z.date({
    required_error: "Engagement date is required",
  }),
});

type PromptFormValues = z.infer<typeof promptSchema>;

interface AddPromptDialogProps {
  open: boolean;
  onClose: () => void;
  defaultValues?: {
    _id?: string;
    title?: string;
    description?: string;
    engagementDate?: string;
  } | null;
}

export function AddPromptDialog({
  open,
  onClose,
  defaultValues,
}: AddPromptDialogProps) {
  const isEditMode = !!defaultValues?._id;

  const form = useForm<PromptFormValues>({
    resolver: zodResolver(promptSchema),
    defaultValues: {
      title: "",
      engagementDate: new Date(),
    },
  });

  useEffect(() => {
    if (open && defaultValues) {
      form.reset({
        title: defaultValues.title || "",
        engagementDate: defaultValues.engagementDate
          ? new Date(defaultValues.engagementDate)
          : new Date(),
      });
    } else if (open && !defaultValues) {
      form.reset({
        title: "",
        engagementDate: new Date(),
      });
    }
  }, [open, defaultValues, form]);

  const onSubmit = (data: PromptFormValues) => {
    console.log(isEditMode ? "Updating:" : "Creating:", data);
    // Simulate success
    onClose();
    form.reset();
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>
            {isEditMode ? "Edit Prompt" : "Add New Prompt"}
          </DialogTitle>
          <DialogDescription>
            {isEditMode
              ? "Update the prompt details below"
              : "Fill in the details to create a new prompt"}
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title *</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter prompt title" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="engagementDate"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Engagement Date *</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant="outline"
                          className={cn(
                            "w-full pl-3 text-left font-normal",
                            !field.value && "text-muted-foreground"
                          )}
                        >
                          {field.value ? (
                            format(field.value, "PPP")
                          ) : (
                            <span>Pick a date</span>
                          )}
                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        onChange={(value) => field.onChange(value as Date)}
                        value={field.value}
                        minDate={new Date("1900-01-01")}
                      />
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />

            <DialogFooter className="sm:justify-between">
              <Button type="button" variant="outline" onClick={onClose}>
                Cancel
              </Button>
              <Button type="submit">
                {isEditMode ? "Update" : "Create"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}