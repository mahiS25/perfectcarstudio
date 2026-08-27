import type { IncomingMessage, ServerResponse } from 'node:http';

const scriptUrl = process.env.BOOKING_SCRIPT_URL;

function readBody(request: IncomingMessage): Promise<string> {
  return new Promise((resolve, reject) => {
    let body = '';
    request.on('data', (chunk) => { body += chunk; });
    request.on('end', () => resolve(body));
    request.on('error', reject);
  });
}

export default async function handler(request: IncomingMessage, response: ServerResponse) {
  if (request.method !== 'POST') {
    response.statusCode = 405;
    response.setHeader('Content-Type', 'application/json');
    response.end(JSON.stringify({ success: false, error: 'Method not allowed' }));
    return;
  }

  if (!scriptUrl) {
    response.statusCode = 500;
    response.setHeader('Content-Type', 'application/json');
    response.end(JSON.stringify({ success: false, error: 'Booking service is not configured.' }));
    return;
  }

  try {
    const body = await readBody(request);
    const scriptResponse = await fetch(scriptUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'text/plain;charset=utf-8' },
      body,
    });
    const responseText = await scriptResponse.text();

    response.statusCode = scriptResponse.status;
    response.setHeader('Content-Type', 'application/json');
    response.end(responseText);
  } catch (error) {
    response.statusCode = 502;
    response.setHeader('Content-Type', 'application/json');
    response.end(JSON.stringify({
      success: false,
      error: error instanceof Error ? error.message : 'Booking service unavailable.'
    }));
  }
}
