import { UseMutateFunction } from "@tanstack/react-query";
import { zodResolver } from "@hookform/resolvers/zod";
import { z, ZodType } from "zod";
import {  useForm } from "react-hook-form";

const useZodForm = (
    schema: ZodType<any, any, any>,
    mutation: UseMutateFunction<any, Error, any>,
    defaultValues?: any
) => {
    const {
        register,
        watch,
        reset,
        handleSubmit,
        formState: { errors },
    } = useForm<z.infer<typeof schema>>({
        resolver: zodResolver(schema),
        defaultValues,
    });

    const onFormSubmit = handleSubmit((values) => mutation(values));

    return { register, watch, reset, errors, onFormSubmit };
};

export default useZodForm;