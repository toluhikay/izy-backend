import React from "react";

const GeneralButton = ({ text, onclick, loaderComponent, loading }: { text: string; onclick?: () => void; loaderComponent?: React.ReactNode; loading?: boolean }) => {
  return (
    <div className="w-full">
      <button type="submit" className="bg-primary-1 flex items-center justify-center rounded-[4px] uppercase text-white py-[10px] px-[24px] w-full font-medium" onClick={onclick}>
        {loading ? loaderComponent : text}
      </button>
    </div>
  );
};

export default GeneralButton;
