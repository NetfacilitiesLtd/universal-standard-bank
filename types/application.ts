export interface ApplicationFormData {
  firstName: string;
  middleName: string;
  lastName: string;
  dateOfBirth: string;
  gender: string;
  nationality: string;

  email: string;
  phoneNumber: string;

  residentialAddress: string;
  country: string;
  state: string;
  city: string;
  postalCode: string;

  idType: string;
  idNumber: string;
  idExpiryDate: string;

  accountType: string;
  preferredCurrency: string;

  occupation: string;
  employer: string;

  password: string;
  pin: string;

  passportPhoto: File | null;
  governmentId: File | null;

  agreedToTerms: boolean;
}