"use client"

import { cn } from "@/lib/utils"
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
import Link from "next/link"
import { authClient } from "@/lib/auth-client"
import { useForm } from "react-hook-form"
import { env } from "@/env"
import { toast } from "sonner"
import { useState } from "react"

type LoginFormValues = {
  email: string
  password: string
}

const FrontendUrl = env.NEXT_PUBLIC_FRONTEND_URL

const demoCredentials = [
  {
    role: "Admin",
    email: "admin@skillbridge.com",
    password: "adminSkillBridge123",
  },
  {
    role: "Tutor",
    email: "tutorfinal@gamil.com",
    password: "tutor123",
  },
  {
    role: "Student",
    email: "studentfinal@gmail.com",
    password: "student123",
  },
]

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const [demoRoleLoading, setDemoRoleLoading] = useState<string | null>(null)

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormValues>()

  const signInWithCredentials = async (data: LoginFormValues) => {
    try {
      const { data: userData, error } = await authClient.signIn.email({
        email: data.email,
        password: data.password,
        callbackURL: FrontendUrl,
      })

      if (error) {
        toast.error(`Login failed: ${error.message}`)
      }
      if (userData?.user.email) {
        toast.success("Logged in successfully!")
        reset()
      }
    } catch (err) {
      console.error("Login failed:", err)
    }
  }

  const onSubmit = async (data: LoginFormValues) => {
    await signInWithCredentials(data)
  }

  const handleDemoLogin = async (credential: LoginFormValues & { role: string }) => {
    setDemoRoleLoading(credential.role)
    await signInWithCredentials({
      email: credential.email,
      password: credential.password,
    })
    setDemoRoleLoading(null)
  }

  const handleGoogleLogin = async () => {
    try {
      await authClient.signIn.social({
        provider: "google",
        callbackURL: FrontendUrl,
      })
    } catch (err) {
      console.error("Google login failed:", err)
    }
  }

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle>Login to your account</CardTitle>
          <CardDescription>
            Enter your email below to login to your account
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} noValidate>
            <FieldGroup>
              {/* Email */}
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
                {errors.email && (
                  <FieldDescription className="text-destructive">
                    {errors.email.message}
                  </FieldDescription>
                )}
              </Field>

              {/* Password */}
              <Field>
                <div className="flex items-center">
                  <FieldLabel htmlFor="password">Password</FieldLabel>
                  <a
                    href="#"
                    className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                  >
                    Forgot your password?
                  </a>
                </div>
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
                {errors.password && (
                  <FieldDescription className="text-destructive">
                    {errors.password.message}
                  </FieldDescription>
                )}
              </Field>

              {/* Actions */}
              <Field>
                <Button type="submit" className="cursor-pointer" disabled={isSubmitting || demoRoleLoading !== null}>
                  Login
                </Button>

                <Button
                  type="button"
                  variant="outline"
                  onClick={handleGoogleLogin}
                  className="cursor-pointer"
                  disabled={isSubmitting || demoRoleLoading !== null}
                >
                  Login with Google
                </Button>

                <div className="grid gap-2">
                  {demoCredentials.map((credential) => (
                    <Button
                      key={credential.role}
                      type="button"
                      variant="secondary"
                      onClick={() => handleDemoLogin(credential)}
                      disabled={isSubmitting || demoRoleLoading !== null}
                      className="cursor-pointer"
                    >
                      {demoRoleLoading === credential.role
                        ? `Signing in as ${credential.role}...`
                        : `Demo ${credential.role} Login`}
                    </Button>
                  ))}
                </div>

                <FieldDescription className="text-center">
                  Don&apos;t have an account?{" "}
                  <Link href="/signup">Sign up</Link>
                </FieldDescription>
              </Field>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
