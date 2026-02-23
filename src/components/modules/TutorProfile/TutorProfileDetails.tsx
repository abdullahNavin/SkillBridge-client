import { userService } from "@/components/service/user.service";
import { Tutor } from "../BrowsTutor/BrowsTutor";
import TutorBookingTab from "./TutorBookingTab";
import TutorProfileHeader from "./TutorProfileHeader";
import TutorProfileTab from "./TutorProfileTab";


export default async function TutorProfileDetails({ tutorDetails }: { tutorDetails: Tutor }) {
    const session = await userService.getSession()
    return (
        <div>
            <TutorProfileHeader tutorDetails={tutorDetails} />
            <div className="flex flex-col md:flex-row gap-5">
                <TutorProfileTab tutorDetails={tutorDetails} />
                <TutorBookingTab tutorDetails={tutorDetails} session={session.data} />
            </div>
        </div>
    );
}