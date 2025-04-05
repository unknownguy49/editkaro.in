// This code should be deployed as a Google Apps Script Web App
// It will handle both contact form submissions and email subscriptions

function doPost(e) {
  try {
    // Get the form data
    const data = e.parameter;
    
    // Determine which form was submitted
    if (data.source === 'newsletter_subscription') {
      // Handle email subscription
      return handleEmailSubscription(data);
    } else {
      // Handle contact form submission
      return handleContactForm(data);
    }
  } catch (error) {
    // Return error response
    return ContentService
      .createTextOutput(JSON.stringify({ 'result': 'error', 'error': error.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

function handleEmailSubscription(data) {
  // Open the Email Subscriptions spreadsheet - replace with your actual spreadsheet ID
  const ss = SpreadsheetApp.openById('YOUR_SPREADSHEET_ID_FOR_EMAIL_SUBSCRIPTIONS');
  const sheet = ss.getSheetByName('Subscriptions') || ss.getSheets()[0];
  
  // Format the data for the spreadsheet
  const timestamp = new Date();
  const email = data.email;
  
  // Add the data to the spreadsheet
  sheet.appendRow([timestamp, email]);
  
  // Return success response
  return ContentService
    .createTextOutput(JSON.stringify({ 'result': 'success' }))
    .setMimeType(ContentService.MimeType.JSON);
}

function handleContactForm(data) {
  // Open the Contact Form submissions spreadsheet - replace with your actual spreadsheet ID
  const ss = SpreadsheetApp.openById('YOUR_SPREADSHEET_ID_FOR_CONTACT_FORM');
  const sheet = ss.getSheetByName('Submissions') || ss.getSheets()[0];
  
  // Format the data for the spreadsheet
  const timestamp = new Date();
  const name = data.name;
  const email = data.email;
  const phone = data.phone;
  const subject = data.subject;
  const message = data.message;
  
  // Add the data to the spreadsheet
  sheet.appendRow([timestamp, name, email, phone, subject, message]);
  
  // Optionally, send an email notification
  sendEmailNotification(name, email, subject, message);
  
  // Return success response
  return ContentService
    .createTextOutput(JSON.stringify({ 'result': 'success' }))
    .setMimeType(ContentService.MimeType.JSON);
}

function sendEmailNotification(name, email, subject, message) {
  // Replace with your email address
  const adminEmail = 'admin@editkaro.in';
  
  // Email subject
  const emailSubject = 'New Contact Form Submission: ' + subject;
  
  // Email body
  const emailBody = 
    'You have received a new contact form submission:\n\n' +
    'Name: ' + name + '\n' +
    'Email: ' + email + '\n' +
    'Subject: ' + subject + '\n\n' +
    'Message:\n' + message + '\n\n' +
    'This is an automated notification.';
  
  // Send the email
  try {
    MailApp.sendEmail(adminEmail, emailSubject, emailBody);
  } catch (error) {
    console.error('Error sending email notification: ' + error.toString());
  }
}

function doGet() {
  // Return a simple HTML page for testing
  return HtmlService.createHtmlOutput(
    '<h1>Google Apps Script for Editkaro.in</h1>' +
    '<p>This web app handles form submissions from the Editkaro.in website.</p>'
  );
}