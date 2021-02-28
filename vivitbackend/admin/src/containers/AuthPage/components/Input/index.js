import React from 'react';
import { Inputs } from '@buffetjs/custom';
import PropTypes from 'prop-types';
import { useIntl } from 'react-intl';
import styled, {css} from 'styled-components';
import theme from '../../../../themes';

const InputSyled = styled(Inputs)`


`

const Input = ({ error, label, placeholder, ...rest }) => {
  const { formatMessage } = useIntl();
  const labelMessage = formatMessage({ id: label });
  const placeholderMessage = placeholder ? formatMessage({ id: placeholder }) : '';
  let errorMessage = error;

  if (error) {
    errorMessage = formatMessage(error);
  }

  return (
    <InputSyled style={{height: 50, borderRadius: 10, borderColor: theme.main.colors.vivitD.PersioanGreen}} {...rest} error={errorMessage} label={labelMessage} placeholder={placeholderMessage} />
  );
};

Input.defaultProps = {
  error: null,
  placeholder: null,
};

Input.propTypes = {
  error: PropTypes.object,
  label: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
};

export default Input;
