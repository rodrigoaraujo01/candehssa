import { useState, useRef, useEffect } from 'react'
import styles from './ConditionSearch.module.css'

export default function ConditionSearch({ conditions, onSelect }) {
  const [query, setQuery] = useState('')
  const [open, setOpen] = useState(false)
  const wrapperRef = useRef(null)

  const filtered = query.trim()
    ? conditions.filter(
        c =>
          c.name.toLowerCase().includes(query.toLowerCase()) ||
          (c.type && c.type.toLowerCase().includes(query.toLowerCase()))
      )
    : conditions

  useEffect(() => {
    function handleClickOutside(e) {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target)) {
        setOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  function handleSelect(name) {
    onSelect(name)
    setQuery('')
    setOpen(false)
  }

  function handleKeyDown(e) {
    if (e.key === 'Escape') {
      setOpen(false)
      setQuery('')
    }
  }

  return (
    <div className={styles.wrapper} ref={wrapperRef}>
      <input
        type="text"
        className={styles.input}
        value={query}
        placeholder="Buscar e adicionar condição..."
        onChange={e => {
          setQuery(e.target.value)
          setOpen(true)
        }}
        onFocus={() => setOpen(true)}
        onKeyDown={handleKeyDown}
        autoComplete="off"
        spellCheck={false}
      />
      {open && filtered.length > 0 && (
        <ul className={styles.dropdown}>
          {filtered.map(c => (
            <li
              key={c.name}
              className={styles.dropdownItem}
              onMouseDown={() => handleSelect(c.name)}
            >
              <span className={styles.itemName}>{c.name}</span>
              {c.type && <span className={styles.itemType}>{c.type}</span>}
            </li>
          ))}
        </ul>
      )}
      {open && filtered.length === 0 && query.trim() && (
        <div className={styles.dropdownEmpty}>Nenhuma condição encontrada.</div>
      )}
    </div>
  )
}
