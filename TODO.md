# Task Progress: Create SQL for user signup/login

## Plan Steps (Completed)
- [x] Analyze project: Confirmed Supabase auth + profiles table usage.
- [x] Create database/schema.sql with profiles table, RLS, policies, auto-create trigger.
- [x] Track in TODO.md.

## Followup Steps
1. Open Supabase dashboard (https://supabase.com/dashboard/project/[your-project-ref]/sql).
2. Copy-paste contents of `database/schema.sql` into New Query > Run.
3. Test: Signup new user via /signup page → Check Table Editor > profiles for new row.
4. Login via /login → Verify profile loads in dashboard.
5. Optional: Update profile fields via upsert (add to app if needed).
6. Verify RLS: Try accessing another user's profile (should fail).

Task complete! SQL ready for deployment.

