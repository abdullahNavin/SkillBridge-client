import { Tutor } from "../BrowsTutor/BrowsTutor";
import TutorBookingTab from "./TutorBookingTab";
import TutorProfileHeader from "./TutorProfileHeader";
import TutorProfileTab from "./TutorProfileTab";


export default function TutorProfileDetails({ tutorDetails }: { tutorDetails: Tutor }) {

    return (
        <div>
            <TutorProfileHeader tutorDetails={tutorDetails} />
            <div className="flex flex-wrap">
                <TutorProfileTab tutorDetails={tutorDetails} />
                <TutorBookingTab />
            </div>
        </div>
    );
}