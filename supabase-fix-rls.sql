-- ============================================================
-- FIX: Resolver recursão infinita nas policies de RLS
-- Execute no Supabase SQL Editor
-- ============================================================

-- Função auxiliar que busca o group_id do usuário atual
-- SECURITY DEFINER bypassa RLS, evitando recursão
CREATE OR REPLACE FUNCTION get_my_group_id()
RETURNS UUID AS $$
  SELECT group_id FROM players WHERE user_id = auth.uid()
$$ LANGUAGE sql SECURITY DEFINER STABLE;

-- Função auxiliar que busca o player_id do usuário atual
CREATE OR REPLACE FUNCTION get_my_player_id()
RETURNS UUID AS $$
  SELECT id FROM players WHERE user_id = auth.uid()
$$ LANGUAGE sql SECURITY DEFINER STABLE;

-- Dropar policies com recursão
DROP POLICY IF EXISTS "players_select" ON players;
DROP POLICY IF EXISTS "groups_select" ON groups;
DROP POLICY IF EXISTS "discovered_npcs_select" ON discovered_npcs;
DROP POLICY IF EXISTS "discovered_npcs_insert" ON discovered_npcs;
DROP POLICY IF EXISTS "friendship_points_select" ON friendship_points;
DROP POLICY IF EXISTS "friendship_points_insert" ON friendship_points;
DROP POLICY IF EXISTS "friendship_points_update" ON friendship_points;
DROP POLICY IF EXISTS "completed_missions_select" ON completed_missions;
DROP POLICY IF EXISTS "completed_missions_insert" ON completed_missions;

-- Recriar policies usando as funções auxiliares (sem recursão)

CREATE POLICY "players_select" ON players FOR SELECT TO authenticated
  USING (user_id = auth.uid() OR group_id = get_my_group_id());

CREATE POLICY "groups_select" ON groups FOR SELECT TO authenticated
  USING (id = get_my_group_id());

CREATE POLICY "discovered_npcs_select" ON discovered_npcs FOR SELECT TO authenticated
  USING (group_id = get_my_group_id());

CREATE POLICY "discovered_npcs_insert" ON discovered_npcs FOR INSERT TO authenticated
  WITH CHECK (group_id = get_my_group_id() AND discovered_by = get_my_player_id());

CREATE POLICY "friendship_points_select" ON friendship_points FOR SELECT TO authenticated
  USING (player_id = get_my_player_id());

CREATE POLICY "friendship_points_insert" ON friendship_points FOR INSERT TO authenticated
  WITH CHECK (player_id = get_my_player_id());

CREATE POLICY "friendship_points_update" ON friendship_points FOR UPDATE TO authenticated
  USING (player_id = get_my_player_id());

CREATE POLICY "completed_missions_select" ON completed_missions FOR SELECT TO authenticated
  USING (player_id = get_my_player_id());

CREATE POLICY "completed_missions_insert" ON completed_missions FOR INSERT TO authenticated
  WITH CHECK (player_id = get_my_player_id());
