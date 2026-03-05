-- ============================================================
-- Migração: tabela active_npcs
-- Execute este SQL no Supabase SQL Editor
-- ============================================================

-- NPCs ativos na aventura atual de cada jogador
CREATE TABLE active_npcs (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  player_id UUID NOT NULL REFERENCES players(id) ON DELETE CASCADE,
  npc_id UUID NOT NULL REFERENCES npcs(id) ON DELETE CASCADE,
  UNIQUE(player_id, npc_id)
);

ALTER TABLE active_npcs ENABLE ROW LEVEL SECURITY;

CREATE POLICY "active_npcs_select" ON active_npcs FOR SELECT TO authenticated
  USING (player_id IN (SELECT id FROM players WHERE user_id = auth.uid()));

CREATE POLICY "active_npcs_insert" ON active_npcs FOR INSERT TO authenticated
  WITH CHECK (player_id IN (SELECT id FROM players WHERE user_id = auth.uid()));

CREATE POLICY "active_npcs_delete" ON active_npcs FOR DELETE TO authenticated
  USING (player_id IN (SELECT id FROM players WHERE user_id = auth.uid()));
