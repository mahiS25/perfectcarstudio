const SPREADSHEET_ID = 'PASTE_YOUR_GOOGLE_SHEET_ID_HERE';
const TIMEZONE = 'Asia/Kolkata';

const SHEETS = {
  bookings: 'Bookings',
  services: 'Services',
  hours: 'BusinessHours',
  blockedDates: 'BlockedDates',
  enquiries: 'Enquiries'
};

function doGet() {
  return jsonResponse({
    success: true,
    message: 'Perfect Car Studio booking API is running'
  });
}

function doPost(e) {
  const lock = LockService.getScriptLock();

  try {
    if (!e || !e.postData || !e.postData.contents) {
      return jsonResponse({ success: false, error: 'Invalid POST request.' });
    }

    lock.waitLock(15000);
    const data = JSON.parse(e.postData.contents);
    if (data.request_type === 'enquiry') {
      return saveEnquiry(data);
    }
    validateBooking(data);

    const spreadsheet = SpreadsheetApp.openById(SPREADSHEET_ID);
    const service = findService(spreadsheet, data.service_id);

    if (!service) {
      return jsonResponse({ success: false, error: 'Selected service was not found or is inactive.' });
    }

    const startMinutes = parseStartTime(data.start_time);
    const endMinutes = startMinutes + service.durationMinutes;

    if (!isBusinessDay(spreadsheet, data.booking_date)) {
      return jsonResponse({ success: false, error: 'The studio is closed on this date.' });
    }

    if (isBlockedDate(spreadsheet, data.booking_date)) {
      return jsonResponse({ success: false, error: 'The studio is unavailable on this date.' });
    }

    if (!isWithinBusinessHours(spreadsheet, data.booking_date, startMinutes, endMinutes)) {
      return jsonResponse({ success: false, error: 'The selected time is outside business hours.' });
    }

    const bookingsSheet = getOrCreateSheet(spreadsheet, SHEETS.bookings, [
      'booking_id', 'created_at', 'customer_name', 'mobile', 'service_id',
      'service_name', 'booking_date', 'start_time', 'end_time', 'vehicle_type',
      'notes', 'status', 'whatsapp_notified', 'confirmed_at', 'cancelled_at'
    ]);
    if (hasBookingConflict(bookingsSheet, data.booking_date, startMinutes, endMinutes)) {
      return jsonResponse({ success: false, error: 'This time is already booked. Please select another time.' });
    }

    const bookingId = createBookingId();
    bookingsSheet.appendRow([
      bookingId,
      new Date(),
      data.customer_name,
      data.mobile,
      service.serviceId,
      service.serviceName,
      data.booking_date,
      formatMinutes(startMinutes),
      formatMinutes(endMinutes),
      data.vehicle_type || '',
      data.notes || '',
      'pending',
      'FALSE',
      '',
      ''
    ]);

    return jsonResponse({ success: true, booking_id: bookingId, message: 'Booking request saved successfully.' });
  } catch (error) {
    return jsonResponse({ success: false, error: error.message || 'Unable to save booking.' });
  } finally {
    try { lock.releaseLock(); } catch (error) {}
  }
}

function saveEnquiry(data) {
  if (!data.customer_name || !data.mobile || !data.service_id) {
    return jsonResponse({ success: false, error: 'Name, mobile, and service are required.' });
  }

  const sheet = getOrCreateSheet(SpreadsheetApp.openById(SPREADSHEET_ID), SHEETS.enquiries, [
    'enquiry_id', 'created_at', 'customer_name', 'mobile', 'service', 'message', 'status'
  ]);

  const enquiryId = 'ENQ-' + Utilities.formatDate(new Date(), TIMEZONE, 'yyyyMMdd-HHmmss');
  sheet.appendRow([enquiryId, new Date(), data.customer_name, data.mobile, data.service_id, data.notes || '', 'new']);
  return jsonResponse({ success: true, enquiry_id: enquiryId, message: 'Enquiry saved successfully.' });
}

function validateBooking(data) {
  ['customer_name', 'mobile', 'service_id', 'booking_date', 'start_time'].forEach(function(field) {
    if (!data[field] || String(data[field]).trim() === '') throw new Error('Missing required field: ' + field);
  });
  if (!/^\d{4}-\d{2}-\d{2}$/.test(data.booking_date)) throw new Error('Invalid booking date format.');
  if (String(data.mobile).replace(/\D/g, '').length < 10) throw new Error('Invalid mobile number.');
}

function findService(spreadsheet, requestedService) {
  const sheet = spreadsheet.getSheetByName(SHEETS.services);
  if (!sheet) throw new Error('Services sheet was not found.');
  const rows = sheet.getDataRange().getValues();
  const requested = String(requestedService).trim().toLowerCase();

  for (let index = 1; index < rows.length; index++) {
    const row = rows[index];
    const serviceId = String(row[0] || '').trim();
    const serviceName = String(row[1] || '').trim();
    const active = String(row[4] || '').toLowerCase();
    const matches = requested === serviceId.toLowerCase() || requested === serviceName.toLowerCase();
    const isActive = active === 'true' || active === 'yes' || active === '1';

    if (matches && isActive && Number(row[2]) > 0) {
      return { serviceId: serviceId, serviceName: serviceName, durationMinutes: Number(row[2]) };
    }
  }
  return null;
}

function isBusinessDay(spreadsheet, bookingDate) {
  const sheet = spreadsheet.getSheetByName(SHEETS.hours);
  if (!sheet) throw new Error('BusinessHours sheet was not found.');
  const weekday = Utilities.formatDate(parseDate(bookingDate), TIMEZONE, 'EEEE').toLowerCase();
  const rows = sheet.getDataRange().getValues();

  for (let index = 1; index < rows.length; index++) {
    if (String(rows[index][0] || '').trim().toLowerCase() === weekday) {
      const open = String(rows[index][1] || '').toLowerCase();
      return open === 'true' || open === 'yes' || open === '1';
    }
  }
  return false;
}

function isWithinBusinessHours(spreadsheet, bookingDate, startMinutes, endMinutes) {
  const sheet = spreadsheet.getSheetByName(SHEETS.hours);
  const weekday = Utilities.formatDate(parseDate(bookingDate), TIMEZONE, 'EEEE').toLowerCase();
  const rows = sheet.getDataRange().getValues();

  for (let index = 1; index < rows.length; index++) {
    if (String(rows[index][0] || '').trim().toLowerCase() === weekday) {
      const opening = parseClockTime(rows[index][2]);
      const closing = parseClockTime(rows[index][3]);
      return startMinutes >= opening && endMinutes <= closing;
    }
  }
  return false;
}

function isBlockedDate(spreadsheet, bookingDate) {
  const sheet = spreadsheet.getSheetByName(SHEETS.blockedDates);
  if (!sheet) return false;
  const rows = sheet.getDataRange().getValues();

  for (let index = 1; index < rows.length; index++) {
    const active = String(rows[index][2] || '').toLowerCase();
    const isActive = active === 'true' || active === 'yes' || active === '1';
    if (normalizeSheetDate(rows[index][0]) === bookingDate && isActive) return true;
  }
  return false;
}

function hasBookingConflict(sheet, bookingDate, requestedStart, requestedEnd) {
  if (!sheet || sheet.getLastRow() < 2) return false;
  const rows = sheet.getDataRange().getValues();

  for (let index = 1; index < rows.length; index++) {
    const status = String(rows[index][11] || '').toLowerCase();
    const active = status === 'pending' || status === 'confirmed';
    const existingStart = parseClockTime(rows[index][7]);
    const existingEnd = parseClockTime(rows[index][8]);
    if (normalizeSheetDate(rows[index][6]) === bookingDate && active && requestedStart < existingEnd && requestedEnd > existingStart) return true;
  }
  return false;
}

function parseStartTime(value) {
  const text = String(value || '').trim();
  return parseClockTime(text.includes('-') ? text.split('-')[0].trim() : text);
}

function parseClockTime(value) {
  if (value instanceof Date) {
    return Number(Utilities.formatDate(value, TIMEZONE, 'H')) * 60 + Number(Utilities.formatDate(value, TIMEZONE, 'm'));
  }
  const text = String(value || '').trim().toUpperCase();
  const match = text.match(/(\d{1,2})(?::(\d{2}))?\s*(AM|PM)?/);
  if (!match) throw new Error('Invalid time: ' + value);
  let hours = Number(match[1]);
  const minutes = Number(match[2] || 0);
  if (match[3] === 'PM' && hours < 12) hours += 12;
  if (match[3] === 'AM' && hours === 12) hours = 0;
  if (hours > 23 || minutes > 59) throw new Error('Invalid time: ' + value);
  return hours * 60 + minutes;
}

function formatMinutes(totalMinutes) {
  const hours24 = Math.floor(totalMinutes / 60);
  const period = hours24 >= 12 ? 'PM' : 'AM';
  return String(hours24 % 12 || 12).padStart(2, '0') + ':' + String(totalMinutes % 60).padStart(2, '0') + ' ' + period;
}

function parseDate(dateText) {
  const parts = dateText.split('-').map(Number);
  return new Date(parts[0], parts[1] - 1, parts[2]);
}

function normalizeSheetDate(value) {
  if (!value) return '';
  if (value instanceof Date) return Utilities.formatDate(value, TIMEZONE, 'yyyy-MM-dd');
  const text = String(value).trim();
  if (/^\d{4}-\d{2}-\d{2}$/.test(text)) return text;
  const parsed = new Date(text);
  return isNaN(parsed.getTime()) ? '' : Utilities.formatDate(parsed, TIMEZONE, 'yyyy-MM-dd');
}

function createBookingId() {
  return 'PCS-' + Utilities.formatDate(new Date(), TIMEZONE, 'yyyyMMdd-HHmmss') + '-' + Math.floor(1000 + Math.random() * 9000);
}

function jsonResponse(data) {
  return ContentService.createTextOutput(JSON.stringify(data)).setMimeType(ContentService.MimeType.JSON);
}

function getOrCreateSheet(spreadsheet, sheetName, headers) {
  let sheet = spreadsheet.getSheetByName(sheetName);

  if (!sheet) {
    sheet = spreadsheet.insertSheet(sheetName);
  }

  if (sheet.getLastRow() === 0) {
    sheet.appendRow(headers);
  }

  return sheet;
}
