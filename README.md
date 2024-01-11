<picture>
  <source width="64" media="(prefers-color-scheme: dark)" srcset="https://github.com/trevnels/armchair/assets/25140503/66b5728d-c0e6-41b4-8c00-4ae793387d60">
  <source width="64" media="(prefers-color-scheme: light)" srcset="https://github.com/trevnels/armchair/assets/25140503/d07fd12f-7282-4c4f-bf9c-4e9c6e1b541c">
  <img width="64" alt="armchair" src="https://github.com/trevnels/armchair/assets/25140503/66b5728d-c0e6-41b4-8c00-4ae793387d60">
</picture>

# armchair

A new FRC scouting and analysis platform built around the Glicko-2 rating system, modified in a manner similar to Statbotics's EPA.

The system is designed around the lack of manual data entry - it should provide useful insights about events and teams without having to actively record data on them.

## To Do
- [x] UI Design
- [ ] Automatically populate Redis DB with TheBlueAlliance data, updating every 5 minutes
- [ ] Initial frontend implementation
- [ ] Work out the Glicko-2 math for overall and component ratings factoring in point margins (perhaps implement this in Rust for performance, since we'll be running a lot of this math)
- [ ] Game data parsing for each season's objectives
- [ ] Update timeseries based on rating calculations
- [ ] Datagrid with pretty graphs, etc.
- [ ] Implement navigation command palette
- [ ] Match predictions, event insights, monte-carlo ranking prediction

## Tech Stack
*Very much subject to change*

- Next.js & React
- shadcn/ui (plus Lucide icons)
- Redis (especially its timeseries feature)

