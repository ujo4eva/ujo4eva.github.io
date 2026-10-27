import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';

export async function GET(context) {
  const posts = await getCollection('blog', ({ data }) => !data.draft);
  const mixes = await getCollection('mixes');

  const items = [
    ...posts.map((post) => ({
      title: post.data.title,
      pubDate: post.data.date,
      description: post.data.description,
      link: `/blog/${post.id}/`,
    })),
    ...mixes
      .slice()
      .sort((a, b) => b.data.order - a.data.order)
      .map((mix) => ({
        title: `${mix.data.order}. ${mix.data.title}`,
        pubDate: mix.data.date,
        description: mix.data.description ?? `Mix by ${mix.data.artist}`,
        link: `/mixes/#mix-${mix.id}`,
      })),
  ].sort((a, b) => b.pubDate.valueOf() - a.pubDate.valueOf());

  return rss({
    title: 'ujo4eva',
    description: 'Audio Engineering, Tech, Fitness, Culture',
    site: context.site,
    // Hash links on mix items must not pick up a trailing slash
    // after the fragment (`#mix-1/` would miss id="mix-1").
    // Source: https://docs.astro.build/en/guides/rss/#removing-trailing-slashes
    trailingSlash: false,
    items,
  });
}
