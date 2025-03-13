/* eslint-disable react/prop-types */
import { useUser } from "@clerk/clerk-react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "./ui/card";
import { Heart, MapPinIcon, Trash2Icon } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "./ui/button";
import { saveJobs } from "@/api/apiJobs";
import useFetch from "@/hooks/useFetch";
import { useEffect, useState } from "react";

const JobCard = ({
    job,
    isMyJob = false,
    savedInit = false,
    onJobSaved = () => { }
}) => {
    const [saved, setSaved] = useState(savedInit);
    const {
        fn: fnSavedJobs,
        data: savedJobs,
        loading: loadingSavedJobs
    } = useFetch(saveJobs, {
        alreadySaved: saved
    });

    const { user } = useUser();
    const handleSaveJob = async () => {
        await fnSavedJobs({
            user_id: user.id,
            job_id: job.id
        });
        onJobSaved();
    }

    useEffect(() => {
        if (savedJobs !== undefined) setSaved(savedJobs?.length > 0)
    }, [savedJobs])
    return (
        <Card className="">
            <CardHeader>
                <CardTitle className="flex justify-between font-bold">
                    {job.title}
                    {isMyJob &&
                        <Trash2Icon
                            fill="red"
                            size={18}
                            className="text-red-300 cursor-pointer"
                        />}
                </CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col gap-4 flex-1">
                <div className="flex justify-between">
                    {job.company && <img src={job.company.logo_url} alt="Company Logo" className="h-6" />}
                    <div className="flex items-center gap-2">
                        <MapPinIcon size={15} /> {job.location}
                    </div>
                </div>
                <hr />
                {/* {job?.description.substring(0, job.description.indexOf("."))} */}
            </CardContent>
            <CardFooter className="flex gap-2">
                <Link to={`/job/${job.id}`} className="flex-1">
                    <Button variant="secondary" className="w-full">
                        More Details
                    </Button>
                </Link>
                {!isMyJob && (
                    <Button
                        variant='outline'
                        className='w-15'
                        onClick={handleSaveJob}
                        disabled={loadingSavedJobs}
                    >
                        {saved ? (
                            <Heart size={20} stroke="red" fill="red" />
                        ) : (
                            <Heart size={20} stroke="red" />
                        )}
                    </Button>
                )}
            </CardFooter>
        </Card>
    );
}

export default JobCard;