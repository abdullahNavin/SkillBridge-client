import HeroSection from "@/components/modules/Home/HeroSection";
import OnboardingSteps from "@/components/modules/Home/OnBoarding";
import ServiceSection from "@/components/modules/Home/ServiceSection";

export default function Home() {
    return (
        <div>
            <HeroSection />
            <ServiceSection />
            <OnboardingSteps />
        </div>
    );
}