import z from "zod";

const phoneRegex = new RegExp(
  /^([+]?[\s0-9]+)?(\d{3}|[(]?[0-9]+[)])?([-]?[\s]?[0-9])+$/,
);

const contactSchema = z.object({
  email: z.string().email(),
  phoneNumber: z.string().regex(phoneRegex).length(8),
});

export const grantFundraisingSchema = z.object({
  title: z.string().min(1, { message: "Title cannot be empty" }),
  description: z.string().min(20),
  shortDescription: z.string().max(255),
  categories: z.string().array().optional(),
  link: z.string().url().min(1, { message: "Choose start time" }),
  startTime: z.string().min(1, { message: "Choose start time" }),
  endTime: z.string().min(1, { message: "Choose end time" }),
  contact: contactSchema,
});

export const fundraisingSchema = z.object({
  title: z.string().min(1, { message: "Title cannot be empty" }),
  description: z.string().min(20),
  shortDescription: z.string().max(255),
  categories: z.string().array().optional(),
  goalAmount: z.string().min(1, { message: "Provide your goal amount" }),
  currentAmount: z.string().min(1),
  startTime: z.string().min(1, { message: "Choose start time" }),
  endTime: z.string().min(1, { message: "Choose end time" }),
  contact: contactSchema,
});

export type ProjectInputs = {
  title: string;
  description: string;
  shortDescription: string;
  categories: string[];
  goalAmount?: string;
  currentAmount?: string;
  link?: string;
  startTime: string;
  endTime: string;
  contact: {
    email: string;
    phoneNumber: string;
  };
};
