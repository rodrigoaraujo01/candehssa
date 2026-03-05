-- ============================================================
-- Candehssa - Schema do Banco de Dados
-- Execute este SQL no Supabase SQL Editor
-- ============================================================

CREATE EXTENSION IF NOT EXISTS pgcrypto;

-- ============================================================
-- TABELAS
-- ============================================================

CREATE TABLE groups (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL UNIQUE,
  password_hash TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE players (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  group_id UUID REFERENCES groups(id) ON DELETE SET NULL,
  name TEXT NOT NULL,
  race TEXT NOT NULL,
  level INTEGER NOT NULL DEFAULT 1,
  created_at TIMESTAMPTZ DEFAULT now(),
  UNIQUE(user_id)
);

CREATE TABLE locations (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT,
  sort_order INTEGER NOT NULL DEFAULT 0
);

CREATE TABLE npcs (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  location_id UUID NOT NULL REFERENCES locations(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  description TEXT,
  final_mission_title TEXT,
  final_mission_description TEXT
);

CREATE TABLE npc_abilities (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  npc_id UUID NOT NULL REFERENCES npcs(id) ON DELETE CASCADE,
  friendship_level INTEGER NOT NULL CHECK (friendship_level BETWEEN 1 AND 7),
  name TEXT NOT NULL,
  description TEXT,
  UNIQUE(npc_id, friendship_level)
);

CREATE TABLE discovered_npcs (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  group_id UUID NOT NULL REFERENCES groups(id) ON DELETE CASCADE,
  npc_id UUID NOT NULL REFERENCES npcs(id) ON DELETE CASCADE,
  discovered_by UUID NOT NULL REFERENCES players(id) ON DELETE CASCADE,
  discovered_at TIMESTAMPTZ DEFAULT now(),
  UNIQUE(group_id, npc_id)
);

CREATE TABLE friendship_points (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  player_id UUID NOT NULL REFERENCES players(id) ON DELETE CASCADE,
  npc_id UUID NOT NULL REFERENCES npcs(id) ON DELETE CASCADE,
  points INTEGER NOT NULL DEFAULT 0 CHECK (points BETWEEN 0 AND 7),
  UNIQUE(player_id, npc_id)
);

CREATE TABLE completed_missions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  player_id UUID NOT NULL REFERENCES players(id) ON DELETE CASCADE,
  npc_id UUID NOT NULL REFERENCES npcs(id) ON DELETE CASCADE,
  completed_at TIMESTAMPTZ DEFAULT now(),
  UNIQUE(player_id, npc_id)
);

-- ============================================================
-- FUNÇÕES
-- ============================================================

CREATE OR REPLACE FUNCTION create_group(group_name TEXT, group_password TEXT)
RETURNS UUID AS $$
DECLARE
  new_id UUID;
BEGIN
  INSERT INTO groups (name, password_hash)
  VALUES (group_name, crypt(group_password, gen_salt('bf')))
  RETURNING id INTO new_id;
  RETURN new_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE OR REPLACE FUNCTION join_group(group_name TEXT, group_password TEXT)
RETURNS UUID AS $$
DECLARE
  found_group_id UUID;
BEGIN
  SELECT id INTO found_group_id
  FROM groups
  WHERE name = group_name
    AND password_hash = crypt(group_password, password_hash);

  IF found_group_id IS NULL THEN
    RAISE EXCEPTION 'Nome ou senha do grupo inválidos';
  END IF;

  UPDATE players
  SET group_id = found_group_id
  WHERE user_id = auth.uid();

  RETURN found_group_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- ============================================================
-- ROW LEVEL SECURITY
-- ============================================================

ALTER TABLE groups ENABLE ROW LEVEL SECURITY;
ALTER TABLE players ENABLE ROW LEVEL SECURITY;
ALTER TABLE locations ENABLE ROW LEVEL SECURITY;
ALTER TABLE npcs ENABLE ROW LEVEL SECURITY;
ALTER TABLE npc_abilities ENABLE ROW LEVEL SECURITY;
ALTER TABLE discovered_npcs ENABLE ROW LEVEL SECURITY;
ALTER TABLE friendship_points ENABLE ROW LEVEL SECURITY;
ALTER TABLE completed_missions ENABLE ROW LEVEL SECURITY;

-- Locations, NPCs, abilities: leitura pública para autenticados
CREATE POLICY "locations_select" ON locations FOR SELECT TO authenticated USING (true);
CREATE POLICY "npcs_select" ON npcs FOR SELECT TO authenticated USING (true);
CREATE POLICY "npc_abilities_select" ON npc_abilities FOR SELECT TO authenticated USING (true);

-- Groups: leitura para membros
CREATE POLICY "groups_select" ON groups FOR SELECT TO authenticated
  USING (id IN (SELECT group_id FROM players WHERE user_id = auth.uid()));

-- Players
CREATE POLICY "players_select" ON players FOR SELECT TO authenticated
  USING (
    user_id = auth.uid()
    OR group_id IN (SELECT group_id FROM players WHERE user_id = auth.uid())
  );

CREATE POLICY "players_insert" ON players FOR INSERT TO authenticated
  WITH CHECK (user_id = auth.uid());

CREATE POLICY "players_update" ON players FOR UPDATE TO authenticated
  USING (user_id = auth.uid())
  WITH CHECK (user_id = auth.uid());

-- Discovered NPCs
CREATE POLICY "discovered_npcs_select" ON discovered_npcs FOR SELECT TO authenticated
  USING (group_id IN (SELECT group_id FROM players WHERE user_id = auth.uid()));

CREATE POLICY "discovered_npcs_insert" ON discovered_npcs FOR INSERT TO authenticated
  WITH CHECK (
    group_id IN (SELECT group_id FROM players WHERE user_id = auth.uid())
    AND discovered_by IN (SELECT id FROM players WHERE user_id = auth.uid())
  );

-- Friendship points
CREATE POLICY "friendship_points_select" ON friendship_points FOR SELECT TO authenticated
  USING (player_id IN (SELECT id FROM players WHERE user_id = auth.uid()));

CREATE POLICY "friendship_points_insert" ON friendship_points FOR INSERT TO authenticated
  WITH CHECK (player_id IN (SELECT id FROM players WHERE user_id = auth.uid()));

CREATE POLICY "friendship_points_update" ON friendship_points FOR UPDATE TO authenticated
  USING (player_id IN (SELECT id FROM players WHERE user_id = auth.uid()));

-- Completed missions
CREATE POLICY "completed_missions_select" ON completed_missions FOR SELECT TO authenticated
  USING (player_id IN (SELECT id FROM players WHERE user_id = auth.uid()));

CREATE POLICY "completed_missions_insert" ON completed_missions FOR INSERT TO authenticated
  WITH CHECK (player_id IN (SELECT id FROM players WHERE user_id = auth.uid()));

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
