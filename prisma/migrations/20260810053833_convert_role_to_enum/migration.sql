-- Create the new enum type
CREATE TYPE "Role" AS ENUM ('ADMIN', 'TEACHER');

-- Add a temporary new column using the enum
ALTER TABLE "User" ADD COLUMN "role_new" "Role";

-- Migrate existing data: explicit mapping only, no fallback/default case
UPDATE "User" SET "role_new" =
  CASE
    WHEN "role" = 'admin' THEN 'ADMIN'::"Role"
    WHEN "role" = 'teacher' THEN 'TEACHER'::"Role"
  END;
-- Note: any "role" value that isn't exactly 'admin' or 'teacher' is left NULL here on purpose.

-- Fail the migration explicitly if any row didn't match a known value
DO $$
DECLARE
  unmapped_count INTEGER;
BEGIN
  SELECT COUNT(*) INTO unmapped_count FROM "User" WHERE "role_new" IS NULL;
  IF unmapped_count > 0 THEN
    RAISE EXCEPTION 'Migration aborted: % User row(s) have an unrecognized role value that is not "admin" or "teacher". Fix the data manually before re-running this migration.', unmapped_count;
  END IF;
END $$;

-- Only reached if every row mapped successfully
ALTER TABLE "User" ALTER COLUMN "role_new" SET NOT NULL;

-- Drop the old string column
ALTER TABLE "User" DROP COLUMN "role";

-- Rename the new column to "role"
ALTER TABLE "User" RENAME COLUMN "role_new" TO "role";

-- Set the default for future inserts
ALTER TABLE "User" ALTER COLUMN "role" SET DEFAULT 'TEACHER';