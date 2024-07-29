"use client"
import Image from "next/image"
import { z } from "zod"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"

import { BookUser, Loader2, MailIcon, PackageCheck, User } from 'lucide-react';
import { PasswordInput } from "@/components/ui/password-input"
import { useState } from "react"

const formSchema = z.object({
    username: z.string().min(2).max(50),
    name: z.string().min(2).max(50),
    email: z.string().email(),
    password: z.string().min(6).max(50),
    confirmPassword: z.string().min(6).max(50),
    avatar: z.any().optional(),
})

export default function Page() {
    const router = useRouter()
    const [onClickSubmit, setOnClickSubmit] = useState(false)

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            username: "",
            name: "",
            email: "",
            password: "",
            confirmPassword: "",
            avatar: undefined,
        },
    })

    function onSubmit(values: z.infer<typeof formSchema>) {
        setOnClickSubmit(true)
        console.log(values)
    }

    return (
        <div className="w-full lg:grid lg:min-h-[600px] lg:grid-cols-2 xl:min-h-[800px]">
            <div className="hidden bg-muted lg:block">
                <Image
                    src="/signup.jpg"
                    alt="Image"
                    width="1920"
                    height="1080"
                    className="h-full w-full object-cover "
                />
            </div>
            <div className="flex items-center justify-center py-12">
                <div className="mx-auto grid w-[350px] gap-6">
                    <div className="grid gap-2 text-center">
                        <h1 className="text-3xl font-bold">Sign Up</h1>
                        <p className="text-balance text-muted-foreground">
                            Enter your details to create your account
                        </p>
                    </div>

                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                            <FormField
                                control={form.control}
                                name="username"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Username</FormLabel>
                                        <FormControl>
                                            <Input placeholder="username" {...field}
                                                suffix={<User />}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="name"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Name</FormLabel>
                                        <FormControl>
                                            <Input placeholder="fullname" {...field}
                                                suffix={<BookUser />}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="email"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Email</FormLabel>
                                        <FormControl>
                                            <Input placeholder="m@example.com" {...field}
                                                suffix={<MailIcon />}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="password"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Password</FormLabel>
                                        <FormControl>
                                            <PasswordInput placeholder="password" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="confirmPassword"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Confirm Password</FormLabel>
                                        <FormControl>
                                            <Input placeholder="confirm password" type="text" {...field}
                                                suffix={<PackageCheck />}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="avatar"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Avatar</FormLabel>
                                        <FormControl>
                                            <input
                                                type="file"
                                                className="cursor-pointer"
                                                onChange={(e) => {
                                                    field.onChange(e.target.files?.[0])
                                                }}
                                                ref={field.ref}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <Button type="submit" disabled={onClickSubmit}>{
                                onClickSubmit ?
                                    <>
                                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                        Signing Up...
                                    </>
                                    : "Sign Up"
                            }</Button>
                        </form>
                    </Form>

                    <div className="mt-4 text-center text-sm">
                        Already have an account?{" "}
                        <p
                            onClick={() => router.push("/login")}
                            className="underline cursor-pointer">
                            Login
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}
