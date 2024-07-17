import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/User";
import { sendVerificationEmail } from "@/helpers/sendverificationEmail";
import bcrypt from "bcrypt";
export async function POST(request: Request) {
  await dbConnect();
  try {
    const { username, email, password } = await request.json();
    const existingUserVerifiedByUsername = await UserModel.findOne({
      username,
      isVerified: true,
    });
    if (existingUserVerifiedByUsername) {
      return Response.json(
        {
          success: false,
          message: "User name already exists",
        },
        {
          status: 400,
        }
      );
    }
    const existingUserByEmail = await UserModel.findOne({ email });
    const verifyCode = Math.floor(100000 + Math.random() * 900000).toString();
    if (existingUserByEmail) {
      if (existingUserByEmail.isverified) {
        return Response.json(
          {
            success: false,
            message: "user Already Exists With This Email",
          },
          {
            status: 400,
          }
        );
      } else {
        const hashedPassword = await bcrypt.hash(password, 10);
        existingUserByEmail.password = hashedPassword;
        existingUserByEmail.verifyCode = verifyCode;
        existingUserByEmail.verifyCodeExpiry = new Date(Date.now() + 3600000);
        existingUserByEmail.verifyCodeExpiry.setHours(
          existingUserByEmail.verifyCodeExpiry.getHours() + 1
        );
        await existingUserByEmail.save();
      }
    } else {
      const hashedPassword = await bcrypt.hash(password, 10);
      const expiryDate = new Date();
      expiryDate.setHours(expiryDate.getHours() + 1);
      const newUser = new UserModel({
        username,
        email,
        password: hashedPassword,
        verifyCodeExpiry: expiryDate,
        verifyCode,
        isVerified: false,
        isAcceptinfMessage: true,
        Messages: [],
      });
      await newUser.save();
    }

    // send verification mail
    const emailResponse = await sendVerificationEmail(
      email,
      username,
      verifyCode
    );
    if (!emailResponse.success) {
      return Response.json(
        { success: false, message: emailResponse.message },
        { status: 500 }
      );
    }
    return Response.json(
      {
        success: true,
        message:
          "User registered successfully, Please verify your email address",
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error In Register User");
    return Response.json(
      {
        success: false,
        message: "Error In Register User",
      },
      {
        status: 500,
      }
    );
  }
}
