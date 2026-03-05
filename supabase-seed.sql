-- ============================================================
-- Candehssa - Dados Placeholder
-- Execute após o schema
-- ============================================================

-- LOCAIS
INSERT INTO locations (id, name, description, sort_order) VALUES
  ('a0000001-0000-0000-0000-000000000001', 'Mercado Central', 'O coração comercial de Candeh''ssa, repleto de barracas e aromas.', 1),
  ('a0000001-0000-0000-0000-000000000002', 'Taverna do Porto', 'Uma taverna acolhedora à beira do cais, frequentada por marinheiros.', 2),
  ('a0000001-0000-0000-0000-000000000003', 'Templo da Aurora', 'Um templo dedicado aos deuses da luz e da cura.', 3),
  ('a0000001-0000-0000-0000-000000000004', 'Guilda dos Artesãos', 'Onde os melhores ferreiros e artífices trabalham.', 4),
  ('a0000001-0000-0000-0000-000000000005', 'Biblioteca Arcana', 'Repositório de conhecimento antigo e pergaminhos mágicos.', 5),
  ('a0000001-0000-0000-0000-000000000006', 'Quartel da Guarda', 'Sede da milícia e dos defensores da cidade.', 6),
  ('a0000001-0000-0000-0000-000000000007', 'Jardim dos Sussurros', 'Um jardim misterioso onde se ouvem vozes do passado.', 7),
  ('a0000001-0000-0000-0000-000000000008', 'Beco das Sombras', 'Ruela escura onde negócios discretos acontecem.', 8),
  ('a0000001-0000-0000-0000-000000000009', 'Torre do Conselho', 'Onde os líderes da cidade se reúnem para governar.', 9),
  ('a0000001-0000-0000-0000-000000000010', 'Estábulos Reais', 'Onde as montarias mais nobres são cuidadas.', 10);

-- NPCS

-- Mercado Central (3 NPCs)
INSERT INTO npcs (id, location_id, name, description, final_mission_title, final_mission_description) VALUES
  ('b0000001-0001-0000-0000-000000000001', 'a0000001-0000-0000-0000-000000000001',
   'Mirella', 'Uma comerciante astuta com olhos penetrantes.',
   'O Segredo de Mirella', 'Descubra a verdade sobre o passado misterioso de Mirella.'),
  ('b0000001-0001-0000-0000-000000000002', 'a0000001-0000-0000-0000-000000000001',
   'Dorin', 'Um anão mercador de joias raras.',
   'A Gema Perdida', 'Ajude Dorin a recuperar uma gema familiar que foi roubada.'),
  ('b0000001-0001-0000-0000-000000000003', 'a0000001-0000-0000-0000-000000000001',
   'Liana', 'Uma jovem herbalista que vende remédios e poções.',
   'A Cura Impossível', 'Encontre os ingredientes para uma poção lendária.');

-- Taverna do Porto (3 NPCs)
INSERT INTO npcs (id, location_id, name, description, final_mission_title, final_mission_description) VALUES
  ('b0000001-0002-0000-0000-000000000001', 'a0000001-0000-0000-0000-000000000002',
   'Capitão Rask', 'Um velho marinheiro com histórias fantásticas.',
   'O Navio Fantasma', 'Navegue com Rask até o lendário navio fantasma.'),
  ('b0000001-0002-0000-0000-000000000002', 'a0000001-0000-0000-0000-000000000002',
   'Selena', 'A taverneira, sempre com um sorriso e uma caneca cheia.',
   'A Receita Ancestral', 'Ajude Selena a preparar uma bebida mítica de sua família.'),
  ('b0000001-0002-0000-0000-000000000003', 'a0000001-0000-0000-0000-000000000002',
   'Pip', 'Um halfling tocador de alaúde que sabe de todos os rumores.',
   'A Canção Perdida', 'Encontre as notas perdidas da melodia mais antiga do mundo.');

-- Templo da Aurora (2 NPCs)
INSERT INTO npcs (id, location_id, name, description, final_mission_title, final_mission_description) VALUES
  ('b0000001-0003-0000-0000-000000000001', 'a0000001-0000-0000-0000-000000000003',
   'Sacerdotisa Ilara', 'Uma clérida devota que cura os necessitados.',
   'O Ritual da Aurora', 'Participe de um antigo ritual para restaurar o poder do templo.'),
  ('b0000001-0003-0000-0000-000000000002', 'a0000001-0000-0000-0000-000000000003',
   'Irmão Theron', 'Um monge silencioso que guarda os segredos do templo.',
   'O Pergaminho Selado', 'Decifre o pergaminho que Theron protege há décadas.');

-- Guilda dos Artesãos (3 NPCs)
INSERT INTO npcs (id, location_id, name, description, final_mission_title, final_mission_description) VALUES
  ('b0000001-0004-0000-0000-000000000001', 'a0000001-0000-0000-0000-000000000004',
   'Mestre Volkan', 'O melhor ferreiro da cidade, com braços como troncos.',
   'A Forja Ancestral', 'Ajude Volkan a reacender a forja lendária de seus ancestrais.'),
  ('b0000001-0004-0000-0000-000000000002', 'a0000001-0000-0000-0000-000000000004',
   'Tessara', 'Uma tecelã élfica que cria mantos encantados.',
   'O Fio de Estrelas', 'Encontre o fio mágico tecido pela luz das estrelas.'),
  ('b0000001-0004-0000-0000-000000000003', 'a0000001-0000-0000-0000-000000000004',
   'Garrick', 'Um carpinteiro que constrói desde casas até armas de cerco.',
   'A Árvore Milenar', 'Proteja a árvore sagrada de onde Garrick obtém sua madeira.');

-- Biblioteca Arcana (2 NPCs)
INSERT INTO npcs (id, location_id, name, description, final_mission_title, final_mission_description) VALUES
  ('b0000001-0005-0000-0000-000000000001', 'a0000001-0000-0000-0000-000000000005',
   'Archimaga Vestra', 'Uma maga idosa que conhece feitiços esquecidos.',
   'O Grimório Proibido', 'Recupere um grimório perigoso antes que caia em mãos erradas.'),
  ('b0000001-0005-0000-0000-000000000002', 'a0000001-0000-0000-0000-000000000005',
   'Nix', 'Um goblin erudito, bibliotecário-chefe e obsessivo com organização.',
   'O Catálogo Infinito', 'Ajude Nix a catalogar uma coleção recém-descoberta de manuscritos.');

-- Quartel da Guarda (3 NPCs)
INSERT INTO npcs (id, location_id, name, description, final_mission_title, final_mission_description) VALUES
  ('b0000001-0006-0000-0000-000000000001', 'a0000001-0000-0000-0000-000000000006',
   'Capitã Elara', 'Uma guerreira experiente que lidera a guarda com mão firme.',
   'A Conspiração', 'Investigue uma conspiração dentro da própria guarda.'),
  ('b0000001-0006-0000-0000-000000000002', 'a0000001-0000-0000-0000-000000000006',
   'Recruta Finn', 'Um jovem entusiasmado mas desajeitado.',
   'A Primeira Missão', 'Acompanhe Finn em sua primeira patrulha solo.'),
  ('b0000001-0006-0000-0000-000000000003', 'a0000001-0000-0000-0000-000000000006',
   'Sargento Brom', 'Um veterano casca-grossa que treina os novatos.',
   'O Último Combate', 'Lute ao lado de Brom contra seu antigo rival.');

-- Jardim dos Sussurros (2 NPCs)
INSERT INTO npcs (id, location_id, name, description, final_mission_title, final_mission_description) VALUES
  ('b0000001-0007-0000-0000-000000000001', 'a0000001-0000-0000-0000-000000000007',
   'Dríade Sylara', 'Um espírito da natureza que protege o jardim.',
   'A Semente Primordial', 'Plante a semente que pode restaurar uma floresta inteira.'),
  ('b0000001-0007-0000-0000-000000000002', 'a0000001-0000-0000-0000-000000000007',
   'Velho Eremon', 'Um ermitão que conversa com as plantas e os ventos.',
   'As Vozes do Vento', 'Decifre a mensagem que o vento carrega há séculos.');

-- Beco das Sombras (3 NPCs)
INSERT INTO npcs (id, location_id, name, description, final_mission_title, final_mission_description) VALUES
  ('b0000001-0008-0000-0000-000000000001', 'a0000001-0000-0000-0000-000000000008',
   'Sombra', 'Um informante misterioso que ninguém sabe o verdadeiro nome.',
   'A Identidade Secreta', 'Descubra quem realmente é a pessoa conhecida como Sombra.'),
  ('b0000001-0008-0000-0000-000000000002', 'a0000001-0000-0000-0000-000000000008',
   'Madame Noir', 'Uma contrabandista elegante com maneiras refinadas.',
   'O Carregamento Final', 'Escolte o último carregamento de Madame Noir.'),
  ('b0000001-0008-0000-0000-000000000003', 'a0000001-0000-0000-0000-000000000008',
   'Rato', 'Um garoto de rua esperto que conhece cada canto da cidade.',
   'O Mapa do Rato', 'Siga o mapa secreto que Rato desenhou das catacumbas.');

-- Torre do Conselho (2 NPCs)
INSERT INTO npcs (id, location_id, name, description, final_mission_title, final_mission_description) VALUES
  ('b0000001-0009-0000-0000-000000000001', 'a0000001-0000-0000-0000-000000000009',
   'Conselheiro Aldric', 'Um político astuto com interesses ambíguos.',
   'O Jogo de Poder', 'Navegue as intrigas políticas e descubra as verdadeiras lealdades de Aldric.'),
  ('b0000001-0009-0000-0000-000000000002', 'a0000001-0000-0000-0000-000000000009',
   'Escriba Maren', 'Uma mulher meticulosa que registra todas as leis e decisões.',
   'A Lei Esquecida', 'Encontre uma lei antiga que pode mudar o destino da cidade.');

-- Estábulos Reais (2 NPCs)
INSERT INTO npcs (id, location_id, name, description, final_mission_title, final_mission_description) VALUES
  ('b0000001-0010-0000-0000-000000000001', 'a0000001-0000-0000-0000-000000000010',
   'Domador Kael', 'Um domador de criaturas exóticas com cicatrizes de batalha.',
   'A Besta Selvagem', 'Ajude Kael a domar uma criatura lendária.'),
  ('b0000001-0010-0000-0000-000000000002', 'a0000001-0000-0000-0000-000000000010',
   'Estrelinha', 'Uma garota que cuida dos cavalos e tem um dom especial com animais.',
   'O Cavalo de Fogo', 'Encontre e traga de volta o lendário cavalo de crina flamejante.');

-- HABILIDADES (níveis 1, 3, 5 e 7 para cada NPC)

-- Mirella
INSERT INTO npc_abilities (npc_id, friendship_level, name, description) VALUES
  ('b0000001-0001-0000-0000-000000000001', 1, 'Desconto no Mercado', '10% de desconto em compras.'),
  ('b0000001-0001-0000-0000-000000000001', 3, 'Informante Comercial', 'Mirella compartilha rumores do mercado.'),
  ('b0000001-0001-0000-0000-000000000001', 5, 'Contatos Comerciais', 'Acesso a itens raros.'),
  ('b0000001-0001-0000-0000-000000000001', 7, 'Aliada Verdadeira', 'Mirella luta ao seu lado em necessidade.');

-- Dorin
INSERT INTO npc_abilities (npc_id, friendship_level, name, description) VALUES
  ('b0000001-0001-0000-0000-000000000002', 1, 'Avaliação Gratuita', 'Dorin avalia suas gemas sem cobrar.'),
  ('b0000001-0001-0000-0000-000000000002', 3, 'Lapidação', 'Melhora a qualidade de uma gema.'),
  ('b0000001-0001-0000-0000-000000000002', 5, 'Joias Encantadas', 'Acesso a joias com propriedades mágicas.'),
  ('b0000001-0001-0000-0000-000000000002', 7, 'Obra-Prima', 'Dorin cria uma joia única e poderosa para você.');

-- Liana
INSERT INTO npc_abilities (npc_id, friendship_level, name, description) VALUES
  ('b0000001-0001-0000-0000-000000000003', 1, 'Chá Revigorante', 'Recupera pontos de vida adicionais em descanso.'),
  ('b0000001-0001-0000-0000-000000000003', 3, 'Ervas Medicinais', 'Poções de cura a preço reduzido.'),
  ('b0000001-0001-0000-0000-000000000003', 5, 'Poção Especial', 'Acesso a poções raras e potentes.'),
  ('b0000001-0001-0000-0000-000000000003', 7, 'Elixir da Vida', 'Uma poção que revive um aliado caído.');

-- Capitão Rask
INSERT INTO npc_abilities (npc_id, friendship_level, name, description) VALUES
  ('b0000001-0002-0000-0000-000000000001', 1, 'Histórias do Mar', 'Informações sobre locais costeiros.'),
  ('b0000001-0002-0000-0000-000000000001', 3, 'Passagem Marítima', 'Viagens de barco gratuitas.'),
  ('b0000001-0002-0000-0000-000000000001', 5, 'Mapa do Tesouro', 'Rask compartilha um mapa de tesouro.'),
  ('b0000001-0002-0000-0000-000000000001', 7, 'Capitão Honorário', 'Comando temporário do navio de Rask.');

-- Selena
INSERT INTO npc_abilities (npc_id, friendship_level, name, description) VALUES
  ('b0000001-0002-0000-0000-000000000002', 1, 'Bebida da Casa', 'Uma caneca grátis sempre que visitar.'),
  ('b0000001-0002-0000-0000-000000000002', 3, 'Quarto VIP', 'Estadia gratuita na taverna.'),
  ('b0000001-0002-0000-0000-000000000002', 5, 'Rede de Rumores', 'Selena compartilha informações valiosas.'),
  ('b0000001-0002-0000-0000-000000000002', 7, 'Refúgio Seguro', 'A taverna se torna seu esconderijo pessoal.');

-- Pip
INSERT INTO npc_abilities (npc_id, friendship_level, name, description) VALUES
  ('b0000001-0002-0000-0000-000000000003', 1, 'Canção Inspiradora', '+1 em testes de moral.'),
  ('b0000001-0002-0000-0000-000000000003', 3, 'Distração Musical', 'Pip distrai inimigos com sua música.'),
  ('b0000001-0002-0000-0000-000000000003', 5, 'Rede de Contatos', 'Pip conhece alguém em cada cidade.'),
  ('b0000001-0002-0000-0000-000000000003', 7, 'Melodia Mágica', 'Uma canção com efeitos mágicos poderosos.');

-- Sacerdotisa Ilara
INSERT INTO npc_abilities (npc_id, friendship_level, name, description) VALUES
  ('b0000001-0003-0000-0000-000000000001', 1, 'Bênção Menor', 'Cura leve uma vez por dia.'),
  ('b0000001-0003-0000-0000-000000000001', 3, 'Proteção Divina', 'Resistência a doenças.'),
  ('b0000001-0003-0000-0000-000000000001', 5, 'Restauração', 'Remove maldições menores.'),
  ('b0000001-0003-0000-0000-000000000001', 7, 'Milagre', 'Uma cura divina poderosa.');

-- Irmão Theron
INSERT INTO npc_abilities (npc_id, friendship_level, name, description) VALUES
  ('b0000001-0003-0000-0000-000000000002', 1, 'Meditação Guiada', 'Bônus em testes de sabedoria.'),
  ('b0000001-0003-0000-0000-000000000002', 3, 'Técnica de Combate', 'Uma manobra marcial especial.'),
  ('b0000001-0003-0000-0000-000000000002', 5, 'Segredos Antigos', 'Conhecimento sobre locais ocultos.'),
  ('b0000001-0003-0000-0000-000000000002', 7, 'Golpe do Silêncio', 'Um ataque devastador e silencioso.');

-- Mestre Volkan
INSERT INTO npc_abilities (npc_id, friendship_level, name, description) VALUES
  ('b0000001-0004-0000-0000-000000000001', 1, 'Reparo Gratuito', 'Volkan repara seu equipamento.'),
  ('b0000001-0004-0000-0000-000000000001', 3, 'Aprimoramento', 'Melhora a qualidade de uma arma.'),
  ('b0000001-0004-0000-0000-000000000001', 5, 'Arma Personalizada', 'Uma arma feita sob medida.'),
  ('b0000001-0004-0000-0000-000000000001', 7, 'Lâmina Lendária', 'Uma arma de poder extraordinário.');

-- Tessara
INSERT INTO npc_abilities (npc_id, friendship_level, name, description) VALUES
  ('b0000001-0004-0000-0000-000000000002', 1, 'Remendo Mágico', 'Tessara conserta roupas magicamente.'),
  ('b0000001-0004-0000-0000-000000000002', 3, 'Manto de Proteção', 'Um manto com encantamento leve.'),
  ('b0000001-0004-0000-0000-000000000002', 5, 'Vestes Élficas', 'Roupas que concedem furtividade.'),
  ('b0000001-0004-0000-0000-000000000002', 7, 'Manto Estelar', 'Um manto tecido com luz das estrelas.');

-- Garrick
INSERT INTO npc_abilities (npc_id, friendship_level, name, description) VALUES
  ('b0000001-0004-0000-0000-000000000003', 1, 'Conserto Rápido', 'Garrick repara itens de madeira.'),
  ('b0000001-0004-0000-0000-000000000003', 3, 'Escudo Reforçado', 'Um escudo de madeira resistente.'),
  ('b0000001-0004-0000-0000-000000000003', 5, 'Construção', 'Garrick constrói um abrigo portátil.'),
  ('b0000001-0004-0000-0000-000000000003', 7, 'Fortaleza Móvel', 'Uma estrutura defensiva impressionante.');

-- Archimaga Vestra
INSERT INTO npc_abilities (npc_id, friendship_level, name, description) VALUES
  ('b0000001-0005-0000-0000-000000000001', 1, 'Consulta Arcana', 'Identificação de itens mágicos.'),
  ('b0000001-0005-0000-0000-000000000001', 3, 'Pergaminho', 'Um pergaminho com um feitiço útil.'),
  ('b0000001-0005-0000-0000-000000000001', 5, 'Aula de Magia', 'Aprenda uma magia nova.'),
  ('b0000001-0005-0000-0000-000000000001', 7, 'Feitiço Ancestral', 'Uma magia antiga e poderosa.');

-- Nix
INSERT INTO npc_abilities (npc_id, friendship_level, name, description) VALUES
  ('b0000001-0005-0000-0000-000000000002', 1, 'Acesso à Biblioteca', 'Entrada livre na biblioteca.'),
  ('b0000001-0005-0000-0000-000000000002', 3, 'Pesquisa Assistida', 'Nix ajuda em pesquisas.'),
  ('b0000001-0005-0000-0000-000000000002', 5, 'Seção Restrita', 'Acesso a livros raros.'),
  ('b0000001-0005-0000-0000-000000000002', 7, 'Conhecimento Proibido', 'Segredos arcanos antigos.');

-- Capitã Elara
INSERT INTO npc_abilities (npc_id, friendship_level, name, description) VALUES
  ('b0000001-0006-0000-0000-000000000001', 1, 'Patrulha Conjunta', 'Acompanhe uma patrulha.'),
  ('b0000001-0006-0000-0000-000000000001', 3, 'Treinamento Militar', 'Bônus em testes de combate.'),
  ('b0000001-0006-0000-0000-000000000001', 5, 'Autoridade', 'Acesso a áreas restritas da cidade.'),
  ('b0000001-0006-0000-0000-000000000001', 7, 'Aliada de Guerra', 'Elara envia reforços em batalhas.');

-- Recruta Finn
INSERT INTO npc_abilities (npc_id, friendship_level, name, description) VALUES
  ('b0000001-0006-0000-0000-000000000002', 1, 'Companhia Animada', 'Finn anima o grupo com entusiasmo.'),
  ('b0000001-0006-0000-0000-000000000002', 3, 'Sentinela', 'Finn vigia enquanto o grupo descansa.'),
  ('b0000001-0006-0000-0000-000000000002', 5, 'Apoio em Combate', 'Finn luta ao seu lado.'),
  ('b0000001-0006-0000-0000-000000000002', 7, 'Herói Improvável', 'Finn realiza um feito heróico inesperado.');

-- Sargento Brom
INSERT INTO npc_abilities (npc_id, friendship_level, name, description) VALUES
  ('b0000001-0006-0000-0000-000000000003', 1, 'Dica de Veterano', 'Conselhos táticos úteis.'),
  ('b0000001-0006-0000-0000-000000000003', 3, 'Treino Intensivo', 'Aumento temporário de força.'),
  ('b0000001-0006-0000-0000-000000000003', 5, 'Armas do Quartel', 'Acesso ao arsenal da guarda.'),
  ('b0000001-0006-0000-0000-000000000003', 7, 'Grito de Guerra', 'Intimidação massiva contra inimigos.');

-- Dríade Sylara
INSERT INTO npc_abilities (npc_id, friendship_level, name, description) VALUES
  ('b0000001-0007-0000-0000-000000000001', 1, 'Fruto do Jardim', 'Uma fruta que restaura energia.'),
  ('b0000001-0007-0000-0000-000000000001', 3, 'Caminho Secreto', 'Atalhos pela natureza.'),
  ('b0000001-0007-0000-0000-000000000001', 5, 'Aliados Naturais', 'Animais ajudam em momentos difíceis.'),
  ('b0000001-0007-0000-0000-000000000001', 7, 'Renascimento Verde', 'Poder de regeneração da natureza.');

-- Velho Eremon
INSERT INTO npc_abilities (npc_id, friendship_level, name, description) VALUES
  ('b0000001-0007-0000-0000-000000000002', 1, 'Previsão do Tempo', 'Eremon prevê o clima.'),
  ('b0000001-0007-0000-0000-000000000002', 3, 'Linguagem das Plantas', 'Comunicação com a flora.'),
  ('b0000001-0007-0000-0000-000000000002', 5, 'Visão do Passado', 'Eremon revela eventos históricos.'),
  ('b0000001-0007-0000-0000-000000000002', 7, 'Sabedoria Ancestral', 'Conhecimento profundo do mundo.');

-- Sombra
INSERT INTO npc_abilities (npc_id, friendship_level, name, description) VALUES
  ('b0000001-0008-0000-0000-000000000001', 1, 'Informação Básica', 'Rumores do submundo.'),
  ('b0000001-0008-0000-0000-000000000001', 3, 'Disfarce', 'Ajuda a se disfarçar.'),
  ('b0000001-0008-0000-0000-000000000001', 5, 'Rede de Espionagem', 'Informações detalhadas sobre alvos.'),
  ('b0000001-0008-0000-0000-000000000001', 7, 'Assassino Fantasma', 'Elimina um alvo silenciosamente.');

-- Madame Noir
INSERT INTO npc_abilities (npc_id, friendship_level, name, description) VALUES
  ('b0000001-0008-0000-0000-000000000002', 1, 'Mercadoria Especial', 'Itens incomuns à venda.'),
  ('b0000001-0008-0000-0000-000000000002', 3, 'Contatos no Submundo', 'Acesso a serviços discretos.'),
  ('b0000001-0008-0000-0000-000000000002', 5, 'Contrabando de Luxo', 'Itens raríssimos disponíveis.'),
  ('b0000001-0008-0000-0000-000000000002', 7, 'Imunidade', 'Proteção contra a lei do submundo.');

-- Rato
INSERT INTO npc_abilities (npc_id, friendship_level, name, description) VALUES
  ('b0000001-0008-0000-0000-000000000003', 1, 'Atalho', 'Rato mostra um atalho pela cidade.'),
  ('b0000001-0008-0000-0000-000000000003', 3, 'Batedores', 'Garotos de rua vigiam para você.'),
  ('b0000001-0008-0000-0000-000000000003', 5, 'Túneis Secretos', 'Acesso às passagens subterrâneas.'),
  ('b0000001-0008-0000-0000-000000000003', 7, 'Rei das Ruas', 'A lealdade de todo o submundo juvenil.');

-- Conselheiro Aldric
INSERT INTO npc_abilities (npc_id, friendship_level, name, description) VALUES
  ('b0000001-0009-0000-0000-000000000001', 1, 'Audiência', 'Uma reunião com o conselho.'),
  ('b0000001-0009-0000-0000-000000000001', 3, 'Favores Políticos', 'Influência em decisões menores.'),
  ('b0000001-0009-0000-0000-000000000001', 5, 'Imunidade Diplomática', 'Proteção legal na cidade.'),
  ('b0000001-0009-0000-0000-000000000001', 7, 'Poder nos Bastidores', 'Influência real nas leis da cidade.');

-- Escriba Maren
INSERT INTO npc_abilities (npc_id, friendship_level, name, description) VALUES
  ('b0000001-0009-0000-0000-000000000002', 1, 'Documento Oficial', 'Maren cria um documento para você.'),
  ('b0000001-0009-0000-0000-000000000002', 3, 'Registros Públicos', 'Acesso a informações da cidade.'),
  ('b0000001-0009-0000-0000-000000000002', 5, 'Falsificação Perfeita', 'Documentos falsos indistinguíveis.'),
  ('b0000001-0009-0000-0000-000000000002', 7, 'A Verdade Oculta', 'Segredos guardados nos registros.');

-- Domador Kael
INSERT INTO npc_abilities (npc_id, friendship_level, name, description) VALUES
  ('b0000001-0010-0000-0000-000000000001', 1, 'Dica de Domação', 'Conselhos sobre criaturas.'),
  ('b0000001-0010-0000-0000-000000000001', 3, 'Montaria Emprestada', 'Um cavalo para viagens.'),
  ('b0000001-0010-0000-0000-000000000001', 5, 'Companheiro Animal', 'Uma criatura treinada te acompanha.'),
  ('b0000001-0010-0000-0000-000000000001', 7, 'Besta de Guerra', 'Uma montaria lendária e feroz.');

-- Estrelinha
INSERT INTO npc_abilities (npc_id, friendship_level, name, description) VALUES
  ('b0000001-0010-0000-0000-000000000002', 1, 'Amiga dos Animais', 'Animais são mais amigáveis com você.'),
  ('b0000001-0010-0000-0000-000000000002', 3, 'Cavalgar Melhor', 'Bônus em testes de montaria.'),
  ('b0000001-0010-0000-0000-000000000002', 5, 'Comunicação Animal', 'Entenda o que animais tentam dizer.'),
  ('b0000001-0010-0000-0000-000000000002', 7, 'Vínculo Espiritual', 'Conexão mágica com seu animal.');
