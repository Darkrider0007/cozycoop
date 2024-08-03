import { mailOptions, transporter } from "@/config/nodemailer";
import dbConnect from "@/lib/dbConnect";
import UserModel from "@/models/User.model";
import bcrypt from 'bcryptjs';
import { NextResponse } from "next/server";
import { verifyAccountSyntax } from "../../../../../emails/verifyAccount";

export async function POST(request: Request) {
    await dbConnect();
    try {
        const {identifier: identifier, password} = await request.json();
        if (!identifier || !password) {
            return NextResponse.json({
                success: false,
                message: "All fields are required"
            }, {
                status: 400
            });
        }

        console.log(identifier, password)          

        return NextResponse.json({
            success: true
        }, {
            status: 200        
        })

    } catch (error) {
        console.log(error);
        return NextResponse.json({
            success: false,
            message: "Error registering user"
        }, { status: 500 });
    }
}
