import React, { useEffect, useState } from "react";
import { IzyAdminApis } from "../../../../api/Query";
import ReactQuill from "react-quill";
import { modules } from "../../../../constants/pageDummyData";
import ButtonLoader from "../../../../common/ButtonLoader";
import { toast } from "react-hot-toast";

const defaultFormFields = {
  title: "",
  background_url: "",
  aircaft_management_content: "",
  aircaft_management_content2: "",
  aircraft_maintenance_content: "",
  base_maintenance_content: "",
  line_maintenance_content: "",
};

const AircraftManagement = () => {
  const getImages = IzyAdminApis.useGetImagesListQuery({});
  const ImageList = getImages?.data?.data;
  const [formFields, setFormFields] = useState(defaultFormFields);
  const { title, background_url, aircaft_management_content, aircaft_management_content2, aircraft_maintenance_content } = formFields;

  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);

  const [value, setValue] = useState("");
  const [value1, setValue1] = useState("");
  const [value2, setValue2] = useState("");

  const params = { page: page, limit: limit };
  const getPages = IzyAdminApis.useGetPagesQuery(params);
  const [updatePageMutation, updatePageMutationResults] = IzyAdminApis.useUpdatePageMutation();

  const AircraftManagement = getPages?.data?.data?.page_data[1];
  const params2 = AircraftManagement?.id;

  const AircraftData = AircraftManagement?.meta?.aircraft_management;

  // console.log("data", AircraftData);

  useEffect(() => {
    setFormFields({ ...formFields, title: AircraftData?.title || "", background_url: AircraftData?.background_url || "", aircaft_management_content: AircraftData?.aircaft_management_content || "", aircaft_management_content2: AircraftData?.aircaft_management_content2 || "", aircraft_maintenance_content: AircraftData?.aircraft_maintenance_content || "" });

    setValue(AircraftData?.line_maintenance_content || "");
    setValue1(AircraftData?.aircraft_maintenance_content || "");
    setValue2(AircraftData?.base_maintenance_content || "");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [AircraftManagement]);

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
            aircraft_management: {
              title: title,
              background_url: background_url,
              aircaft_management_content: aircaft_management_content,
              aircaft_management_content2: aircaft_management_content2,
              aircraft_maintenance_content: value1,
              base_maintenance_content: value2,
              line_maintenance_content: value,
            },
          },
        },
      });
      toast.success("Aircraft Manangement Updated Successfully");
    } catch (error) {}
  };

  const FormData = [
    { id: 1, props: "title", value: title, label: "title", quill: false },
    { id: 2, props: "background_url", value: background_url, label: "hero background", quill: false, img: true },
    { id: 2, props: "aircaft_management_content", value: aircaft_management_content, label: "aircraft content top", quill: false },
    { id: 2, props: "aircaft_management_content2", value: aircaft_management_content2, label: "aircraft content bottom", quill: false },
    { id: 2, props: "aircraft_maintenance_content", value: value1, label: "Aircraft maintenance content", quill: true, setState: setValue1 },
    { id: 2, props: "line_maintenance_content", value: value, label: "Line Maintenance Content", quill: true, setState: setValue },
    { id: 2, props: "base_maintenance_content", value: value2, label: "Base Maintenance Content", quill: true, setState: setValue2 },
  ];

  return (
    <div className="bg-white w-full min-h-[800px] px-[32px] py-6 mt-6 rounded-lg overflow-auto">
      <form action="">
        <div>
          {FormData.map((item, index) => {
            return (
              <div key={index}>
                <label className="font-bold text-xl text-primary-1 capitalize" htmlFor={item.props}>
                  {" "}
                  <br />
                  {item.label}
                </label>
                <div>
                  {item.quill ? (
                    <ReactQuill modules={modules} className="mt-3" value={item.value} onChange={item.setState} />
                  ) : item.img ? (
                    <div>
                      <textarea className="border w-full p-2 mt-3" value={item.value} name={item.props} id={item.props} onChange={handleChange} />
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
                    <textarea className="border w-full p-2 mt-3" value={item.value} name={item.props} id={item.props} onChange={handleChange} />
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

export default AircraftManagement;
