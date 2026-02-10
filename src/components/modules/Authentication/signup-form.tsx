"use client"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { env } from "@/env"
import { authClient } from "@/lib/auth-client"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import { toast } from "sonner"

type SignupFormValues = {
  name: string
  email: string
  password: string
}

const FrontendUrl = env.NEXT_PUBLIC_FRONTEND_URL

export function SignupForm(props: React.ComponentProps<typeof Card>) {

  const router = useRouter()

  const {
    reset,
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignupFormValues>()

  const onSubmit = async (data: SignupFormValues) => {
    try {
      const { data: userData, error } = await authClient.signUp.email({
        name: data.name,
        email: data.email,
        password: data.password,
        // callbackURL: FrontendUrl || "http://localhost:3000",
      })

      if (error) {
        toast.error(`Signup failed: ${error.message}`)
      }

      if (userData?.user.email) {
        toast.success("Account created successfully!")
        reset()
        router.push("/")
      }
    } catch (err) {
      console.error("Signup failed:", err)
    }
  }

  const handleGoogleLogin = async () => {
    try {
      await authClient.signIn.social({
        provider: "google",
        callbackURL: FrontendUrl ?? "http://localhost:3000"
      })
    } catch (err) {
      console.error("Google login failed:", err)
    }
  }

  return (
    <Card {...props}>
      <CardHeader>
        <CardTitle>Create an account</CardTitle>
        <CardDescription>
          Enter your information below to create your account
        </CardDescription>
      </CardHeader>

      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          <FieldGroup>

            <Field>
              <FieldLabel htmlFor="name">Full Name</FieldLabel>
              <Input
                id="name"
                placeholder="John Doe"
                {...register("name", {
                  required: "Full name is required",
                  minLength: {
                    value: 2,
                    message: "Name must be at least 2 characters",
                  },
                })}
              />
              {errors.name && (
                <FieldDescription className="text-destructive">
                  {errors.name.message}
                </FieldDescription>
              )}
            </Field>


            <Field>
              <FieldLabel htmlFor="email">Email</FieldLabel>
              <Input
                id="email"
                type="email"
                placeholder="m@example.com"
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: "Enter a valid email address",
                  },
                })}
              />
              {errors.email ? (
                <FieldDescription className="text-destructive">
                  {errors.email.message}
                </FieldDescription>
              ) : (
                <FieldDescription>
                  We&apos;ll use this to contact you. We will not share your
                  email with anyone else.
                </FieldDescription>
              )}
            </Field>


            <Field>
              <FieldLabel htmlFor="password">Password</FieldLabel>
              <Input
                id="password"
                type="password"
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 8,
                    message: "Password must be at least 8 characters",
                  },
                })}
              />
              {errors.password ? (
                <FieldDescription className="text-destructive">
                  {errors.password.message}
                </FieldDescription>
              ) : (
                <FieldDescription>
                  Must be at least 8 characters long.
                </FieldDescription>
              )}
            </Field>


            <FieldGroup>
              <Field>
                <Button type="submit" className="cursor-pointer" disabled={isSubmitting}>
                  Create Account
                </Button>

                <Button
                  type="button"
                  variant="outline"
                  onClick={handleGoogleLogin}
                  className="cursor-pointer"
                >
                  Sign up with Google
                </Button>

                <FieldDescription className="px-6 text-center">
                  Already have an account?{" "}
                  <Link href="/login">Sign in</Link>
                </FieldDescription>
              </Field>
            </FieldGroup>
          </FieldGroup>
        </form>
      </CardContent>
    </Card>
  )
}
