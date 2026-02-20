import Image from "next/image";
import { Tutor } from "../BrowsTutor/BrowsTutor";
import { PiBagLight } from "react-icons/pi";
import { MdOutlineFeedback } from "react-icons/md";

export default function TutorProfileDetails({ tutorDetails }: { tutorDetails: Tutor }) {

    return (
        <div>
            <div className="bg-[#151515] my-10 px-4 py-5 rounded-sm flex flex-col md:flex-row gap-4">
                <Image
                    className="rounded-full"
                    src={tutorDetails.image || "/profile.jpg"}
                    alt={tutorDetails.name}
                    width={100}
                    height={100}
                />
                <div>
                    <h1 className="capitalize text-xl font-bold">{tutorDetails.name} <span className="text-sm font-medium text-cyan-300"> | {tutorDetails.qualifications}</span></h1>
                    <div className="flex items-center gap-2">
                        <p className="flex items-center gap-2 mt-4"><PiBagLight /> <span className=" text-gray-300 text-xs">{tutorDetails.yearsOfExperience}+ Years Experience</span></p>

                        <p className="flex gap-2 items-center mt-4"><MdOutlineFeedback /> <span className=" text-gray-300 text-xs">{tutorDetails.totalReviews} Reviews</span></p>
                    </div>
                    <div className=" flex gap-2.5 mt-4">
                        {
                            tutorDetails.subjects.map((sub, index) => (
                                <p className="bg-[#2b2b2b] rounded-full px-2.5 py-1 capitalize text-xs" key={index}>{sub}</p>
                            ))
                        }
                    </div>
                </div>
            </div>
        </div>
    );
}