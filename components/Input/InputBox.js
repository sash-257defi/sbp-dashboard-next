import clsx from 'clsx';
import styles from './inputBox.module.css';
const InputBox = function Input({
  label,
  className,
  htmlType,
  autoComplete,
  size,
  required,
  error,
  errorMessage,
  value,
  onChange,
}) {
  return (
    <div className={clsx(styles.root, className)}>
      <div className={styles.floating_label}>
        <input
          className={clsx(
            error ? styles.error_floating_input : styles.floating_input,
            size && styles[size]
          )}
          type={htmlType}
          placeholder=" "
          required={required}
          autoComplete={autoComplete}
          onChange={onChange}
          value={value}
        />
        <label className={size === 'small' ? styles.small_label : styles.label}>
          {label}
        </label>
        {errorMessage &&
          (error ? (
            <div className={styles.error}>{errorMessage}</div>
          ) : (
            <div className={styles.empty} />
          ))}
      </div>
    </div>
  );
};

export default InputBox;
