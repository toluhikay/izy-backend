import React, { useState } from "react";
import { IzyAdminApis } from "../../../../api/Query";
import ReactQuill from "react-quill";
import { modules } from "../../../../constants/pageDummyData";
import ButtonLoader from "../../../../common/ButtonLoader";
import { toast } from "react-hot-toast";

const defaultFormFields = {
  title: "",
  background_url: "",
  sub_title: "",
  content: "",
  bg_image: "",
  sub_title2: "",
  content2: "",
  bg_image2: "",
  sub_title3: "",
  content3: "",
  bg_image3: "",
};

const OurCompany = () => {
  const getImages = IzyAdminApis.useGetImagesListQuery({});
  const ImageList = getImages?.data?.data;
  const [formFields, setFormFields] = useState(defaultFormFields);
  const { title, background_url, sub_title, bg_image, sub_title2, bg_image2, sub_title3, bg_image3 } = formFields;
  const [value, setValue] = useState("");
  const [value2, setValue2] = useState("");
  const [value3, setValue3] = useState("");
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);

  const params = { page: page, limit: limit };
  const getPages = IzyAdminApis.useGetPagesQuery(params);
  const [updatePageMutation, updatePageMutationResults] = IzyAdminApis.useUpdatePageMutation();

  const OurCompanyDetails = getPages?.data?.data?.page_data[7];
  const params2 = OurCompanyDetails?.id;

  // console.log("params is our company", params2);

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormFields({ ...formFields, [name]: value });
  };

  const HandlePageUpdate = async (e: any) => {
    e.preventDefault();
    try {
      await updatePageMutation({
        params: { id: params2 },
        body: {
          meta: {
            our_company: {
              title: title,
              background_url: background_url,
              sub_data: [
                {
                  title: sub_title,
                  content: value,
                  bg_image: bg_image,
                },
                {
                  title: sub_title2,
                  content: value2,
                  bg_image: bg_image2,
                },
                {
                  title: sub_title3,
                  content: value3,
                  bg_image: bg_image3,
                },
              ],
            },
          },
        },
      });

      toast.success("Page Updated Successfully");
    } catch (error) {}
  };

  const FormData = [
    { id: 1, props: "title", value: title, label: "title", quill: false },
    { id: 2, props: "background_url", value: background_url, label: "hero background", quill: false, img: true, url: "" },
    { id: 3, props: "sub_title", value: sub_title, label: "sub title - Our story", quill: false },
    { id: 4, props: "content", value: value, label: "content - our story", quill: true, setState: setValue },
    { id: 5, props: "bg_image", value: bg_image, label: "sub image - our story", quill: false, img: true },
    { id: 6, props: "sub_title2", value: sub_title2, label: "sub title - our partnership", quill: false },
    { id: 7, props: "content2", value: value2, label: "content - our partnership", quill: true, setState: setValue2 },
    { id: 8, props: "bg_image2", value: bg_image2, label: "sub image - our partnership", quill: false, img: true },
    { id: 9, props: "sub_title3", value: sub_title3, label: "sub title - our focus on safety", quill: false },
    { id: 10, props: "content3", value: value3, label: "content - our focus on safety", quill: true, setState: setValue3 },
    { id: 11, props: "bg_image3", value: bg_image3, label: "sub image - our focus on safety", quill: false, img: true },
  ];

  return (
    <div className="bg-white w-full min-h-[800px] px-[32px] py-6 mt-6 rounded-lg overflow-auto">
      <form action="">
        <div>
          {FormData.map((item, index) => {
            return (
              <div key={index}>
                <label className="font-medium text-primary-1 capitalize" htmlFor={item.props}>
                  {" "}
                  <br />
                  {item.label}
                </label>
                <div>
                  {item.quill ? (
                    <ReactQuill modules={modules} className="mt-3" value={item.value} onChange={item.setState} />
                  ) : item.img ? (
                    <div>
                      <input className="border w-full p-2 mt-3" type="text" value={item.value} name={item.props} id={item.props} onChange={handleChange} />
                      <div className="flex py-3 flex-wrap items-center">
                        {ImageList?.map((itemImg: any, indexImg: number) => {
                          return (
                            <div className="h-[50px] mr-3 w-[50px]" key={indexImg}>
                              <img
                                className="h-full w-full cursor-pointer object-cover"
                                src={itemImg?.secure_url}
                                alt=""
                                onClick={() => {
                                  setFormFields({ ...formFields, [item.props]: itemImg.secure_url });
                                }}
                              />
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  ) : (
                    <input className="border w-full p-2 mt-3" type="text" value={item.value} name={item.props} id={item.props} onChange={handleChange} />
                  )}
                </div>
              </div>
            );
          })}
        </div>
        <div>
          <button type="button" className="bg-primary-1 mt-3 text-white font-medium p-3 rounded" onClick={HandlePageUpdate}>
            {updatePageMutationResults.isLoading ? <ButtonLoader /> : "Submit Form"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default OurCompany;
