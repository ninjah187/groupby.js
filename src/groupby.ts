// Import here Polyfills if needed. Recommended core-js (npm i -D core-js)
  // import "core-js/fn/array.find"
  // ...

/* tslint:disable */

export const group = (items, ...functions) => functions.reduce((x, f) => f(x), items);

export const by = selector => items => items.reduce((result, item) => {
  const key = selector(item);
  if (result[key] === undefined) {
    result[key] = [];
  }
  result[key].push(item);
  return result;
}, {});

export const and = selector => grouping => {
  const initialGrouping = Array.isArray(grouping)
    ? grouping
    : Object.entries(grouping).map(([key, values]) => ({ keys: [key], values }));
  return initialGrouping
    .map(pair => Object.entries(group(pair.values, by(selector)))
      .map(([key, values]) => ({
        keys: [...pair.keys, key],
        values
      })))
    .reduce((all, batch) => all.concat(batch), []);
};
