"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { BiBrain, BiRocket, BiUser } from "react-icons/bi";

export default function OnboardingSteps() {
    const activeStep = 2;

    const steps = [
        {
            id: 1,
            title: "Sign Up",
            description: "Create your expert profile and set your specific learning objectives.",
            icon: BiUser,
        },
        {
            id: 2,
            title: "Match with Tutor",
            description:
                "AI-driven pairing identifies the perfect expert based on your technical needs.",
            icon: BiBrain,
        },
        {
            id: 3,
            title: "Start Learning",
            description:
                "Begin your first immersive 1-on-1 session and accelerate your career.",
            icon: BiRocket,
        },
    ];


    return (
        <div className="relative mx-auto max-w-5xl px-6">
            {/* Dashed line */}
            <div className="absolute left-0 right-0 top-8 border-t border-dashed border-muted-foreground/30 hidden md:block" />

            <div className="relative grid grid-cols-1 md:grid-cols-3 gap-8">
                {steps.map((step) => {
                    const Icon = step.icon;
                    const isActive = step.id === activeStep;

                    return (
                        <div
                            key={step.id}
                            className="flex flex-col items-center text-center"
                        >
                            {/* Icon */}
                            <Button
                                size="icon"
                                className={cn(
                                    "z-10 h-14 w-14 rounded-full",
                                    isActive
                                        ? "bg-teal-500 text-black shadow-lg"
                                        : "bg-muted text-muted-foreground"
                                )}
                            >
                                <Icon className="h-6 w-6" />
                            </Button>

                            {/* Text */}
                            <h3 className="mt-4 text-lg font-semibold">
                                {step.id}. {step.title}
                            </h3>
                            <p className="mt-2 text-sm text-muted-foreground max-w-xs">
                                {step.description}
                            </p>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
