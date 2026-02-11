import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Star } from "lucide-react";
import Image from "next/image";

export default function BrowsTutor() {
    const tutors = [
        {
            "id": "a7cd4a5a-94fd-4a4c-afd5-83fd45b34ca5",
            "category_id": "dcc030c4-d84a-4121-8fc8-d3f9b7fb05ca",
            "bio": "Passionate math tutor with a strong background in algebra, calculus, and statistics. I focus on building confidence and problem-solving skills.",
            "name": "John Doe",
            "image": null,
            "rating": 0,
            "totalReviews": 0,
            "userId": "EzpPviBL1PwqP7WeV1WlT0wtZpDQ0Fmi",
            "yearsOfExperience": 3,
            "hourlyRate": "35",
            "qualifications": "B.Sc. in Mathematics, M.Ed. in Secondary Education, Certified Online Tutor",
            "availability": [
                "2026-02-05T09:00:00.000Z",
                "2026-02-06T13:00:00.000Z",
                "2026-02-07T16:00:00.000Z"
            ],
            "subjects": [
                "algebra",
                "calculus",
                "trigonometry",
                "statistics"
            ],
            "isAvailable": false
        },
        {
            "id": "c98a4e21-7b3d-4c4a-9c1e-8f2d6e9a5678",
            "category_id": "dcc030c4-d84a-4121-8fc8-d3f9b7fb05ca",
            "bio": "Patient and supportive chemistry tutor focused on exam preparation and real-world applications.",
            "name": "Michael Nguyen",
            "image": '/profile.jpg',
            "rating": 4.5,
            "totalReviews": 14,
            "userId": "M9Pq4E2sVJkB8xYwL0N7T",
            "yearsOfExperience": 4,
            "hourlyRate": "40",
            "qualifications": "B.Sc. in Chemistry, Teaching Certification, Online Tutoring Specialist",
            "availability": [
                "2026-02-06T11:00:00.000Z",
                "2026-02-07T15:00:00.000Z"
            ],
            "subjects": [
                "chemistry",
                "organic chemistry",
                "analytical chemistry"
            ],
            "isAvailable": true
        },
    ]
    return (
        <div className="container mx-auto py-8 px-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {
                tutors.map((tutor) => (
                    <Card key={tutor.id} className="mx-0 w-full md:max-w-xl flex flex-col hover:-translate-y-1.5 transition-transform duration-400">
                        <CardHeader>
                            <div className="flex items-center gap-3">

                                <Image
                                    src={
                                        tutor.image || "/profile.jpg"
                                    }
                                    alt={tutor.name}
                                    width={70}
                                    height={70}
                                    className="object-cover rounded"
                                />

                                <div>
                                    <p className="font-medium flex gap-2 items-center">{tutor.name} <span className={
                                        `bg-green-500 rounded-full h-3 w-3 ${tutor.isAvailable ? "block" : "hidden"}`
                                    }></span></p>
                                    <p className="text-sm text-muted-foreground">{tutor.qualifications}</p>
                                </div>
                                <div className="flex items-start h-20 flex-1">
                                    <div className="flex items-center gap-1">
                                        <Star className="w-2.5 h-2.5 fill-yellow-400 text-yellow-400" />
                                        <p >{tutor.rating}</p>
                                        <p className="text-muted-foreground text-[12px]"> ({tutor.totalReviews})</p>
                                    </div>
                                </div>
                            </div>
                        </CardHeader>
                        <CardContent className="flex-1">
                            {
                                tutor.subjects.map((subject) => (
                                    <button key={subject} className="text-sm text-gray-300 px-2 bg-[#212121] rounded mr-1 mt-1 py-0.5 capitalize">{subject}</button>
                                ))
                            }
                        </CardContent>
                        <CardFooter>
                            <p className="font-medium text-2xl">${tutor.hourlyRate}<span className="text-sm text-muted-foreground">/hour</span></p>

                            <Button variant="outline" className="ml-auto cursor-pointer">
                                View Profile
                            </Button>
                        </CardFooter>
                    </Card>
                ))
            }
        </div >
    );
}