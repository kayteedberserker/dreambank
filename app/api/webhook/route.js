import { NextResponse } from 'next/server';

export async function POST(req) {
  try {
    const payload = await req.json();
    console.log("💳 Transaction Request:", payload);

    // This data comes from Bridgecard
    const { card_id, amount } = payload.data;

    // --- YOUR LOGIC HERE ---
    // 1. Find user in your DB by card_id
    // 2. Check if their 'Aura Points' >= amount
    
    const isApproved = true; // Set your logic

    if (isApproved) {
      return NextResponse.json({
        status: "success",
        message: "The System says Spend! 🌚"
      }, { status: 200 });
    } else {
      return NextResponse.json({
        status: "fail",
        message: "Insufficient Aura Points"
      }, { status: 400 });
    }

  } catch (error) {
    return NextResponse.json({ error: "System Glitch" }, { status: 500 });
  }
}