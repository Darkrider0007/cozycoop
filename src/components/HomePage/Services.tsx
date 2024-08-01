import { BookUser, PackageCheck, User } from 'lucide-react'
import React from 'react'
import MotionWrap from '../motion-wrap'

function Services() {
    return (
        <div className='py-3 md:py-6 flex flex-col bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 text-gray-100'>
            <h2 className="text-2xl font-bold my-6 text-center">Services</h2>
            <MotionWrap className="mt-6  ">
                <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 p-6 ">
                    <div className="flex flex-col p-3 items-center rounded-lg shadow-xl">
                        <BookUser className="h-20 w-20 text-gray-400" />
                        <h3 className="text-lg font-bold mt-2">Expense Tracking</h3>
                        <p className="text-gray-500 mt-2">Easily track your expenses and get insights into your spending.</p>
                    </div>
                    <div className="flex flex-col p-3 items-center rounded-lg shadow-xl">
                        <PackageCheck className="h-20 w-20 text-gray-400" />
                        <h3 className="text-lg font-bold mt-2">Money Management</h3>
                        <p className="text-gray-500 mt-2">Stay on top of your finances and manage your budget.</p>
                    </div>
                    <div className="flex flex-col p-3 items-center rounded-lg shadow-xl">
                        <User className="h-20 w-20 text-gray-400" />
                        <h3 className="text-lg font-bold mt-2">Admin Panel</h3>
                        <p className="text-gray-500 mt-2">Manage your users, expenses and more from the admin panel.</p>
                    </div>
                </div>
            </MotionWrap>
        </div>
    )
}

export default Services