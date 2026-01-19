import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { firstName, lastName, email, mobile, specialNote } = body;

    // Validate required fields
    if (!firstName || !lastName || !email || !mobile) {
      return NextResponse.json(
        { message: "All fields are required" },
        { status: 400 },
      );
    }

    // Here you can add your email sending logic
    // For example, using nodemailer, SendGrid, or another email service

    // For now, we'll just log the data and return success
    console.log("Contact form submission:", {
      firstName,
      lastName,
      email,
      mobile,
      specialNote,
    });

    // You can also save to a database here

    return NextResponse.json(
      { message: "Thank you for your inquiry. We will contact you soon!" },
      { status: 200 },
    );
  } catch (error) {
    console.error("Contact form error:", error);
    return NextResponse.json(
      { message: "An error occurred. Please try again later." },
      { status: 500 },
    );
  }
}
