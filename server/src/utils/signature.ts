import crypto from 'crypto';

export function generateSignature(body: any, secret: string, nonce: string = '', timestamp: string = ''): string {
    const hmac = crypto.createHmac('sha256', secret);
    const bodyStr = typeof body === 'string' ? body : (body ? JSON.stringify(body) : '');
    const data = nonce + timestamp + bodyStr;
    hmac.update(data);
    return hmac.digest('hex');
}

export function verifySignature(req: import('next').NextApiRequest, secret: string): boolean {
    const signature = req.headers['x-client-signature'] as string;
    if (!signature) {
        return false;
    }

    const nonce = (req.headers['x-client-nonce'] as string) || '';
    const timestamp = (req.headers['x-client-timestamp'] as string) || '';

    const expectedSignature = generateSignature(req.body, secret, nonce, timestamp);

    // Safety check for timingSafeEqual: buffers must have same length
    const signatureBuffer = Buffer.from(signature);
    const expectedSignatureBuffer = Buffer.from(expectedSignature);

    if (signatureBuffer.length !== expectedSignatureBuffer.length) {
        return false;
    }

    return crypto.timingSafeEqual(signatureBuffer, expectedSignatureBuffer);
}
