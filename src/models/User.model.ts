import mongoose, { Document, Schema } from "mongoose";

export interface User extends Document {
    username: string;
    name: string;
    email: string;
    password: string;
    userAvatar?: string;
    refreshToken?: string;
}

const UserSchema: Schema<User> = new mongoose.Schema({
    username: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    userAvatar: {
        type: String
    },
    refreshToken: {
        type: String
    }
},
    {
        timestamps: true
    }
);

const UserModel = mongoose.models.User as mongoose.Model<User>
    || mongoose.model<User>("User", UserSchema);


export default UserModel;
