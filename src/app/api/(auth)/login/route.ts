import dbConnect from "@/lib/dbConnect";
import UserModel from "@/models/User.model";
import bcrypt from 'bcryptjs';
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

interface User {
    _id: string;
    name: string;
    username: string;
    email: string;
    userAvatar?: string;
}

const generateAccessTokenAndRefreshToken = async (user: User): Promise<{ success: boolean; accessToken?: string; refreshToken?: string; status: number; message?: string }> => {
    try {
        const refreshToken: string = jwt.sign(
            { _id: user._id, username: user.username, email: user.email },
            process.env.REFRESH_TOKEN_SECRET!,
            { expiresIn: process.env.REFRESH_TOKEN_LIFE }
        );

        const accessToken: string = jwt.sign(
            { _id: user._id, username: user.username, name: user.name, email: user.email, userAvatar: user.userAvatar },
            process.env.ACCESS_TOKEN_SECRET!,
            { expiresIn: process.env.ACCESS_TOKEN_LIFE }
        );

        return {
            success: true,
            accessToken,
            refreshToken,
            status: 200
        };

    } catch (error) {
        console.error('Error generating access token:', error);
        return {
            success: false,
            message: 'Internal server error',
            status: 500
        };
    }
};

export async function POST(request: Request) {
    await dbConnect();
    try {
        const {identifier, password} = await request.json();
        if (!identifier || !password) {
            return NextResponse.json({
                success: false,
                message: "All fields are required"
            }, {
                status: 400
            });
        }

        
        const user = await UserModel.findOne({
           
                    $or: [
                        { username: identifier },
                        { email: identifier }
                    ]
        });

        if(!user) {
            return NextResponse.json({
                success: false,
                message: "User not found"
            }, {
                status: 404
            });
        }

        if(!user.isVerified) {
            return NextResponse.json({
                success: false,
                message: "User not verified please verify your email or sign up again"
            }, {
                status: 401
            });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if(!isPasswordValid) {
            return NextResponse.json({
                success: false,
                message: "Invalid password"
            }, {
                status: 401
            });
        }

        const userDetails: User = {
            _id: user._id as string,
            name: user.name,
            username: user.username,
            email: user.email,
            userAvatar: user.userAvatar
        }


        const { accessToken, refreshToken } = await generateAccessTokenAndRefreshToken(user as User);
        if(!accessToken || !refreshToken) {
            return NextResponse.json({
                success: false,
                message: "Error generating access token"
            }, {
                status: 500
            });
        }

        user.refreshToken = refreshToken;
        await user.save();

        cookies().set({
            name: "refreshToken",
            value: refreshToken,
            httpOnly: true
        })

        cookies().set({
            name: "accessToken",
            value: accessToken,
            httpOnly: true
        })


        return NextResponse.json({
            success: true,
            message: "User logged in successfully"
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
