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
  content2: "",
  sales_team_contact: "",
  sub_title: "",
  image: "",
  sub_content: "",
  sub_title2: "",
  image2: "",
  sub_content2: "",
  sub_title3: "",
  image3: "",
  sub_content3: "",
  sub_title4: "",
  image4: "",
  sub_content4: "",
};

const AircraftPurchase = () => {
  const getImages = IzyAdminApis.useGetImagesListQuery({});
  const ImageList = getImages?.data?.data;
  const [formFields, setFormFields] = useState(defaultFormFields);
  const { title, background_url, content, content2, sales_team_contact, sub_title, image, sub_content, sub_title2, image2, sub_content2, sub_title3, image3, sub_content3, sub_title4, image4, sub_content4 } = formFields;

  // quill states
  const [value, setValue] = useState("");
  const [value2, setValue2] = useState("");
  const [value3, setValue3] = useState("");

  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);

  const params = { page: page, limit: limit };
  const getPages = IzyAdminApis.useGetPagesQuery(params);
  const [updatePageMutation, updatePageMutationResults] = IzyAdminApis.useUpdatePageMutation();

  const AircraftSales = getPages?.data?.data?.page_data[4];
  const AirSalesData = AircraftSales?.meta?.aircraft_sales;

  useEffect(() => {
    setFormFields({
      ...formFields,
      title: AirSalesData?.title || "",
      background_url: AirSalesData?.background_url || "",
      sub_title: AirSalesData?.sub_data?.[0]?.sub_title || "",
      image: AirSalesData?.sub_data?.[0]?.image || "",
      sub_content: AirSalesData?.sub_data?.[0]?.sub_content || "",
      sub_title2: AirSalesData?.sub_data?.[1]?.sub_title || "",
      image2: AirSalesData?.sub_data?.[1]?.image || "",
      sub_content2: AirSalesData?.sub_data?.[1]?.sub_content || "",
      sub_title3: AirSalesData?.sub_data?.[2]?.sub_title || "",
      image3: AirSalesData?.sub_data?.[2]?.image || "",
      sub_content3: AirSalesData?.sub_data?.[2]?.sub_content || "",
      sub_title4: AirSalesData?.sub_data?.[3]?.sub_title || "",
      image4: AirSalesData?.sub_data?.[3]?.image || "",
      sub_content4: AirSalesData?.sub_data?.[3]?.sub_content || "",
    });
    setValue(AirSalesData?.content || "");
    setValue2(AirSalesData?.content2 || "");
    setValue3(AirSalesData?.sales_team_contact || "");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [AirSalesData]);

  const params2 = AircraftSales?.id;

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
            aircraft_sales: {
              title: title,
              background_url: background_url,
              content: value,
              content2: value2,
              sales_team_contact: value3,
              sub_data: [
                { sub_title: sub_title, image: image, sub_content: sub_content },
                { sub_title: sub_title2, image: image2, sub_content: sub_content2 },
                { sub_title: sub_title3, image: image3, sub_content: sub_content3 },
                { sub_title: sub_title4, image: image4, sub_content: sub_content4 },
              ],
            },
          },
        },
      });
      toast.success("Aircraft Sales Pages Updated Successfully");
    } catch (error) {}
  };

  const FormData = [
    { id: 1, props: "title", value: title, label: "title", quill: false },
    { id: 2, props: "background_url", value: background_url, label: "hero background", quill: false, img: true },
    { id: 2, props: "content", value: value, label: "aircraft sales content", quill: true, setState: setValue },
    { id: 2, props: "content2", value: value2, label: "aircraft sales content 2", quill: true, setState: setValue2 },
    { id: 3, props: "sales_team_contact", value: value3, label: "Sales Contact Team", quill: true, setState: setValue3 },
    { id: 4, props: "sub_title", value: sub_title, label: "sub title travel needs", quill: false },
    { id: 4, props: "sub_content", value: sub_content, label: "sub content travel needs", quill: false },
    { id: 4, props: "image", value: image, label: "image travel needs", quill: false, img: true },
    { id: 4, props: "sub_title2", value: sub_title2, label: "sub title pre-owned aircraft", quill: false },
    { id: 4, props: "sub_content2", value: sub_content2, label: "sub content pre-owned aircraft", quill: false },
    { id: 4, props: "image2", value: image2, label: "image pre-owned aircraft", quill: false, img: true },
    { id: 4, props: "sub_title3", value: sub_title3, label: "sub title ownership structure", quill: false },
    { id: 4, props: "sub_content3", value: sub_content3, label: "sub content ownership structure", quill: false },
    { id: 4, props: "image3", value: image3, label: "image ownership structure", quill: false, img: true },
    { id: 4, props: "sub_title4", value: sub_title4, label: "sub title travel aircraft base", quill: false },
    { id: 4, props: "sub_content4", value: sub_content4, label: "sub content travel aircraft base", quill: false },
    { id: 4, props: "image4", value: image4, label: "image travel aircraft base", quill: false, img: true },
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
                      <textarea className="border w-full p-2 mt-3" rows={3} value={item.value} name={item.props} id={item.props} onChange={handleChange} />
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
                    <textarea className="border w-full p-2 mt-3" rows={3} value={item.value} name={item.props} id={item.props} onChange={handleChange} />
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

export default AircraftPurchase;
