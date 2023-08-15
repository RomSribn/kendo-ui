export interface ITermsCode {
  IDNo: number;
  TermsCode: string;
}

export interface IState {
  StateAbb: string;
  StateName: string;
}

export interface IApprovingUser {
  IDNo: number;
  LoginUserName: string;
}

export interface ICustomer {
  IDNo: number;
  CreditApprovedBy?: number;
  EntityName: string;
  FID?: string;
  PrimaryContact?: string;
  EmailMain?: string;
  Address1?: string;
  MainPhone?: string;
  Address2?: string;
  OtherPhone?: string;
  City?: string;
  State?: string;
  Zip?: string;
  Notes?: string;
  TimeOpen?: string;
  TimeClose?: string;
  Website?: string;
  ShipAddress1?: string;
  ShipAddress2?: string;
  ShipCity?: string;
  ShipSt?: string;
  ShipZip?: string;
  TermsDueDays?: number;
  CreditHoldYN?: boolean;
  CreditLimit?: number;
  CreditReportingAgency?: string;
  CreditRating?: string;
}

export interface ICustomerInput {
  CreditApprovedBy?: IApprovingUser;
  EntityName: string;
  FID?: string;
  PrimaryContact?: string;
  EmailMain?: string;
  Address1?: string;
  MainPhone?: string;
  Address2?: string;
  OtherPhone?: string;
  City?: string;
  State?: IState;
  Zip?: string;
  Notes?: string;
  TimeOpen?: string;
  TimeClose?: string;
  Website?: string;
  ShipAddress1?: string;
  ShipAddress2?: string;
  ShipCity?: string;
  ShipSt?: string;
  ShipZip?: string;
  TermsDueDays?: ITermsCode;
  CreditHoldYN?: 'Yes' | 'No';
  CreditLimit?: string;
  CreditReportingAgency?: string;
  CreditRating?: string;
}

export interface IVendor {
  IDNo: number;
  CreditApprovedBy?: number;
  EntityName: string;
  FID?: string;
  PrimaryContact?: string;
  EmailMain?: string;
  Address1?: string;
  MainPhone?: string;
  Address2?: string;
  OtherPhone?: string;
  City?: string;
  State?: string;
  Zip?: string;
  Notes?: string;
  Website?: string;
  TermsDueDays?: number;
  CreditHoldYN?: boolean;
  CreditLimit?: number;
  CreditReportingAgency?: string;
  CreditRating?: string;
}

export interface IVendorInput {
  CreditApprovedBy?: IApprovingUser;
  EntityName: string;
  FID?: string;
  PrimaryContact?: string;
  EmailMain?: string;
  Address1?: string;
  MainPhone?: string;
  Address2?: string;
  OtherPhone?: string;
  City?: string;
  State?: IState;
  Zip?: string;
  Notes?: string;
  Website?: string;
  TermsDueDays?: ITermsCode;
  CreditHoldYN?: 'Yes' | 'No';
  CreditLimit?: string;
  CreditReportingAgency?: string;
  CreditRating?: string;
}
