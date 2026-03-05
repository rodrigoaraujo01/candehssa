import styles from './Button.module.css'

export default function Button({ children, variant = 'primary', disabled, loading, ...props }) {
  return (
    <button
      className={`${styles.button} ${styles[variant]}`}
      disabled={disabled || loading}
      {...props}
    >
      {loading ? 'Aguarde...' : children}
    </button>
  )
}
