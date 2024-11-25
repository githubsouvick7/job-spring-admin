"use client";

import { PlaceholdersAndVanishInput } from "@/components/ui/placeholders-and-vanish-input";
import { fetcher } from "@/lib/fetcher";
import Link from "next/link";
import { useEffect, useState } from "react";

const JobFilter = () => {
  const [filters, setFilters] = useState({
    jobType: "",
    location: [],
    minSalary: "",
    maxSalary: "",
    experience: "",
  });

  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");

  const fetchJobs = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      for (const [key, value] of Object.entries(filters)) {
        if (Array.isArray(value) && key === "location") {
          params.append(key, value.join(",")); // Combine array items if the server expects a single string
        } else if (Array.isArray(value)) {
          value.forEach((v) => params.append(key, v)); // Separate parameters
        } else {
          params.append(key, value);
        }
      }

      console.log(params.toString());
      const response = await fetcher(`/jobs?${params.toString()}`);
      setJobs(response.data);
    } catch (error) {
      console.log("Error fetching jobs:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  const handleChange = (e) => {
    setSearch(e.target.value);
  };
  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetcher(`/jobs?permalink=${search}`);
      setJobs(response?.job);
    } catch (e) {
      console.log(e);
    }
  };

  console.log(jobs);

  return (
    <div className="relative min-h-screen">
      <div className="max-w-7xl mx-auto grid grid-cols-1 gap-4 p-2">
        <div className="w-full px-4">
          <PlaceholdersAndVanishInput
            placeholders={placeholders}
            onChange={handleChange}
            onSubmit={onSubmit}
          />
        </div>
        <div className=" p-2">
          {loading ? (
            <p>Loading jobs...</p>
          ) : jobs.length > 0 ? (
            <div className="flex flex-col gap-4">
              {jobs.map((job) => (
                <div
                  key={job?._id}
                  className="p-4 rounded-lg border border-gray-200 grid grid-cols-[120px_minmax(300px,1fr)] gap-4"
                >
                  <div className="w-28 h-28 shadow-sm flex justify-center items-center">
                    <Link href={`/jobs/${job?.permalink}`}>
                      <img
                        src={job?.image}
                        alt="image.com"
                        className=" bg-white"
                      />
                    </Link>
                  </div>
                  <div className="flex flex-col">
                    <div className="flex justify-between items-start">
                      <div className="flex items-start">
                        <Link href={`/jobs/${job?.permalink}`} className="">
                          <h2 className="text-xl">
                            <span className="font-semibold capitalize">
                              {job?.companyName}
                            </span>{" "}
                            is hiring for{" "}
                            <span className="font-semibold capitalize">
                              {job?.title}
                            </span>
                          </h2>
                          <p className="text-sm capitalize">
                            {job.companyName} | {job.location.city},{" "}
                            {job.location.state}
                          </p>
                        </Link>
                      </div>
                    </div>

                    <div className="grid grid-cols-3 gap-4 mt-4">
                      {job.salary.salaryType === "industry-standard" ? (
                        <div>
                          <p className="text-xs">Salary</p>
                          <p className="text-sm font-semibold capitalize">
                            {job.salary.salaryType}
                          </p>
                        </div>
                      ) : (
                        <div>
                          <p className="text-xs">
                            Salary Per {job.salary.salaryType}
                          </p>
                          <p className="text-sm font-semibold capitalize">
                            ₹{job.salary.amount.form} - ₹{job.salary.amount.to}{" "}
                            {job.salary.salaryType === "year"
                              ? "LPA"
                              : "Per Month"}
                          </p>
                        </div>
                      )}

                      <div>
                        <p className="text-xs">Job Type</p>
                        <p className="text-sm font-semibold capitalize">
                          {job.jobType}
                        </p>
                      </div>

                      <div>
                        <p className="text-xs">Experience</p>
                        <p className="text-sm font-semibold capitalize">
                          {job.experience === 0 ? (
                            "Fresher"
                          ) : (
                            <>{job.experience} years</>
                          )}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p>No jobs found.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default JobFilter;

const placeholders = [
  "Search via permalinks",
  "Copy and paste your own permalinks",
  "Search and edit your data",
];
