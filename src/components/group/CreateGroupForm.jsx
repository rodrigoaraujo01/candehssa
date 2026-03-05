import { useState } from 'react'
import Button from '../common/Button'
import Input from '../common/Input'
import styles from './GroupForm.module.css'

export default function CreateGroupForm({ onSubmit }) {
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
      setError(error.message)
    }
  }

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <h3>Criar novo grupo</h3>
      <Input
        label="Nome do grupo"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Ex: Os Destemidos"
        required
      />
      <Input
        label="Senha do grupo"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Escolha uma senha para o grupo"
        required
      />
      {error && <p className={styles.error}>{error}</p>}
      <Button type="submit" loading={loading}>
        Criar grupo
      </Button>
    </form>
  )
}
