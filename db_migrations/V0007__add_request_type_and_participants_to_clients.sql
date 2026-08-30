ALTER TABLE t_p9722231_soul_renewal_expedit.clients
  ADD COLUMN IF NOT EXISTS request_type VARCHAR(50) DEFAULT 'expedition',
  ADD COLUMN IF NOT EXISTS participants INTEGER;