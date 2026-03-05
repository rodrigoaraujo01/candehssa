# Plano: Candehssa - App Companheiro de RPG

## Contexto

O grupo de RPG precisa de um aplicativo web para rastrear Pontos de Amizade entre PJs e NPCs na cidade de Candeh'ssa. O app será hospedado no GitHub Pages (site estático) e usará Supabase como backend.

## Decisões Técnicas

- **Stack**: React + Vite (JavaScript, sem TypeScript)
- **Roteamento**: `react-router-dom` com `HashRouter` (necessário para GitHub Pages)
- **Estilização**: CSS Modules + CSS Variables (sem Tailwind/styled-components)
- **Estado**: React Context (`AuthContext` + `PlayerContext`), sem Redux
- **Auth**: Magic link por email (Supabase Auth)
- **Visual**: Fundo bege claro (#F5F0E8), fontes serifadas modernas (Playfair Display + Source Serif 4), minimalista
- **Dados**: Placeholders para locais/NPCs/habilidades (serão substituídos depois)

## Estrutura de Arquivos

```
Candehssa/
  src/
    components/
      common/          # Button, Card, Input, Loading, Layout, ProtectedRoute, FriendshipMeter
      auth/            # LoginForm
      character/       # CharacterForm
      group/           # CreateGroupForm, JoinGroupForm, GroupInfo
      map/             # LocationCard
      npc/             # NpcCard, AbilityList, MissionPanel
    contexts/
      AuthContext.jsx   # Sessão Supabase, signInWithOtp, signOut
      PlayerContext.jsx # Player atual, grupo, redirecionamentos
    hooks/
      useLocations.js, useNpcs.js, useNpcDetail.js, useDiscoveredNpcs.js, useFriendship.js
    lib/
      supabase.js       # Cliente Supabase (URL + anon key via env vars)
    pages/
      LandingPage.jsx, CreateCharacterPage.jsx, GroupPage.jsx,
      MapPage.jsx, LocationDetailPage.jsx, NpcDetailPage.jsx, AuthCallbackPage.jsx
    styles/
      variables.css     # Design tokens (cores, fontes, espaçamento)
      global.css        # Reset + estilos base
    App.jsx             # Router + providers
    main.jsx            # Entry point
  index.html
  vite.config.js        # base: '/Candehssa/'
  .env.example          # VITE_SUPABASE_URL, VITE_SUPABASE_ANON_KEY
```

## Rotas

| Rota | Página | Descrição |
|---|---|---|
| `/` | LandingPage | Login com magic link |
| `/auth/callback` | AuthCallbackPage | Processa retorno do magic link |
| `/criar-personagem` | CreateCharacterPage | Criar PJ (nome, raça, nível) |
| `/grupo` | GroupPage | Criar ou entrar em grupo |
| `/mapa` | MapPage | Grid com 10 locais da cidade |
| `/local/:id` | LocationDetailPage | NPCs do local + botão "Descobrir" |
| `/npc/:id` | NpcDetailPage | Amizade, habilidades, missão final |

## Schema do Banco de Dados (Supabase)

### Tabelas

1. **groups** — `id`, `name` (unique), `password_hash` (bcrypt via pgcrypto)
2. **players** — `id`, `user_id` (FK auth.users, unique), `group_id` (FK groups), `name`, `race`, `level`
3. **locations** — `id`, `name`, `description`, `sort_order` (dados estáticos, 10 locais)
4. **npcs** — `id`, `location_id` (FK), `name`, `description`, `final_mission_title`, `final_mission_description`
5. **npc_abilities** — `id`, `npc_id` (FK), `friendship_level` (1-7), `name`, `description`
6. **discovered_npcs** — `id`, `group_id` (FK), `npc_id` (FK), `discovered_by` (FK players), unique(group_id, npc_id)
7. **friendship_points** — `id`, `player_id` (FK), `npc_id` (FK), `points` (0-7), unique(player_id, npc_id)
8. **completed_missions** — `id`, `player_id` (FK), `npc_id` (FK), `completed_at`, unique(player_id, npc_id)

### Funções SQL (SECURITY DEFINER)

- `create_group(name, password)` — cria grupo com senha hasheada (pgcrypto + bcrypt)
- `join_group(name, password)` — verifica senha e vincula player ao grupo

### RLS

- locations, npcs, npc_abilities: leitura para todos autenticados
- players: leitura por membros do mesmo grupo; insert/update apenas para o próprio user_id
- discovered_npcs: leitura por membros do grupo; insert por membros do grupo
- friendship_points, completed_missions: CRUD apenas para o próprio player_id

### Seed Data

10 locais placeholder com 2-3 NPCs cada (~25 NPCs), cada NPC com habilidades nos níveis 1, 3, 5 e 7.

## Fases de Implementação

### Fase 1: Fundação
1. Inicializar projeto Vite + React
2. Instalar `@supabase/supabase-js` e `react-router-dom`
3. Criar `supabase.js` com placeholder para anon key
4. Criar CSS variables e global styles (paleta bege, fontes serifadas)
5. Criar `App.jsx` com HashRouter e estrutura de rotas
6. Criar `AuthContext` com fluxo de magic link
7. Criar `LandingPage` + `AuthCallbackPage`

### Fase 2: Player e Grupo
1. Gerar SQL para criação de tabelas, RLS, funções e seed data
2. Criar `PlayerContext`
3. Criar `CreateCharacterPage` (formulário: nome, raça, nível)
4. Criar `GroupPage` (criar grupo / entrar em grupo com nome + senha)
5. Criar `ProtectedRoute` e `Layout` (nav com nome do jogador, grupo, logout)

### Fase 3: Mapa e Locais
1. Criar hooks `useLocations`, `useNpcs`, `useDiscoveredNpcs`
2. Criar `MapPage` com grid responsivo de LocationCards
3. Criar `LocationDetailPage` com lista de NPCs e botão "Descobrir"

### Fase 4: NPC e Amizade
1. Criar hooks `useNpcDetail`, `useFriendship`
2. Criar `FriendshipMeter` — 7 indicadores clicáveis (incrementa/decrementa)
3. Criar `AbilityList` — lista de habilidades com status bloqueado/desbloqueado
4. Criar `MissionPanel` — missão final + botão "Marcar como completa"
5. Criar `NpcDetailPage` compondo os componentes acima

### Fase 5: Polimento
1. Responsividade mobile
2. Loading states e tratamento de erros
3. GitHub Actions para deploy automático
4. Transições, hover states, ajustes visuais finais

## Detalhes Técnicos Importantes

- **HashRouter** é necessário porque GitHub Pages não faz URL rewriting
- **FriendshipMeter** usa UI otimista: atualiza visualmente na hora, sincroniza com Supabase em background
- **Upsert** para friendship_points: `supabase.from('friendship_points').upsert({...}, { onConflict: 'player_id,npc_id' })`
- **Magic link redirect**: `emailRedirectTo` aponta para `origin + base + '#/auth/callback'`
- **Fontes**: Google Fonts via `<link>` no `index.html` (Playfair Display, Source Serif 4, Inter)

## Verificação

1. **Fluxo de auth**: email → magic link → autenticado → refresh mantém sessão → logout
2. **Criação de PJ**: redirecionado após primeiro login → preenche form → salvo no Supabase
3. **Grupos**: criar com senha → segundo usuário entra com nome + senha → vê mesmo grupo
4. **Descoberta de NPCs**: navegar para local → clicar "Descobrir" → NPC visível para todos do grupo
5. **Amizade**: clicar no meter → pontos incrementam → reload mantém → limites 0-7 respeitados
6. **Habilidades**: a cada nível (1, 3, 5, 7) → habilidade desbloqueia visualmente
7. **Missão final**: 7 pontos → painel de missão aparece → marcar completa → habilidade final destacada
