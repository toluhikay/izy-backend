import React from "react";

const ModalCancelButton = ({ onClick }: { onClick?: React.MouseEventHandler<HTMLButtonElement> }) => {
  return (
    <button className="py-[10px] px-5 border border-natural-1 rounded" onClick={onClick}>
      Cancel
    </button>
  );
};

export default ModalCancelButton;
