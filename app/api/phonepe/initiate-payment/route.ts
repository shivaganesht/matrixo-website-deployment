import { NextResponse } from 'next/server'
import crypto from 'crypto'
import axios from 'axios'

export async function POST(request: Request) {
  try {
    // Check if PhonePe credentials are configured
    if (!process.env.NEXT_PUBLIC_PHONEPE_MERCHANT_ID || !process.env.PHONEPE_SALT_KEY) {
      return NextResponse.json(
        { error: 'Payment system not configured. Please contact support.' },
        { status: 503 }
      )
    }

    const body = await request.json()
    const { amount, merchantTransactionId, merchantUserId, redirectUrl, callbackUrl, mobileNumber } = body

    // Validate required fields
    if (!amount || !merchantTransactionId || !merchantUserId) {
      return NextResponse.json(
        { error: 'Missing required payment parameters' },
        { status: 400 }
      )
    }

    const merchantId = process.env.NEXT_PUBLIC_PHONEPE_MERCHANT_ID
    const saltKey = process.env.PHONEPE_SALT_KEY
    const saltIndex = process.env.PHONEPE_SALT_INDEX || '1'
    const apiEndpoint = process.env.PHONEPE_API_ENDPOINT || 'https://api-preprod.phonepe.com/apis/pg-sandbox'

    // Prepare payment payload
    const paymentPayload = {
      merchantId: merchantId,
      merchantTransactionId: merchantTransactionId,
      merchantUserId: merchantUserId,
      amount: amount * 100, // Convert to paise
      redirectUrl: redirectUrl || `${process.env.NEXT_PUBLIC_PHONEPE_REDIRECT_URL || 'http://localhost:3000/payment/callback'}`,
      redirectMode: 'POST',
      callbackUrl: callbackUrl,
      mobileNumber: mobileNumber,
      paymentInstrument: {
        type: 'PAY_PAGE'
      }
    }

    // Convert payload to base64
    const base64Payload = Buffer.from(JSON.stringify(paymentPayload)).toString('base64')

    // Generate X-VERIFY checksum
    const checksumString = base64Payload + '/pg/v1/pay' + saltKey
    const sha256Hash = crypto.createHash('sha256').update(checksumString).digest('hex')
    const xVerify = sha256Hash + '###' + saltIndex

    // Make API call to PhonePe
    const response = await axios.post(
      `${apiEndpoint}/pg/v1/pay`,
      {
        request: base64Payload
      },
      {
        headers: {
          'Content-Type': 'application/json',
          'X-VERIFY': xVerify
        }
      }
    )

    if (response.data.success) {
      return NextResponse.json({
        success: true,
        data: {
          paymentUrl: response.data.data.instrumentResponse.redirectInfo.url,
          merchantTransactionId: merchantTransactionId
        }
      })
    } else {
      return NextResponse.json(
        { error: 'Failed to initiate payment', details: response.data },
        { status: 400 }
      )
    }
  } catch (error: any) {
    console.error('PhonePe payment initiation error:', error)
    return NextResponse.json(
      { error: 'Failed to initiate payment. Please try again.', details: error.message },
      { status: 500 }
    )
  }
}
