import React from "react";
import ModalWrapper from "../common/ModalWrapper";
import ModalCancelButton from "../common/ModalCancelButton";
import { IzyAdminApis } from "../api/Query";
import ButtonLoader from "../common/ButtonLoader";

const DeleteBlogModal = ({ modalOpen, setModalOpen, id }: { modalOpen: boolean; setModalOpen: React.Dispatch<React.SetStateAction<boolean>>; id: string }) => {
  const params = { reference: id };
  const [deleteBlogMutation, deleteBlogMutationResults] = IzyAdminApis.useDeleteBlogMutation();

  const HandleDeleteImage = async (e: any) => {
    e.preventDefault();

    try {
      const result = await deleteBlogMutation(params);
      setTimeout(() => {
        setModalOpen(false);
      }, 500);
    } catch (error) {}
  };

  return (
    <ModalWrapper>
      <div className="bg-white rounded-xl w-[426px] p-6 items-center justify-center text-center max-w-full">
        <p className="text-xl font-semibold mb-2">Delete Blog</p>
        <p className="text-[#706067] mb-8">Deleting this blog post means it will be permanently removed from the data base. Are you sure you want to do this? </p>
        <div className="flex items-center justify-center">
          <ModalCancelButton onClick={() => setModalOpen(false)} />
          <button type="button" className="bg-[#FE1B1B] py-[10px] rounded border border-[#FE1B1B] ml-3 text-white px-5" onClick={HandleDeleteImage}>
            {deleteBlogMutationResults.isLoading ? <ButtonLoader /> : "Delete"}
          </button>
        </div>
      </div>
    </ModalWrapper>
  );
};

export default DeleteBlogModal;
