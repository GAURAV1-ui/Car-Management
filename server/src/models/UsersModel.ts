import mongoose,{Document, Schema } from "mongoose";

export interface IUser extends Document {
    name: string;
    email: string;
    password: string;
}  

const UserSchema = new Schema<IUser>({
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
},{
    timestamps: true,
});

const User = mongoose.model<IUser>('User', UserSchema);
export default User;