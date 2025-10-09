# Razorpay Integration Guide for matriXO

## ✅ What's Been Implemented

### 1. **Direct Checkout Flow (No Cart)**
- Removed "Add to Cart" functionality
- When user clicks "Register Now", they go directly to checkout modal
- Collects: Name, Email, Phone Number
- Shows order summary with GST calculation (18%)
- Proceeds directly to Razorpay payment

### 2. **Razorpay Payment Gateway**
- Frontend: `components/events/RazorpayCheckout.tsx`
- Backend API Routes:
  - `/api/create-order` - Creates Razorpay order
  - `/api/verify-payment` - Verifies payment signature

### 3. **Dark Mode Toggle**
- Techy animated toggle in Navbar (Sun/Moon icon)
- Persists user preference in localStorage
- Smooth rotation animation on toggle

### 4. **Logo Fix**
- Logos copied to `/public/logos/` folder
- Updated Navbar and Footer to use correct paths

## 🔧 Setup Instructions

### Step 1: Get Razorpay Credentials

1. Go to https://dashboard.razorpay.com/
2. Sign up or log in
3. Navigate to **Settings** → **API Keys**
4. Click **Generate Test Keys** or **Generate Live Keys**
5. You'll get:
   - **Key ID** (starts with `rzp_test_` or `rzp_live_`)
   - **Key Secret** (keep this private!)

### Step 2: Configure Environment Variables

Edit `.env.local` file in your project root:

```env
# Replace with your actual Razorpay keys
RAZORPAY_KEY_ID=rzp_test_your_key_id_here
RAZORPAY_KEY_SECRET=your_secret_key_here

# This is exposed to frontend (same as RAZORPAY_KEY_ID)
NEXT_PUBLIC_RAZORPAY_KEY_ID=rzp_test_your_key_id_here
```

⚠️ **IMPORTANT**: 
- Never commit `.env.local` to Git (it's already in `.gitignore`)
- Use **Test Keys** for development
- Use **Live Keys** only in production

### Step 3: Test the Integration

1. Start the development server:
   ```bash
   npm run dev
   ```

2. Go to http://localhost:3000/events

3. Click on any event

4. Click "Register Now" on a ticket

5. Fill in the form:
   - Name
   - Email
   - Phone Number

6. Click "Pay ₹XXX - Proceed to Razorpay"

7. Razorpay modal will open with test payment options

8. Use Razorpay test cards:
   - **Success**: `4111 1111 1111 1111`
   - **Failure**: `4000 0000 0000 0002`
   - CVV: Any 3 digits
   - Expiry: Any future date

### Step 4: Database Integration (Next Steps)

Currently, payment verification returns success but doesn't save to database. You need to:

#### Option A: Using MongoDB

1. Install Mongoose:
   ```bash
   npm install mongoose
   ```

2. Create a Booking model:
   ```typescript
   // models/Booking.ts
   import mongoose from 'mongoose'

   const BookingSchema = new mongoose.Schema({
     bookingId: { type: String, required: true, unique: true },
     eventId: { type: String, required: true },
     ticketId: { type: String, required: true },
     quantity: { type: Number, required: true },
     customerName: { type: String, required: true },
     customerEmail: { type: String, required: true },
     customerPhone: { type: String, required: true },
     razorpayPaymentId: { type: String, required: true },
     razorpayOrderId: { type: String, required: true },
     amount: { type: Number, required: true },
     status: { type: String, default: 'confirmed' },
     createdAt: { type: Date, default: Date.now },
   })

   export default mongoose.models.Booking || mongoose.model('Booking', BookingSchema)
   ```

3. Update `/api/verify-payment/route.ts`:
   ```typescript
   import Booking from '@/models/Booking'
   import dbConnect from '@/lib/dbConnect'

   // Inside the POST function after signature verification:
   await dbConnect()
   
   const booking = await Booking.create({
     bookingId,
     eventId,
     ticketId,
     quantity,
     customerName: customerInfo.name,
     customerEmail: customerInfo.email,
     customerPhone: customerInfo.phone,
     razorpayPaymentId,
     razorpayOrderId,
     amount: body.amount,
     status: 'confirmed'
   })
   ```

#### Option B: Using PostgreSQL/MySQL

1. Install Prisma:
   ```bash
   npm install @prisma/client
   npm install -D prisma
   npx prisma init
   ```

2. Define schema in `prisma/schema.prisma`

3. Run migrations and generate client

### Step 5: Email Notifications

To send booking confirmations via email:

1. Install Nodemailer:
   ```bash
   npm install nodemailer
   npm install -D @types/nodemailer
   ```

2. Create email service:
   ```typescript
   // lib/email.ts
   import nodemailer from 'nodemailer'

   const transporter = nodemailer.createTransport({
     host: process.env.SMTP_HOST,
     port: parseInt(process.env.SMTP_PORT || '587'),
     secure: false,
     auth: {
       user: process.env.SMTP_USER,
       pass: process.env.SMTP_PASSWORD,
     },
   })

   export async function sendBookingConfirmation(
     email: string,
     booking: any
   ) {
     await transporter.sendMail({
       from: '"matriXO" <noreply@matrixo.in>',
       to: email,
       subject: 'Registration Confirmed - ' + booking.eventTitle,
       html: `
         <h1>Registration Confirmed!</h1>
         <p>Booking ID: ${booking.bookingId}</p>
         <p>Event: ${booking.eventTitle}</p>
         <p>Tickets: ${booking.quantity} x ${booking.ticketName}</p>
         <p>Total: ₹${booking.amount}</p>
       `,
     })
   }
   ```

3. Add to `.env.local`:
   ```env
   SMTP_HOST=smtp.gmail.com
   SMTP_PORT=587
   SMTP_USER=your-email@gmail.com
   SMTP_PASSWORD=your-app-password
   ```

### Step 6: QR Code Generation (Optional)

For entry passes with QR codes:

```bash
npm install qrcode
npm install -D @types/qrcode
```

```typescript
import QRCode from 'qrcode'

const qrCodeDataURL = await QRCode.toDataURL(bookingId)
// Include in email or download link
```

## 🎨 UI/UX Features

### ✅ Implemented

1. **Dark Mode Toggle** 
   - Animated Sun/Moon icon in navbar
   - Persists preference
   - Smooth transitions

2. **Direct Checkout**
   - No cart system
   - Single-page checkout modal
   - Shows order summary with GST

3. **Form Validation**
   - Name, Email, Phone validation
   - Error messages via toast

4. **Payment States**
   - Loading spinner during payment
   - Success/failure messages
   - Razorpay modal integration

5. **Responsive Design**
   - Mobile-friendly checkout
   - Touch-optimized controls

## 📊 Testing Checklist

- [ ] Razorpay Test Mode works
- [ ] Form validation works
- [ ] Payment success flow
- [ ] Payment failure handling
- [ ] Dark mode toggle
- [ ] Logos display correctly
- [ ] Mobile responsive
- [ ] Email notifications (when implemented)
- [ ] Database saves bookings (when implemented)

## 🚀 Going Live

Before deploying to production:

1. **Switch to Live Keys**:
   - Get live keys from Razorpay dashboard
   - Update `.env.local` with live keys
   - Test with small amounts first

2. **Setup Webhooks** (Recommended):
   - Go to Razorpay Dashboard → Webhooks
   - Add webhook URL: `https://yourdomain.com/api/webhook/razorpay`
   - Subscribe to: `payment.authorized`, `payment.failed`
   - Implement `/api/webhook/razorpay/route.ts` to handle async updates

3. **Enable Production Features**:
   - Database connection
   - Email service
   - Error logging (Sentry, LogRocket)
   - Analytics

## 📝 Important Notes

### Security
- ✅ Payment verification on server-side
- ✅ Signature validation implemented
- ✅ Environment variables for secrets
- ❌ Add rate limiting for API routes
- ❌ Add CORS configuration

### User Experience
- Consider adding:
  - Booking history page
  - Download ticket option
  - Email ticket forwarding
  - Calendar integration (.ics file)
  - SMS notifications

### Razorpay Dashboard
- Monitor transactions: https://dashboard.razorpay.com/app/transactions
- Refunds: Can be processed from dashboard
- Settlement: Auto-settlements to your bank account

## 🆘 Troubleshooting

### "Cannot find module 'razorpay'"
```bash
npm install razorpay
```

### "Razorpay is not defined"
- Check if Razorpay script is loaded
- Verify NEXT_PUBLIC_RAZORPAY_KEY_ID is set
- Check browser console for errors

### Payment verification fails
- Check RAZORPAY_KEY_SECRET is correct
- Verify signature generation matches Razorpay docs
- Check server logs for errors

### Logos not showing
- Ensure logos are in `/public/logos/` folder
- Check file names match exactly (case-sensitive)
- Clear Next.js cache: `rm -rf .next && npm run dev`

## 📞 Need More Help?

If you need to implement:
- Database integration
- Email system
- Webhook handling
- Advanced features (refunds, passes, etc.)

Just let me know and I can provide the specific code!

## 🔐 Your Razorpay Details Needed

To complete the integration, please provide:

1. **Razorpay Key ID** (starts with `rzp_test_` or `rzp_live_`)
2. **Razorpay Key Secret** (keep this private!)
3. (Optional) **Webhook Secret** if you want webhook integration

Update these in `.env.local` file.
