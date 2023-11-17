"use client";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "../ui/button";
import { useForm } from "react-hook-form";
//import { Form } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CommentValidation } from "@/lib/validations/raven";
import * as z from "zod";
import Image from "next/image";
import { Input } from "../ui/input";
import { usePathname, useRouter } from "next/navigation";
import { addCommentToRaven } from "@/lib/actions/ravens.actions";

interface Props {
  ravenId: string;
  currentUserImg: string;
  currentUserId: string;
}

const Comment = ({ ravenId, currentUserImg, currentUserId }: Props) => {
  const pathname = usePathname();

  const form = useForm({
    resolver: zodResolver(CommentValidation),
    defaultValues: {
      raven: "",
    }
  });

  const onSubmit = async (values: z.infer<typeof CommentValidation>) => {
    
      await addCommentToRaven(
        ravenId, 
        values.raven, 
        JSON.parse(currentUserId), 
        pathname
      );
    
    form.reset();
    
  }

  return (
    <Form {...form}>
      <form className='comment-form' onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name='raven'
          render={({ field }) => (
            <FormItem className='flex w-full items-center gap-3'>
              <FormLabel>
                <Image
                  src={currentUserImg}
                  alt='current_user'
                  width={48}
                  height={48}
                  className='rounded-full object-cover'
                />
              </FormLabel>
              <FormControl className='border-none bg-transparent'>
                <Input
                  type='text'
                  {...field}
                  placeholder='Comment...'
                  className='no-focus text-light-1 outline-none'
                />
              </FormControl>
            </FormItem>
          )}
        />

        <Button type='submit' className='comment-form_btn'>
          Reply
        </Button>
      </form>
    </Form>
  );
}

export default Comment;