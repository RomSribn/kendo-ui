import React, { useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { Button, CustomerDialog, VendorDialog, BillDialog } from 'components';
import {
  formatCustomerData,
  generateCustomer,
  formatVendorData,
  generateVendorData,
  getChangedValues,
} from 'utils';
import {
  useGetPaymentTerms,
  useGetSubUsers,
  useGetStates,
  useCreateCustomer,
  useUpdateCustomer,
  useGetCustomerById,
  useCreateVendor,
  useUpdateVendor,
  useGetVendorById,
} from 'api/hooks';

import {
  ITermsCode,
  IState,
  IApprovingUser,
  ICustomer,
  ICustomerInput,
  IVendor,
  IVendorInput,
} from 'data/types';

import '@progress/kendo-theme-default/dist/all.css';
import './App.css';

function App() {
  const methods = useForm();
  const [isEditCustomer, setIsEditCustomer] = useState(false);
  const [isEditVendor, setIsEditVendor] = useState(false);
  const [customerDlgVisible, setCustomerDlgVisible] = useState(false);
  const [vendorDlgVisible, setVendorDlgVisible] = useState(false);
  const [billDlgVisible, setBillDlgVisible] = useState(false);

  const showCustomerDlg = () => {
    setCustomerDlgVisible(true);
  };

  const showVendorDlg = () => {
    setVendorDlgVisible(true);
  };

  const showBillDlg = () => {
    setBillDlgVisible(true);
  };

  const closeCustomerDlg = () => {
    setCustomerDlgVisible(false);
    setIsEditCustomer(false);
    methods.reset({ EntityName: '' });
  };

  const closeVendorDlg = () => {
    setVendorDlgVisible(false);
    setIsEditVendor(false);
    methods.reset({ EntityName: '' });
  };

  const closeBillDlg = () => {
    setBillDlgVisible(false);
    methods.reset({ EntityName: '' });
  };

  const { mutate: createCustomer } = useCreateCustomer(closeCustomerDlg);
  const { mutate: updateCustomer } = useUpdateCustomer(closeCustomerDlg);
  const { mutate: createVendor } = useCreateVendor(closeVendorDlg);
  const { mutate: updateVendor } = useUpdateVendor(closeVendorDlg);

  const { data: paymentTerms } = useGetPaymentTerms() as {
    data: Array<ITermsCode>;
  };
  const { data: subUsers } = useGetSubUsers() as {
    data: Array<IApprovingUser>;
  };
  const { data: states } = useGetStates() as {
    data: Array<IState>;
  };
  const { data: userInfo } = useGetCustomerById(22) as {
    data: ICustomer;
  };
  const { data: vendorInfo } = useGetVendorById(22) as {
    data: IVendor;
  };

  const editCustomer = () => {
    if (!userInfo) {
      const formattedData = generateCustomer(
        userInfo,
        states,
        subUsers,
        paymentTerms
      );

      methods.reset(formattedData);
      setIsEditCustomer(true);
      showCustomerDlg();
    } else return alert("This User doesn't have data");
  };

  const editVendor = () => {
    if (!vendorInfo) {
      const formattedData = generateVendorData(
        vendorInfo,
        states,
        subUsers,
        paymentTerms
      );

      methods.reset(formattedData);
      setIsEditVendor(true);
      showVendorDlg();
    } else return alert("This User doesn't have data");
  };

  const onSubmitCustomerInfo = (variables: ICustomerInput) => {
    try {
      const formattedData = formatCustomerData(
        variables,
        subUsers,
        paymentTerms
      );

      if (isEditCustomer) {
        const changes = getChangedValues(formattedData, userInfo);
        if (Object.keys(changes).length > 0) {
          updateCustomer({ id: userInfo.IDNo, ...changes });
        }
      } else createCustomer(formattedData);
    } catch (e: unknown) {
      alert(`error while saving data: ${String(e)}`);
    }
  };

  const onSubmitVendorInfo = (variables: IVendorInput) => {
    const formattedData = formatVendorData(variables, subUsers, paymentTerms);

    if (isEditVendor) {
      const changes = getChangedValues(formattedData, vendorInfo);
      if (Object.keys(changes).length > 0) {
        updateVendor({ id: vendorInfo.IDNo, ...changes });
      }
    } else createVendor(formattedData);
  };

  const onSubmitBillInfo = (variables: any) => {
    console.log(variables);
  };

  return (
    <div className="App">
      <header className="App-header">
        <Button
          onClick={showCustomerDlg}
          style={{ width: '150px', margin: '20px' }}
        >
          Create Customer
        </Button>
        <Button
          onClick={editCustomer}
          style={{ width: '150px', margin: '20px' }}
        >
          Edit Customer
        </Button>
        <Button
          onClick={showVendorDlg}
          style={{ width: '150px', margin: '20px' }}
        >
          Create Vendor
        </Button>
        <Button onClick={editVendor} style={{ width: '150px', margin: '20px' }}>
          Edit Vendor
        </Button>
        <Button
          onClick={showBillDlg}
          style={{ width: '150px', margin: '20px' }}
        >
          Create Bill
        </Button>

        {customerDlgVisible && (
          <FormProvider {...methods}>
            <CustomerDialog
              states={states}
              subUsers={subUsers}
              onSubmit={onSubmitCustomerInfo}
              onClose={closeCustomerDlg}
              paymentTerms={paymentTerms}
            />
          </FormProvider>
        )}

        {vendorDlgVisible && (
          <FormProvider {...methods}>
            <VendorDialog
              states={states}
              subUsers={subUsers}
              onSubmit={onSubmitVendorInfo}
              onClose={closeVendorDlg}
              paymentTerms={paymentTerms}
            />
          </FormProvider>
        )}

        {billDlgVisible && (
          <FormProvider {...methods}>
            <BillDialog
              states={states}
              subUsers={subUsers}
              onSubmit={onSubmitBillInfo}
              onClose={closeBillDlg}
              paymentTerms={paymentTerms}
            />
          </FormProvider>
        )}
      </header>
    </div>
  );
}

export default App;
