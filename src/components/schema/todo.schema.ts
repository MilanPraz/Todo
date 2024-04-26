import { FormInput } from "@/types/todo.type";
import { ZodType, z } from "zod";

//zod schema
export const zodSchema: ZodType<FormInput> = z.object({
  title: z
    .string({
      required_error: "Title is required",
      invalid_type_error: "Title is required",
    })
    .min(10, {
      message: "Title should be of 10 or more characters",
    }),
});
