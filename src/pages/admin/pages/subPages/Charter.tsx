import React, { useEffect, useState } from "react";
import { IzyAdminApis } from "../../../../api/Query";
import ReactQuill from "react-quill";
import { modules } from "../../../../constants/pageDummyData";
import ButtonLoader from "../../../../common/ButtonLoader";
import { toast } from "react-hot-toast";

const defaultFormFields = {
  title: "",
  background_url: "",
  content: "",
};

const Charter = () => {
  const getImages = IzyAdminApis.useGetImagesListQuery({});
  const ImageList = getImages?.data?.data;
  const [formFields, setFormFields] = useState(defaultFormFields);
  const { title, background_url, content } = formFields;
  const [value, setValue] = useState("");
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);

  const params = { page: page, limit: limit };
  const getPages = IzyAdminApis.useGetPagesQuery(params);
  const [updatePageMutation, updatePageMutationResults] = IzyAdminApis.useUpdatePageMutation();

  const Charter = getPages?.data?.data?.page_data[5];
  const CharterData = Charter?.meta?.charter;

  useEffect(() => {
    setFormFields({ ...formFields, title: CharterData?.title || "", background_url: CharterData?.background_url || "" });
    setValue(CharterData?.content);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [CharterData]);

  const params2 = Charter?.id;

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
            charter: {
              title: title,
              background_url: background_url,
              content: value,
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
    { id: 4, props: "content", value: value, label: "content - charter content", quill: true, setState: setValue },
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
                      <p className="mt-6 font-medium text-primary-1">Click on any Image below to Select New Image</p>
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

export default Charter;
