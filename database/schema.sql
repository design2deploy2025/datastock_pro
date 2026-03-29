-- Supabase schema for user signup and login
-- Run this in Supabase SQL Editor (dashboard.supabase.com > SQL Editor > New query)

-- Enable necessary extensions
create extension if not exists "uuid-ossp";

-- Profiles table (matches existing AuthContext.jsx usage)
create table if not exists public.profiles (
  id uuid references auth.users not null primary key,
  username text unique,
  full_name text,
  avatar_url text,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null,
  -- Add custom fields as needed (e.g., for dashboard app)
  phone text,
  role text default 'user'
);

-- Enable Row Level Security (RLS)
alter table public.profiles enable row level security;

-- Policies for profiles
-- Users can view their own profile
create policy "Users can view own profile" on public.profiles
  for select using (auth.uid() = id);

-- Users can update own profile
create policy "Users can update own profile" on public.profiles
  for update using (auth.uid() = id);

-- Public can insert (for trigger), but only if authenticated as new user
create policy "Public profiles insert" on public.profiles
  for insert with check (auth.uid() = id);

-- Users can view public profiles (e.g., for listing)
create policy "Public profiles view" on public.profiles
  for select using (true);

-- Trigger function to create profile on signup
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, username)
  values (new.id, new.raw_user_meta_data->>'username');  -- Optional: from signup metadata
  return new;
end;
$$ language plpgsql security definer;

-- Trigger: auto-create profile after signup
drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- Indexes for performance
create index if not exists profiles_username_idx on public.profiles (username);

-- Indexes for role-based queries (e.g., dashboard)
create index if not exists profiles_role_idx on public.profiles (role);

-- Set ownership
alter table public.profiles owner to postgres;  -- or authenticated role

-- View to query profiles with user info (optional, for login context)
create or replace view public.user_profiles as
select 
  u.id,
  u.email,
  p.username,
  p.full_name,
  p.avatar_url,
  p.role,
  p.updated_at
from auth.users u
left join public.profiles p on u.id = p.id;

-- RLS on view (inherit from profiles)
alter view public.user_profiles enable row level security;
create policy "Users can view own user profile" on public.user_profiles
  for select using (auth.uid() = id);

-- Notes:
-- 1. Signup: supabase.auth.signUp() auto-creates auth.users row + trigger creates profiles row.
-- 2. Login: supabase.auth.signInWithPassword() + fetch from profiles table (as in AuthContext).
-- 3. Update profile via supabase.from('profiles').upsert({...}) with auth.uid().
-- 4. Test: Run signup/login in app, check Supabase > Table Editor > profiles.
-- 5. Adjust fields as needed (e.g., add stripe_id for payments).

