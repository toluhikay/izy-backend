import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { IzyAdminApis } from "../../../api/Query";
import ReactQuill from "react-quill";
import { modules } from "../../../constants/pageDummyData";
import { toast } from "react-hot-toast";
import ButtonLoader from "../../../common/ButtonLoader";

const EditBlog = () => {
  const getImages = IzyAdminApis.useGetImagesListQuery({});
  const ImageList = getImages?.data?.data;
  const params = useParams();
  const getBlog = IzyAdminApis.useGetSingleBlogQuery(params);
  const blogDetails = getBlog?.data?.data;
  const [updateBlogMutation, updateBlogMutationResults] = IzyAdminApis.useUpdateBlogMutation();

  const [value, setValue] = useState("");
  const [value1, setValue1] = useState("");
  const [value2, setValue2] = useState("");

  useEffect(() => {
    setValue(blogDetails?.title);
    setValue1(blogDetails?.media);
    setValue2(blogDetails?.content);
  }, [blogDetails]);

  const HandleBlogUpdate = async (e: any) => {
    e.preventDefault();
    try {
      await updateBlogMutation({ params, body: { title: value, content: value2, media: value1 } }).unwrap();
      toast.success(`Blog ${blogDetails?.reference} Updated Successfully`);
    } catch (error: any) {
      toast.error(error?.data?.message);
    }
  };

  return (
    <div className="w-full h-screen  text-amber-900">
      {" "}
      <div className="p-8 w-full">
        <h2 className="text-[28px] font-medium mb-2">Edit Blog : {blogDetails?.reference || ""} </h2>
        <div className="flex justify-between mb-8 items-center w-full">
          <p className="text-natural-1">Update blog: WYSIWYG - (What You See Is What You Get) </p>
        </div>
        <div className="w-full">
          <form action="" className="bg-white rounded-lg py-6 px-8" onSubmit={HandleBlogUpdate}>
            <div>
              <label htmlFor="" className="text-xl font-medium">
                Blog Title
              </label>
              <ReactQuill className="mt-3 mb-6" value={value} onChange={setValue} modules={modules} />
            </div>
            <div>
              <label htmlFor="" className="text-xl font-medium">
                Blog Main Image
              </label>
              <img className="my-12 w-1/2 max-h-[500px] object-cover" src={value1} alt="" />
              {/* <ReactQuill className="mt-3 mb-6" modules={modules} /> */}
              <p>Select New Blog Main Image</p>
              <div className="w-full flex flex-wrap">
                {ImageList?.map((itemImg: any, indexImg: number) => {
                  return (
                    <div className="h-[50px] mr-3 mb-3 w-[50px]" key={indexImg}>
                      <img
                        className="h-full w-full cursor-pointer object-cover"
                        src={itemImg?.secure_url}
                        alt=""
                        onClick={() => {
                          setValue1(itemImg.secure_url);
                        }}
                      />
                    </div>
                  );
                })}
              </div>
            </div>
            <div>
              <label htmlFor="" className="text-xl font-medium">
                Blog Content
              </label>
              <ReactQuill className="mt-3 mb-6" value={value2} onChange={setValue2} modules={modules} />
            </div>
            <button className="bg-primary-1 text-white py-2 px-5 rounded" type="submit">
              {updateBlogMutationResults.isLoading ? <ButtonLoader /> : "Update Blog Content"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditBlog;
