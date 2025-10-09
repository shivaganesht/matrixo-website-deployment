import { NextRequest, NextResponse } from 'next/server'
import crypto from 'crypto'

export async function POST(request: NextRequest) {
  try {
    // Check if Razorpay secret is configured
    if (!process.env.RAZORPAY_KEY_SECRET) {
      return NextResponse.json(
        { error: 'Payment system not configured. Please contact support.' },
        { status: 503 }
      )
    }

    const body = await request.json()
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      customerInfo,
      eventId,
      ticketId,
      quantity,
      amount,
    } = body

    // Verify signature (following Razorpay official documentation)
    const sign = razorpay_order_id + '|' + razorpay_payment_id
    const expectedSignature = crypto
      .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
      .update(sign.toString())
      .digest('hex')

    if (razorpay_signature === expectedSignature) {
      // Payment signature verified successfully
      const bookingId = `BKG${Date.now()}`

      // TODO: Save to your database
      // Example structure:
      // const booking = await prisma.booking.create({
      //   data: {
      //     bookingId,
      //     eventId,
      //     ticketId,
      //     quantity: parseInt(quantity),
      //     customerName: customerInfo.name,
      //     customerEmail: customerInfo.email,
      //     customerPhone: customerInfo.phone,
      //     razorpayPaymentId: razorpay_payment_id,
      //     razorpayOrderId: razorpay_order_id,
      //     amount: parseFloat(amount),
      //     status: 'confirmed',
      //     createdAt: new Date(),
      //   }
      // })

      // TODO: Send confirmation email
      // await sendEmail({
      //   to: customerInfo.email,
      //   subject: `Registration Confirmed - ${bookingId}`,
      //   html: `
      //     <h2>Registration Confirmed!</h2>
      //     <p>Hi ${customerInfo.name},</p>
      //     <p>Your booking has been confirmed.</p>
      //     <p><strong>Booking ID:</strong> ${bookingId}</p>
      //     <p><strong>Payment ID:</strong> ${razorpay_payment_id}</p>
      //     <p><strong>Amount Paid:</strong> ₹${amount}</p>
      //   `
      // })

      console.log('Payment verified successfully:', {
        bookingId,
        razorpay_payment_id,
        razorpay_order_id,
        customerEmail: customerInfo.email,
        amount,
      })

      return NextResponse.json({
        success: true,
        bookingId,
        message: 'Payment verified successfully',
        paymentId: razorpay_payment_id,
      })
    } else {
      // Signature mismatch - potential fraud attempt
      console.error('Signature verification failed:', {
        razorpay_order_id,
        razorpay_payment_id,
        expected: expectedSignature,
        received: razorpay_signature,
      })

      return NextResponse.json(
        { success: false, message: 'Invalid payment signature' },
        { status: 400 }
      )
    }
  } catch (error: any) {
    console.error('Error verifying payment:', error)
    return NextResponse.json(
      { success: false, error: 'Payment verification failed', details: error.message },
      { status: 500 }
    )
  }
}
