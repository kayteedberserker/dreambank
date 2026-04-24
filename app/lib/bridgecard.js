import crypto from 'crypto';

const baseUrl = process.env.BRIDGECARD_BASE_URL

function encryptPin(pin, secretKey) {
    // We need a 32-byte key. If yours is shorter/longer, we pad/truncate.
    const key = Buffer.alloc(32, secretKey, 'utf8');
    // Bridgecard typically expects a zero-filled IV for simple PIN encryption
    const iv = Buffer.alloc(16, 0);

    const cipher = crypto.createCipheriv('aes-256-cbc', key, iv);
    let encrypted = cipher.update(pin, 'utf8', 'base64');
    encrypted += cipher.final('base64');
    return encrypted;
}

export async function registerCardholder(firstName, lastName, email, phone, bvn) {
    const SECRET_KEY = process.env.BRIDGECARD_SECRET_KEY

    const response = await fetch(`${baseUrl}/cardholder/register_cardholder_synchronously`, {
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
                bvn: bvn || "22222222222",
                selfie_image: "https://oreblogda.com/test-avatar.jpg"
            }
        }),
    });

    // ✅ FIXED: Move result assignment BEFORE the console log
    const result = await response.json();
    console.log("Full Bridgecard Response:", JSON.stringify(result, null, 2));

    return result;
}

export async function issueNairaCard(cardholderId) {
    const SECRET_KEY = getSecretKey();
    const BASE_URL = getBaseUrl();

    // Using the native encryption function instead of aes-everywhere
    const encryptedPin = encryptPin('1234', SECRET_KEY);

    const response = await fetch(`${baseUrl}/cards/create_card`, {
        method: 'POST',
        headers: {
            'token': `Bearer ${SECRET_KEY}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            cardholder_id: cardholderId,
            card_type: "virtual",
            card_brand: "Mastercard",
            card_currency: "NGN",
            pin: encryptedPin
        })
    });

    const result = await response.json();
    console.log("Issue Card Result:", result);
    return result;
}