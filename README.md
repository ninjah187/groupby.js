# groupby.js

## Group collections of objects by single and multiple keys.

### Features:
- Small and simple (20 loc).
- Elegant API.
- No other dependencies.
- ES-compliant.
- Tree-shakable.

### What can it do?

Assume following dataset:

```javascript
const items = [
  { name: 'Alice',   city: 'London', role: 'boss',      salary: 15_000 },
  { name: 'Bob',     city: 'NY',     role: 'salesman',  salary: 10_000 },
  { name: 'Charlie', city: 'London', role: 'developer', salary: 10_000 },
  { name: 'Don',     city: 'London', role: 'developer', salary: 8_000 },
  { name: 'Ernie',   city: 'NY',     role: 'developer', salary: 8_000 },
  { name: 'Flinn',   city: 'London', role: 'developer', salary: 8_000 }
];
```

Group collection of objects by single key:

```javascript
group(items, by(x => x.city))

// result:

{
  London: [
    { name: 'Alice',   city: 'London', role: 'boss',      salary: 15_000 },
    { name: 'Charlie', city: 'London', role: 'developer', salary: 10_000 },
    { name: 'Don',     city: 'London', role: 'developer', salary: 8_000 },
    { name: 'Flinn',   city: 'London', role: 'developer', salary: 8_000 }
  ],
  NY: [
    { name: 'Bob',     city: 'NY',     role: 'salesman',  salary: 10_000 },
    { name: 'Ernie',   city: 'NY',     role: 'developer', salary: 8_000 }
  ]
}
```

Group collection of objects by multiple keys:

```javascript
group(
  items,
  by(x => x.city),
  and(x => x.role),
  and(x => x.salary)
)

// result:

[
  {
    keys: ['London', 'boss', '15000'],
    values: [
      { name: 'Alice', city: 'London', role: 'boss', salary: 15_000 },
    ]
  },
  {
    keys: ['London', 'developer', '10000'],
    values: [
      { name: 'Charlie', city: 'London', role: 'developer', salary: 10_000 },
    ]
  },
  {
    keys: ['London', 'developer', '8000'],
    values: [
      { name: 'Don',   city: 'London', role: 'developer', salary: 8_000 },
      { name: 'Flinn', city: 'London', role: 'developer', salary: 8_000 }
    ]
  },
  {
    keys: ['NY', 'salesman', '10000'],
    values: [
      { name: 'Bob', city: 'NY', role: 'salesman', salary: 10_000 },
    ]
  },
  {
    keys: ['NY', 'developer', '8000'],
    values: [
      { name: 'Ernie', city: 'NY', role: 'developer', salary: 8_000 }
    ]
  }
]
```
