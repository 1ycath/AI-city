import { supabase } from '../config/supabase';

const CONVERSATIONS_TABLE = 'conversations';
const MESSAGES_TABLE = 'messages';

export function generateTitleFromMessage(text) {
  const cleaned = text.replace(/\s+/g, ' ').trim();
  if (!cleaned) return '新对话';
  const maxLen = 24;
  return cleaned.length <= maxLen ? cleaned : `${cleaned.slice(0, maxLen)}…`;
}

export async function fetchConversations() {
  const { data, error } = await supabase
    .from(CONVERSATIONS_TABLE)
    .select('id, title, created_at, updated_at')
    .order('updated_at', { ascending: false });

  if (error) throw error;
  return data ?? [];
}

export async function createConversation() {
  const { data, error } = await supabase
    .from(CONVERSATIONS_TABLE)
    .insert({ title: null })
    .select('id, title, created_at, updated_at')
    .single();

  if (error) throw error;
  return data;
}

export async function updateConversationTitle(id, title) {
  const { data, error } = await supabase
    .from(CONVERSATIONS_TABLE)
    .update({ title, updated_at: new Date().toISOString() })
    .eq('id', id)
    .select('id, title, created_at, updated_at')
    .single();

  if (error) throw error;
  return data;
}

export async function touchConversation(id) {
  const { error } = await supabase
    .from(CONVERSATIONS_TABLE)
    .update({ updated_at: new Date().toISOString() })
    .eq('id', id);

  if (error) throw error;
}

export async function fetchMessages(conversationId) {
  const { data, error } = await supabase
    .from(MESSAGES_TABLE)
    .select('id, role, content, created_at')
    .eq('conversation_id', conversationId)
    .order('created_at', { ascending: true });

  if (error) throw error;
  return data ?? [];
}

export async function insertMessage(conversationId, role, content) {
  const { data, error } = await supabase
    .from(MESSAGES_TABLE)
    .insert({ conversation_id: conversationId, role, content })
    .select('id, role, content, created_at')
    .single();

  if (error) throw error;
  return data;
}

export async function saveMessagePair(conversationId, userContent, assistantContent) {
  const { error: userError } = await supabase.from(MESSAGES_TABLE).insert({
    conversation_id: conversationId,
    role: 'user',
    content: userContent,
  });
  if (userError) throw userError;

  const { error: assistantError } = await supabase.from(MESSAGES_TABLE).insert({
    conversation_id: conversationId,
    role: 'assistant',
    content: assistantContent,
  });
  if (assistantError) throw assistantError;

  await touchConversation(conversationId);
}
