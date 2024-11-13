import mongoose,{Document, Schema} from "mongoose";

export interface ICar extends Document {
    userId: mongoose.Types.ObjectId;
    title: string;
    description: string;
    tags: string[];
    images: string[];
}

const CarSchema = new Schema<ICar>({
    userId: { type: Schema.Types.ObjectId, required: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
    tags: { type: [String], required: true },
    images: { type: [String], required: true },
},{
    timestamps: true,
});

const Car = mongoose.model<ICar>('Car', CarSchema);
export default Car;