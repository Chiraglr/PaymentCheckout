/* eslint-disable react-hooks/rules-of-hooks */
import React, { useCallback } from "react";
import NumberFormat from "react-number-format";
import { useDropzone } from "react-dropzone";
// import Radio from "../Input/Radio";
import styles from './Input.module.scss';

export default function Input(props) {
  const { type, value, className, placeholder, inputClassName, onChange, options, disabled, variant, label,
    endLabel, endLabelClassName, onClickEndLabel, ...rest } = props;

  switch (type) {
  case "text":
    return (
      <div className={`flex flex-col ${className}`}>
        <input
          className={`rounded-lg border border-[#CECECE] py-3 outline-none text-xs sm:text-base font-semibold pl-2
         ${disabled ? 'bg-disabled text-subtle' : ''} ${styles.input} ${inputClassName}`}
          type="text"
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          disabled={disabled}
          {...rest}
        />
        <span className="warning text-sm text-error-red" />
      </div>
    );
  case "select":
    return (
      <div className={`flex flex-col ${className}`}>
        <div>
          <select
            className={`select-wrapper rounded-lg border-[#CECECE] ${(value === '' || !value) ? 'text-subtle text-base' : 'text-base font-bold'}  
        pl-2 py-3 border outline-none ${disabled ? 'bg-disabled text-subtle' : ''} ${styles.input} ${inputClassName}`}
            value={value}
            onChange={onChange}
            disabled={disabled}
            {...rest}
          >
            <option disabled selected hidden value="">
              {placeholder ?? "-- select an option --"}
            </option>
            {options.map((it) => {
              let optionValue;
              let optionLabel;
              if (typeof it === 'object') {
                optionValue = it.value;
                optionLabel = it.label;
              } else {
                optionLabel = it;
                optionValue = it;
              }
              return <option value={optionValue}>{optionLabel}</option>;
            })}
          </select>
        </div>
        <span className="warning text-sm text-error-red" />
      </div>
    );
  case "number2":
    return (
      <div className={`flex flex-col ${className}`}>
        <div className={styles.group}>
          <input
            className={`w-full pl-2 py-2 text-base font-bold outline-none 
            ${disabled ? 'bg-disabled text-subtle' : ''} ${styles.input2} ${inputClassName}`}
            type="number"
            value={value}
            onChange={onChange}
            disabled={disabled}
            {...rest}
            required
          />
          <span className={styles.highlight} />
          <span className={styles.bar} />
          <label className={styles.label}>{label}</label>
          <span className="hidden warningup" />
        </div>
        <span className="warning text-sm text-error-red" />
      </div>
    );
  case "number":
    return (
      <div className={`flex flex-col ${className}`}>
        <input
          className={`rounded-lg pl-2 border py-3 text-base font-bold border-[#CECECE] outline-none 
          ${disabled ? 'bg-disabled text-subtle' : ''} ${styles.input} ${inputClassName}`}
          type="number"
          value={value}
          onChange={onChange}
          disabled={disabled}
          {...rest}
          placeholder={placeholder}
        />
        <span className="warning text-sm text-error-red" />
      </div>
    );
  case "email":
    return (
      <div className={`flex flex-col ${className}`}>
        <input
          className={`rounded-lg border-[#CECECE] text-base font-bold py-3 pl-2 border outline-none 
          ${disabled ? 'bg-disabled text-subtle' : ''} ${styles.input} ${inputClassName} `}
          type="email"
          value={value}
          disabled={disabled}
          onChange={onChange}
          {...rest}
          placeholder={placeholder}
        />
        <span className="warning text-sm text-error-red" />
      </div>
    );
  case "tel2":
    return (
      <div className={`flex flex-col ${className}`}>
        <div className={styles.group}>
          <input
            className={`w-full pl-2 py-2 text-base font-bold outline-none ${endLabel ? 'pr-16' : ''} 
            ${disabled ? 'bg-disabled text-subtle' : ''} ${styles.input2} ${inputClassName}`}
            type="tel"
            value={value}
            onChange={onChange}
            disabled={disabled}
            {...rest}
            required
          />
          <span className={styles.highlight} />
          <span className={styles.bar} />
          <label className={styles.label}>{label}</label>
          {endLabel && <span className={`${styles.endLabel} ${endLabelClassName}`} onClick={onClickEndLabel}>
            {endLabel}
          </span>}
          <span className="hidden warningup" />
        </div>
        <span className="warning text-sm text-error-red" />
      </div>
    );
  case "tel":
    return (
      <div className={`flex flex-col ${className}`}>
        <input
          className={`rounded-lg border-[#CECECE] text-xs sm:text-base font-bold py-3 pl-2 border outline-none 
          ${disabled ? 'bg-disabled text-subtle' : ''} ${styles.input} ${inputClassName}`}
          type="tel"
          value={value}
          onChange={onChange}
          disabled={disabled}
          placeholder={placeholder}
          {...rest}
        />
        <span className="warning text-sm text-error-red" />
      </div>
    );
  case "numberText":
    return (
      <div className={`flex flex-col ${className}`}>
        <NumberFormat
          className={`rounded-lg border-[#CECECE] text-xs md:text-base font-bold border outline-none 
          ${disabled ? 'bg-disabled text-subtle' : ''} ${styles.input} ${inputClassName}`}
          allowNegative={false}
          value={value}
          disabled={disabled}
          isNumericString
          onValueChange={(e) => onChange(e.value)}
          placeholder={placeholder}
          {...rest}
        />
        <span className="warning text-sm text-error-red" />
      </div>
    );
  case "fileBtn":
  {
    const onDrop = useCallback(
      (acceptedFiles, rejectionFiles) => onChange(acceptedFiles, rejectionFiles), [],
    );
    const { getRootProps, getInputProps } = useDropzone({ noDrag: true,
      onDrop,
      disabled,
      maxFiles: props.maxFiles,
      maxSize: props.maxSize,
      accept: props.accept,
    });

    return (
      <div className={`inline-block ${className}`}>
        <div {...getRootProps({ className: `inline-block text-center py-2 px-5 bg-medium-yellow 
        cursor-pointer rounded-lg text-xs font-extrabold
       ${disabled ? 'opacity-30' : ''} ${inputClassName}` })}
        >
          <input {...getInputProps()} />
          <p>{placeholder}</p>
        </div>
        <span className="warning text-sm text-error-red">{props.warning}</span>
      </div>
    );
  }

  // case 'radioGroup':
  //   return (
  //     <div className={`flex space-x-5 ${className}`}>
  //       {options.map(({ value: optionValue, label, required, disabled: optionDisabled }) => <Radio
  //         key={optionValue}
  //         type={variant}
  //         value={optionValue}
  //         label={label}
  //         onChange={() => onChange(optionValue)}
  //         checked={optionValue === value}
  //         required={required}
  //         disabled={optionDisabled}
  //         {...rest}
  //       />)}
  //       <span className="warning text-sm text-error-red" />
  //     </div>
  //   );
  default:
  }
};
