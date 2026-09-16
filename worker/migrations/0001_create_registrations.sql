CREATE TABLE IF NOT EXISTS registrations (
  uniqueId TEXT PRIMARY KEY,
  fullName TEXT NOT NULL,
  age INTEGER NOT NULL,
  mobileNumber TEXT NOT NULL,
  bloodGroup TEXT,
  dateOfBirth TEXT NOT NULL,
  gender TEXT NOT NULL,
  email TEXT NOT NULL,
  city TEXT DEFAULT '',
  position TEXT DEFAULT 'Member',
  photoUrl TEXT NOT NULL,
  photoPublicId TEXT NOT NULL,
  createdAt TEXT NOT NULL,
  updatedAt TEXT NOT NULL
);

CREATE INDEX IF NOT EXISTS registrations_fullName_idx ON registrations(fullName);
CREATE INDEX IF NOT EXISTS registrations_mobileNumber_idx ON registrations(mobileNumber);
CREATE INDEX IF NOT EXISTS registrations_bloodGroup_idx ON registrations(bloodGroup);
CREATE INDEX IF NOT EXISTS registrations_gender_idx ON registrations(gender);
CREATE INDEX IF NOT EXISTS registrations_email_idx ON registrations(email);
CREATE INDEX IF NOT EXISTS registrations_createdAt_idx ON registrations(createdAt DESC);
