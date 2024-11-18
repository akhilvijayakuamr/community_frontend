import { AxiosResponse } from "axios";
import React, { useEffect, useState } from "react";
import { TEChart } from "tw-elements-react";
import { dashboardData } from "../../../utils/interface/admin/home/chartInterface";
import { adminDashboard } from "../../../Api/api";

const Chart: React.FC = (): JSX.Element => {


  const [postData, setPostData] = useState<number[]>([]);
  const [postUserData, setPostUserData] = useState<number[]>([]);
  const [totalUsers, setTotelUser] = useState<number | null>(null);
  const [totalReports, setReports] = useState<number | null>(null);
  const [totalPosts, setTotelPosts] = useState<number | null>(null);


  // Set header for auth

  const headers = {
    'Content-type': 'application/json',
  };


  // Get all dashbord datas

  useEffect(()=>{
    const fetchData = async () =>{
      try{
        const response: AxiosResponse<dashboardData> = await adminDashboard(headers);
        console.log("data: ", response.data)
        setTotelUser(response.data.all_users)
        setReports(response.data.all_reports)
        setTotelPosts(response.data.all_posts)
        setPostData([response.data.hide_posts, response.data.deleted_posts, response.data.all_posts, response.data.reported_post])
        setPostUserData([response.data.all_users, response.data.block_users, response.data.all_posts, response.data.hide_posts, response.data.deleted_posts, response.data.reported_post])
      }
      catch{
        console.log("The data is not fetch")
      }
    }

    fetchData()
  },[])

  return (
    <div className="flex-1 flex flex-col bg-gray-800">
      <main className="flex-1 p-2 overflow-y-auto">
        <h2 className="text-3xl font-bold text-gray-800 mb-8">Dashboard</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
          <div className="p-6 bg-blue-500 text-white shadow-lg rounded-lg hover:shadow-xl transition-shadow">
            <h3 className="text-xl font-semibold">Users</h3>
            <p className="text-3xl font-bold">{totalUsers}</p>
          </div>

        
          <div className="p-6 bg-green-500 text-white shadow-lg rounded-lg hover:shadow-xl transition-shadow">
            <h3 className="text-xl font-semibold">Posts</h3>
            <p className="text-3xl font-bold">{totalPosts}</p>
          </div>

          <div className="p-6 bg-red-500 text-white shadow-lg rounded-lg hover:shadow-xl transition-shadow">
            <h3 className="text-xl font-semibold">Reports</h3>
            <p className="text-3xl font-bold">{totalReports}</p>
          </div>
        </div>
      </main>
      <div className="container">
        <div className="columns-2 justify-content-center">
          <div className="col-md-12 col-lg-12 ">
            <div className="mb-4 ">
              <TEChart
                type="bar"
                data={{
                  labels: ["All Users", "Block Users", "All Posts", "Hide Posts", "Deleted Posts", "Reported Posts"],
                  datasets: [
                    {
                      label: "User and Post Details",
                      data: postUserData,
                      backgroundColor: "rgba(75, 192, 192, 0.6)",
                    },
                  ],
                }}
                options={{
                  responsive: true,
                  maintainAspectRatio: false,
                  indexAxis: "y",
                  scales: {
                    x: {
                      stacked: true,
                      grid: { display: true, borderDash: [2], color: "rgba(0,0,0,0.1)" },
                      ticks: { color: "rgba(255, 255, 255, 0.8)" },
                    },
                    y: {
                      stacked: true,
                      grid: { display: false },
                      ticks: { color: "rgba(255, 255, 255, 0.8)" },
                    },
                  },
                }}
                darkOptions={{
                  responsive: true,
                  maintainAspectRatio: false,
                  indexAxis: "y",
                  scales: {
                    x: {
                      stacked: true,
                      grid: { display: true, color: "#555", borderDash: [2] },
                      tticks: { color: "rgba(255, 255, 255, 0.8)" },
                    },
                    y: {
                      stacked: true,
                      grid: { display: false },
                      ticks: { color: "rgba(255, 255, 255, 0.8)" },
                    },
                  },
                }}
                style={{ height: "400px", width: "100%" }}
              />
            </div>
            <div className="mr-12">
              <TEChart
                type="doughnut"
                data={{
                  labels: ["Hide Posts", "Deleted Posts", "Posts", "Reported Post"],
                  datasets: [
                    {
                      label: "Traffic",
                      data: postData,
                      backgroundColor: [
                        "rgba(63, 81, 181, 0.5)",
                        "rgba(77, 182, 172, 0.5)",
                        "rgba(156, 39, 176, 0.5)",
                        "rgba(233, 30, 99, 0.5)",
                      ],
                    },
                  ],
                }}
                options={{
                  responsive: true,
                  maintainAspectRatio: false,
                }}
                style={{ height: "400px", width: "100%" }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>

  );
};

export default Chart;
