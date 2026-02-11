import HeroSection from "@/components/modules/Home/HeroSection";
import OnboardingSteps from "@/components/modules/Home/OnBoarding";
import ServiceSection from "@/components/modules/Home/ServiceSection";
import SuccessStories from "@/components/modules/Home/SuccessStories";
import { userService } from "@/components/service/user.service";

export default async function Home() {
    const session = await userService.getSession()
    // console.log(session);

    return (
        <div>
            <HeroSection />
            <ServiceSection />
            <OnboardingSteps />
            <SuccessStories />
        </div>
    );
}