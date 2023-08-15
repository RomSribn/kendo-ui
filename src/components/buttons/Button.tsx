import React, { ReactNode } from 'react';
import {
  Button as KendoButton,
  ButtonProps,
} from '@progress/kendo-react-buttons';
import { EColor } from '../../constants';
import { css, styled } from 'styled-components';

type TVariant = 'primary' | 'secondary' | 'tertiary';
interface IProps extends ButtonProps {
  children: ReactNode;
  variant?: TVariant;
}

export const Button: React.FC<IProps> = ({
  children,
  variant = 'primary',
  ...props
}) => {
  return (
    <StyledButton variant={variant} {...props}>
      {children}
    </StyledButton>
  );
};

const StyledButton = styled(KendoButton)<{ variant?: TVariant }>`
  &.k-button {
    ${({ variant }) => {
      switch (variant) {
        case 'secondary':
          return css`
            padding-block: 8px;
            padding-inline: 12px;
            background-color: ${EColor.LIGHT_GRAY};
            border-color: ${EColor.LIGHT_GRAY};
            color: ${EColor.BLACK};
          `;
        case 'tertiary':
          return css`
            background-color: var(--color-tertiary);
            border-color: var(--color-tertiary);
            color: var(--color-white);
          `;

        default:
          return css`
            padding-block: 8px;
            padding-inline: 12px;
            background-color: ${EColor.GREEN_BLUE};
            border-color: ${EColor.GREEN_BLUE};
            color: ${EColor.WHITE};
            text-transform: uppercase;
          `;
      }
    }}

    &:hover {
      ${({ variant }) => {
        switch (variant) {
          case 'secondary':
            return css`
              filter: brightness(0.9);
            `;
          case 'tertiary':
            return css`
              filter: brightness(0.9);
            `;

          default:
            return css`
              background-color: rgb(46, 99, 115);
            `;
        }
      }}
    }
  }
`;
