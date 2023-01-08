import clsx from 'clsx'
import styles from './textArea.module.css'

const TextareaBox = function TextArea({
    label,
    className,
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
                <textarea
                    className={clsx(styles.floating_textArea, size && styles[size])}
                    placeholder=" "
                    required={required}
                    autoComplete={autoComplete}
                    onChange={onChange}
                    value={value}
                    rows={4}
                />
                <label className={styles.label}>{label}</label>
                {error ? (
                    <div className={styles.error}>{errorMessage}</div>
                ) : (
                    <div className={styles.empty} />
                )}
            </div>
        </div>
    )
}

export default TextareaBox
