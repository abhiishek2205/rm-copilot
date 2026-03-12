# Contributing Guidelines

## Branch Ownership

| Member   | Branch                                       |
| -------- | -------------------------------------------- |
| Member 1 | `feature/member1-dashboard-brief`            |
| Member 2 | `feature/member2-recommendations-benchmarking` |
| Member 3 | `feature/member3-churn-data`                 |

Each member works exclusively on their own feature branch.

## Merge Rule

- All pull requests must target the **`dev`** branch.
- **Never** merge directly into `main`.
- `main` is updated only via reviewed PRs from `dev`.

## Folder Ownership

Each member only edits their own folder under `src/components/`:

| Member   | Owned Folders                                        |
| -------- | ---------------------------------------------------- |
| Member 1 | `src/components/dashboard/`, `src/components/meeting-brief/` |
| Member 2 | `src/components/recommendations/`, `src/components/benchmarking/` |
| Member 3 | `src/components/churn/`                              |

Do not modify another member's folder without prior approval.

## Shared Files

The following files are shared across the team — **coordinate before touching these**:

- `src/App.jsx`
- `src/hooks/useClientStore.js`
- `src/data/clients.json`

If you need to edit a shared file, notify the team in advance to avoid merge conflicts.
