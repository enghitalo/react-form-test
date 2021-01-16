import React, { useEffect, useRef, useState, useCallback, InputHTMLAttributes } from 'react';
import { useField } from '@unform/core';
import { ContainerInput } from './styles';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
}

const Input: React.FC<InputProps> = ({ name, type, ...rest }) => {

  const inputRef = useRef<HTMLInputElement>(null);
  const { fieldName, defaultValue, registerField, error } = useField(name);
  const [isFocused, setIsFocused] = useState(false);
  const [isFilled, setIsFilled] = useState(false);
  const handleInputFocus = useCallback(() => {
    setIsFocused(true);
  }, []);
  const handleInputBlur = useCallback(() => {
    setIsFocused(false);
    setIsFilled(!!inputRef.current?.value);
  }, []);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRef.current,
      path: 'value',
    });
  }, [fieldName, registerField]);

  return (
    <div>
      <ContainerInput isErrored={!!error} isFilled={isFilled} isFocused={isFocused}  >

        <input onFocus={handleInputFocus}
          onBlur={handleInputBlur}
          defaultValue={defaultValue}
          ref={inputRef}
          {...rest}
          type={type}
        >
        </input>

      </ContainerInput>
      {error && (
        <div style={{ color: "red" }} >{"* " + error}
        </div>
      )}
    </div>
  )
}

export default Input;