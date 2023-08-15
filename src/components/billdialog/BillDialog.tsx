import React, { useState, useEffect } from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import styled from 'styled-components';

import { Window } from '@progress/kendo-react-dialogs';
import { Grid, GridColumn } from '@progress/kendo-react-grid';

import { DatePicker } from '@progress/kendo-react-dateinputs';
import { DropDownList } from '@progress/kendo-react-dropdowns';
import { Input } from '@progress/kendo-react-inputs';
import { Button } from 'components';
import { validateForm } from 'utils/validate';
import { IState, IApprovingUser, ITermsCode } from 'data/types';
import data from './table-data.json';

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

const regex: { [key: string]: RegExp } = {
  FID: /^_{7}-_{2}$/,
  MainPhone: /^_{3}-_{3}-_{4}$/,
  OtherPhone: /^_{3}-_{3}-_{4}$/,
  Zip: /^_{5}$/,
  ShipZip: /^_{5}$/,
};

export const BillDialog: React.FC<ICustomerDialogProps> = ({
  onClose,
  onSubmit,
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
      title="Bill"
      onClose={onClose}
      maximizeButton={() => null}
      resizable={false}
      width={800}
      height={600}
    >
      <Form onSubmit={handleFormSubmit}>
        {/* Header */}
        <Fieldset style={{ display: 'flex', justifyContent: 'flex-start' }}>
          <span>A/P</span>
          <CreditFieldWrapper width="125px">
            <Controller
              control={control}
              name="TermsDueDays"
              defaultValue={20110}
              render={({ field }) => (
                <DropDownList
                  {...field}
                  style={{ width: '100%' }}
                  data={['20110']}
                  label=""
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

          <CreditFieldWrapper width="150px">
            <DatePicker placeholder="Posting date" />
          </CreditFieldWrapper>
        </Fieldset>

        {/* Medium */}
        <MediumWrapper>
          <Fieldset>
            <MediumColumnWrapper width="300px">
              <div>
                <Controller
                  control={control}
                  name="Vendor"
                  render={({ field }) => (
                    <DropDownList
                      {...field}
                      style={{ width: '100%' }}
                      data={['1', '2', '3']}
                      label="Vendor"
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
                <div style={{ paddingLeft: 8, marginTop: 10 }}>
                  <div>Address</div>
                  <div>City, St, Zip</div>
                </div>
              </div>
              <Controller
                control={control}
                name="Memo"
                render={({ field }) => (
                  <Input style={{ width: '100%' }} {...field} label="Memo" />
                )}
              />
            </MediumColumnWrapper>
          </Fieldset>

          {/* Shipping Address information */}
          <Fieldset style={{ width: 150 }}>
            <MediumColumnWrapper width="150px">
              <Controller
                control={control}
                name="Bill Number"
                render={({ field }) => (
                  <Input
                    style={{ width: '100%' }}
                    {...field}
                    label="Bill Number"
                  />
                )}
              />

              <Controller
                control={control}
                name="Our Reference"
                render={({ field }) => (
                  <Input
                    style={{ width: '100%' }}
                    {...field}
                    label="Our Reference"
                  />
                )}
              />
              <DatePicker label="Bill date" />

              <Controller
                control={control}
                name="Terms"
                render={({ field }) => (
                  <DropDownList
                    {...field}
                    style={{ width: '100%' }}
                    data={['20110']}
                    label="Terms"
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
            </MediumColumnWrapper>
          </Fieldset>

          <Fieldset style={{ width: '100%' }}>
            <MediumColumnWrapper width="100%">
              <MediumColumn3>
                <div>
                  <span>Due</span>
                  <span>12/23/23</span>
                </div>
                <div>
                  <span>Total</span>
                  <span>12/23/23</span>
                </div>
              </MediumColumn3>
            </MediumColumnWrapper>
          </Fieldset>
        </MediumWrapper>

        <Grid
          style={{
            height: '210px',
          }}
          data={data}
        >
          <GridColumn
            field="Account"
            title="Account"
            width={100}
            cell={(a) => (
              <td style={{ padding: 0 }}>
                <DropDownList
                  data={['20110']}
                  style={{ height: 35 }}
                  label=""
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
              </td>
            )}
          />
          <GridColumn
            field="ChargeTo"
            title="Charge To"
            cell={() => (
              <td style={{ padding: 0 }}>
                <DropDownList
                  data={['1', '2', '3']}
                  style={{ height: 35 }}
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
              </td>
            )}
          />
          <GridColumn field="Amount" title="Amount" width={80} />
          <GridColumn field="Loc" title="Loc" width={80} />
          <GridColumn field="Reference" title="Reference" />
          <GridColumn field="Memo" title="Memo" />
        </Grid>

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

const MediumColumnWrapper = styled.div<{ width: string }>`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: ${(props) => props.width};
  gap: 0.5rem;
  height: 100%;
`;

const MediumColumn3 = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;

  div {
    display: flex;
    flex-direction: column;
    margin-bottom: 10px;

    span:nth-child(2) {
      color: #5858ff;
    }
  }
`;

const CreditFieldWrapper = styled.form<{ width: string }>`
  flex-basis: ${(props) => props.width};
  margin-top: auto;
`;

const MediumWrapper = styled.div`
  display: flex;
  gap: 1rem;
  padding-left: 30px;
  padding-bottom: 10px;
  border: 2px solid #7197ce;

  @media (max-width: 768px) {
    grid-template-columns: 100%;
  }
`;

const ButtonWrapper = styled.div`
  display: flex;
  gap: 15px;
  margin-top: 7px;
  align-items: center;
  justify-content: flex-end;
`;

const Fieldset = styled.fieldset`
  display: flex;
  flex-direction: column;
  padding: 0;
  gap: 0.5rem;
  border: none;
  align-items: center;
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
