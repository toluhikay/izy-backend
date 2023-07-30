import React, { useEffect, useState } from "react";
import { IzyAdminApis } from "../../../../api/Query";
import ReactQuill from "react-quill";
import { modules } from "../../../../constants/pageDummyData";
import ButtonLoader from "../../../../common/ButtonLoader";
import { toast } from "react-hot-toast";

const defaultFormFields = {
  title: "",
  background_url: "",
  sub_title: "",
  sub_content: "",
  height: "",
  width: "",
  length: "",
  galley: "",
  lavatory: "",
  manufacturer: "",
  range: "",
  seating: "",
  gallery: [],
};

const OurCompany = () => {
  const getImages = IzyAdminApis.useGetImagesListQuery({});
  const [gallery, setGallery] = useState<string[]>([]);
  const [singleImage, setSingleImage] = useState("");
  const ImageList = getImages?.data?.data;
  const [formFields, setFormFields] = useState(defaultFormFields);
  const { title, background_url, sub_title, sub_content, height, width, length, galley, lavatory, manufacturer, range, seating } = formFields;

  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);

  const params = { page: page, limit: limit };
  const getPages = IzyAdminApis.useGetPagesQuery(params);
  const FleetDetails = getPages?.data?.data?.page_data[6];
  const FleetData = FleetDetails?.meta?.fleet;

  useEffect(() => {
    setFormFields({
      ...formFields,
      title: FleetData?.title || "",
      background_url: FleetData?.background_url || "",
      sub_title: FleetData?.sub_data?.[0].title || "",
      sub_content: FleetData?.sub_data?.[0]?.content || "",
      height: FleetData?.sub_data?.[0]?.cabin_specs?.cabin_size?.height || "",
      width: FleetData?.sub_data?.[0]?.cabin_specs?.cabin_size?.width || "",
      length: FleetData?.sub_data?.[0]?.cabin_specs?.cabin_size?.length || "",
      galley: FleetData?.sub_data?.[0]?.cabin_specs?.galley || "",
      lavatory: FleetData?.sub_data?.[0]?.cabin_specs?.lavatory || "",
      manufacturer: FleetData?.sub_data?.[0]?.cabin_specs?.manufacturer || "",
      range: FleetData?.sub_data?.[0]?.cabin_specs?.range || "",
      seating: FleetData?.sub_data?.[0]?.cabin_specs?.seating || "",
    });
    setGallery(FleetData?.sub_data?.[0]?.cabin_specs?.gallery);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [FleetData]);

  const [updatePageMutation, updatePageMutationResults] = IzyAdminApis.useUpdatePageMutation();

  const Fleet = getPages?.data?.data?.page_data[6];
  const params2 = Fleet?.id;

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
            fleet: {
              title: title,
              background_url: background_url,
              sub_data: [
                {
                  title: sub_title,
                  content: sub_content,
                  plane_image: "",
                  state_image: "",
                  cabin_specs: {
                    cabin_size: {
                      height: height,
                      width: width,
                      length: length,
                    },
                    galley: galley,
                    lavatory: lavatory,
                    manufacturer: manufacturer,
                    range: range,
                    seating: seating,
                    gallery: gallery,
                  },
                },
                // {
                //   title: sub_title2,
                //   content: sub_content2,
                //   plane_image: "",
                //   state_image: "",
                //   cabin_specs: {
                //     cabin_size: {
                //       height: height2,
                //       width: width2,
                //       length: length2,
                //     },
                //     galley: galley2,
                //     lavatory: lavatory2,
                //     manufacturer: manufacturer2,
                //     range: range2,
                //     seating: seating2,
                //   },
                // },
              ],
            },
          },
        },
      });
      toast.success("Fleet Page Updated Successfully");
    } catch (error) {}
  };

  const FormData = [
    { id: 1, props: "title", value: title, label: "title", quill: false },
    { id: 2, props: "background_url", value: background_url, label: "hero background", quill: false, img: true },
    { id: 3, props: "sub_title", value: sub_title, label: "Sub title - Bombardier", quill: false },
    { id: 4, props: "sub_content", value: sub_content, label: "Content - Bombardier", quill: false },
    { id: 5, props: "height", value: height, label: "height - Bombardier", quill: false },
    { id: 6, props: "width", value: width, label: "width - bombardier", quill: false },
    { id: 7, props: "length", value: length, label: "length - bombardier", quill: false },
    { id: 8, props: "galley", value: galley, label: "galley - bombardier", quill: false },
    { id: 9, props: "lavatory", value: lavatory, label: "lavatory - bombardier", quill: false },
    { id: 10, props: "manufacturer", value: manufacturer, label: "manufacturer - bombardier", quill: false },
    { id: 11, props: "range", value: range, label: "range - bombardier", quill: false },
    // { id: 2, props: "gallery", value: addImage, label: "Image Gallery", quill: false, img: true },
    { id: 12, props: "seating", value: seating, label: "seating - bombardier", quill: false },
    // { id: 13, props: "sub_title2", value: sub_title2, label: "Sub title - hawker", quill: false },
    // { id: 14, props: "sub_content2", value: sub_content2, label: "Content - hawker", quill: false },
    // { id: 15, props: "height2", value: height2, label: "height - hawker", quill: false },
    // { id: 16, props: "width2", value: width2, label: "width - hawker", quill: false },
    // { id: 17, props: "length2", value: length2, label: "length - hawker", quill: false },
    // { id: 18, props: "galley2", value: galley2, label: "galley - hawker", quill: false },
    // { id: 19, props: "lavatory2", value: lavatory2, label: "lavatory - hawker", quill: false },
    // { id: 20, props: "manufacturer2", value: manufacturer2, label: "manufacturer - hawker", quill: false },
    // { id: 21, props: "range2", value: range2, label: "range - hawker", quill: false },
    // { id: 22, props: "seating2", value: seating2, label: "seating - hawker", quill: false },
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
                    <ReactQuill modules={modules} className="mt-3" value={item.value} />
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
        <div className="my-4">
          <label className="text-amber-700" htmlFor="gallerySingle">
            Add Image to Gallery
          </label>{" "}
          <br />
          <div className="flex items-center justify-start w-full">
            <input type="text" name="" value={singleImage} className="border w-[70%] mr-2 p-2" onChange={(e) => setSingleImage(e.target.value)} />
            {singleImage ? (
              <button
                className="bg-amber-700 py-2 px-3 text-white rounded"
                type="button"
                onClick={() => {
                  if (singleImage) {
                    setGallery([...gallery, singleImage]);
                    toast.success("Image Added to Gallery");
                    setSingleImage("");
                  }
                }}
              >
                Add Image
              </button>
            ) : null}
          </div>
          <div className="mb-6">
            <p className="text-amber-700 mt-6">Bombardier Gallery Pictures</p>
            <div className="flex flex-wrap items-center">
              {gallery?.map((item, index) => {
                return (
                  <div className="flex items-center mr-1 border border-amber-700 p-2 my-2 flex-col" key={index}>
                    <img className="w-[50px]  mb-1 h-[50px] object-cover" src={item} key={index} alt="" />
                    <button
                      className="bg-red-600 p-1 text-xs text-white"
                      type="button"
                      onClick={() => {
                        const image = gallery.find((e) => e === item);
                        const returnedGallery = gallery.filter((e) => e !== image);
                        setGallery(returnedGallery);
                      }}
                    >
                      Remove
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
          <p className="mt-6">Pick from these Images to add to the Bombardier Gallery</p>
          <div className="flex  py-3 flex-wrap items-center">
            {ImageList?.map((itemImg: any, indexImg: number) => {
              return (
                <div className="h-[50px] mb-2 mr-3 w-[50px]" key={indexImg}>
                  <img
                    className="h-full w-full cursor-pointer object-cover"
                    src={itemImg?.secure_url}
                    alt=""
                    onClick={() => {
                      setSingleImage(itemImg.secure_url);
                    }}
                  />
                </div>
              );
            })}
          </div>
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
