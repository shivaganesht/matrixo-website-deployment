# 🚨 UPDATED GOOGLE APPS SCRIPT CODE - NO IMAGE UPLOAD

## Open: https://script.google.com

## Delete everything and paste THIS:

```javascript
function doPost(e) {
  try {
    // Get the active sheet
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    
    // Parse incoming data
    const data = JSON.parse(e.postData.contents);
    
    // Log for debugging
    Logger.log('Received data: ' + JSON.stringify(data));
    
    // Add row to sheet with all fields
    sheet.appendRow([
      data.timestamp || new Date().toISOString(),
      data.eventId || '',
      data.eventTitle || '',
      data.eventDate || '',
      data.ticketType || '',
      data.ticketPrice || '',
      data.fullName || '',
      data.contactNumber || '',
      data.email || '',
      data.studentId || '',
      data.collegeName || '',
      data.department || '',
      data.year || '',
      data.emergencyContact || '',
      data.city || '',
      data.state || '',
      data.transactionId || '',
      data.wantCertificate || '',
      data.wantTransport || '',
      data.hearAboutEvent || '',
      data.status || 'Pending'
    ]);
    
    Logger.log('Row added successfully');
    
    // Return success response
    return ContentService.createTextOutput(JSON.stringify({ 
      success: true,
      message: 'Registration saved successfully'
    })).setMimeType(ContentService.MimeType.JSON);
    
  } catch (error) {
    // Log error
    Logger.log('Error: ' + error.toString());
    
    // Return error response
    return ContentService.createTextOutput(JSON.stringify({ 
      success: false, 
      error: error.toString() 
    })).setMimeType(ContentService.MimeType.JSON);
  }
}
```

## Column Order in Google Sheet:

Make sure your Google Sheet has these columns in this exact order:

1. Timestamp
2. Event ID
3. Event Title
4. Event Date
5. Ticket Type
6. Ticket Price
7. Full Name
8. Contact Number
9. Email
10. Student ID
11. College Name
12. Department
13. Year
14. Emergency Contact
15. City
16. State
17. Transaction ID
18. Want Certificate
19. Want Transport
20. Hear About Event
21. Status

## After pasting:

1. Click **Save** (💾 or Ctrl+S)
2. Click **Deploy** → **Manage deployments**
3. Click **Edit** (pencil icon) on your existing deployment
4. Under "Version", select **"New version"**
5. Click **Deploy**
6. Click **Done**

## Then test the registration form!

Your sheet should automatically populate when someone registers.
