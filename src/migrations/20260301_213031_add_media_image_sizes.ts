import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-sqlite'

export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.run(sql`ALTER TABLE \`media\` ADD \`sizes_thumbnail_url\` text;`)
  await db.run(sql`ALTER TABLE \`media\` ADD \`sizes_thumbnail_width\` numeric;`)
  await db.run(sql`ALTER TABLE \`media\` ADD \`sizes_thumbnail_height\` numeric;`)
  await db.run(sql`ALTER TABLE \`media\` ADD \`sizes_thumbnail_mime_type\` text;`)
  await db.run(sql`ALTER TABLE \`media\` ADD \`sizes_thumbnail_filesize\` numeric;`)
  await db.run(sql`ALTER TABLE \`media\` ADD \`sizes_thumbnail_filename\` text;`)
  await db.run(sql`ALTER TABLE \`media\` ADD \`sizes_mobile_url\` text;`)
  await db.run(sql`ALTER TABLE \`media\` ADD \`sizes_mobile_width\` numeric;`)
  await db.run(sql`ALTER TABLE \`media\` ADD \`sizes_mobile_height\` numeric;`)
  await db.run(sql`ALTER TABLE \`media\` ADD \`sizes_mobile_mime_type\` text;`)
  await db.run(sql`ALTER TABLE \`media\` ADD \`sizes_mobile_filesize\` numeric;`)
  await db.run(sql`ALTER TABLE \`media\` ADD \`sizes_mobile_filename\` text;`)
  await db.run(sql`ALTER TABLE \`media\` ADD \`sizes_tablet_url\` text;`)
  await db.run(sql`ALTER TABLE \`media\` ADD \`sizes_tablet_width\` numeric;`)
  await db.run(sql`ALTER TABLE \`media\` ADD \`sizes_tablet_height\` numeric;`)
  await db.run(sql`ALTER TABLE \`media\` ADD \`sizes_tablet_mime_type\` text;`)
  await db.run(sql`ALTER TABLE \`media\` ADD \`sizes_tablet_filesize\` numeric;`)
  await db.run(sql`ALTER TABLE \`media\` ADD \`sizes_tablet_filename\` text;`)
  await db.run(sql`ALTER TABLE \`media\` ADD \`sizes_desktop_url\` text;`)
  await db.run(sql`ALTER TABLE \`media\` ADD \`sizes_desktop_width\` numeric;`)
  await db.run(sql`ALTER TABLE \`media\` ADD \`sizes_desktop_height\` numeric;`)
  await db.run(sql`ALTER TABLE \`media\` ADD \`sizes_desktop_mime_type\` text;`)
  await db.run(sql`ALTER TABLE \`media\` ADD \`sizes_desktop_filesize\` numeric;`)
  await db.run(sql`ALTER TABLE \`media\` ADD \`sizes_desktop_filename\` text;`)
  await db.run(
    sql`CREATE INDEX \`media_sizes_thumbnail_sizes_thumbnail_filename_idx\` ON \`media\` (\`sizes_thumbnail_filename\`);`,
  )
  await db.run(
    sql`CREATE INDEX \`media_sizes_mobile_sizes_mobile_filename_idx\` ON \`media\` (\`sizes_mobile_filename\`);`,
  )
  await db.run(
    sql`CREATE INDEX \`media_sizes_tablet_sizes_tablet_filename_idx\` ON \`media\` (\`sizes_tablet_filename\`);`,
  )
  await db.run(
    sql`CREATE INDEX \`media_sizes_desktop_sizes_desktop_filename_idx\` ON \`media\` (\`sizes_desktop_filename\`);`,
  )
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.run(sql`DROP INDEX \`media_sizes_thumbnail_sizes_thumbnail_filename_idx\`;`)
  await db.run(sql`DROP INDEX \`media_sizes_mobile_sizes_mobile_filename_idx\`;`)
  await db.run(sql`DROP INDEX \`media_sizes_tablet_sizes_tablet_filename_idx\`;`)
  await db.run(sql`DROP INDEX \`media_sizes_desktop_sizes_desktop_filename_idx\`;`)
  await db.run(sql`ALTER TABLE \`media\` DROP COLUMN \`sizes_thumbnail_url\`;`)
  await db.run(sql`ALTER TABLE \`media\` DROP COLUMN \`sizes_thumbnail_width\`;`)
  await db.run(sql`ALTER TABLE \`media\` DROP COLUMN \`sizes_thumbnail_height\`;`)
  await db.run(sql`ALTER TABLE \`media\` DROP COLUMN \`sizes_thumbnail_mime_type\`;`)
  await db.run(sql`ALTER TABLE \`media\` DROP COLUMN \`sizes_thumbnail_filesize\`;`)
  await db.run(sql`ALTER TABLE \`media\` DROP COLUMN \`sizes_thumbnail_filename\`;`)
  await db.run(sql`ALTER TABLE \`media\` DROP COLUMN \`sizes_mobile_url\`;`)
  await db.run(sql`ALTER TABLE \`media\` DROP COLUMN \`sizes_mobile_width\`;`)
  await db.run(sql`ALTER TABLE \`media\` DROP COLUMN \`sizes_mobile_height\`;`)
  await db.run(sql`ALTER TABLE \`media\` DROP COLUMN \`sizes_mobile_mime_type\`;`)
  await db.run(sql`ALTER TABLE \`media\` DROP COLUMN \`sizes_mobile_filesize\`;`)
  await db.run(sql`ALTER TABLE \`media\` DROP COLUMN \`sizes_mobile_filename\`;`)
  await db.run(sql`ALTER TABLE \`media\` DROP COLUMN \`sizes_tablet_url\`;`)
  await db.run(sql`ALTER TABLE \`media\` DROP COLUMN \`sizes_tablet_width\`;`)
  await db.run(sql`ALTER TABLE \`media\` DROP COLUMN \`sizes_tablet_height\`;`)
  await db.run(sql`ALTER TABLE \`media\` DROP COLUMN \`sizes_tablet_mime_type\`;`)
  await db.run(sql`ALTER TABLE \`media\` DROP COLUMN \`sizes_tablet_filesize\`;`)
  await db.run(sql`ALTER TABLE \`media\` DROP COLUMN \`sizes_tablet_filename\`;`)
  await db.run(sql`ALTER TABLE \`media\` DROP COLUMN \`sizes_desktop_url\`;`)
  await db.run(sql`ALTER TABLE \`media\` DROP COLUMN \`sizes_desktop_width\`;`)
  await db.run(sql`ALTER TABLE \`media\` DROP COLUMN \`sizes_desktop_height\`;`)
  await db.run(sql`ALTER TABLE \`media\` DROP COLUMN \`sizes_desktop_mime_type\`;`)
  await db.run(sql`ALTER TABLE \`media\` DROP COLUMN \`sizes_desktop_filesize\`;`)
  await db.run(sql`ALTER TABLE \`media\` DROP COLUMN \`sizes_desktop_filename\`;`)
}
