create table if not exists public.blog_admins (
  user_id uuid primary key references auth.users(id) on delete cascade,
  created_at timestamptz not null default now()
);

alter table public.blog_admins enable row level security;

drop policy if exists "Admins can read their own admin grant" on public.blog_admins;
create policy "Admins can read their own admin grant"
on public.blog_admins
for select
to authenticated
using (user_id = auth.uid());

alter table public.posts add column if not exists created_by uuid references auth.users(id) on delete set null default auth.uid();
alter table public.posts enable row level security;

drop policy if exists "Authenticated users can manage posts" on public.posts;
drop policy if exists "Admins can read all posts" on public.posts;
drop policy if exists "Admins can insert posts" on public.posts;
drop policy if exists "Admins can update posts" on public.posts;
drop policy if exists "Admins can delete posts" on public.posts;

create policy "Admins can read all posts"
on public.posts
for select
to authenticated
using (
  exists (
    select 1 from public.blog_admins
    where blog_admins.user_id = auth.uid()
  )
);

create policy "Admins can insert posts"
on public.posts
for insert
to authenticated
with check (
  exists (
    select 1 from public.blog_admins
    where blog_admins.user_id = auth.uid()
  )
);

create policy "Admins can update posts"
on public.posts
for update
to authenticated
using (
  exists (
    select 1 from public.blog_admins
    where blog_admins.user_id = auth.uid()
  )
)
with check (
  exists (
    select 1 from public.blog_admins
    where blog_admins.user_id = auth.uid()
  )
);

create policy "Admins can delete posts"
on public.posts
for delete
to authenticated
using (
  exists (
    select 1 from public.blog_admins
    where blog_admins.user_id = auth.uid()
  )
);

-- After creating your Supabase Auth user, add yourself as the only admin:
-- insert into public.blog_admins (user_id)
-- values ('YOUR_AUTH_USER_ID_HERE');
