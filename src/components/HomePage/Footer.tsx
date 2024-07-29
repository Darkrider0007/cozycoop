import React from 'react'

function Footer() {
    return (
        <footer className=" bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-gray-900 via-gray-800 to-gray-900">
            <div className="flex justify-center items-center h-full">
                <p className="text-gray-400">© {new Date().getFullYear()} Cozy Coop. All rights reserved.</p>
            </div>
        </footer>
    )
}

export default Footer