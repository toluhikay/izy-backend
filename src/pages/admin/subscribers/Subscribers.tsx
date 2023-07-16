import React from "react";
import { IzyAdminApis } from "../../../api/Query";
import { table } from "console";

const Subscribers = () => {
  const getSubscribers = IzyAdminApis.useGetSubscribersQuery({});

  const subscribersList = getSubscribers?.data?.subscription?.page_data;

  return (
    <div className="p-8 w-full">
      <h2 className="text-[28px] font-medium mb-2">News Letter Subscribers</h2>
      <div className="flex justify-between mb-8 items-center w-full">
        <p className="text-natural-1">See who subscribed to your news letter</p>
        {/* <button className="bg-primary-1 text-white rounded-[4px] py-[10px] px-4" onClick={HandleCreatePage}>
  NEW PAGE +
</button> */}
      </div>
      <div className="w-full bg-white rounded-lg p-3">
        <table className="table-fixed  w-full">
          <thead>
            <tr>
              <th>
                <p className="flex items-start bg-primary-1 text-white p-2">Email</p>
              </th>
              <th>
                <p className="flex items-start bg-primary-1 text-white p-2">Full Name</p>
              </th>
            </tr>
          </thead>
          <tbody>
            {subscribersList?.map((item: any, index: number) => {
              return (
                <tr key={index}>
                  <td>
                    <p className="flex items-start border-b border-primary-1 p-3">{item.email}</p>
                  </td>
                  <td>
                    <p className="flex items-start border-b border-primary-1 p-3 capitalize">{item.full_name}</p>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Subscribers;
