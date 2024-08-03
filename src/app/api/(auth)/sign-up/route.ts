import dbConnect from "@/lib/dbConnect";
import UserModel from "@/models/User.model";
import bcrypt from 'bcryptjs';
import { NextResponse } from "next/server";
import { put } from '@vercel/blob';
import { mailOptions, transporter } from "@/config/nodemailer";
import { verifyAccountSyntax } from "../../../../../emails/verifyAccount";
import { verificationCodeGenerator } from "@/helpers/verificationCodeGenerator";

export async function POST(request: Request) {
    await dbConnect();
    try {
        const formData = await request.formData();
        const username = formData.get('username');
        const name = formData.get('name');
        const email = formData.get('email');
        const password = formData.get('password');
        const userAvatar: File | null = formData.get('avatar') as File | null;

        // console.log(username, name, email, password, userAvatar);

        if (!username || !name || !email || !password) {
            return NextResponse.json({
                success: false,
                message: "All fields are required"
            }, {
                status: 400
            });
        }

        const existingUserByUsername = await UserModel.findOne({ username });

        if (existingUserByUsername) {
            console.log(existingUserByUsername);
            if(existingUserByUsername.isVerified) {
                return NextResponse.json({
                    success: false,
                    message: "Username already taken"
                });
            }
        }

        const existingUserByEmail = await UserModel.findOne({ email });

        if (existingUserByEmail) {
            if(existingUserByEmail.isVerified) {
                return NextResponse.json({
                    success: false,
                    message: "Email already taken"
                });
            }
        }

        if (typeof password === 'string' && password.length < 8) {
            return NextResponse.json({
                success: false,
                message: 'Password must be at least 8 characters'
            });
        }

        const passwordString = password.toString();
        const hashedPassword = await bcrypt.hash(passwordString, 10);

        const verificationCode:string = verificationCodeGenerator();

        const sendVerificationEmail = await transporter.sendMail({
            ...mailOptions(email.toString()),            
            subject: "Test email",
            text: "This is a test email",
            html: verifyAccountSyntax({ name: name.toString(), verificationCode: verificationCode}),
        });

        if(!sendVerificationEmail) {
            return NextResponse.json({
                success: false,
                message: "Error sending email"
            });
        }        

        let blob;
        if(userAvatar){
            blob = await put(userAvatar.name, userAvatar,{
                access: 'public',
            });
        }

        const expiryDate = new Date();
        expiryDate.setHours(expiryDate.getHours() + 1);

        const user = new UserModel({
            username,
            name,
            email,
            password: hashedPassword,
            userAvatar : blob ? blob.url : null,
            verificationCode,
            verificationCodeExpires: expiryDate,
        });

        await user.save();

        const createdUser = await UserModel.findOne({ username }).select('-password');

        if (!createdUser) {
            return NextResponse.json({
                success: false,
                message: "Error registering user"
            }, { status: 500 });
        }

        return NextResponse.json({
            success: true,
            message: "User registered successfully",
            user: createdUser
        }, { status: 200 });

    } catch (error) {
        console.log(error);
        return NextResponse.json({
            success: false,
            message: "Error registering user"
        }, { status: 500 });
    }
}
