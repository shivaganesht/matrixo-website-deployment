# 🚨 COPY THIS EXACT CODE TO GOOGLE APPS SCRIPT

## Open: https://script.google.com

## Delete everything and paste THIS:

```javascript
function doPost(e) {
  try {
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    const data = JSON.parse(e.postData.contents);
    
    // Save screenshot to Google Drive
    let screenshotUrl = '';
    if (data.paymentScreenshot) {
      try {
        // Get base64 data (remove data:image/jpeg;base64, prefix)
        const base64Data = data.paymentScreenshot.split(',')[1];
        const mimeType = data.paymentScreenshot.split(',')[0].split(':')[1].split(';')[0];
        
        // Create blob from base64
        const blob = Utilities.newBlob(
          Utilities.base64Decode(base64Data),
          mimeType,
          data.screenshotFileName || 'screenshot.jpg'
        );
        
        // Get or create "Payment Screenshots" folder
        const folders = DriveApp.getFoldersByName('Payment Screenshots');
        const folder = folders.hasNext() ? folders.next() : DriveApp.createFolder('Payment Screenshots');
        
        // Save file to Drive
        const file = folder.createFile(blob);
        const fileName = `${data.fullName}_${Date.now()}_${data.screenshotFileName}`;
        file.setName(fileName);
        file.setSharing(DriveApp.Access.ANYONE_WITH_LINK, DriveApp.Permission.VIEW);
        
        screenshotUrl = file.getUrl();
      } catch (error) {
        screenshotUrl = 'Error saving screenshot: ' + error.toString();
      }
    }
    
    // Add row to sheet
    sheet.appendRow([
      data.timestamp,
      data.eventId,
      data.eventTitle,
      data.eventDate,
      data.ticketType,
      data.ticketPrice,
      data.fullName,
      data.contactNumber,
      data.email,
      data.studentId,
      data.collegeName,
      data.department,
      data.year,
      data.emergencyContact,
      data.address,
      data.wantCertificate,
      data.wantTransport,
      data.hearAboutEvent,
      screenshotUrl,
      data.status
    ]);
    
    return ContentService.createTextOutput(JSON.stringify({ 
      success: true,
      message: 'Registration saved successfully',
      screenshotUrl: screenshotUrl
    })).setMimeType(ContentService.MimeType.JSON);
    
  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({ 
      success: false, 
      error: error.toString() 
    })).setMimeType(ContentService.MimeType.JSON);
  }
}
```

## After pasting:

1. Click Save (💾)
2. Click Deploy → Manage deployments
3. Click Edit (pencil icon)
4. Under "Version", select "New version"
5. Click Deploy
6. Copy the NEW URL
7. Paste it in .env.local as NEXT_PUBLIC_GOOGLE_SCRIPT_URL
8. Restart your dev server

## Then test again!
