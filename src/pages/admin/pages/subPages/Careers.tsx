import React, { useEffect, useState } from "react";
import { IzyAdminApis } from "../../../../api/Query";
import ReactQuill from "react-quill";
import { modules } from "../../../../constants/pageDummyData";
import ButtonLoader from "../../../../common/ButtonLoader";
import { toast } from "react-hot-toast";

const defaultFormFields = {
  background_url: "",
  job_opportunities_content: "",
  qualification: "",
  resume_email: "",
  title: "",
  work_conditions: "",
};

const Careers = () => {
  const getImages = IzyAdminApis.useGetImagesListQuery({});
  const ImageList = getImages?.data?.data;
  const [formFields, setFormFields] = useState(defaultFormFields);
  const { title, background_url, resume_email } = formFields;

  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);

  const params = { page: page, limit: limit };
  const getPages = IzyAdminApis.useGetPagesQuery(params);
  const [updatePageMutation, updatePageMutationResults] = IzyAdminApis.useUpdatePageMutation();

  const Career = getPages?.data?.data?.page_data[2];
  const params2 = Career?.id;

  const [value, setValue] = useState("");
  const [value2, setValue2] = useState("");
  const [value3, setValue3] = useState("");

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormFields({ ...formFields, [name]: value });
  };

  useEffect(() => {
    setFormFields({ ...formFields, title: Career?.meta?.careers?.title || "", background_url: Career?.meta?.careers?.background_url || "", resume_email: Career?.meta?.careers?.resume_email });
    setValue(Career?.meta?.careers?.job_opportunities_content || "");
    setValue2(Career?.meta?.careers?.qualification || "");
    setValue3(Career?.meta?.careers?.work_conditions || "");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [Career]);

  const HandlePageUpdate = async (e: any) => {
    e.preventDefault();
    try {
      await updatePageMutation({
        params: { id: params2 },
        body: {
          meta: {
            careers: {
              title: title,
              background_url: background_url,
              job_opportunities_content: value,
              qualification: value2,
              resume_email: resume_email,
              work_conditions: value3,
            },
          },
        },
      });
      toast.success("Career Page Updated Successfully");
    } catch (error: any) {
      toast.error(error?.message);
    }
  };

  const FormData = [
    { id: 1, props: "title", value: title, label: "title", quill: false },
    { id: 2, props: "background_url", value: background_url, label: "hero background", quill: false, img: true },
    { id: 2, props: "job_opportunities_content", value: value, label: "job opportunities content", quill: true, setState: setValue },
    { id: 2, props: "qualification", value: value2, label: "qualification", quill: true, setState: setValue2 },
    { id: 2, props: "work_conditions", value: value3, label: "work_conditions", quill: true, setState: setValue3 },
    { id: 1, props: "resume_email", value: resume_email, label: "resume email", quill: false },
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

export default Careers;
