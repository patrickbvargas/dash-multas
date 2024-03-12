import { Button } from "@components";
import { CheckIcon, ChevronLeftIcon, ChevronRightIcon } from "@icons/mini";

interface FormControlsProps {
  currentPageIndex: number;
  lastPageIndex: number;
  isUpdate: boolean;
  isSubmitting: boolean;
  previousCallback: () => void;
  nextCallback: () => void;
  submitCallback?: () => void;
}

const FormControls = ({
  currentPageIndex = 0,
  lastPageIndex = 0,
  isUpdate = false,
  isSubmitting = false,
  previousCallback,
  nextCallback,
  submitCallback,
}: FormControlsProps) => {
  return (
    <div className="flex gap-1 place-self-end">
      {currentPageIndex - 1 >= 0 && (
        <Button
          className="opacity-50"
          type="button"
          label="Anterior"
          icon={<ChevronLeftIcon className="h-5" />}
          variant="ghost"
          iconStyle="startIcon"
          onClick={previousCallback}
        />
      )}
      {currentPageIndex + 1 <= lastPageIndex && (
        <Button
          label="Próximo"
          type="button"
          icon={<ChevronRightIcon className="h-5" />}
          variant="ghost"
          iconStyle="endIcon"
          onClick={nextCallback}
        />
      )}
      {currentPageIndex === lastPageIndex && (
        <Button
          label={isSubmitting ? "Processando..." : isUpdate ? "Atualizar" : "Cadastrar"}
          type="submit"
          icon={isSubmitting ? null : <CheckIcon className="h-5" />}
          iconStyle="endIcon"
          onClick={submitCallback}
          disabled={isSubmitting}
        />
      )}
    </div>
  );
};

export default FormControls;
