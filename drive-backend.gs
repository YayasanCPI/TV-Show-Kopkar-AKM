const FOLDER_ID = "1qZ_5n2RD_mGXotZM0TlL6pnyMocfaHxT";

function doGet(e) {
  var action = e.parameter.action;
  
  if (action === 'getSlides') {
    return handleGetFile('slideData.json');
  } else if (action === 'getSettings') {
    return handleGetFile('settings.json');
  }
  
  return ContentService.createTextOutput(JSON.stringify({error: "Invalid action"}))
    .setMimeType(ContentService.MimeType.JSON);
}

function doPost(e) {
  var action = e.parameter.action;
  var payload = e.postData.contents;
  
  if (action === 'saveSlides') {
    return handleSaveFile('slideData.json', payload);
  } else if (action === 'saveSettings') {
    return handleSaveFile('settings.json', payload);
  }
  
  return ContentService.createTextOutput(JSON.stringify({error: "Invalid action"}))
    .setMimeType(ContentService.MimeType.JSON);
}

function handleGetFile(filename) {
  var folder = DriveApp.getFolderById(FOLDER_ID);
  var files = folder.getFilesByName(filename);
  
  if (files.hasNext()) {
    var file = files.next();
    var content = file.getBlob().getDataAsString();
    return ContentService.createTextOutput(content)
      .setMimeType(ContentService.MimeType.JSON);
  } else {
    return ContentService.createTextOutput(JSON.stringify({}))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

function handleSaveFile(filename, data) {
  var folder = DriveApp.getFolderById(FOLDER_ID);
  var files = folder.getFilesByName(filename);
  
  if (files.hasNext()) {
    var file = files.next();
    file.setContent(data);
  } else {
    folder.createFile(filename, data, MimeType.PLAIN_TEXT);
  }
  
  return ContentService.createTextOutput(JSON.stringify({success: true}))
    .setMimeType(ContentService.MimeType.JSON);
}

// Untuk menangani CORS Preflight request
function doOptions(e) {
  const headers = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
    "Access-Control-Max-Age": "86400"
  };
  return ContentService.createTextOutput("")
    .setMimeType(ContentService.MimeType.TEXT)
    .setHeaders(headers);
}
