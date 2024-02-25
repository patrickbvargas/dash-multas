import React from "react";
import Control from "../Control/Control";
import { PencilSquareIcon, TrashIcon } from "@heroicons/react/24/solid";

interface ActionControlsProps {
  editCallback: () => void;
  deleteCallback: () => void;
}

const ActionControls = ({ editCallback = () => {}, deleteCallback = () => {} }: ActionControlsProps) => {
  const handleClick = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>, callback: () => void) => {
    event.stopPropagation();
    event.preventDefault();
    callback();
  };

  return (
    <Control.Root className="flex justify-end">
      <Control.Action
        icon={<PencilSquareIcon className="h-5 w-5" />}
        variant="edit"
        onClick={(event) => handleClick(event, editCallback)}
      />
      <Control.Action
        icon={<TrashIcon className="h-5 w-5" />}
        variant="delete"
        onClick={(event) => handleClick(event, deleteCallback)}
      />
    </Control.Root>
  );
};

export default ActionControls;
