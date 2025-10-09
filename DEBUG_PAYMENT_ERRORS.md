# Debugging Payment Errors - Complete Guide

## Current Issue
**Error Message:** "Failed to initiate payment. Please try again."

This guide will help you identify and fix the root cause.

---

## Step 1: Check Browser Console (MOST IMPORTANT)

### How to Open Browser Console
1. **Chrome/Edge:** Press `F12` or `Ctrl + Shift + I`
2. **Firefox:** Press `F12` or `Ctrl + Shift + K`
3. Click on the **Console** tab

### What to Look For
When you click "Pay Now", you should see console logs like:

```
Creating order... {amount: 9999, currency: "INR", eventId: "...", ...}
Response status: 200
Order data received: {id: "order_xxx", currency: "INR", amount: 999900}
```

### Common Error Messages

#### Error 1: Authentication Failed
```
Error creating Razorpay order: Error: Authentication failed
```
**Cause:** Invalid or placeholder Razorpay keys  
**Fix:** Add your real Razorpay keys to `.env.local`

#### Error 2: Network Error
```
Failed to fetch
```
**Cause:** API route not running or network issue  
**Fix:** Ensure dev server is running (`npm run dev`)

#### Error 3: 500 Internal Server Error
```
Response status: 500
Error creating Razorpay order: ...
```
**Cause:** Backend error (likely missing/invalid keys)  
**Fix:** Check terminal logs for detailed error

---

## Step 2: Check Your .env.local File

### Current State (NEEDS FIXING)
```bash
RAZORPAY_KEY_ID=your_razorpay_key_id_here
RAZORPAY_KEY_SECRET=your_razorpay_key_secret_here
NEXT_PUBLIC_RAZORPAY_KEY_ID=your_razorpay_key_id_here
```

### How to Fix

1. **Go to Razorpay Dashboard**
   - Visit: https://dashboard.razorpay.com/app/keys
   - Login to your Razorpay account

2. **Get Your API Keys**
   - **Test Mode:** Keys start with `rzp_test_`
   - **Live Mode:** Keys start with `rzp_live_`
   
   For development, use **Test Mode** keys.

3. **Copy Your Keys**
   - **Key ID:** Something like `rzp_test_1234567890ABCD`
   - **Key Secret:** Something like `1234567890abcdefghijklmnop`

4. **Update .env.local**
   ```bash
   # Replace with YOUR actual keys
   RAZORPAY_KEY_ID=rzp_test_YOUR_ACTUAL_KEY_ID
   RAZORPAY_KEY_SECRET=YOUR_ACTUAL_KEY_SECRET
   NEXT_PUBLIC_RAZORPAY_KEY_ID=rzp_test_YOUR_ACTUAL_KEY_ID
   ```

5. **Restart Dev Server**
   - Stop: Press `Ctrl + C` in terminal
   - Start: Run `npm run dev`

---

## Step 3: Check Terminal/Server Logs

### How to Check
Look at the terminal where `npm run dev` is running.

### What to Look For

#### Success Case
```
✓ Compiled in 200ms
○ GET /api/create-order 200 in 150ms
```

#### Error Case
```
✗ Error in /api/create-order
Error: Authentication failed
  at Razorpay.orders.create
```

**Fix:** This confirms invalid Razorpay keys. Update `.env.local` with real keys.

---

## Step 4: Test Payment Flow

### After Adding Real Keys

1. **Restart Server**
   ```powershell
   # Stop server (Ctrl+C)
   npm run dev
   ```

2. **Register for an Event**
   - Go to Events page
   - Click on any event
   - Click "Register Now"
   - Fill out the form
   - Click "Pay Now"

3. **Check Console**
   - Should see successful order creation
   - Razorpay modal should open

4. **Use Test Card**
   - **Card Number:** `4111 1111 1111 1111`
   - **Expiry:** Any future date (e.g., 12/30)
   - **CVV:** Any 3 digits (e.g., 123)
   - **Name:** Any name

5. **Complete Payment**
   - Click "Pay" in Razorpay modal
   - Should see success message
   - Check browser console for verification logs

---

## Step 5: Verify API Routes

### Test create-order Endpoint

Open a new terminal and run:
```powershell
curl -X POST http://localhost:3000/api/create-order `
  -H "Content-Type: application/json" `
  -d '{\"amount\":1000,\"currency\":\"INR\",\"eventId\":\"test\",\"ticketId\":\"test\",\"quantity\":1,\"customerInfo\":{\"name\":\"Test\",\"email\":\"test@test.com\",\"phone\":\"1234567890\"}}'
```

#### Expected Response (Success)
```json
{
  "id": "order_xxx",
  "currency": "INR",
  "amount": 100000
}
```

#### Error Response
```json
{
  "error": "Failed to create order",
  "details": "Authentication failed"
}
```

**Fix:** Update Razorpay keys in `.env.local`

---

## Common Issues & Solutions

### Issue 1: "Failed to initiate payment"
**Symptoms:** Error toast immediately after clicking "Pay Now"  
**Console Shows:** Error creating order, 500 status  
**Solution:** Add real Razorpay keys to `.env.local` and restart server

### Issue 2: Razorpay modal doesn't open
**Symptoms:** Nothing happens after clicking "Pay Now"  
**Console Shows:** Order created but Razorpay script not loaded  
**Solution:** Check internet connection, ensure Razorpay SDK is loaded

### Issue 3: Payment succeeds but verification fails
**Symptoms:** Payment completed but "Payment verification failed" toast  
**Console Shows:** Signature mismatch error  
**Solution:** Ensure `RAZORPAY_KEY_SECRET` in `.env.local` matches the key used

### Issue 4: "Key/Secret invalid"
**Symptoms:** Authentication error in console  
**Console Shows:** Authentication failed  
**Solution:** 
- Verify keys are copied correctly (no extra spaces)
- Check you're using test keys in test mode
- Ensure keys are from the same Razorpay account

---

## Quick Diagnostic Checklist

Run through this checklist:

- [ ] `.env.local` exists in root directory
- [ ] `.env.local` has real Razorpay keys (not placeholders)
- [ ] Dev server restarted after adding keys
- [ ] Browser console open (F12)
- [ ] No errors in browser console
- [ ] No errors in terminal/server logs
- [ ] Internet connection working
- [ ] Razorpay account is active

---

## Testing with Real Keys

### Test Mode vs Live Mode

**Test Mode** (Use for development)
- Keys start with `rzp_test_`
- Use test cards (4111 1111 1111 1111)
- No real money charged
- For testing integration

**Live Mode** (Use for production)
- Keys start with `rzp_live_`
- Real cards and real money
- After Razorpay account activation
- For actual customers

### Recommended Flow
1. ✅ **Development:** Use Test Mode keys
2. ✅ **Testing:** Test with test cards
3. ✅ **Staging:** Test with Test Mode on staging server
4. ✅ **Production:** Switch to Live Mode keys after activation

---

## Getting Help

### If Still Not Working

1. **Check Console Logs**
   - Copy full error message from browser console
   - Copy server error from terminal

2. **Check .env.local**
   - Verify keys are correct format
   - Ensure no typos or extra spaces

3. **Email Support**
   - Send error logs to: hello@matrixo.in
   - Include:
     - Browser console screenshot
     - Terminal error logs
     - Steps to reproduce
     - Razorpay account status (test/live)

---

## Next Steps After Fixing

Once payment works:

1. ✅ **Test complete flow** - Registration → Payment → Verification
2. ✅ **Test with different amounts** - Ensure GST calculation works
3. ✅ **Test failed payments** - Click "Cancel" in Razorpay modal
4. ✅ **Setup database** - Save booking details (code examples in docs)
5. ✅ **Setup email notifications** - Send confirmation emails
6. ✅ **Deploy to production** - Use Vercel/Netlify
7. ✅ **Switch to Live Mode** - After Razorpay activation

---

**Last Updated:** October 9, 2025  
**Document Version:** 1.0
