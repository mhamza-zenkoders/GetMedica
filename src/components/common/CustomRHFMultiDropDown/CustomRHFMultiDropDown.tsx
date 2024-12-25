
import React, {FC} from 'react';
import {Control, Controller} from 'react-hook-form';
import {KeyboardType, View, ViewStyle} from 'react-native';
import CustomTextInput from '../CustomTextInput';
import CustomDropDown from '../CustomDropDown';
import CustomMultiDropDown from '../CustomMultiDropDown';

const CustomRHFMultiDropDown: FC<{
  control: Control;
  name: string;
  label?: string;
  rules?: any;
  data: any;
  required?: boolean;
  defaultValue?: any;
  search?: boolean;
  containerStyle?: ViewStyle;
  onChangeValue?: () => void;
}> = ({
  control,
  required,
  name,
  rules,
  data,
  defaultValue,
  label,
  search,
  containerStyle,
  onChangeValue,
}) => {
  return (
    <>
      <Controller
        control={control}
        name={name}
        rules={rules}
        defaultValue={defaultValue || []}
        key={name}
        render={({field: {onBlur, onChange, value}, fieldState: {error}}) => (
          <CustomMultiDropDown
            value={value}
            error={error?.message}
            containerStyle={containerStyle}
            required={required}
            data={data}
            // search={search}
            label={label}
            // defaultValue={defaultValue}
            onChangeItem={item => {
              onChange(item);
              onChangeValue && onChangeValue();
            }}
          />
        )}
      />
    </>
  );
};

export default CustomRHFMultiDropDown;
