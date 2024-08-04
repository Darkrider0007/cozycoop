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
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"

import { BookUser, Loader2, MailIcon, PackageCheck, User, User2 } from 'lucide-react';
import { PasswordInput } from "@/components/ui/password-input"
import { useState } from "react"
import axios, { AxiosError } from "axios"
import { useToast } from "@/components/ui/use-toast"
import { ApiResponse } from "@/types/ApiResponse"

const formSchema = z.object({
    identifier: z.string().min(2).max(50),
    password: z.string().min(6).max(50),
})
export default function Page() {
    const router = useRouter()
    const [onClickSubmit, setOnClickSubmit] = useState(false)
    const { toast } = useToast()

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            identifier: "",
            password: "",
        },
    })

    async function onSubmit(values: z.infer<typeof formSchema>) {
        setOnClickSubmit(true)
        try {
            const res = await axios.post('/api/login', values)
            if (res.data.success) {
                toast({
                    title: "Success",
                    description: res.data.message,
                })
                router.push('/home')
            }else{
                toast({
                    title: "Error",
                    description: res.data.message,
                    variant: "destructive",
                })
            }
        } catch (error) {
            const axiosError = error as AxiosError<ApiResponse>;
            toast({
                title: "Error",
                description: axiosError.response?.data.message ,
                variant: "destructive",
            })            
        }finally{
            setOnClickSubmit(false)
        }
    }
    return (
        <div className="w-full lg:grid lg:min-h-[600px] lg:grid-cols-2 xl:min-h-[800px]">
            <div className="flex items-center justify-center py-12">
                <div className="mx-auto grid w-[350px] gap-6">
                    <div className="grid gap-2 text-center">
                        <h1 className="text-3xl font-bold">Login</h1>
                        <p className="text-balance text-muted-foreground">
                            Enter your details below to login to your account
                        </p>
                    </div>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">

                            <FormField
                                control={form.control}
                                name="identifier"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Email/Username</FormLabel>
                                        <FormControl>
                                            <Input placeholder="email/username" {...field}
                                                suffix={<User2 />}
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
                            <div className="flex items-end justify-end">
                                <p
                                    onClick={() => router.push("/forgot-password")}
                                    className="hover:underline cursor-pointer">
                                    <>
                                    Forgot password?
                                    🤔
                                    </>
                                </p>
                            </div>

                            <Button type="submit" disabled={onClickSubmit}>{
                                onClickSubmit ?
                                    <>
                                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                        Login...
                                    </>
                                    : "Login"
                            }</Button>
                        </form>
                    </Form>
                    <div className="mt-4 text-center text-sm">
                        Don&apos;t have an account?{" "}
                        <p
                            onClick={() => router.push("/signup")}
                            className="underline cursor-pointer">
                            Sign up
                        </p>
                    </div>
                </div>
            </div>
            <div className="hidden bg-muted lg:block">
                <Image
                    src="/login.jpg"
                    alt="Image"
                    width="1920"
                    height="1080"
                    className="h-full w-full object-cover "
                />
            </div>
        </div>
    )
}
