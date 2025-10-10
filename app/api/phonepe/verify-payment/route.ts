import { NextResponse } from 'next/server'
import crypto from 'crypto'
import axios from 'axios'

export async function POST(request: Request) {
  try {
    // Check if PhonePe credentials are configured
    if (!process.env.NEXT_PUBLIC_PHONEPE_MERCHANT_ID || !process.env.PHONEPE_SALT_KEY) {
      return NextResponse.json(
        { error: 'Payment system not configured' },
        { status: 503 }
      )
    }

    const body = await request.json()
    const { merchantTransactionId } = body

    if (!merchantTransactionId) {
      return NextResponse.json(
        { error: 'Transaction ID is required' },
        { status: 400 }
      )
    }

    const merchantId = process.env.NEXT_PUBLIC_PHONEPE_MERCHANT_ID
    const saltKey = process.env.PHONEPE_SALT_KEY
    const saltIndex = process.env.PHONEPE_SALT_INDEX || '1'
    const apiEndpoint = process.env.PHONEPE_API_ENDPOINT || 'https://api-preprod.phonepe.com/apis/pg-sandbox'

    // Generate X-VERIFY checksum for status check
    const checksumString = `/pg/v1/status/${merchantId}/${merchantTransactionId}` + saltKey
    const sha256Hash = crypto.createHash('sha256').update(checksumString).digest('hex')
    const xVerify = sha256Hash + '###' + saltIndex

    // Check payment status
    const response = await axios.get(
      `${apiEndpoint}/pg/v1/status/${merchantId}/${merchantTransactionId}`,
      {
        headers: {
          'Content-Type': 'application/json',
          'X-VERIFY': xVerify,
          'X-MERCHANT-ID': merchantId
        }
      }
    )

    if (response.data.success && response.data.code === 'PAYMENT_SUCCESS') {
      return NextResponse.json({
        success: true,
        data: response.data.data,
        message: 'Payment successful'
      })
    } else {
      return NextResponse.json({
        success: false,
        code: response.data.code,
        message: response.data.message || 'Payment verification failed'
      })
    }
  } catch (error: any) {
    console.error('PhonePe payment verification error:', error)
    return NextResponse.json(
      { error: 'Failed to verify payment', details: error.message },
      { status: 500 }
    )
  }
}

// Handle GET request for callback
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const merchantTransactionId = searchParams.get('merchantTransactionId')

    if (!merchantTransactionId) {
      return NextResponse.redirect('/payment/failed')
    }

    // Verify the payment using POST method
    const verifyResponse = await POST(new Request(request.url, {
      method: 'POST',
      body: JSON.stringify({ merchantTransactionId })
    }))

    const data = await verifyResponse.json()

    if (data.success) {
      return NextResponse.redirect(`/payment/success?txnId=${merchantTransactionId}`)
    } else {
      return NextResponse.redirect(`/payment/failed?txnId=${merchantTransactionId}`)
    }
  } catch (error) {
    console.error('PhonePe callback error:', error)
    return NextResponse.redirect('/payment/failed')
  }
}
