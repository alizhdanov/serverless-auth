import { objectType, intArg, stringArg, interfaceType } from 'nexus';
import fetch from 'node-fetch';
import querystring from 'querystring';

export const Image = objectType({
  name: 'Image',
  definition(t) {
    t.int('width');
    t.int('height');
    t.string('url');
  },
});

export const Images = objectType({
  name: 'Images',
  definition(t) {
    t.field('thumbnail', { type: Image });
    t.field('lowResolution', { type: Image, resolve: i => i.low_resolution });
    t.field('standartResolution', {
      type: Image,
      resolve: i => i.standard_resolution,
    });
  },
});

export const Location = objectType({
  name: 'Location',
  definition(t) {
    t.string('name');
    t.int('latitude');
    t.int('longtitude');
  },
});

export const InstagramItem = objectType({
  name: 'InstagramItem',
  definition(t) {
    t.id('id');
    t.int('likes', i => i.likes.count);
    t.int('comments', i => i.comments.count);
    t.string('link');
    t.string('filter');
    t.field('images', {
      type: Images,
    });
    t.field('location', {
      type: Location,
      nullable: true,
    });
  },
});

export const Instagram = objectType({
  name: 'InstagramPagination',
  definition(t) {
    t.string('cursor', { nullable: true });
    t.list.field('nodes', { type: InstagramItem });
  },
});

export const Query = objectType({
  name: 'Query',
  definition(t) {
    t.field('instagram', {
      type: Instagram,
      args: {
        count: intArg({ default: 20 }),
        after: stringArg({ nullable: true }),
      },
      resolve: async (_, { count, after, before }) => {
        const params = querystring.stringify({
          access_token: process.env.INSTAGRAM_TOKEN,
          count,
          ...(after && { max_id: after }),
        });

        const response = await fetch(
          `https://api.instagram.com/v1/users/self/media/recent?${params}`
        );

        const { data, pagination } = await response.json();

        return { nodes: data, cursor: pagination.next_max_id };
      },
    });

    t.string('test', () => 'GraphQL is working');
  },
});
