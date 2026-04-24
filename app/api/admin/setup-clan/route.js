import { NextResponse } from 'next/server';
import { createClanMember, issueNairaCard } from '@/app/lib/bridgecard';

export async function GET() {
  try {
    // 1. Create the person
    const cardholderId = await createClanMember("System", "Member", "member@oreblogda.com", "08012345678");

    // 2. Give them a card
    const cardDetails = await issueNairaCard(cardholderId)

    return NextResponse.json({
      message: "Card Issued Successfully! 💳",
      card: cardDetails
    });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}