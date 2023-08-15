import React, { useState, useEffect } from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import styled from 'styled-components';

import { Window } from '@progress/kendo-react-dialogs';
import { FloatingLabel } from '@progress/kendo-react-labels';
import { TimePicker } from '@progress/kendo-react-dateinputs';
import { DropDownList } from '@progress/kendo-react-dropdowns';
import {
  Input,
  MaskedTextBox,
  NumericTextBox,
} from '@progress/kendo-react-inputs';
import { MultiColumnComboBox } from '@progress/kendo-react-dropdowns';
import { TextArea } from '@progress/kendo-react-inputs';
import { Button } from 'components';
import { validateForm, validateWebSite } from 'utils/validate';
import { IState, IApprovingUser, ITermsCode } from 'data/types';
interface ICustomerDialogProps {
  subUsers: IApprovingUser[];
  states: IState[];
  paymentTerms: ITermsCode[];
  onClose: () => void;
  onSubmit: (variables: any) => void;
}

interface IIsOpen {
  billing: boolean;
  shipping: boolean;
  payments: boolean;
  credit: boolean;
  approved: boolean;
}

const statesColumns = [
  {
    field: 'StateAbb',
    header: 'Abbreviation',
    width: '70px',
  },
  {
    field: 'StateName',
    header: 'Name',
    width: '130px',
  },
];

const regex: any = {
  FID: /^_{7}-_{2}$/,
  MainPhone: /^_{3}-_{3}-_{4}$/,
  OtherPhone: /^_{3}-_{3}-_{4}$/,
  Zip: /^_{5}$/,
  ShipZip: /^_{5}$/,
};

export const CustomerDialog: React.FC<ICustomerDialogProps> = ({
  states,
  onClose,
  onSubmit,
  subUsers,
  paymentTerms,
}) => {
  const { handleSubmit, control, watch, setValue } = useFormContext();
  const handleFormSubmit = handleSubmit(onSubmit);
  const [isOpen, setIsOpen] = useState<IIsOpen>({
    billing: false,
    shipping: false,
    payments: false,
    credit: false,
    approved: false,
  });
  const [isValid, setIsValid] = useState<boolean>(false);
  useEffect(() => {
    const subscription = watch((value, { name, type }) => {
      if (validateForm(value)) {
        setIsValid(true);
      } else {
        setIsValid(false);
      }
      if (name && Object.keys(regex).indexOf(name) !== -1) {
        if (regex[name].test(value[name])) setValue(name, '');
      }
    });
    return () => subscription.unsubscribe();
  }, [watch]);
  return (
    <Window
      title="Customer Info"
      onClose={onClose}
      resizable={false}
      width={900}
      height={580}
    >
      <Form onSubmit={handleFormSubmit}>
        {/* Customer information */}
        <Fieldset>
          <Controller
            control={control}
            name="EntityName"
            render={({ field }) => (
              <Input
                style={{ flex: '1 1 45%' }}
                {...field}
                label="Customer Name"
              />
            )}
          />

          <InputWrapper>
            <Controller
              control={control}
              name="FID"
              defaultValue={''}
              render={({ field }) => {
                return (
                  <MaskedTextBox
                    {...field}
                    width="100%"
                    label="Federal ID"
                    mask="0000000-00"
                    value={field.value || ''}
                  />
                );
              }}
            />
          </InputWrapper>

          <InputWrapper>
            <Controller
              control={control}
              name="Website"
              render={({ field }) => (
                <Input
                  style={{ width: '100%' }}
                  {...field}
                  label="Website"
                  valid={validateWebSite(field.value)}
                />
              )}
            />
          </InputWrapper>
        </Fieldset>

        {/* Contact information */}
        <Fieldset>
          <legend>Contact Information</legend>
          <InputWrapper>
            <Controller
              control={control}
              name="PrimaryContact"
              render={({ field }) => (
                <Input
                  style={{ width: '100%' }}
                  {...field}
                  label="Primary Contact"
                />
              )}
            />
          </InputWrapper>
          <InputWrapper>
            <Controller
              control={control}
              name="MainPhone"
              render={({ field }) => (
                <MaskedTextBox
                  width="100%"
                  {...field}
                  label="Main Phone"
                  mask="000-000-0000"
                  value={field.value || ''}
                />
              )}
            />
          </InputWrapper>
          <InputWrapper>
            <Controller
              control={control}
              name="OtherPhone"
              render={({ field }) => (
                <MaskedTextBox
                  width="100%"
                  {...field}
                  label="Other Phone"
                  mask="000-000-0000"
                  value={field.value || ''}
                />
              )}
            />
          </InputWrapper>
          <InputWrapper>
            <Controller
              control={control}
              name="EmailMain"
              render={({ field }) => (
                <Input
                  style={{ width: '100%' }}
                  {...field}
                  label="Email Address"
                  type="email"
                />
              )}
            />
          </InputWrapper>
        </Fieldset>

        {/* Billing and Shipping information */}
        <BillingAndShippingWrapper>
          {/* Billing Address information */}
          <Fieldset>
            <legend>Billing Address</legend>
            <BillingWrapper>
              <Controller
                control={control}
                name="Address1"
                render={({ field }) => (
                  <Input
                    style={{ flex: '1 1 100%' }}
                    {...field}
                    label="Address 1"
                  />
                )}
              />
              <Controller
                control={control}
                name="Address2"
                render={({ field }) => (
                  <Input
                    style={{ flex: '1 1 100%' }}
                    {...field}
                    label="Address 2"
                  />
                )}
              />
              <FieldsWrapper className="address">
                <BillingShippingWrapper width="45%">
                  <Controller
                    control={control}
                    name="City"
                    render={({ field }) => <Input {...field} label="City" />}
                  />
                </BillingShippingWrapper>
                <BillingShippingWrapper width="30%">
                  <Controller
                    control={control}
                    name="State"
                    render={({ field }) => (
                      <MultiColumnComboBox
                        {...field}
                        label="State"
                        columns={statesColumns}
                        textField="StateAbb"
                        data={states}
                        onOpen={() =>
                          setIsOpen({
                            ...isOpen,
                            billing: true,
                          })
                        }
                        onClose={() =>
                          setIsOpen({
                            ...isOpen,
                            billing: false,
                          })
                        }
                        iconClassName={
                          isOpen.billing
                            ? 'k-icon k-i-arrow-n'
                            : 'k-icon k-i-arrow-s'
                        }
                      />
                    )}
                  />
                </BillingShippingWrapper>
                <BillingShippingWrapper width="25%">
                  <Controller
                    control={control}
                    name="Zip"
                    render={({ field }) => (
                      <MaskedTextBox
                        {...field}
                        label="Zip"
                        mask="00000"
                        value={field.value || ''}
                      />
                    )}
                  />
                </BillingShippingWrapper>
              </FieldsWrapper>
            </BillingWrapper>
          </Fieldset>

          {/* Shipping Address information */}
          <Fieldset>
            <legend>Shipping Address</legend>
            <ShippingWrapper>
              <ShippingCol3>
                <Controller
                  control={control}
                  name="ShipAddress1"
                  render={({ field }) => (
                    <Input
                      style={{ flex: '1 1 100%' }}
                      {...field}
                      label="Address 1"
                    />
                  )}
                />
                <Controller
                  control={control}
                  name="ShipAddress2"
                  render={({ field }) => (
                    <Input
                      style={{ flex: '1 1 100%' }}
                      {...field}
                      label="Address 2"
                    />
                  )}
                />

                <FieldsWrapper className="address">
                  <BillingShippingWrapper width="45%">
                    <Controller
                      control={control}
                      name="ShipCity"
                      render={({ field }) => <Input {...field} label="City" />}
                    />
                  </BillingShippingWrapper>
                  <BillingShippingWrapper width="30%">
                    <Controller
                      control={control}
                      name="ShipSt"
                      render={({ field }) => (
                        <MultiColumnComboBox
                          {...field}
                          header={null}
                          data={states}
                          label="State"
                          columns={statesColumns}
                          textField="StateAbb"
                          onOpen={() =>
                            setIsOpen({
                              ...isOpen,
                              shipping: true,
                            })
                          }
                          onClose={() =>
                            setIsOpen({
                              ...isOpen,
                              shipping: false,
                            })
                          }
                          iconClassName={
                            isOpen.shipping
                              ? 'k-icon k-i-arrow-n'
                              : 'k-icon k-i-arrow-s'
                          }
                        />
                      )}
                    />
                  </BillingShippingWrapper>
                  <BillingShippingWrapper width="25%">
                    <Controller
                      control={control}
                      name="ShipZip"
                      render={({ field }) => (
                        <MaskedTextBox
                          {...field}
                          label="Zip"
                          mask="00000"
                          value={field.value || ''}
                        />
                      )}
                    />
                  </BillingShippingWrapper>
                </FieldsWrapper>
              </ShippingCol3>
              <ShippingCol1>
                <TimeWrapper>
                  <Controller
                    control={control}
                    name="TimeOpen"
                    render={({ field }) => (
                      <TimePicker
                        {...field}
                        value={
                          typeof field.value === 'string'
                            ? new Date(field.value)
                            : field.value
                        }
                        placeholder="Time Open"
                        width="100%"
                      />
                    )}
                  />
                  <Controller
                    control={control}
                    name="TimeClose"
                    render={({ field }) => (
                      <TimePicker
                        {...field}
                        value={
                          typeof field.value === 'string'
                            ? new Date(field.value)
                            : field.value
                        }
                        placeholder="Time Close"
                        width="100%"
                      />
                    )}
                  />
                </TimeWrapper>
              </ShippingCol1>
            </ShippingWrapper>
          </Fieldset>
        </BillingAndShippingWrapper>

        {/* Credit information */}
        <Fieldset>
          <legend>Credit Information</legend>
          <CreditFieldWrapper width="20%">
            <Controller
              control={control}
              name="TermsDueDays"
              render={({ field }) => (
                <DropDownList
                  {...field}
                  style={{ width: '100%' }}
                  data={paymentTerms.map((term) => term?.TermsCode)}
                  label="Payment Terms"
                  onOpen={() =>
                    setIsOpen({
                      ...isOpen,
                      payments: true,
                    })
                  }
                  onClose={() =>
                    setIsOpen({
                      ...isOpen,
                      payments: false,
                    })
                  }
                  iconClassName={
                    isOpen.payments
                      ? 'k-icon k-i-arrow-n'
                      : 'k-icon k-i-arrow-s'
                  }
                />
              )}
            />
          </CreditFieldWrapper>

          <CreditFieldWrapper width="10%">
            <Controller
              control={control}
              name="CreditHoldYN"
              render={({ field }) => (
                <DropDownList
                  {...field}
                  value={field.value?.toString()}
                  defaultValue={'No'}
                  style={{ width: '100%' }}
                  data={['Yes', 'No']}
                  label="Credit Hold"
                  onOpen={() =>
                    setIsOpen({
                      ...isOpen,
                      credit: true,
                    })
                  }
                  onClose={() =>
                    setIsOpen({
                      ...isOpen,
                      credit: false,
                    })
                  }
                  iconClassName={
                    isOpen.credit ? 'k-icon k-i-arrow-n' : 'k-icon k-i-arrow-s'
                  }
                />
              )}
            />
          </CreditFieldWrapper>

          <CreditFieldWrapper width="15%">
            <Controller
              control={control}
              name="CreditLimit"
              render={({ field }) => (
                <NumericTextBox
                  style={{ width: '100%' }}
                  {...field}
                  min={0}
                  max={99999999}
                  label="Credit Limit"
                  format="n0"
                />
              )}
            />
          </CreditFieldWrapper>

          <CreditFieldWrapper width="15%">
            <Controller
              control={control}
              name="CreditReportingAgency"
              render={({ field }) => (
                <Input
                  style={{ width: '100%' }}
                  {...field}
                  value={field.value || ''}
                  type="text"
                  label="Credit Agency"
                />
              )}
            />
          </CreditFieldWrapper>

          <CreditFieldWrapper width="15%">
            <Controller
              control={control}
              name="CreditRating"
              render={({ field }) => (
                <Input
                  style={{ width: '100%' }}
                  {...field}
                  value={field.value || ''}
                  label="Credit Rating"
                />
              )}
            />
          </CreditFieldWrapper>

          <CreditFieldWrapper width="25%">
            <Controller
              control={control}
              name="CreditApprovedBy"
              render={({ field }) => (
                <DropDownList
                  {...field}
                  style={{ width: '100%' }}
                  data={subUsers.map((user) => user?.LoginUserName)}
                  label="Approved By"
                  onOpen={() =>
                    setIsOpen({
                      ...isOpen,
                      approved: true,
                    })
                  }
                  onClose={() =>
                    setIsOpen({
                      ...isOpen,
                      approved: false,
                    })
                  }
                  iconClassName={
                    isOpen.approved
                      ? 'k-icon k-i-arrow-n'
                      : 'k-icon k-i-arrow-s'
                  }
                />
              )}
            />
          </CreditFieldWrapper>
        </Fieldset>

        <Fieldset>
          <Controller
            control={control}
            name="Notes"
            render={({ field }) => (
              <FloatingLabel
                label="Notes"
                editorId="textarea-id"
                editorValue={field.value}
                style={{ width: '100%' }}
              >
                <Notes {...field} id="textarea-id" autoSize={true} />
              </FloatingLabel>
            )}
          />
        </Fieldset>
        <ButtonWrapper>
          <Button disabled={!isValid}>Save</Button>
          <Button onClick={onClose} type="button">
            Cancel
          </Button>
        </ButtonWrapper>
      </Form>
    </Window>
  );
};

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const ShippingWrapper = styled.div`
  display: flex;
  gap: 0.5rem;
  width: 100%;
`;

const ShippingCol3 = styled.div`
  flex: 1 1 70%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const ShippingCol1 = styled.div`
  flex: 1 1 30%;
  margin-top: 30px;
`;

const CreditFieldWrapper = styled.form<{ width: string }>`
  flex-basis: ${(props) => props.width};
`;

const BillingShippingWrapper = styled.form<{ width: string }>`
  flex-basis: ${(props) => props.width};
`;

const BillingWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const BillingAndShippingWrapper = styled.div`
  display: grid;
  grid-template-columns: 40% 59%;
  gap: 1rem;
  @media (max-width: 768px) {
    grid-template-columns: 100%;
  }
`;

const InputWrapper = styled.div`
  flex: 1 1 22%;
`;

const ButtonWrapper = styled.div`
  display: flex;
  gap: 15px;
  margin-top: 7px;
  align-items: center;
  justify-content: flex-end;
`;

const TimeWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  @media (min-width: 768px) {
    flex-direction: row;
    flex-wrap: wrap;
    gap: 1rem;
  }
`;

const FieldsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  @media (min-width: 768px) {
    flex-direction: row;
    justify-content: space-between;
    gap: 0.5rem;
  }
  &.address {
    width: 100%;
    @media (min-width: 768px) {
      flex-direction: row;
      & > span {
        flex: 1;
      }
    }
  }
`;

const Notes = styled(TextArea)`
  width: 100%;
  height: 5rem;
`;

const Fieldset = styled.fieldset`
  display: flex;
  flex-direction: column;
  flex: 1;
  padding: 0;
  gap: 0.5rem;
  border: none;
  @media (min-width: 768px) {
    flex-direction: row;
    justify-content: space-between;
  }

  legend {
    color: #2c5098;
    font-weight: 600;
  }

  .k-floating-label-container.full-width {
    width: 100%;
  }

  .k-floating-label-container.k-empty > .k-label {
    top: 15.0000000004px;
  }

  .k-floating-label-container {
    padding-top: 10.0000000004px;
    color: rgba(0, 0, 0, 0.6);
  }

  .k-floating-label-container > .k-label,
  .k-floating-label-container > .k-label {
    left: 8px;
    font-size: 12px;
    padding-left: 3px;
    padding-right: 3px;
  }

  .k-floating-label-container:focus-within > .k-label {
    top: 0px;
    left: 8px;
    font-size: 12px;
    padding-left: 3px;
    padding-right: 3px;
  }
`;
