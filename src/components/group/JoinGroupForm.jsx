import { useState } from 'react'
import Button from '../common/Button'
import Input from '../common/Input'
import styles from './GroupForm.module.css'

export default function JoinGroupForm({ onSubmit }) {
  const [name, setName] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  async function handleSubmit(e) {
    e.preventDefault()
    setError(null)
    setLoading(true)

    const { error } = await onSubmit(name, password)

    setLoading(false)
    if (error) {
      setError(error.message || 'Nome ou senha inválidos.')
    }
  }

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <h3>Entrar em um grupo</h3>
      <Input
        label="Nome do grupo"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Nome do grupo existente"
        required
      />
      <Input
        label="Senha"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Senha do grupo"
        required
      />
      {error && <p className={styles.error}>{error}</p>}
      <Button type="submit" variant="secondary" loading={loading}>
        Entrar no grupo
      </Button>
    </form>
  )
}
