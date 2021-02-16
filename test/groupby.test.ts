import { and, by, group } from '../src/groupby'

describe("groupby", () => {

  const items = [
    { text: 'text 1', number: 42, foo: true, other: 123 },
    { text: 'text 1', number: 47, foo: false, other: 456 },
    { text: 'text 1', number: 42, foo: false, other: 123 },
    { text: 'text 1', number: 42, foo: false, other: 789 },
    { text: 'text 2', number: 45, foo: false, other: 101 }
  ];

  it("returns same items when there are no functions", () => {
    const result = group(items);
    expect(result).toEqual(items);
  })

  it('groups items into object by single key when used with by()', () => {
    const result = group(items, by(x => x.text));
    expect(result).toEqual({
      ['text 1']: [
        { text: 'text 1', number: 42, foo: true, other: 123 },
        { text: 'text 1', number: 47, foo: false, other: 456 },
        { text: 'text 1', number: 42, foo: false, other: 123 },
        { text: 'text 1', number: 42, foo: false, other: 789 },
      ],
      ['text 2']: [
        { text: 'text 2', number: 45, foo: false, other: 101 }
      ]
    });
  })

  it('groups items into collection of (keys, values) pairs when used with by() and single and()', () => {
    const result = group(items, by(x => x.text), and(x => x.number));

    expect(result).toEqual([
      {
        keys: ['text 1', '42'],
        values: [
          { text: 'text 1', number: 42, foo: true, other: 123 },
          { text: 'text 1', number: 42, foo: false, other: 123 },
          { text: 'text 1', number: 42, foo: false, other: 789 },
        ]
      },
      {
        keys: ['text 1', '47'],
        values: [
          { text: 'text 1', number: 47, foo: false, other: 456 },
        ]
      },
      {
        keys: ['text 2', '45'],
        values: [
          { text: 'text 2', number: 45, foo: false, other: 101 }
        ]
      }
    ]);
  })

  it('groups items into collection of (keys, values) pairs when used with by() and multiple and()', () => {
    const result = group(items, by(x => x.text), and(x => x.number), and(x => x.other));

    expect(result).toEqual([
      {
        keys: ['text 1', '42', '123'],
        values: [
          { text: 'text 1', number: 42, foo: true, other: 123 },
          { text: 'text 1', number: 42, foo: false, other: 123 },
        ]
      },
      {
        keys: ['text 1', '42', '789'],
        values: [
          { text: 'text 1', number: 42, foo: false, other: 789 }
        ]
      },
      {
        keys: ['text 1', '47', '456'],
        values: [
          { text: 'text 1', number: 47, foo: false, other: 456 },
        ]
      },
      {
        keys: ['text 2', '45', '101'],
        values: [
          { text: 'text 2', number: 45, foo: false, other: 101 }
        ]
      }
    ]);
  })
})
