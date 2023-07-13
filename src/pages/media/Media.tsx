import React, { useState } from "react";
import { createPortal } from "react-dom";
import UploadMedia from "../../modals/UploadMedia";
import { portals } from "../admin/blogs/Blogs";
import { IzyAdminApis } from "../../api/Query";
import DeleteImageModal from "../../modals/DeleteImageModal";

const Media = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [id, setId] = useState("");
  const getImages = IzyAdminApis.useGetImagesListQuery({});

  const ImageList = getImages?.data?.data;
  console.log(ImageList);

  return (
    <div className="w-full">
      <div className="p-8 w-full">
        <h2 className="text-[28px] font-medium mb-2">Manage Media Files</h2>
        <div className="flex justify-between mb-8 items-center w-full">
          <p className="text-natural-1">Manage your media uploads </p>
          <button className="bg-primary-1 text-white rounded-[4px] uppercase py-[10px] px-4" onClick={() => setModalOpen(true)}>
            NEW Picture +
          </button>
        </div>
      </div>
      <div className="px-[32px] py-20 flex justify-between flex-wrap items-center">
        {ImageList?.map((item: any, index: number) => {
          return (
            <div className="h-[230px] border-2 rounded border-primary-1 p-2 lg:w-[24%] md:w-[48%] w-full mb-6" key={index}>
              <img className="h-[80%] w-full object-fill" src={item.secure_url} alt="" />
              <div className="w-full flex justify-center items-center">
                <button
                  className="bg-red-600 text-white uppercase font-medium w-full rounded py-1 mt-3"
                  onClick={() => {
                    setDeleteOpen(true);
                    setId(item.public_id);
                  }}
                >
                  Delete Image
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {modalOpen && createPortal(<UploadMedia setModalOpen={setModalOpen} />, portals)}
      {deleteOpen && createPortal(<DeleteImageModal id={id} modalOpen={deleteOpen} setModalOpen={setDeleteOpen} />, portals)}
    </div>
  );
};

export default Media;
