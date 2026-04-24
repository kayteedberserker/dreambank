// src/app/api/admin/setup-clan/route.js
import { NextResponse } from 'next/server';
import { registerCardholder, issueNairaCard } from '@/app/lib/bridgecard';

export async function GET() {
    try {
        // 1. Create the person
        const regResult = await registerCardholder("System", "Member", "member@oreblogda.com", "08012345678", "22222222222");

        if (regResult.status !== "success") {
            return NextResponse.json({ error: "Registration failed", details: regResult }, { status: 400 });
        }
        const cardholderId = regResult.data.cardholder_id;

        // 2. Give them a card
        const cardDetails = await issueNairaCard(cardholderId);

        return NextResponse.json({
            message: "Process Complete! 💳",
            registration: regResult,
            card: cardDetails
        });
    } catch (error) {
        console.error("Route Error:", error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}