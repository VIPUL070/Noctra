import { UseMutateFunction } from "@tanstack/react-query";
import { zodResolver } from "@hookform/resolvers/zod";
import { ZodType } from "zod";
import { FieldValues, useForm } from "react-hook-form";

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
    } = useForm<FieldValues>({
        resolver: zodResolver(schema),
        defaultValues,
    });

    const onFormSubmit = handleSubmit((values) => mutation(values));

    return { register, watch, reset, errors, onFormSubmit };
};

export default useZodForm;