import mongoose, {Schema} from "mongoose"
import bcrypt from "bcryptjs"

export interface IUser{
    _id?:mongoose.Types.ObjectId;
    email:string;
    password:string;
    createdAt?: Date;
    updatedAt?: Date;
    isValidPassword(password:string):Promise<boolean>;
}

const userSchema = new Schema<IUser>({
    email:{type:String, unique:true, required:true},
    password:{type:String, required:true}
},{timestamps:true})

userSchema.pre('save',async function(next){
    try {
        if(!this.isModified("password")) return next();
        this.password = await bcrypt.hash(this.password,10);
        next();
    } catch (error:any) {
        console.error("Error occurred while hashing the password:", error);
        next(error as Error);
    }
})

userSchema.methods.isValidPassword = async function(this:IUser, password:string):Promise<boolean>{
    try {
        if(!this.password) {
            console.warn('user dont have any password');
            return false;
        }
        return await bcrypt.compare(password,this.password);
    } catch (error) {
        console.error('error while comparing passwords: ',error);
        return false;
    }
}

const User = mongoose.models?.User || mongoose.model<IUser>('User',userSchema) ;

export default User;