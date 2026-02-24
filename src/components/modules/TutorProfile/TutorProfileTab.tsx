import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Tutor } from "../BrowsTutor/BrowsTutor";
import Image from "next/image";

export interface Review {
    id: string;
    tutorProfileId: string;
    userId: string;
    studentName: string;
    studentImg: string | null;
    rating: number;
    comment: string;
    createdAt: string;
    updatedAt: string;
}

export default function TutorProfileTab({ tutorDetails }: { tutorDetails: Tutor }) {

    return (
        <div className="flex-1">
            <Tabs defaultValue="about" className="">
                <TabsList variant={"line"}>
                    <TabsTrigger value="about">About Me</TabsTrigger>
                    <TabsTrigger value="expertise">Expertise</TabsTrigger>
                    <TabsTrigger value="reviews">Reviews({tutorDetails.totalReviews})</TabsTrigger>
                </TabsList>

                <TabsContent value="about">
                    <div>
                        <h1 className="font-bold text-xl my-2">Professional Background</h1>
                        <p className="text-gray-300">{tutorDetails.bio}</p>

                        <h1 className="font-bold text-xl my-2">Expertise</h1>
                        <div>
                            {
                                tutorDetails.subjects.map((sub, index) => (
                                    <p className="text-gray-300 py-1 capitalize" key={index}>{`${index + 1}. ${sub}`}</p>
                                ))
                            }
                        </div>
                        <div className="bg-[#151515] px-4 pb-2 rounded-xl">

                            <h1 className="font-bold text-xl my-8 pt-2">Reviews</h1>
                            {
                                tutorDetails.reviews.length > 0 ? tutorDetails.reviews.slice(0, 1).map((review: Review, index) => (

                                    <div key={index}>
                                        <div className="flex gap-2">
                                            <Image
                                                src={review.studentImg || "/profile.jpg"}
                                                alt={review.studentName}
                                                width={40}
                                                height={20}
                                                className="rounded-full w-10 h-10 object-cover"
                                            />
                                            <div className="">
                                                <p className="font-medium">{review.studentName}</p>
                                                <p className="text-sm text-muted-foreground">{
                                                    new Date(review.createdAt).toLocaleString("en-US", {
                                                        year: '2-digit',
                                                        month: 'short',
                                                        day: 'numeric'
                                                    })
                                                }</p>
                                            </div>
                                        </div>
                                        <p className="mt-2 text-gray-300">{review.comment}</p>
                                        <p className="text-sm text-yellow-500">Rating: {review.rating} / 5</p>
                                        <div className="border-b border-gray-700 my-4"></div>
                                    </div>
                                ))
                                    :
                                    <p className=" text-2xl text-center pb-4">Now reviews yet</p>
                            }

                        </div>
                    </div>
                </TabsContent>
                <TabsContent value="expertise">
                    <h1 className="font-bold text-xl my-2">Expertise</h1>
                    <div>
                        {
                            tutorDetails.subjects.map((sub, index) => (
                                <p className="text-gray-300 py-1 capitalize text-xl" key={index}>{`${index + 1}. ${sub}`}</p>
                            ))
                        }
                    </div>
                </TabsContent>
                <TabsContent value="reviews">
                    <h1 className="font-bold text-xl my-10">Reviews</h1>
                    {
                        tutorDetails.reviews.length > 0 ? tutorDetails.reviews.map((review: Review, index) => (

                            <div className="bg-[#151515] px-4 py-5 rounded-xl mb-3" key={index}>
                                <div className="flex gap-2">
                                    <Image
                                        src={review.studentImg || "/profile.jpg"}
                                        alt={review.studentName}
                                        width={40}
                                        height={20}
                                        className="rounded-full w-10 h-10 object-cover"
                                    />
                                    <div className="">
                                        <p className="font-medium">{review.studentName}</p>
                                        <p className="text-sm text-muted-foreground">{
                                            new Date(review.createdAt).toLocaleString("en-US", {
                                                year: '2-digit',
                                                month: 'short',
                                                day: 'numeric'
                                            })
                                        }</p>
                                    </div>
                                </div>
                                <p className="mt-2 text-gray-300">{review.comment}</p>
                                <p className="text-sm text-yellow-500">Rating: {review.rating} / 5</p>
                                <div className="border-b border-gray-700 my-4"></div>
                            </div>
                        ))
                            :
                            <p className=" text-2xl text-center">Now reviews yet</p>
                    }
                </TabsContent>
            </Tabs>
        </div>
    );
}