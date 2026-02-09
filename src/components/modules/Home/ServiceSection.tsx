import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MdStars } from "react-icons/md";
import { GiPathDistance } from "react-icons/gi";
import { GiProgression } from "react-icons/gi";

export default function ServiceSection() {
    return (
        <div className="dark:bg-[#151515] py-8">
            <div className="container mx-auto text-center md:text-left">
                <h2 className="text-3xl font-bold text-white py-4 capitalize">Why choose skillBridge</h2>
                <p className="dark:text-gray-400 md:w-[50%]">Our platform is designed to provide best 1-on-1 learning experience through personalized tutoring and expert guidance.</p>
            </div>
            <div className="flex flex-col md:flex-row gap-8 md:gap-4 justify-between container mx-auto my-10 px-4 md:px-0">
                <Card className=" w-full md:max-w-sm mx-0">
                    <CardHeader>
                        <MdStars className="text-4xl text-yellow-500" />
                        <CardTitle>Top Experts</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p>
                            Our platform connects you with top experts in various fields, ensuring you receive high-quality guidance and support.
                        </p>
                    </CardContent>
                </Card>

                <Card className="mx-auto w-full md:max-w-sm">
                    <CardHeader>
                        <GiPathDistance className="text-4xl text-blue-500" />
                        <CardTitle>Personalized path</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p>
                            We create personalized learning paths tailored to your goals and needs, ensuring you get the most out of your learning experience.
                        </p>
                    </CardContent>
                </Card>

                <Card className=" w-full md:max-w-sm mx-0">
                    <CardHeader>
                        <GiProgression className="text-4xl text-green-500" />
                        <CardTitle>Progress Tracking</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p>
                            Track your progress and see how far you have come with our intuitive progress tracking system.
                        </p>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}