# ROUTER — Project Configuration

> Copy this file to the root of each project as `CLAUDE.md` and fill in the two fields below.
> The agent reads this file first, then loads exactly the modules that match — nothing more.

---

## Project configuration

**Scale:** small
**Origin:** personal

---

## Load order

Read these files in this exact order before any action:

### Always loaded (all projects)

1. `.claude/prompts/core/code-style.md`
2. `.claude/prompts/core/security-env.md`
3. `.claude/prompts/core/agent-config-repo.md`
4. `.claude/prompts/core/accumulated-learnings.md`

### Conditional — Scale (pick one)

- If **small**: `.claude/prompts/modules/scale/small.md`
- If **scalable**: `.claude/prompts/modules/scale/scalable.md`

### Conditional — Origin (pick one)

- If **personal**: `.claude/prompts/modules/origin/personal.md`
- If **external-client**: `.claude/prompts/modules/origin/external-client.md`

### After reading the modules above

Read the project scope document (path provided by the developer). Derive the stack from the scope and load the corresponding stack module:

- If scope defines **Next.js**: `.claude/prompts/modules/stack/nextjs.md`
- If scope defines **NestJS**: `.claude/prompts/modules/stack/nestjs.md`
- If scope defines another stack: follow what is defined in the scope — no stack module needed

### Loaded on demand (do not load upfront)

These are referenced by the scale modules and loaded only when the event occurs:

| Event | File |
|---|---|
| End of stage (small projects) | `.claude/prompts/modules/lifecycle/stage-end.md` |
| End of issue (scalable projects) | `.claude/prompts/modules/lifecycle/issue-end.md` |
| End of milestone (scalable projects) | `.claude/prompts/modules/lifecycle/milestone-end.md` |
| Project setup before first code (scalable) | `.claude/prompts/modules/lifecycle/github-setup.md` |

---

## After loading all modules

Confirm your understanding of the project and wait for developer approval before any action.
