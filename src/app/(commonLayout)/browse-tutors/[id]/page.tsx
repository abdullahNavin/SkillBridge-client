import TutorProfileDetails from "@/components/modules/TutorProfile/TutorProfileDetails";
import { tutorProfileService } from "@/components/service/tutorProfile.service";

export default async function TutorProfile({ params }: { params: Promise<{ id: string }> }) {

    const { id } = await params

    const tutorDetails = await tutorProfileService.getTutorById(id)
    console.log(tutorDetails);

    return (
        <div className="container mx-auto px-2.5 md:px-0">
            <TutorProfileDetails tutorDetails={tutorDetails.data} />
        </div>
    );
}