-- Chat session tables for AI 城市医生
-- Run this in Supabase SQL Editor before using chat persistence.

create table if not exists conversations (
  id uuid primary key default gen_random_uuid(),
  title text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists messages (
  id uuid primary key default gen_random_uuid(),
  conversation_id uuid not null references conversations(id) on delete cascade,
  role text not null check (role in ('user', 'assistant')),
  content text not null,
  created_at timestamptz not null default now()
);

create index if not exists messages_conversation_id_idx on messages(conversation_id);
create index if not exists conversations_updated_at_idx on conversations(updated_at desc);

alter table conversations enable row level security;
alter table messages enable row level security;

create policy "Allow anon read conversations"
  on conversations for select using (true);

create policy "Allow anon insert conversations"
  on conversations for insert with check (true);

create policy "Allow anon update conversations"
  on conversations for update using (true) with check (true);

create policy "Allow anon delete conversations"
  on conversations for delete using (true);

create policy "Allow anon read messages"
  on messages for select using (true);

create policy "Allow anon insert messages"
  on messages for insert with check (true);

create policy "Allow anon update messages"
  on messages for update using (true) with check (true);

create policy "Allow anon delete messages"
  on messages for delete using (true);
