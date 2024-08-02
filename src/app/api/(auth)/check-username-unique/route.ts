import dbConnect from "@/lib/dbConnect";
import UserModel from "@/models/User.model";
import { z } from "zod";
import { usernameValidation } from "@/schemas/signUpSchema";
import { NextResponse } from "next/server";
const usernameQuerySchema = z.object({
    username: usernameValidation,
});

export const revalidate = 0;

export async function GET(request: Request) {
    await dbConnect();

    try {
        const { searchParams } = new URL(request.url);
        const queryParams = {
            username: searchParams.get("username"),
        };
        // Validate with Zod
        const result = usernameQuerySchema.safeParse(queryParams);

        if (!result.success) {
            const usernameErrors = result.error.format().username?._errors || [];
            return NextResponse.json({                
                success: false,
                message: usernameErrors
            })
        }

        const { username } = result.data;

        const existingUserVerifiedByUsername = await UserModel.findOne({
            username
        });

        if (existingUserVerifiedByUsername) {
            return NextResponse.json({
                success: false,
                message: "Username already taken"
            })
        }

        return NextResponse.json({
            success: true,
            message: "Username available"
        }, {
            status: 200
        })

    } catch (error) {
        console.error(error);
        if (error instanceof z.ZodError) {
            return new Response(JSON.stringify({
                success: false,
                message: error.errors
            }), { status: 400 })
        }
        return new Response(JSON.stringify({
            success: false,
            message: "Error while checking username uniqueness"
        }), { status: 500 })
    }
}