import { NextResponse } from 'next/server';
import { registerCardholder, issueNairaCard } from '@/app/lib/bridgecard';

export async function GET() {
    try {
        // 1. Create the person (Using a fresh email and the sandbox BVN)
        const regResult = await registerCardholder(
            "Kaytee", 
            "D System", 
            `kaytee_${Date.now()}@oreblogda.com`, // Dynamic email to avoid "User Exists" error
            "08062255406", 
            "22222222222" // Official Sandbox BVN
        );

        if (regResult.status !== "success") {
            return NextResponse.json({ error: "Registration failed", details: regResult }, { status: 400 });
        }
        
        const cardholderId = regResult.data.cardholder_id;

        // 2. Give them acard
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