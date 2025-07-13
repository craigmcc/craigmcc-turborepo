/**
 * "Database" types for Daisy Alone examples.
 */

// Public Types --------------------------------------------------------------

export type Profile = {
  // The email address of the profile.
  email: string;
  // The first name of the profile.
  firstName: string;
  // The last name of the profile.
  lastName: string;
  // The password of the profile. (not encrypted because this is a demo)
  password: string;
}

export type SignUp = {
  // The confirm password field for sign up.
  confirmPassword: string;
  // The email address of the profile.
  email: string;
  // The first name of the profile.
  firstName: string;
  // The last name of the profile.
  lastName: string;
  // The password of the profile. (not encrypted because this is a demo)
  password: string;
}
