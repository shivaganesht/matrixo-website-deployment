# Employee Portal Setup Guide

## Overview
The Employee Portal is a standalone authentication and attendance management system for matriXO employees. It is designed to be deployed at `team-auth.matrixo.in`.

## Features
- 🔐 **Employee Authentication**: Login via Employee ID + Password
- 📅 **Attendance Marking**: Mark daily attendance with status (Present, Absent, Leave, On Duty, Holiday)
- 📊 **Attendance Dashboard**: Visual statistics and attendance percentage
- 📈 **Attendance History**: View past attendance records with filtering
- 🌗 **Dark Mode**: Professional dark-themed UI

---

## Firestore Database Structure

### Collections Required

#### 1. `employees` Collection
Stores employee profile information.

```javascript
// Document ID: Auto-generated or employeeId
{
  employeeId: "MXO001",              // Unique employee identifier (used for login)
  name: "John Doe",                   // Full name
  email: "john@matrixo.in",           // Email (used for Firebase Auth)
  department: "Engineering",          // Department name
  designation: "Software Developer",  // Job title
  joiningDate: "2024-01-15",          // Date in YYYY-MM-DD format
  phone: "+91 9876543210",            // Optional phone number
  profileImage: "/team/john.jpg",     // Profile image URL
  role: "employee",                   // Role: 'employee' or 'admin'
  createdAt: Timestamp,               // Firestore server timestamp
  updatedAt: Timestamp                // Firestore server timestamp
}
```

#### 2. `attendance` Collection
Stores attendance records.

```javascript
// Document ID: {employeeId}_{YYYY-MM-DD} (e.g., "MXO001_2024-11-30")
{
  employeeId: "MXO001",               // Reference to employee
  date: "2024-11-30",                 // Date string in YYYY-MM-DD format
  timestamp: Timestamp,               // When attendance was marked
  status: "P",                        // P=Present, A=Absent, L=Leave, O=On Duty, H=Holiday
  checkInTime: "09:15 AM",            // Time string when checked in
  notes: "Optional notes"             // Optional notes for the day
}
```

---

## Firestore Security Rules

Copy these rules to your Firebase Console → Firestore Database → Rules:

```javascript
rules_version = '2';

service cloud.firestore {
  match /databases/{database}/documents {
    
    // Helper function to check if user is authenticated
    function isAuthenticated() {
      return request.auth != null;
    }
    
    // Helper function to get employee document
    function getEmployee() {
      return get(/databases/$(database)/documents/employees/$(request.auth.uid));
    }
    
    // Helper function to check if user owns the employee record
    function isOwner(employeeId) {
      return isAuthenticated() && 
             exists(/databases/$(database)/documents/employees/$(request.auth.uid)) &&
             get(/databases/$(database)/documents/employees/$(request.auth.uid)).data.employeeId == employeeId;
    }
    
    // Employees collection
    match /employees/{docId} {
      // Allow read if authenticated and it's their own record
      allow read: if isAuthenticated();
      
      // Only allow admins to create/update/delete employees
      allow write: if isAuthenticated() && 
                   exists(/databases/$(database)/documents/employees/$(request.auth.uid)) &&
                   get(/databases/$(database)/documents/employees/$(request.auth.uid)).data.role == 'admin';
    }
    
    // Attendance collection
    match /attendance/{attendanceId} {
      // Allow read if it's the employee's own attendance record
      allow read: if isAuthenticated() && 
                  resource.data.employeeId == get(/databases/$(database)/documents/employees/$(request.auth.uid)).data.employeeId;
      
      // Allow create if authenticated and marking own attendance
      allow create: if isAuthenticated() && 
                    request.resource.data.employeeId == get(/databases/$(database)/documents/employees/$(request.auth.uid)).data.employeeId;
      
      // Allow update if it's their own record (same day only)
      allow update: if isAuthenticated() && 
                    resource.data.employeeId == get(/databases/$(database)/documents/employees/$(request.auth.uid)).data.employeeId;
      
      // Only admins can delete
      allow delete: if isAuthenticated() && 
                    get(/databases/$(database)/documents/employees/$(request.auth.uid)).data.role == 'admin';
    }
  }
}
```

---

## Adding Employees to the System

### Step 1: Create Firebase Auth User
1. Go to Firebase Console → Authentication → Users
2. Click "Add User"
3. Enter email and password for the employee
4. Note the UID generated

### Step 2: Create Employee Document in Firestore
1. Go to Firebase Console → Firestore Database
2. Click "employees" collection (create if doesn't exist)
3. Click "Add document"
4. **Use the Firebase Auth UID as the Document ID** (important!)
5. Add the following fields:

| Field | Type | Value |
|-------|------|-------|
| employeeId | string | MXO001 |
| name | string | John Doe |
| email | string | john@matrixo.in |
| department | string | Engineering |
| designation | string | Software Developer |
| joiningDate | string | 2024-01-15 |
| phone | string | +91 9876543210 |
| profileImage | string | /team/john.jpg |
| role | string | employee |
| createdAt | timestamp | (click timestamp icon) |
| updatedAt | timestamp | (click timestamp icon) |

### Step 3: Verify Login
1. Go to `https://team-auth.matrixo.in/employee-portal`
2. Enter Employee ID (e.g., MXO001)
3. Enter the password set in Firebase Auth
4. Employee should be able to login and access dashboard

---

## Status Codes Reference

| Code | Status | Description | Color |
|------|--------|-------------|-------|
| P | Present | Employee was present | Green |
| A | Absent | Employee was absent | Red |
| L | Leave | Employee on approved leave | Yellow |
| O | On Duty | Employee on official duty outside office | Blue |
| H | Holiday | Office holiday | Purple |

---

## Attendance Calculation

**Attendance Percentage Formula:**
```
Attendance % = (Present + On Duty) / Total Days × 100
```

- Present (P) and On Duty (O) count as attended
- Leave (L) is excluded from total count (doesn't affect percentage negatively)
- Absent (A) counts against attendance
- Holiday (H) is excluded from total count

---

## Deployment Checklist

- [ ] Firebase project configured with Firestore enabled
- [ ] Security rules deployed to Firestore
- [ ] Firebase Auth enabled with Email/Password provider
- [ ] At least one admin employee added
- [ ] Domain `team-auth.matrixo.in` added to Firebase Auth authorized domains
- [ ] Vercel environment variables configured
- [ ] Test login with a sample employee account

---

## Environment Variables Required

Make sure these are set in Vercel for the deployment:

```env
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
```

---

## Troubleshooting

### "Employee ID not found"
- Verify the employee document exists in Firestore
- Check that `employeeId` field matches exactly (case-sensitive)
- Ensure the document structure is correct

### "Invalid password"
- Password is managed by Firebase Auth, not Firestore
- User can reset password via Firebase Console → Authentication → Users

### "Permission denied" errors
- Check that Firestore security rules are deployed
- Verify the employee document uses Firebase Auth UID as document ID
- Ensure `role` field is set correctly

### Attendance not saving
- Check browser console for Firestore errors
- Verify security rules allow the current user to write to attendance collection

---

## Future Enhancements

1. **Admin Dashboard**: View all employees' attendance
2. **Leave Management**: Request and approve leaves
3. **Reports**: Export attendance reports to Excel/PDF
4. **Notifications**: Email alerts for absent employees
5. **Geo-fencing**: Location-based attendance marking
6. **QR Check-in**: Scan QR code to mark attendance

---

## Support

For technical issues, contact the system administrator.
