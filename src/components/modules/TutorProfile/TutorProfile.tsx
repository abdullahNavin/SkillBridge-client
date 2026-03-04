"use client";

import { useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { format } from "date-fns";
import { CalendarIcon, Plus, Trash2, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import { updateTutorProfile } from "@/actions/updateTutorProfile.action";
import { Category } from "../BrowsTutor/SelectCategory";

const formSchema = z.object({
    name: z.string().min(2, "Name must be at least 2 characters"),
    bio: z.string().min(20, "Bio must be at least 20 characters").max(500, "Bio cannot exceed 500 characters"),
    hourlyRate: z.string().regex(/^\d+(\.\d{1,2})?$/, "Enter a valid rate (e.g. 42.50)"),
    yearsOfExperience: z.number().int().min(0).max(60),
    qualifications: z.string().min(5, "Please enter your qualifications"),
    subjects: z.array(z.object({ value: z.string().min(1, "Subject cannot be empty") })).min(1, "Add at least one subject"),
    availability: z.array(z.object({
        date: z.date(),
        time: z.string().min(1, "Pick a time"),
    })).optional(),
    isAvailable: z.boolean(),
    category_id: z.string().min(1, "Please select a category"),
    image: z.string().url("Enter a valid URL").optional().or(z.literal("")),
});

type FormValues = z.infer<typeof formSchema>;

export interface Tutor {
    id: string;
    category_id: string;
    bio: string;
    name: string;
    image: string | null;
    rating: number;
    totalReviews: number;
    userId: string;
    yearsOfExperience: number;
    hourlyRate: string;
    qualifications: string;
    availability: string[];
    subjects: string[];
    isAvailable: boolean;
}

export type PayloadType = {
    name: string;
    bio: string;
    hourlyRate: string;
    yearsOfExperience: number;
    qualifications: string;
    isAvailable: boolean;
    subjects: string[];
    availability: string[];
    category_id: string;
    image?: string | null;
};

const TIME_OPTIONS = [
    "08:00", "08:30", "09:00", "09:30", "10:00", "10:30",
    "11:00", "11:30", "12:00", "12:30", "13:00", "13:30",
    "14:00", "14:30", "15:00", "15:30", "16:00", "16:30",
    "17:00", "17:30", "18:00", "18:30", "19:00", "19:30",
    "20:00", "20:30", "21:00",
];


function parseAvailability(isoStrings: string[]) {
    return isoStrings.map((iso) => {
        const d = new Date(iso);
        const hours = d.getUTCHours().toString().padStart(2, "0");
        const mins = d.getUTCMinutes().toString().padStart(2, "0");
        return { date: d, time: `${hours}:${mins}` };
    });
}
function parseSubjects(subjects: string[]) {
    return subjects.map((s) => ({ value: s }));
}

function serializeAvailability(slots: { date: Date; time: string }[]): string[] {
    return slots.map(({ date, time }) => {
        const [hours, mins] = time.split(":").map(Number);
        const d = new Date(date);
        d.setUTCHours(hours, mins, 0, 0);
        return d.toISOString();
    });
}

function serializeSubjects(subjects: { value: string }[]): string[] {
    return subjects.map((s) => s.value);
}

// -----
export default function TutorProfileEditForm({ categories, tutorData }: { categories: Category[], tutorData: Tutor }) {
    const [isSubmitting, setIsSubmitting] = useState(false);

    const form = useForm<FormValues, unknown, FormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: tutorData.name,
            bio: tutorData.bio ?? "",
            hourlyRate: tutorData.hourlyRate ?? "",
            yearsOfExperience: tutorData.yearsOfExperience ?? 0,
            qualifications: tutorData.qualifications ?? "",
            subjects: parseSubjects(tutorData.subjects),
            availability: parseAvailability(tutorData.availability),
            isAvailable: tutorData.isAvailable,
            category_id: tutorData.category_id,
            image: tutorData.image ?? "",
        },
    });

    const { fields: subjectFields, append: appendSubject, remove: removeSubject } = useFieldArray({
        control: form.control,
        name: "subjects",
    });

    const { fields: availFields, append: appendAvail, remove: removeAvail } = useFieldArray({
        control: form.control,
        name: "availability",
    });

    const onSubmit = async (values: FormValues) => {
        setIsSubmitting(true);
        try {
            const payload: PayloadType = {
                name: values.name,
                bio: values.bio,
                hourlyRate: values.hourlyRate,
                yearsOfExperience: Number(values.yearsOfExperience),
                qualifications: values.qualifications,
                isAvailable: values.isAvailable,
                category_id: values.category_id,
                image: values.image || null,
                subjects: serializeSubjects(values.subjects),
                availability: serializeAvailability(values.availability ?? []),
            };
            const res = await updateTutorProfile(payload);
            if (res.data) {
                return toast.success("Profile updated successfully!");
            }
            toast.error("Failed to update profile. Please try again.");

        } catch {
            toast.error("Failed to update profile. Please try again.");
        } finally {
            setIsSubmitting(false);
        }
    };

    const imageUrl = form.watch("image");

    return (
        <div className="min-h-screen bg-background py-10 px-4">
            <div className="max-w-3xl mx-auto space-y-6">


                <div>
                    <h1 className="text-2xl font-semibold tracking-tight">Edit Tutor Profile</h1>
                    <p className="text-sm text-muted-foreground mt-1">
                        Update your profile information visible to students.
                    </p>
                </div>

                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">


                        <Card>
                            <CardHeader>
                                <CardTitle className="text-base">Basic Information</CardTitle>
                                <CardDescription>Your public-facing profile details.</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">

                                <FormField
                                    control={form.control}
                                    name="name"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Display Name</FormLabel>
                                            <FormControl>
                                                <Input placeholder="Your name" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={form.control}
                                    name="category_id"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Category</FormLabel>
                                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                <FormControl>
                                                    <SelectTrigger>
                                                        <SelectValue placeholder="Select a category" />
                                                    </SelectTrigger>
                                                </FormControl>
                                                <SelectContent>
                                                    {categories.map((cat) => (
                                                        <SelectItem key={cat.id} value={cat.id}>
                                                            {cat.name}
                                                        </SelectItem>
                                                    ))}
                                                </SelectContent>
                                            </Select>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={form.control}
                                    name="image"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Profile Image URL</FormLabel>
                                            <FormControl>
                                                <Input
                                                    placeholder="https://example.com/your-photo.jpg"
                                                    {...field}
                                                />
                                            </FormControl>
                                            {imageUrl && (
                                                <img
                                                    src={imageUrl}
                                                    alt="Profile preview"
                                                    onError={(e) => (e.currentTarget.style.display = "none")}
                                                    onLoad={(e) => (e.currentTarget.style.display = "block")}
                                                    className="mt-2 h-24 w-24 rounded-full object-cover border"
                                                />
                                            )}
                                            <FormDescription>Paste a publicly accessible image URL.</FormDescription>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />


                                <FormField
                                    control={form.control}
                                    name="bio"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Bio</FormLabel>
                                            <FormControl>
                                                <Textarea
                                                    placeholder="Tell students about yourself..."
                                                    className="resize-none min-h-27.5"
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormDescription>
                                                {field.value?.length ?? 0}/500 characters
                                            </FormDescription>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />


                                <div className="grid grid-cols-2 gap-4">
                                    <FormField
                                        control={form.control}
                                        name="hourlyRate"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Hourly Rate ($)</FormLabel>
                                                <FormControl>
                                                    <Input placeholder="42.50" {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="yearsOfExperience"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Years of Experience</FormLabel>
                                                <FormControl>
                                                    <Input
                                                        type="number"
                                                        min={0}
                                                        max={60}
                                                        {...field}
                                                        onChange={(e) => field.onChange(e.target.valueAsNumber)}
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>

                                <FormField
                                    control={form.control}
                                    name="qualifications"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Qualifications</FormLabel>
                                            <FormControl>
                                                <Textarea
                                                    placeholder="e.g. B.Sc. in Physics, TEFL Certified..."
                                                    className="resize-none min-h-[80px]"
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                                <CardTitle className="text-base">Subjects</CardTitle>
                                <CardDescription>Topics you teach.</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-3">
                                {subjectFields.map((field, index) => (
                                    <FormField
                                        key={field.id}
                                        control={form.control}
                                        name={`subjects.${index}.value`}
                                        render={({ field }) => (
                                            <FormItem>
                                                <div className="flex items-center gap-2">
                                                    <FormControl>
                                                        <Input placeholder="e.g. physics" {...field} />
                                                    </FormControl>
                                                    <Button
                                                        type="button"
                                                        variant="ghost"
                                                        size="icon"
                                                        onClick={() => removeSubject(index)}
                                                        disabled={subjectFields.length === 1}
                                                        className="shrink-0 text-muted-foreground hover:text-destructive"
                                                    >
                                                        <Trash2 className="h-4 w-4" />
                                                    </Button>
                                                </div>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                ))}

                                {/* Preview badges */}
                                <div className="flex flex-wrap gap-2 pt-1">
                                    {subjectFields.map((f, i) => {
                                        const val = form.watch(`subjects.${i}.value`);
                                        return val ? (
                                            <Badge key={f.id} variant="secondary" className="capitalize">
                                                {val}
                                            </Badge>
                                        ) : null;
                                    })}
                                </div>

                                <Button
                                    type="button"
                                    variant="outline"
                                    size="sm"
                                    onClick={() => appendSubject({ value: "" })}
                                    className="w-full mt-1"
                                >
                                    <Plus className="h-4 w-4 mr-2" />
                                    Add Subject
                                </Button>
                                {form.formState.errors.subjects?.root && (
                                    <p className="text-sm font-medium text-destructive">
                                        {form.formState.errors.subjects.root.message}
                                    </p>
                                )}
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                                <CardTitle className="text-base">Availability Slots</CardTitle>
                                <CardDescription>Set specific date and time slots when you are available.</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-3">
                                {availFields.map((field, index) => (
                                    <div key={field.id} className="flex items-start gap-2">

                                        <FormField
                                            control={form.control}
                                            name={`availability.${index}.date`}
                                            render={({ field }) => (
                                                <FormItem className="flex-1 hidden">
                                                    {index === 0 && <FormLabel>Date</FormLabel>}
                                                    <Popover>
                                                        <PopoverTrigger asChild>
                                                            <FormControl>
                                                                <Button
                                                                    variant="outline"
                                                                    className={cn(
                                                                        "w-full justify-start text-left font-normal",
                                                                        !field.value && "text-muted-foreground"
                                                                    )}
                                                                >
                                                                    <CalendarIcon className="mr-2 h-4 w-4" />
                                                                    {field.value ? format(field.value, "PPP") : "Pick a date"}
                                                                </Button>
                                                            </FormControl>
                                                        </PopoverTrigger>
                                                        <PopoverContent className="w-auto p-0" align="start">
                                                            <Calendar
                                                                mode="single"
                                                                selected={field.value}
                                                                onSelect={field.onChange}
                                                                disabled={(date) => date < new Date()}
                                                                initialFocus
                                                            />
                                                        </PopoverContent>
                                                    </Popover>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />

                                        <FormField
                                            control={form.control}
                                            name={`availability.${index}.time`}
                                            render={({ field }) => (
                                                <FormItem className="w-[70%]">
                                                    {index === 0 && <FormLabel>Time</FormLabel>}
                                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                        <FormControl>
                                                            <SelectTrigger>
                                                                <SelectValue placeholder="Time" />
                                                            </SelectTrigger>
                                                        </FormControl>
                                                        <SelectContent>
                                                            {TIME_OPTIONS.map((t) => (
                                                                <SelectItem key={t} value={t}>{t}</SelectItem>
                                                            ))}
                                                        </SelectContent>
                                                    </Select>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />

                                        <div className={cn("flex items-center", index === 0 ? "mt-6" : "mt-0")}>
                                            <Button
                                                type="button"
                                                variant="ghost"
                                                size="icon"
                                                onClick={() => removeAvail(index)}
                                                className="text-muted-foreground hover:text-destructive"
                                            >
                                                <Trash2 className="h-4 w-4" />
                                            </Button>
                                        </div>
                                    </div>
                                ))}

                                <Button
                                    type="button"
                                    variant="outline"
                                    size="sm"
                                    className="w-full"
                                    onClick={() => appendAvail({ date: new Date(), time: "09:00" })}
                                >
                                    <Plus className="h-4 w-4 mr-2" />
                                    Add Slot
                                </Button>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardContent className="pt-6">
                                <FormField
                                    control={form.control}
                                    name="isAvailable"
                                    render={({ field }) => (
                                        <FormItem className="flex items-center justify-between">
                                            <div>
                                                <FormLabel className="text-base">Available for Bookings</FormLabel>
                                                <FormDescription>
                                                    Toggle off to pause new student bookings.
                                                </FormDescription>
                                            </div>
                                            <FormControl>
                                                <Switch
                                                    checked={field.value}
                                                    onCheckedChange={field.onChange}
                                                />
                                            </FormControl>
                                        </FormItem>
                                    )}
                                />
                            </CardContent>
                        </Card>

                        <Separator />

                        {/* Actions */}
                        <div className="flex justify-end gap-3 pb-10">
                            <Button type="button" variant="outline" onClick={() => form.reset()}>
                                Reset
                            </Button>
                            <Button type="submit" disabled={isSubmitting} className="cursor-pointer">
                                {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                                Save Changes
                            </Button>
                        </div>

                    </form>
                </Form>
            </div>
        </div>
    );
}