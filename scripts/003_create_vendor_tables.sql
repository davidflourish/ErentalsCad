-- Add vendor_status column to profiles table for vendor management
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS vendor_status TEXT DEFAULT 'none' CHECK (vendor_status IN ('none', 'pending', 'approved', 'rejected'));
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS business_name TEXT;
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS business_description TEXT;
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS tax_id TEXT;
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS business_registration_number TEXT;
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS approved_at TIMESTAMPTZ;
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS rejected_at TIMESTAMPTZ;
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS rejection_reason TEXT;
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS role TEXT DEFAULT 'guest' CHECK (role IN ('guest', 'vendor', 'super_admin'));

-- Update RLS policies for vendor profile data
DROP POLICY IF EXISTS "profiles_select_own" ON public.profiles;
DROP POLICY IF EXISTS "profiles_insert_own" ON public.profiles;
DROP POLICY IF EXISTS "profiles_update_own" ON public.profiles;

CREATE POLICY "profiles_select_own" ON public.profiles FOR SELECT USING (auth.uid() = id);
CREATE POLICY "profiles_select_approved_vendors" ON public.profiles FOR SELECT USING (vendor_status = 'approved');
CREATE POLICY "profiles_insert_own" ON public.profiles FOR INSERT WITH CHECK (auth.uid() = id);
CREATE POLICY "profiles_update_own" ON public.profiles FOR UPDATE USING (auth.uid() = id);
CREATE POLICY "profiles_admin_all" ON public.profiles FOR ALL USING (auth.jwt() ->> 'email' = 'erentalscaddex@gmail.com');

-- Update properties table to add vendor columns
ALTER TABLE public.properties ADD COLUMN IF NOT EXISTS vendor_status TEXT DEFAULT 'active' CHECK (vendor_status IN ('active', 'inactive', 'archived'));

-- Update property RLS to use vendor status
DROP POLICY IF EXISTS "properties_select_all" ON public.properties;
CREATE POLICY "properties_select_all" ON public.properties FOR SELECT USING (active = true);

-- Create audit log for admin actions
CREATE TABLE IF NOT EXISTS public.audit_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  admin_id UUID NOT NULL REFERENCES auth.users(id),
  action TEXT NOT NULL,
  entity_type TEXT NOT NULL,
  entity_id TEXT NOT NULL,
  changes JSONB,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.audit_logs ENABLE ROW LEVEL SECURITY;

CREATE POLICY "audit_logs_admin_only" ON public.audit_logs
  FOR ALL USING (auth.jwt() ->> 'email' = 'erentalscaddex@gmail.com');
