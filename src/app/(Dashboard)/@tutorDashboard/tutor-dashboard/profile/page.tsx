import TutorProfileEditForm from "@/components/modules/TutorProfile/TutorProfile";
import { categoryService } from "@/components/service/category.service";
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

    const category = await categoryService.getCategories()

    return (
        <div>
            <TutorProfileEditForm categories={category.data} tutorData={res.data} />
        </div>
    );
}