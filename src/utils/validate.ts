const validateEntityName = (entityName: string): boolean => {
  return !!entityName;
};

const validateCreditLimit = (creditLimit: number): boolean => {
  if (creditLimit > 99999999) return false;
  return true;
};

const validateFederalID = (fid: string): boolean => {
  const regex = /^\d{7}-\d{2}$/;
  return regex.test(fid) || !fid;
};

export const validateWebSite = (url: string) => {
  if (url === '' || url === undefined) {
    return true;
  }
  const pattern = new RegExp(
    '^(https?:\\/\\/)?' + // protocol
      '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // domain name
      '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
      '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
      '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
      '(\\#[-a-z\\d_]*)?$',
    'i'
  ); // fragment locator

  return !!pattern.test(url);
};

const validatePhone = (phoneNumber: string): boolean => {
  const regex = /^\d{3}-\d{3}-\d{4}$/;
  return regex.test(phoneNumber) || !phoneNumber;
};

const validateEmail = (email: string): boolean => {
  const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return regex.test(email) || !email;
};

const validateZipCode = (zip: string): boolean => {
  const regex = /^\d{5}$/;
  return regex.test(zip) || !zip;
};

export const validateForm = (formValue: any): boolean => {
  if (!validateEntityName(formValue.EntityName)) {
    return false;
  }

  return (
    validateCreditLimit(formValue.CreditLimit) &&
    validateFederalID(formValue.FID) &&
    validateWebSite(formValue.Website) &&
    validatePhone(formValue.MainPhone) &&
    validatePhone(formValue.OtherPhone) &&
    validateEmail(formValue.EmailMain) &&
    validateZipCode(formValue.Zip) &&
    validateZipCode(formValue.ShipZip)
  );
};
