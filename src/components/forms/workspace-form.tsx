import { useCreateWorkspace } from "@/hooks/useCreateWorkspace";
import FormGenerator from "../form-generator";
import { Button } from "../ui/button";
import Loader from "../ui/loader";
import { cn } from "@/lib/utils";

const WorkspaceForm = () => {
  const { errors, onFormSubmit, register, isPending } = useCreateWorkspace();
  return (
    <form onSubmit={onFormSubmit} className="flex flex-col gap-y-3">
      <FormGenerator
        inputType="input"
        type="text"
        name="name"
        label="Workspace"
        placeholder="workspace name"
        register={register}
        errors={errors}
      />

      <Button type="submit" size={'sm'} disabled={isPending} className={cn('cursor-pointer max-w-full mt-2 text-sm')}>
        {isPending ? <Loader /> : 'Create Workspace'} 
      </Button>
    </form>
  );
};

export default WorkspaceForm;
