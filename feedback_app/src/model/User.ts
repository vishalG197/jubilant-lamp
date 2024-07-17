import mongoose, { Schema, Document } from "mongoose";

export interface Message extends Document {
  content: string;
  createdAt: Date;
}

const MessageSchema: Schema<Message> = new Schema({
  content: { type: String, required: true },
  createdAt: { type: Date, required: true, default: Date.now() },
});


export interface User extends Document {
   username: string;
   email: string;
   password:string;
   verifyCode:string;
   verifyCodeExpiry:Date;
   isverified:boolean;
   isAcceptingMessage:boolean;
   message: Message[];
 }

 const UserSchema: Schema<User> = new Schema({
   username: {
      type:String,
      required:[true,"Username must be provided"],
      unique:true
   },
   email: {
      type:String,
      required:[true,"Email must be provided"],
      unique:true,
      match:[/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/,"please enter a valid email address"]
   },
   password:{
      type:String,
      required:[true,"Password is required"],
   },
   verifyCode:{
      type:String,
      required:[true,"verifyCode is required"],
   },
   verifyCodeExpiry:{
      type:Date,
      required:[true,"verifyCode Expiry is required"],
   },
   isverified:{
      type:Boolean,
      default:false,
   },
   isAcceptingMessage:{
      type:Boolean,
      default:true,
   },
   message: [MessageSchema]
 });

 const UserModel = (mongoose.models.User as mongoose.Model<User>) || mongoose.model<User>("User",UserSchema);

 export default UserModel;