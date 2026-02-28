import TutorProfileEditForm from "@/components/modules/TutorProfile/TutorProfile";
import { tutorProfileService } from "@/components/service/tutorProfile.service";
import { toast } from "sonner";

export default async function TutorProfilePage() {
    const res = await tutorProfileService.getTutorDashboard()

    if (res.error) {
        return toast.error(res.error)
    }
    if (res.data?.message) {
        return toast.warning(res.data?.message)
    }
    // console.log(res.data);
    return (
        <div>
            <TutorProfileEditForm />
        </div>
    );
}