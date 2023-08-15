import { ITermsCode, IState, IApprovingUser } from 'data/types';

const formatState = (value: 'string' | IState) => {
  return value ? (typeof value === 'string' ? value : value.StateAbb) : '';
};

const generateState = (
  value: 'string' | IState | null,
  states: Array<IState>
) => {
  return typeof value === 'string'
    ? states.find((item) => item.StateAbb === value)
    : value;
};

const formatCreditHoldYN = (value: 'Yes' | 'No' | null) => {
  return value === 'Yes';
};

const generateCreditHoldYN = (value: boolean | null) => {
  return value ? 'Yes' : 'No';
};

const formatCreditApprovedBy = (
  value: 'string',
  users: Array<IApprovingUser>
) => {
  return users.find((user) => user.LoginUserName === value)?.IDNo;
};

const generateCreditApprovedBy = (
  value: number,
  users: Array<IApprovingUser>
) => {
  return users.find((user) => user.IDNo === value)?.LoginUserName;
};

const formatTermsDueDays = (value: string, terms: Array<ITermsCode>) => {
  return terms.find((term) => term.TermsCode === value)?.IDNo;
};

const generateTermsDueDays = (value: number, terms: Array<ITermsCode>) => {
  return terms.find((term) => term.IDNo === value)?.TermsCode;
};

export const formatCustomerData = (
  data: any,
  approvingUsers: Array<IApprovingUser>,
  terms: Array<ITermsCode>
) => {
  const formattedData = {
    ...data,
    State: formatState(data?.State),
    ShipSt: formatState(data?.ShipSt),
    CreditHoldYN: formatCreditHoldYN(data?.CreditHoldYN),
    CreditApprovedBy: formatCreditApprovedBy(
      data?.CreditApprovedBy,
      approvingUsers
    ),
    TermsDueDays: formatTermsDueDays(data?.TermsDueDays, terms),
  };

  return formattedData;
};

export const generateCustomer = (
  data: any,
  states: Array<any>,
  approvingUsers: Array<any>,
  terms: Array<any>
) => {
  return {
    ...data,
    State: generateState(data?.State, states),
    ShipSt: generateState(data?.ShipSt, states),
    CreditHoldYN: generateCreditHoldYN(data?.CreditHoldYN),
    CreditApprovedBy: generateCreditApprovedBy(
      data?.CreditApprovedBy,
      approvingUsers
    ),
    TermsDueDays: generateTermsDueDays(data?.TermsDueDays, terms),
  };
};

export const formatVendorData = (
  data: any,
  approvingUsers: Array<any>,
  terms: Array<any>
) => {
  const formattedData = {
    ...data,
    State: formatState(data?.State),
    CreditHoldYN: formatCreditHoldYN(data?.CreditHoldYN),
    CreditApprovedBy: formatCreditApprovedBy(
      data?.CreditApprovedBy,
      approvingUsers
    ),
    TermsDueDays: formatTermsDueDays(data?.TermsDueDays, terms),
  };

  return formattedData;
};

export const generateVendorData = (
  data: any,
  states: Array<any>,
  approvingUsers: Array<any>,
  terms: Array<any>
) => {
  return {
    ...data,
    State: generateState(data?.State, states),
    CreditHoldYN: generateCreditHoldYN(data?.CreditHoldYN),
    CreditApprovedBy: generateCreditApprovedBy(
      data?.CreditApprovedBy,
      approvingUsers
    ),
    TermsDueDays: generateTermsDueDays(data?.TermsDueDays, terms),
  };
};
