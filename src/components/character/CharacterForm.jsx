import { useState } from 'react'
import Button from '../common/Button'
import Input from '../common/Input'
import styles from './CharacterForm.module.css'

export default function CharacterForm({ onSubmit, initialData }) {
  const [name, setName] = useState(initialData?.name || '')
  const [race, setRace] = useState(initialData?.race || '')
  const [level, setLevel] = useState(initialData?.level || 1)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  async function handleSubmit(e) {
    e.preventDefault()
    setError(null)
    setLoading(true)

    const { error } = await onSubmit({ name, race, level: Number(level) })

    setLoading(false)
    if (error) {
      setError(error.message)
    }
  }

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <Input
        label="Nome do personagem"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Ex: Thorin"
        required
      />
      <Input
        label="Raça"
        value={race}
        onChange={(e) => setRace(e.target.value)}
        placeholder="Ex: Anão"
        required
      />
      <Input
        label="Nível"
        type="number"
        min="1"
        max="20"
        value={level}
        onChange={(e) => setLevel(e.target.value)}
        required
      />
      {error && <p className={styles.error}>{error}</p>}
      <Button type="submit" loading={loading}>
        {initialData ? 'Salvar alterações' : 'Criar personagem'}
      </Button>
    </form>
  )
}
