import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Star } from "lucide-react";
import Image from "next/image";

export default function SuccessStories() {
    const testimonials = [
        {
            name: "Alex Rivera",
            role: "Senior Developer at TechGlobal",
            quote:
                "The mentorship I received was pivotal in my transition from Junior to Senior Software Engineer. The AI match was spot on!",
            avatar: "/story1.jpg",
        },
        {
            name: "Sarah Jenkins",
            role: "UI/UX Designer at CreativeFlow",
            quote:
                "I struggled with UI Design concepts until I paired with a mentor from SkillBridge. My portfolio has never looked better!",
            avatar: "/story2.jpg",
        },
        {
            name: "David Chen",
            role: "Data Scientist at InsightAI",
            quote:
                "The flexible scheduling allowed me to learn advanced data science while working full-time. Absolutely worth the investment.",
            avatar: "/story3.jpg",
        },
    ];

    return (
        <div className="py-20 container mx-auto px-6 md:px-0">

            <h1 className="text-4xl font-bold text-center pb-6">Success Stories</h1>
            <p className="text-center text-muted-foreground max-w-2xl mx-auto px-7 md:px-0">Hear from professionals who have transformed their careers with our expert-led learning platform SkillBridge.</p>

            <div className="flex flex-col md:flex-row gap-8 md:gap-0 justify-between items-center pt-20">
                {
                    testimonials.map((testimonial, index) => (
                        <Card key={index} className="mx-0 w-full md:max-w-sm">
                            <CardHeader>
                                <CardTitle className="flex gap-0.5">
                                    {Array.from({ length: 5 }).map((_, i) => (
                                        <Star key={i} className="h-4 w-4 fill-yellow-400" />
                                    ))}
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p>
                                    {testimonial.quote}
                                </p>
                            </CardContent>
                            <CardFooter>
                                <div className="flex items-center gap-3">
                                    <div className="relative w-10 h-10 rounded-full overflow-hidden">
                                        <Image
                                            src={testimonial.avatar}
                                            alt={testimonial.name}
                                            fill
                                            className="object-cover"
                                        />
                                    </div>

                                    <div>
                                        <p className="font-medium">{testimonial.name}</p>
                                        <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                                    </div>
                                </div>
                            </CardFooter>
                        </Card>
                    ))
                }
            </div>
        </div>
    );
}