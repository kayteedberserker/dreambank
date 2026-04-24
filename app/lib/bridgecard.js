
const SECRET_KEY = process.env.BRIDGECARD_SECRET_KEY;
const BASE_URL = process.env.BRIDGECARD_BASE_URL;

export async function registerCardholder(firstName, lastName, email, phone, bvn) {
    const response = await fetch(`${BASE_URL}/cardholder/register_cardholder_synchronously`, {
        method: 'POST',
        headers: {
            'token': `Bearer ${SECRET_KEY}`,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            first_name: firstName,
            last_name: lastName,
            email: email,
            phone: phone,
            address: {
                address: "123 Oreblogda Way",
                city: "Osogbo",
                state: "Osun",
                country: "Nigeria",
                postal_code: "100001",
                house_no: "7"
            },
            identity: {
                id_type: "NIGERIAN_BVN_VERIFICATION",
                bvn: bvn, // Use "22222222222" for sandbox testing
                selfie_image: "https://oreblogda.com/test-avatar.jpg"
            }
        }),
    });

    return await response.json();
}


// src/app/lib/bridgecard.js (continued)

export async function issueNairaCard(cardholderId) {
  const url = `${BASE_URL}/naira_cards/create_card`;
  
  const payload = {
    cardholder_id: cardholderId,
    card_type: "virtual", // You can change to 'physical' in Live mode
    card_brand: "mastercard",
    currency: "NGN"
  };

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'token': `Bearer ${SECRET_KEY}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(payload)
  });

  return await response.json();
}