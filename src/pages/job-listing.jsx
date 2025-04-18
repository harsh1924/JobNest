/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import { getCompanies } from "@/api/apiCompanies";
import { getJobs } from "@/api/apiJobs"

import JobCard from "@/components/job-card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

import useFetch from "@/hooks/useFetch"
import { useUser } from "@clerk/clerk-react";
import { State } from "country-state-city";

import { useEffect, useState } from "react";
import { BarLoader, BeatLoader } from "react-spinners";

function JobListing() {

  const { isLoaded } = useUser();
  const [searchQuery, setSearchQuery] = useState("");
  const [location, setLocation] = useState("");
  const [company_id, setCompany_id] = useState("");

  const { fn: fnJobs, data: jobs, loading: loadingJobs } = useFetch(getJobs, {
    location,
    searchQuery,
    company_id
  });

  useEffect(() => {
    if (isLoaded) fnJobs();
  }, [isLoaded, location, company_id, searchQuery]);

  const { fn: fnCompanies, data: companies } = useFetch(getCompanies);

  useEffect(() => {
    if (isLoaded) fnCompanies();
  }, [isLoaded]);

  const handleSearch = (e) => {
    e.preventDefault();
    let formData = new FormData(e.target);
    const query = formData.get("search-query");
    if (query) setSearchQuery(query);
  }

  if (!isLoaded) return <BarLoader className="mb-4" width={"100%"} color="#36d7b7" />

  return (
    <div>
      <h1 className="gradient-title font-extrabold text-6xl sm:text-7xl text-center pb-8">Latest Jobs</h1>

      <form onSubmit={handleSearch} className="h-14 flex w-full gap-2 items-center mb-3">
        <Input
          type="text"
          placeholder="Search Jobs By Title..."
          name="search-query"
          className="h-full flex-1 px-4 text-md"
        />
        <Button
          type="submit"
          className="h-full sm:w-28"
          variant="blue"
        >
          Search
        </Button>
      </form>

      <div className="">
        <Select value={location} onValueChange={(value) => setLocation(value)}>
          <SelectTrigger>
            <SelectValue placeholder="Filter by Location" />
          </SelectTrigger>
          <SelectGroup>
            <SelectContent>
              {State.getStatesOfCountry("IN").map(({ name }) => {
                return (
                  <SelectItem key={name} value={name}>
                    {name}
                  </SelectItem>
                )
              })}
            </SelectContent>
          </SelectGroup>
        </Select>

        <Select value={company_id} onValueChange={(value) => setCompany_id(value)}>
          <SelectTrigger>
            <SelectValue placeholder="Filter by Company" />
          </SelectTrigger>
          <SelectGroup>
            <SelectContent>
              {companies.map(({ name, id }) => {
                return (
                  <SelectItem key={name} value={id}>
                    {name}
                  </SelectItem>
                )
              })}
            </SelectContent>
          </SelectGroup>
        </Select>
      </div>

      {loadingJobs && (
        <div className="flex items-center justify-center">
          <BeatLoader className="mt-4" width={"100%"} color="#36d" />
        </div>
      )}

      {loadingJobs === false && (
        <div className="mt-8 grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {jobs?.length ? (
            jobs.map((job) => {
              return <JobCard
                key={job.id}
                job={job}
                savedInit={job?.saved?.length > 0}
              />
            })
          ) : (
            <div className="text-[#FFD700] flex items-center justify-center mt-10 text-7xl">No Jobs Found!</div>
          )}
        </div>
      )}
    </div>
  )
}

export default JobListing