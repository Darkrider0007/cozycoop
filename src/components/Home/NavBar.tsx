"use client";
import { CircleUser, Menu, Package2, Search } from 'lucide-react'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { Sheet, SheetContent, SheetTrigger } from '../ui/sheet'
import { Button } from '../ui/button'
import { Input } from '../ui/input'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '../ui/dropdown-menu'
import axios from 'axios';
import Image from 'next/image';

function NavBar() {
    const [userDetails, setUserDetails] = useState<any>(null)


    useEffect(() => {
        async function fetchUserData() {
            const res = await axios.get('/api/getUserData')
            if (res.data.success) {
                setUserDetails(res.data.user)
            }
        }
        fetchUserData()
    }, [])
    return (
        <div>
            <header className="sticky top-0 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6">
                <nav className="hidden flex-col gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6">


                    <Link
                        href="/home"
                        className="flex items-center gap-2 text-lg font-semibold md:text-base"
                    >
                        <Image
                            src="/cozycoop.png"
                            alt="User Avatar"
                            width={270}
                            height={270}

                        />
                    </Link>
                    <Link
                        href="#"
                        className="text-muted-foreground transition-colors hover:text-foreground"
                    >
                        Dashboard
                    </Link>
                    <Link
                        href="#"
                        className="text-muted-foreground transition-colors hover:text-foreground"
                    >
                        Orders
                    </Link>
                    <Link
                        href="#"
                        className="text-muted-foreground transition-colors hover:text-foreground"
                    >
                        Products
                    </Link>
                    <Link
                        href="#"
                        className="text-muted-foreground transition-colors hover:text-foreground"
                    >
                        Customers
                    </Link>
                    <Link
                        href="#"
                        className="text-foreground transition-colors hover:text-foreground"
                    >
                        Settings
                    </Link>
                </nav>
                <Sheet>
                    <SheetTrigger asChild>
                        <Button
                            variant="outline"
                            size="icon"
                            className="shrink-0 md:hidden"
                        >
                            <Menu className="h-5 w-5" />
                            <span className="sr-only">Toggle navigation menu</span>
                        </Button>
                    </SheetTrigger>
                    <SheetContent side="left">
                        <nav className="grid gap-6 text-lg font-medium">
                            <Link
                                href="/home"
                                className="flex items-center gap-2 text-lg font-semibold md:text-base"
                            >
                                <Image
                                    src="/cozycoop.png"
                                    alt="User Avatar"
                                    width={150}
                                    height={150}

                                />
                            </Link>
                            <Link
                                href="#"
                                className="text-muted-foreground hover:text-foreground"
                            >
                                Dashboard
                            </Link>
                            <Link
                                href="#"
                                className="text-muted-foreground hover:text-foreground"
                            >
                                Orders
                            </Link>
                            <Link
                                href="#"
                                className="text-muted-foreground hover:text-foreground"
                            >
                                Products
                            </Link>
                            <Link
                                href="#"
                                className="text-muted-foreground hover:text-foreground"
                            >
                                Customers
                            </Link>
                            <Link href="#" className="hover:text-foreground">
                                Settings
                            </Link>
                        </nav>
                    </SheetContent>
                </Sheet>
                <div className="flex w-full items-center gap-4 md:ml-auto md:gap-2 lg:gap-4">
                    <form className="ml-auto flex-1 sm:flex-initial">
                        <div className="relative">
                            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                            <Input
                                type="search"
                                placeholder="Search products..."
                                className="pl-8 sm:w-[300px] md:w-[200px] lg:w-[300px]"
                            />
                        </div>
                    </form>
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="secondary" size="icon" className="rounded-full">
                                {
                                    userDetails?.userAvatar ? <Image
                                        src={userDetails?.userAvatar}
                                        alt="User Avatar"
                                        width={600}
                                        height={600}
                                        className="h-9 w-9 rounded-full" /> : <CircleUser className="h-9 w-9" />
                                }
                                <span className="sr-only">Toggle user menu</span>
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DropdownMenuLabel>My Account</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem>Settings</DropdownMenuItem>
                            <DropdownMenuItem>Support</DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem>Logout</DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </header>
        </div>
    )
}

export default NavBar