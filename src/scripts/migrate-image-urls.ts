/**
 * One-time migration script: update all /api/uploads/* image URLs
 * in the database to use the new Cloudflare R2 CDN public URL.
 *
 * Run with: npx tsx src/scripts/migrate-image-urls.ts
 */

import { createClient } from '@supabase/supabase-js';

const OLD_PREFIX = '/api/uploads/';
const NEW_CDN_BASE = 'https://pub-954bdef3a5044a9c88e8d00c7dbf1336.r2.dev';

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.ANON_SEC!
);

function migrateUrl(url: string | null | undefined): string | null {
  if (!url) return url ?? null;
  if (url.startsWith(OLD_PREFIX)) {
    const key = url.slice(OLD_PREFIX.length);
    return `${NEW_CDN_BASE}/${key}`;
  }
  return url;
}

async function run() {
  console.log('Fetching all posts...');
  const { data: posts, error } = await supabase
    .from('posts')
    .select('id, image_url, images');

  if (error) {
    console.error('Failed to fetch posts:', error.message);
    process.exit(1);
  }

  console.log(`Found ${posts.length} posts.`);
  let updated = 0;

  for (const post of posts) {
    const newImageUrl = migrateUrl(post.image_url);

    // Migrate each image in the images[] array
    const newImages = Array.isArray(post.images)
      ? post.images.map((img: string) => migrateUrl(img) ?? img)
      : post.images;

    const needsUpdate =
      newImageUrl !== post.image_url ||
      JSON.stringify(newImages) !== JSON.stringify(post.images);

    if (!needsUpdate) continue;

    const { error: updateError } = await supabase
      .from('posts')
      .update({ image_url: newImageUrl, images: newImages })
      .eq('id', post.id);

    if (updateError) {
      console.error(`Failed to update post ${post.id}:`, updateError.message);
    } else {
      console.log(`✓ Updated post ${post.id}`);
      updated++;
    }
  }

  console.log(`\nDone. Updated ${updated} / ${posts.length} posts.`);
}

run();
