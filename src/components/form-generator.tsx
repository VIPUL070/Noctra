import { FieldErrors, FieldValues, UseFormRegister } from "react-hook-form";

interface FormProps {
  type?: "text" | "email" | "password" | "number";
  inputType: "select" | "input" | "textarea";
  options?: { value: string; label: string; id: string }[];
  label?: string;
  placeholder: string;
  register: UseFormRegister<any>;
  name: string;
  errors: FieldErrors<FieldValues>;
  lines?: number;
}

const fieldBase =
  "w-full rounded-lg border border-input bg-background px-3 text-sm text-foreground " +
  "placeholder:text-muted-foreground shadow-xs transition-colors outline-none " +
  "focus-visible:border-ring focus-visible:ring-[1px] focus-visible:ring-ring/10 " +
  "disabled:cursor-not-allowed disabled:opacity-50 " +
  "aria-invalid:border-destructive aria-invalid:ring-destructive/20";

const FormGenerator = ({
  type = "text",
  inputType,
  options,
  label,
  placeholder,
  name,
  lines = 4,
  errors,
  register,
}: FormProps) => {
  const error = errors?.[name];
  const errorMessage =
    typeof error?.message === "string" ? error.message : undefined;
  const invalid = !!error;
  const errorId = `${name}-error`;

  const a11y = {
    id: name,
    "aria-invalid": invalid,
    "aria-describedby": invalid ? errorId : undefined,
  };

  let field: React.ReactNode = null;

  switch (inputType) {
    case "input":
      field = (
        <input
          {...a11y}
          type={type}
          placeholder={placeholder}
          className={`${fieldBase} h-10`}
          {...register(name, { valueAsNumber: type === "number" })}
        />
      );
      break;

    case "textarea":
      field = (
        <textarea
          {...a11y}
          rows={lines}
          placeholder={placeholder}
          className={`${fieldBase} resize-none py-2`}
          {...register(name)}
        />
      );
      break;

    case "select":
      field = (
        <select
          {...a11y}
          defaultValue=""
          className={`${fieldBase} h-10 cursor-pointer`}
          {...register(name)}
        >
          <option value="" disabled>
            {placeholder}
          </option>
          {options?.map((option) => (
            <option key={option.id} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      );
      break;

    default:
      return null;
  }

  return (
    <div className="flex w-full flex-col gap-1.5">
      {label && (
        <label
          htmlFor={name}
          className="text-sm font-medium leading-none text-foreground"
        >
          {label}
        </label>
      )}
      {field}
      {errorMessage && (
        <p id={errorId} role="alert" className="text-xs text-destructive">
          {errorMessage}
        </p>
      )}
    </div>
  );
};

export default FormGenerator;