---
name: ahk-spec-tech
description: Turn an approved spec, feature, or fix into a linked evidence-backed technical specification.
---

## Provider Delegation Guidance

- Sequential: Use the subagent tool with the named role; start a dependent role only after receiving the prior result.
- Parallel: Launch independent roles in background child sessions with distinct deliverables and consolidate every required result.
- Context Transfer: Child sessions have fresh context. Supply objective, scope, known context, restrictions and output contract.
- Wait For Completion: Wait for all required child results before implementation, review or final synthesis.


Start by locating the approved `spec`, `feature`, or `fix` source. Research the current codebase first. For libraries, frameworks, SDKs, APIs, CLIs, cloud services, versions, configuration, or migration questions, use current primary documentation through Context7 and the configured documentation index.

Read [the workflow](resources/workflow.md) and [the template](resources/template.md) before saving.

Define boundaries, contracts, data flow, alternatives and rationale, compatibility, dependencies, rollout, risks, validation, and implementation phases. Create a `spec-tech` draft in `docs/specs/` with `sourceSpec`, validate after every write, and transition to approved only after explicit user confirmation. A `needs-reconciliation` technical spec cannot guide implementation until reconciled and approved again.

The MCP assigns new documents a `YYYY-MM-DD-<slug>.md` filename using the UTC creation date. Use the returned `filePath` (relative to the configured docs directory) to locate the artifact; do not reconstruct or rename it. The prefix belongs only to the physical filename: keep the logical slug, title, source references, and relationships unchanged. Existing files retain their paths on every update.
