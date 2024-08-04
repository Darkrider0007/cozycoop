import dbConnect from "@/lib/dbConnect";
import UserModel from "@/models/User.model";
import { NextResponse } from "next/server";
import { cookies } from 'next/headers';
import jwt, { JwtPayload } from 'jsonwebtoken';

export const revalidate = 0;

export async function GET(request: Request) {
    await dbConnect();   

    try {
        const cookieStore = cookies();
        const accessToken = cookieStore.get("accessToken");

        if (!accessToken) {
            return NextResponse.json({
                success: false,
                message: 'Access token not found'
            }, {
                status: 401
            });
        }

        const verifiedUser = jwt.verify(accessToken.value, process.env.ACCESS_TOKEN_SECRET!) as JwtPayload;

        if (!verifiedUser || typeof verifiedUser === 'string') {
            return NextResponse.json({
                success: false,
                message: 'Invalid access token'
            }, {
                status: 401
            });
        }

        const user = await UserModel.findById(verifiedUser._id)
                           .select('-password -refreshToken -verificationCode -verificationCodeExpires');

        if (!user) {
            return NextResponse.json({
                success: false,
                message: 'User not found'
            }, {
                status: 404
            });
        }

        return NextResponse.json({
            success: true,
            user            
        }, {
            status: 200
        });
    } catch (error) {
        console.error('Error verifying access token:', error);
        return NextResponse.json({
            success: false,
            message: 'Internal server error'
        }, {
            status: 500
        });
    }
}
