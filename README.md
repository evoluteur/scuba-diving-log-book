# scuba-diving-log-book

My [scuba diving virtual log book](https://evoluteur.github.io/scuba-diving-log-book/).

![scuba-diving-log-book](scuba-diving-log-book.png)

Data structure:

```typescript
Dive {
    date: string, // m/d/yyyy
    depth: number, // in meters
    duration: number, // in minutes
    site: string,
    city?: string,
    state?: string,
    country?: string,
    night?: boolean,
    wreck?: boolean,
    nitrox?: number, // % oxygen
    notes?: string,
}
```

Copyright (c) 2025 [Olivier Giulieri](https://evoluteur.github.io/).
