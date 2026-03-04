"use client"

import { updateCategoryAction } from "@/actions/category.action"
import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Field, FieldGroup } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Edit } from "lucide-react"
import { useState } from "react"
import { toast } from "sonner"

export function EditModal({
    category
}: {
    category: { id: string; name: string; description: string }
}) {
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);
        const formData = new FormData(e.currentTarget);
        const name = formData.get("name") as string;
        const description = formData.get("description") as string;
        const res = await updateCategoryAction(category.id, name, description);
        if (res.error) {
            toast.error(res.error);
            setLoading(false);
        }

        if (res.data) {
            toast.success("Category updated successfully!");
            setLoading(false);
        }
    }

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Edit className="hover:text-blue-500 cursor-pointer transition duration-300" />
            </DialogTrigger>

            <DialogContent className="sm:max-w-sm">
                <form onSubmit={(e) => handleSubmit(e)}>
                    <DialogHeader>
                        <DialogTitle>Edit Category</DialogTitle>
                        <DialogDescription>
                            Update the category details below and click save when you are done.
                        </DialogDescription>
                    </DialogHeader>

                    <FieldGroup className="my-5">
                        <Field>
                            <Label htmlFor="name">Name</Label>
                            <Input
                                id="name"
                                name="name"
                                defaultValue={category.name}
                            />
                        </Field>

                        <Field>
                            <Label htmlFor="description">Description</Label>
                            <Textarea
                                id="description"
                                name="description"
                                defaultValue={category.description}
                            />
                        </Field>
                    </FieldGroup>

                    <DialogFooter>
                        <DialogClose asChild>
                            <Button variant="outline" type="button">
                                Cancel
                            </Button>
                        </DialogClose>
                        <Button type="submit">
                            {loading ? "Saving..." : "Save"}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}