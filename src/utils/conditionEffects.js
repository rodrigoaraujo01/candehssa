import { CONDITIONS_MAP } from '../data/conditions'

const EN_DASH = '–'

function isConditionRef(text) {
  return Boolean(CONDITIONS_MAP[text])
}

// Recursively expand a condition into atomic { text, chain } objects.
// chain[0] is the top-level active condition; chain[last] is the direct source.
function expandConditionEffects(conditionName, visited = new Set()) {
  if (visited.has(conditionName)) return []
  const newVisited = new Set(visited)
  newVisited.add(conditionName)

  const condition = CONDITIONS_MAP[conditionName]
  if (!condition) return []

  const result = []
  for (const effect of condition.effects) {
    if (isConditionRef(effect)) {
      const subEffects = expandConditionEffects(effect, newVisited)
      result.push(
        ...subEffects.map(e => ({ ...e, chain: [conditionName, ...e.chain] }))
      )
    } else {
      result.push({ text: effect, chain: [conditionName] })
    }
  }
  return result
}

// Parse a numeric effect string.
// '–2 em testes de perícia' → { value: -2, category: 'em testes de perícia' }
// '+5 na Defesa (distância)'  → { value: 5,  category: 'na Defesa (distância)' }
// Returns null if not a numeric effect.
function parseNumericEffect(text) {
  const match = text.match(/^([+\-–])(\d+)\s+(.+)$/)
  if (!match) return null
  const sign = match[1] === '+' ? 1 : -1
  const value = parseInt(match[2]) * sign
  const category = match[3]
  return { value, category }
}

export function formatValue(value) {
  if (value > 0) return `+${value}`
  return `${EN_DASH}${Math.abs(value)}`
}

// ['Exausto', 'Debilitado'] → 'Exausto → Debilitado'
export function formatChain(chain) {
  return chain.join(' → ')
}

// Compute consolidated effects from an array of active condition objects.
// Returns { numeric, qualitative, expansionByCondition }
export function computeConsolidatedEffects(activeConditions) {
  const expansionByCondition = {}
  const allExpanded = []

  for (const condition of activeConditions) {
    const expanded = expandConditionEffects(condition.name)
    expansionByCondition[condition.name] = expanded
    allExpanded.push(...expanded)
  }

  // category → { category, total, components: [{ value, chain }] }
  const numericMap = new Map()
  // text → { text, chains: string[][] }
  const qualitativeMap = new Map()

  for (const { text, chain } of allExpanded) {
    const numeric = parseNumericEffect(text)
    if (numeric) {
      if (!numericMap.has(numeric.category)) {
        numericMap.set(numeric.category, {
          category: numeric.category,
          total: 0,
          components: [],
        })
      }
      const entry = numericMap.get(numeric.category)
      entry.total += numeric.value
      entry.components.push({ value: numeric.value, chain })
    } else {
      if (!qualitativeMap.has(text)) {
        qualitativeMap.set(text, { text, chains: [] })
      }
      qualitativeMap.get(text).chains.push(chain)
    }
  }

  return {
    numeric: Array.from(numericMap.values()),
    qualitative: Array.from(qualitativeMap.values()),
    expansionByCondition,
  }
}
