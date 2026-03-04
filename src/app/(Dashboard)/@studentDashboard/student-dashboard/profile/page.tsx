"use client"

import { getSessionAction } from "@/actions/getSession.action";
import { studentProfileAction } from "@/actions/studentProfile.action";
import { Button } from "@/components/ui/button";
import { Field, FieldGroup } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export default function Profile() {
    const [loading, setLoading] = useState(false);
    const [session, setSession] = useState({
        name: '',
        image: ''
    });
    useEffect(() => {
        getSessionAction()
            .then((res) => res.data)
            .then((data) => {
                setSession(data.user);
            })
            .catch((err) => {
                console.error("Unexpected error:", err);
            });
    }, [])

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);
        const formData = new FormData(e.currentTarget);
        const name = formData.get('name') as string;
        const image = formData.get('image') as string;

        const { data, error } = await studentProfileAction(name, image);

        if (error) {
            toast.error(error);
            setLoading(false);
            return;
        }
        if (data) {
            toast.success("Profile updated successfully");
            setSession((prevSession) => ({
                ...prevSession,
                name,
                image
            }));
            setLoading(false);
        }
    }

    return (
        <div className="flex items-center justify-center h-full">
            <div className="w-3xl p-4 border rounded">
                <h1 className="text-xl font-bold">Update Profile</h1>
                <form onSubmit={(e) => handleSubmit(e)}>
                    <FieldGroup className="my-5">
                        <Field>
                            <Label htmlFor="name">Name</Label>
                            <Input
                                id="name"
                                name="name"
                                defaultValue={session.name}
                            />
                        </Field>

                        <Field>
                            <Label htmlFor="image">Image URL</Label>
                            <Input
                                id="image"
                                name="image"
                                defaultValue={session.image ?? ''}
                            />
                        </Field>
                    </FieldGroup>
                    <Button className="w-full cursor-pointer" type="submit" disabled={loading}>
                        {loading ? "Updating..." : "Update Profile"}
                    </Button>
                </form>
            </div>
        </div>
    );
}