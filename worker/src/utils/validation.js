// worker/src/utils/validation.js
// Server-side validation — NEVER trust frontend input

const ALLOWED_BLOOD_GROUPS = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];

/**
 * Validates a full name string.
 */
export function validateFullName(name) {
  if (!name || typeof name !== 'string') {
    return 'Full name is required.';
  }
  const trimmed = name.trim();
  if (trimmed.length < 2) return 'Full name must be at least 2 characters.';
  if (trimmed.length > 100) return 'Full name must not exceed 100 characters.';
  if (!/^[A-Za-z\s.\-']+$/.test(trimmed)) {
    return 'Full name contains invalid characters.';
  }
  return null;
}

/**
 * Validates age — must be integer 1–120.
 */
export function validateAge(age) {
  const num = Number(age);
  if (!age && age !== 0) return 'Age is required.';
  if (!Number.isInteger(num)) return 'Age must be a whole number.';
  if (num < 1 || num > 120) return 'Age must be between 1 and 120.';
  return null;
}

/**
 * Validates Indian mobile number — exactly 10 digits.
 */
export function validateMobileNumber(mobile) {
  if (!mobile || typeof mobile !== 'string') return 'Mobile number is required.';
  const trimmed = mobile.trim();
  if (!/^[6-9]\d{9}$/.test(trimmed)) {
    return 'Enter a valid 10-digit Indian mobile number.';
  }
  return null;
}

/**
 * Validates blood group against allowed values.
 */
/**
 * Validates date of birth.
 */
export function validateDateOfBirth(dateOfBirth) {
  if (!dateOfBirth || typeof dateOfBirth !== 'string') return 'Date of birth is required.';
  const trimmed = dateOfBirth.trim();
  if (!/^\d{4}-\d{2}-\d{2}$/.test(trimmed)) return 'Enter a valid date of birth.';

  const date = new Date(trimmed);
  if (Number.isNaN(date.getTime())) return 'Enter a valid date of birth.';

  const today = new Date();
  if (date > today) return 'Date of birth cannot be in the future.';
  return null;
}

/**
 * Validates gender.
 */
export function validateGender(gender) {
  if (!gender || typeof gender !== 'string') return 'Gender is required.';
  const trimmed = gender.trim();
  if (!['Male', 'Female', 'Other'].includes(trimmed)) {
    return 'Gender must be Male, Female, or Other.';
  }
  return null;
}

/**
 * Validates email address.
 */
export function validateEmail(email) {
  if (!email || typeof email !== 'string') return 'Email address is required.';
  const trimmed = email.trim();
  if (trimmed.length > 255) return 'Email address must not exceed 255 characters.';
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed)) {
    return 'Enter a valid email address.';
  }
  return null;
}

/**
 * Validates uploaded image file.
 * Returns null on success, error message on failure.
 */
export function validateImageFile(file) {
  if (!file) return 'Profile photo is required.';
  const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
  if (!allowedTypes.includes(file.type)) {
    return 'Photo must be JPG, JPEG, PNG, or WEBP.';
  }
  const maxSize = 5 * 1024 * 1024; // 5 MB
  if (file.size > maxSize) {
    return 'Photo must not exceed 5 MB.';
  }
  return null;
}

/**
 * Runs all validations on the registration payload.
 * Returns an object of { field: errorMessage } or null if all valid.
 */
export function validateRegistration(data, file) {
  const errors = {};

  const nameErr = validateFullName(data.fullName);
  if (nameErr) errors.fullName = nameErr;

  const ageErr = validateAge(data.age);
  if (ageErr) errors.age = ageErr;

  const mobileErr = validateMobileNumber(data.mobileNumber);
  if (mobileErr) errors.mobileNumber = mobileErr;

  const dateOfBirthErr = validateDateOfBirth(data.dateOfBirth);
  if (dateOfBirthErr) errors.dateOfBirth = dateOfBirthErr;

  const genderErr = validateGender(data.gender);
  if (genderErr) errors.gender = genderErr;

  const emailErr = validateEmail(data.email);
  if (emailErr) errors.email = emailErr;

  const photoErr = validateImageFile(file);
  if (photoErr) errors.photo = photoErr;

  return Object.keys(errors).length > 0 ? errors : null;
}
