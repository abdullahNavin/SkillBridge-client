import TutorProfileDetails from "@/components/modules/TutorProfile/TutorProfileDetails";
import { tutorProfileService } from "@/components/service/tutorProfile.service";

export default async function TutorProfile({ params }: { params: Promise<{ id: string }> }) {

    const { id } = await params

    const tutorDetails = await tutorProfileService.getTutorById(id)
    console.log(tutorDetails);

    return (
        <div className="container mx-auto">
            <TutorProfileDetails tutorDetails={tutorDetails.data} />
        </div>
    );
}