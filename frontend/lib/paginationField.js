/* eslint-disable no-plusplus */
import { PAGINATION_QUERY } from '../components/pagination';

export default function paginationField() {
  return {
    keyArgs: false,
    read(existing = [], { args, cache }) {
      console.log({ existing, args, cache });
      const { skip, first } = args;

      // read the number of items on the page from the cache
      const data = cache.readQuery({ query: PAGINATION_QUERY });
      const count = data?._allProductsMeta?.count;
      const page = skip / first + 1;
      const pages = Math.ceil(count / first);

      // check if you have existing items
      const items = existing.slice(skip, skip + first).filter((x) => x);
      // if there are items AND there aren't enough items
      // AND we are on the last page THEN JUST SENT IT
      if (items.length && items.length !== first && page === pages) {
        return items;
      }

      if (items.length !== first) {
        // we don't have any items, we must go to network to fetch them
        return false;
      }

      // if there are items, then return them from cache
      if (items.length) {
        console.log(
          `there are ${items.length} items in the cache! Gonna sent em over to apollo`
        );
        return items;
      }

      return false; // fall back to network

      // asks read functions for items
      // 1st thing we can do is return the items
      // because they are already in the cache
      // the other thing we can do is return false from here
      // which will result in a network request
    },
    merge(existing, incoming, { args }) {
      const { skip, first } = args;
      // this runs when the apollo client
      // comes back from the network with products
      console.log(`merging items from the network ${incoming.length}`);
      const merged = existing ? existing.slice(0) : [];
      for (let i = skip; i < skip + incoming.length; ++i) {
        merged[i] = incoming[i - skip];
      }
      return merged;
    },
  };
}
