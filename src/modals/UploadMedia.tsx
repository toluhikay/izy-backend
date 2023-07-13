import React, { useState } from "react";
import ModalWrapper from "../common/ModalWrapper";
import ButtonLoader from "../common/ButtonLoader";
import PersonPlaceHolder from "../assets/images/PersonPlaceholder.jpeg";
import { IzyAdminApis } from "../api/Query";
import toast from "react-hot-toast";

const UploadMedia = ({ setModalOpen }: { setModalOpen: React.Dispatch<React.SetStateAction<boolean>> }) => {
  const [image, setImage] = useState<any | null>(null);
  const [imageData, setImageData] = useState<File | null>(null);
  const [postMedia, postMediaMutationResults] = IzyAdminApis.useUploadMediaMutation();

  const HandleImageUpload = async (e: any) => {
    e.preventDefault();

    try {
      const data = new FormData();
      data.append("media", imageData || "");
      const result = await postMedia(data).unwrap();
      toast.success("Image Uploaded to Database Successfully");
      setTimeout(() => {
        setModalOpen(false);
      }, 2000);
    } catch (error) {}
  };

  return (
    <ModalWrapper>
      <form action="" className="w-[400px] bg-white flex flex-col items-center max-w-[90vw] min-h-[150px]">
        <div>
          <div className="flex items-center">
            <div className="border-2 border-primary-1 object-cover shadow-2xl my-10 overflow-hidden relative rounded h-24 w-24">
              <img src={image} className="w-full h-full object-cover z-[10]" alt="" />
            </div>
            <label htmlFor="image" className=" text-primary-1 cursor-pointer pl-6">
              Add New Picture
            </label>
            <input
              type="file"
              id="image"
              onChange={(e) => {
                if (e.target.files) {
                  setImageData(e.target.files[0]);
                  // formik.setFieldValue("image", e.target.files[0]);
                  setImage(URL.createObjectURL(e.target.files[0]));
                }
              }}
              accept="image/*"
              required
              hidden
            />
          </div>
        </div>
        <div className="my-10">
          <button type="button" className="border border-primary-1 py-3 font-medium rounded mr-3 px-5" onClick={() => setModalOpen(false)}>
            Cancel
          </button>
          <button type="button" className="bg-primary-1 py-3 cursor-pointer border text-white rounded uppercase font-medium px-5" onClick={HandleImageUpload}>
            {postMediaMutationResults.isLoading ? <ButtonLoader /> : "Add Photo"}
          </button>
        </div>
      </form>
    </ModalWrapper>
  );
};

export default UploadMedia;
