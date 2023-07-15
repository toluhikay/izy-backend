import React, { Fragment, useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { IzyAdminApis } from "../api/Query";
import ButtonLoader from "../common/ButtonLoader";

const NewBlogModal = ({ setBlogOpen }: { setBlogOpen: React.Dispatch<React.SetStateAction<boolean>> }) => {
  const getImages = IzyAdminApis.useGetImagesListQuery({});
  const ImageList = getImages?.data?.data;
  const [src, setSrc] = useState("");

  const SelectImageComponent = () => {
    return (
      <Fragment>
        <p className="text-center overflow-auto py-2 text-primary-1 font-medium">Select the Image You want</p>
        <div className="flex flex-wrap justify-between">
          {ImageList?.map((item: any, index: number) => {
            return (
              <div
                className="h-[150px] border cursor-pointer rounded border-primary-1 p-1 lg:w-[24%] md:w-[48%] w-full mb-6"
                key={index}
                onClick={(e) => {
                  setSrc(item.secure_url);
                  console.log(item.secure_url);
                }}
              >
                <img className="h-[100%] w-full object-fill" src={item.secure_url} alt="" />
              </div>
            );
          })}
        </div>
      </Fragment>
    );
  };

  const modules = {
    toolbar: [
      ["bold", "italic", "underline", "strike"], // toggled buttons
      ["blockquote", "code-block"],

      [{ header: 1 }, { header: 2 }], // custom button values
      [{ list: "ordered" }, { list: "bullet" }],
      [{ script: "sub" }, { script: "super" }], // superscript/subscript
      [{ indent: "-1" }, { indent: "+1" }], // outdent/indent
      [{ direction: "rtl" }], // text direction

      [{ size: ["small", false, "large", "huge"] }], // custom dropdown
      [{ header: [1, 2, 3, 4, 5, 6, false] }],

      [{ color: [] }, { background: [] }], // dropdown with defaults from theme
      [{ font: [] }],
      [{ align: [] }],

      ["clean"],
    ],
  };

  const [value, setValue] = useState("");
  const [value2, setValue2] = useState("");
  const [textState, setTextState] = useState("title");
  const TextQuilData = [
    { id: 1, state: "title", buttonText: "title", value: value, component: <ReactQuill modules={modules} theme="snow" onChange={setValue} value={value} /> },
    { id: 2, state: "content", buttonText: "content", value: value2, component: <ReactQuill modules={modules} theme="snow" onChange={setValue2} value={value2} /> },
    { id: 3, state: "image", buttonText: "image", value: src, component: <SelectImageComponent /> },
  ];

  const [postBlogMutation, postBlogMutationResults] = IzyAdminApis.usePostBlogMutation();
  const HandleCreateBlog = async (e: any) => {
    e.preventDefault();
    try {
      // const data = new FormData();
      const body = { title: value, content: value2, media: src };
      // data.append("media", src);
      const result = await postBlogMutation({ title: value, content: value2, media: src }).unwrap();
      console.log(result);
    } catch (error) {}
  };

  return (
    <div className="fixed top-0 overflow-auto left-0 bg-black/40 w-screen h-screen flex items-center justify-center">
      <div className="w-[80%] h-[80%] flex flex-col justify-between bg-white overflow-hidden rounded-xl">
        <div className="w-full h-full overflow-auto flex justify-between">
          <div className="p-3 w-[45%]">
            <div className="flex mb-12">
              {TextQuilData.map((item, index) => {
                return (
                  <div className="mr-3" key={index}>
                    <button className="bg-primary-1 text-white font-medium text-xs rounded border outline-none py-2 px-3 uppercase" onClick={() => setTextState(item.state)}>
                      Add {item.buttonText}
                    </button>
                  </div>
                );
              })}
            </div>
            {TextQuilData.map((item, index) => {
              return (
                <Fragment key={index}>
                  <div>{item.state === textState && item.component}</div>
                </Fragment>
              );
            })}
          </div>
          <div className="border w-[49%] p-6">
            <div dangerouslySetInnerHTML={{ __html: value }} />
            <img src={src} alt="" />
            <div dangerouslySetInnerHTML={{ __html: value2 }} />
          </div>
        </div>
        <div className="p-3 flex justify-center items-center">
          <button className="border-primary-1 border text-primary-1 mr-3 uppercase py-2 px-5 rounded font-medium w-fit text-center" onClick={() => setBlogOpen(false)}>
            Cancel
          </button>
          <button type="button" className="bg-primary-1 text-white uppercase py-2 px-5 rounded font-medium w-fit text-center" onClick={HandleCreateBlog}>
            {postBlogMutationResults.isLoading ? <ButtonLoader /> : "Publish Blog"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default NewBlogModal;
