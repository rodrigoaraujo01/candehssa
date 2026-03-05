import { useState } from 'react'
import Button from '../common/Button'
import Input from '../common/Input'
import { useAuth } from '../../contexts/AuthContext'
import styles from './LoginForm.module.css'

export default function LoginForm() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isSignUp, setIsSignUp] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [success, setSuccess] = useState(null)
  const { signIn, signUp } = useAuth()

  async function handleSubmit(e) {
    e.preventDefault()
    setError(null)
    setSuccess(null)
    setLoading(true)

    if (isSignUp) {
      const { error } = await signUp(email, password)
      setLoading(false)
      if (error) {
        setError(error.message)
      } else {
        setSuccess('Conta criada! Entrando...')
      }
    } else {
      const { error } = await signIn(email, password)
      setLoading(false)
      if (error) {
        setError(error.message)
      }
    }
  }

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <Input
        label="Email"
        type="email"
        placeholder="seu@email.com"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <Input
        label="Senha"
        type="password"
        placeholder="Sua senha"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
        minLength={6}
      />
      {error && <p className={styles.error}>{error}</p>}
      {success && <p className={styles.success}>{success}</p>}
      <Button type="submit" loading={loading}>
        {isSignUp ? 'Criar conta' : 'Entrar'}
      </Button>
      <button
        type="button"
        className={styles.toggle}
        onClick={() => { setIsSignUp(!isSignUp); setError(null); setSuccess(null) }}
      >
        {isSignUp ? 'Já tem conta? Entrar' : 'Não tem conta? Criar uma'}
      </button>
    </form>
  )
}
