import React, { useState } from "react";
import { createPortal } from "react-dom";
import NewBlogModal from "../../../modals/NewBlogModal";
import { IzyAdminApis } from "../../../api/Query";
import PaginationComponent from "../../../components/PaginationComponent";
import DeleteBlogModal from "../../../modals/DeleteBlogModal";
import LoaderComponent from "../../../common/LoaderComponent";
import { useNavigate } from "react-router-dom";
import moment from "moment";

export const portals: any = document.getElementById("portals");

const Blogs = () => {
  const [blogOpen, setBlogOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [page, setPage] = useState(1);
  const [id, setId] = useState("");
  const [limit, setLimit] = useState(6);
  const params = { page: page, limit: limit };
  const getBlogs = IzyAdminApis.useGetBlogsQuery(params);
  const getBlogList = getBlogs?.data?.data?.page_data;
  const navigate = useNavigate();

  const TableHeadData = ["user", "status", "plan", "date created", "action"];

  return (
    <div className="w-full">
      <div className="p-8 w-full">
        <h2 className="text-[28px] font-medium mb-2">Blogs</h2>
        <div className="flex justify-between mb-8 items-center w-full">
          <p className="text-natural-1">Manage your blog contents </p>
          <button className="bg-primary-1 text-white rounded-[4px] uppercase py-[10px] px-4" onClick={() => setBlogOpen(true)}>
            NEW blog +
          </button>
        </div>
      </div>
      {getBlogs.isLoading ? (
        <LoaderComponent />
      ) : (
        <div className="px-[89px] py-20 flex flex-wrap justify-between">
          {getBlogList?.map((item: any, index: number) => {
            return (
              <div className="lg:w-[32%] w-full min-h-[200px] p-3 flex flex-col items-center justify-center text-center border border-primary-1 mb-6" key={index}>
                <div className="w-full">
                  <img className="w-full h-[300px] object-cover rounded border border-primary-1" src={item?.media || "https://images.unsplash.com/photo-1499750310107-5fef28a66643?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YmxvZ3xlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60"} alt="" />
                  <div>
                    <div className="py-3 text-primary-1 font-medium" dangerouslySetInnerHTML={{ __html: item.title }} />
                    <div>
                      <button
                        className="py-2 border border-primary-1 w-fit mr-2 rounded px-5"
                        onClick={() => {
                          navigate("/dashboard/blog/" + item.reference, { state: { item } });
                        }}
                      >
                        Edit Blog
                      </button>
                      <button
                        className="bg-primary-1 rounded text-white py-2 w-fit px-5"
                        onClick={() => {
                          setDeleteOpen(true);
                          setId(item.reference);
                        }}
                      >
                        Delete Blog
                      </button>
                    </div>
                    <p className="py-1">Posted On: {moment(item.created_at).format("ll")}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
      <PaginationComponent totalPages={getBlogs?.data?.data?.page_count} currentPage={page} setCurrentPage={setPage} />
      {blogOpen && createPortal(<NewBlogModal setBlogOpen={setBlogOpen} />, portals)}
      {deleteOpen && createPortal(<DeleteBlogModal id={id} modalOpen={deleteOpen} setModalOpen={setDeleteOpen} />, portals)}
    </div>
  );
};

export default Blogs;
