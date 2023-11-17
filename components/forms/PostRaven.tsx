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
// import { Form } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { RavenValidation } from "@/lib/validations/raven";
import * as z from "zod";
import Image from "next/image";
import { Textarea } from "../ui/textarea";
import { usePathname, useRouter } from "next/navigation";
import { updateUser } from "@/lib/actions/user.actions";
import { createRaven } from "@/lib/actions/ravens.actions";

interface Props {
  user: {
    id: string;
    objectId: string;
    username: string;
    name: string;
    bio: string;
    image: string;
  };
  btnTitle: string;
}

function PostRaven({ userId }: { userId: string }) {
  const router = useRouter();
  const pathname = usePathname();

  const form = useForm({
    resolver: zodResolver(RavenValidation),
    defaultValues: {
      raven: "",
      accountId: userId,
    },
  });

  const onSubmit = async (values: z.infer<typeof RavenValidation>) => {
    await createRaven({
        text: values.raven,
        author: userId,
        communityId: null,
        path: pathname
    });

    router.push("/")
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="mt-10 flex flex-col justify-start gap-10"
      >
        <FormField
          control={form.control}
          name="raven"
          render={({ field }) => (
            <FormItem className="flex flex-col w-full gap-3">
              <FormLabel className="text-base-semibold text-light-2">
                Content
              </FormLabel>
              <FormControl className="no-focus border border-dark-4
              bg-dark-3 text-light-1">
                <Textarea
                  rows={15}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit"
        className="bg-primary-500">
            Send a Raven
        </Button>
      </form>
    </Form>
  );
}

export default PostRaven;
