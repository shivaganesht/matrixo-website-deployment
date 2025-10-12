import { NextResponse } from 'next/server'
import { Resend } from 'resend'

// Force dynamic rendering
export const dynamic = 'force-dynamic'

export async function POST(request: Request) {
  try {
    // Check if Resend API key is configured
    if (!process.env.RESEND_API_KEY) {
      return NextResponse.json(
        { error: 'Registration service not configured. Please contact us at off.matrixo@gmail.com' },
        { status: 503 }
      )
    }

    const resend = new Resend(process.env.RESEND_API_KEY)
    
    const body = await request.json()
    const {
      fullName,
      contactNumber,
      email,
      studentId,
      collegeName,
      department,
      year,
      emergencyContact,
      address,
      wantCertificate,
      wantTransport,
      hearAboutEvent,
      eventId,
      eventTitle,
      eventDate,
      ticketType
    } = body

    // Validate required fields
    if (!fullName || !email || !contactNumber || !studentId || !collegeName || !department || !year) {
      return NextResponse.json(
        { error: 'Please fill in all required fields' },
        { status: 400 }
      )
    }

    // Send confirmation email to attendee
    await resend.emails.send({
      from: process.env.RESEND_FROM_EMAIL || 'matriXO Events <onboarding@resend.dev>',
      to: [email],
      subject: `Registration Confirmed: ${eventTitle}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <div style="background: linear-gradient(135deg, #3b82f6 0%, #9333ea 100%); padding: 30px; border-radius: 10px 10px 0 0; text-align: center;">
            <h1 style="color: white; margin: 0; font-size: 28px;">Registration Confirmed!</h1>
          </div>
          
          <div style="background-color: #f9fafb; padding: 30px; border-radius: 0 0 10px 10px;">
            <p style="font-size: 18px; color: #111827; margin-bottom: 20px;">Hi ${fullName},</p>
            <p style="color: #374151; line-height: 1.6;">
              Thank you for registering for <strong>${eventTitle}</strong>! We're excited to have you join us.
            </p>
            
            <div style="background-color: white; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #3b82f6;">
              <h2 style="color: #1f2937; margin-top: 0;">Event Details</h2>
              <p style="color: #4b5563; margin: 5px 0;"><strong>Event:</strong> ${eventTitle}</p>
              <p style="color: #4b5563; margin: 5px 0;"><strong>Date:</strong> ${new Date(eventDate).toLocaleDateString('en-IN', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
              <p style="color: #4b5563; margin: 5px 0;"><strong>Ticket Type:</strong> ${ticketType}</p>
            </div>

            <div style="background-color: white; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <h2 style="color: #1f2937; margin-top: 0;">Your Registration Details</h2>
              <p style="color: #4b5563; margin: 5px 0;"><strong>Name:</strong> ${fullName}</p>
              <p style="color: #4b5563; margin: 5px 0;"><strong>Email:</strong> ${email}</p>
              <p style="color: #4b5563; margin: 5px 0;"><strong>Contact:</strong> ${contactNumber}</p>
              <p style="color: #4b5563; margin: 5px 0;"><strong>Student ID:</strong> ${studentId}</p>
              <p style="color: #4b5563; margin: 5px 0;"><strong>College:</strong> ${collegeName}</p>
              <p style="color: #4b5563; margin: 5px 0;"><strong>Department:</strong> ${department}</p>
              <p style="color: #4b5563; margin: 5px 0;"><strong>Year:</strong> ${year}</p>
              ${wantCertificate === 'yes' ? '<p style="color: #4b5563; margin: 5px 0;">✅ Certificate requested (₹50)</p>' : ''}
              ${wantTransport === 'yes' ? '<p style="color: #4b5563; margin: 5px 0;">🚌 Transport requested</p>' : ''}
            </div>

            <div style="background-color: #fef3c7; padding: 15px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #f59e0b;">
              <p style="color: #92400e; margin: 0;"><strong>📌 Important:</strong> Please save this email for your records. You may need to present it at the event venue.</p>
            </div>

            <p style="color: #374151; line-height: 1.6;">
              If you have any questions, feel free to reach out to us at <a href="mailto:off.matrixo@gmail.com" style="color: #3b82f6;">off.matrixo@gmail.com</a>
            </p>

            <p style="color: #6b7280; font-size: 14px; margin-top: 30px; padding-top: 20px; border-top: 1px solid #e5e7eb;">
              Organized by: <strong>Smartzy Education</strong><br>
              Ticketing Partner: <strong>matriXO</strong><br>
              Contact: Yasasvi Mandapati
            </p>
          </div>
        </div>
      `,
    })

    // Send notification email to organizers
    await resend.emails.send({
      from: process.env.RESEND_FROM_EMAIL || 'matriXO Events <onboarding@resend.dev>',
      to: ['off.matrixo@gmail.com'],
      subject: `New Registration: ${eventTitle}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #3b82f6;">New Event Registration</h2>
          
          <div style="background-color: #f3f4f6; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #374151; margin-top: 0;">Event: ${eventTitle}</h3>
            <p><strong>Ticket Type:</strong> ${ticketType}</p>
            <p><strong>Registration Date:</strong> ${new Date().toLocaleString('en-IN')}</p>
          </div>

          <div style="background-color: #ffffff; padding: 20px; border: 1px solid #e5e7eb; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #374151; margin-top: 0;">Attendee Information</h3>
            <table style="width: 100%; border-collapse: collapse;">
              <tr><td style="padding: 8px 0; border-bottom: 1px solid #e5e7eb;"><strong>Full Name:</strong></td><td style="padding: 8px 0; border-bottom: 1px solid #e5e7eb;">${fullName}</td></tr>
              <tr><td style="padding: 8px 0; border-bottom: 1px solid #e5e7eb;"><strong>Email:</strong></td><td style="padding: 8px 0; border-bottom: 1px solid #e5e7eb;">${email}</td></tr>
              <tr><td style="padding: 8px 0; border-bottom: 1px solid #e5e7eb;"><strong>Contact:</strong></td><td style="padding: 8px 0; border-bottom: 1px solid #e5e7eb;">${contactNumber}</td></tr>
              <tr><td style="padding: 8px 0; border-bottom: 1px solid #e5e7eb;"><strong>Emergency Contact:</strong></td><td style="padding: 8px 0; border-bottom: 1px solid #e5e7eb;">${emergencyContact}</td></tr>
              <tr><td style="padding: 8px 0; border-bottom: 1px solid #e5e7eb;"><strong>Address:</strong></td><td style="padding: 8px 0; border-bottom: 1px solid #e5e7eb;">${address}</td></tr>
              <tr><td style="padding: 8px 0; border-bottom: 1px solid #e5e7eb;"><strong>Student ID:</strong></td><td style="padding: 8px 0; border-bottom: 1px solid #e5e7eb;">${studentId}</td></tr>
              <tr><td style="padding: 8px 0; border-bottom: 1px solid #e5e7eb;"><strong>College:</strong></td><td style="padding: 8px 0; border-bottom: 1px solid #e5e7eb;">${collegeName}</td></tr>
              <tr><td style="padding: 8px 0; border-bottom: 1px solid #e5e7eb;"><strong>Department:</strong></td><td style="padding: 8px 0; border-bottom: 1px solid #e5e7eb;">${department}</td></tr>
              <tr><td style="padding: 8px 0; border-bottom: 1px solid #e5e7eb;"><strong>Year:</strong></td><td style="padding: 8px 0; border-bottom: 1px solid #e5e7eb;">${year}</td></tr>
              <tr><td style="padding: 8px 0; border-bottom: 1px solid #e5e7eb;"><strong>Certificate:</strong></td><td style="padding: 8px 0; border-bottom: 1px solid #e5e7eb;">${wantCertificate === 'yes' ? 'Yes (₹50)' : 'No'}</td></tr>
              <tr><td style="padding: 8px 0; border-bottom: 1px solid #e5e7eb;"><strong>Transport:</strong></td><td style="padding: 8px 0; border-bottom: 1px solid #e5e7eb;">${wantTransport === 'yes' ? 'Yes' : 'No'}</td></tr>
              <tr><td style="padding: 8px 0;"><strong>Source:</strong></td><td style="padding: 8px 0;">${hearAboutEvent}</td></tr>
            </table>
          </div>

          <p style="color: #6b7280; font-size: 12px; margin-top: 20px;">
            This is an automated notification from the matriXO event registration system.
          </p>
        </div>
      `,
      replyTo: email,
    })

    return NextResponse.json({ 
      success: true, 
      message: 'Registration successful! Check your email for confirmation.' 
    })
  } catch (error) {
    console.error('Registration error:', error)
    return NextResponse.json(
      { error: 'Failed to process registration. Please try again later.' },
      { status: 500 }
    )
  }
}
