// =========================================================================
// SECURITY & DEFENSE UTILITIES
// =========================================================================

// In-memory sliding window rate limiter
const rateLimitMap = new Map<string, { count: number; resetTime: number }>();

export function checkRateLimit(ip: string, maxRequests: number = 5, windowMs: number = 60000): { allowed: boolean; remaining: number } {
  const now = Date.now();
  const clientData = rateLimitMap.get(ip);

  if (!clientData || now > clientData.resetTime) {
    rateLimitMap.set(ip, { count: 1, resetTime: now + windowMs });
    return { allowed: true, remaining: maxRequests - 1 };
  }

  if (clientData.count >= maxRequests) {
    return { allowed: false, remaining: 0 };
  }

  clientData.count += 1;
  return { allowed: true, remaining: maxRequests - clientData.count };
}

// Sanitize string to prevent XSS
export function sanitizeInput(input: string): string {
  if (!input || typeof input !== "string") return "";
  return input
    .replace(/<[^>]*>?/gm, "") // Strip HTML tags
    .trim();
}

// Allowed MIME types for image and document uploads
export const ALLOWED_IMAGE_TYPES = ["image/jpeg", "image/png", "image/webp", "image/avif"];
export const ALLOWED_DOC_TYPES = ["application/pdf"];
export const MAX_IMAGE_SIZE_BYTES = 5 * 1024 * 1024; // 5 MB
export const MAX_DOC_SIZE_BYTES = 15 * 1024 * 1024; // 15 MB

export function validateFileUpload(file: { type: string; size: number }, isDocument: boolean = false): { valid: boolean; error?: string } {
  const allowedTypes = isDocument ? ALLOWED_DOC_TYPES : ALLOWED_IMAGE_TYPES;
  const maxSize = isDocument ? MAX_DOC_SIZE_BYTES : MAX_IMAGE_SIZE_BYTES;

  if (!allowedTypes.includes(file.type)) {
    return {
      valid: false,
      error: `Invalid file format. Allowed types: ${allowedTypes.join(", ")}`,
    };
  }

  if (file.size > maxSize) {
    return {
      valid: false,
      error: `File is too large. Maximum allowed size is ${maxSize / (1024 * 1024)} MB.`,
    };
  }

  return { valid: true };
}
