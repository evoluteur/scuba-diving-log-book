# scuba-diving-log-book

My [scuba diving virtual log book](https://evoluteur.github.io/scuba-diving-log-book/).

![scuba-diving-log-book](scuba-diving-log-book.png)

This project generates a cool looking dive log based on a log file in JSON.

Data structure:

```typescript
Dive {
    date: string, // mm/dd/yyyy
    depth: number, // in meters
    duration: number, // in minutes
    site: string,
    city?: string,
    state?: string,
    country?: string,
    night?: boolean,
    wreck?: boolean,
    nitrox?: number, // % oxygen
    temperature?: number, // in celcius
    notes?: string,
}
```

Copyright (c) 2025 [Olivier Giulieri](https://evoluteur.github.io/).
