---
name: ahk-feature
description: Turn an idea or Jira request into a reviewable, evidence-backed feature specification.
---

## Provider Delegation Guidance

- Sequential: Use the subagent tool with the named role; start a dependent role only after receiving the prior result.
- Parallel: Launch independent roles in background child sessions with distinct deliverables and consolidate every required result.
- Context Transfer: Child sessions have fresh context. Supply objective, scope, known context, restrictions and output contract.
- Wait For Completion: Wait for all required child results before implementation, review or final synthesis.


## Purpose

Read [the feature workflow](resources/feature-workflow.md) before discovery and [the feature template](resources/feature-template.md) before saving.

## Persistence and handoff

After the required questions and project evidence produce a complete first synthesis, create or update a `feature` draft with structured specification MCP tools. Use `specs.list` and `specs.search` to find related context, `specs.get` to read it, and `specs.validate` after every write. Keep drafts reviewable and editable through MCP; transition to `approved` only after explicit user confirmation.

Do not choose an implementation design. Offer `ahk-spec-tech` only after this feature is approved and the user asks for technical design.

The MCP assigns new documents a `YYYY-MM-DD-<slug>.md` filename using the UTC creation date. Use the returned `filePath` (relative to the configured docs directory) to locate the artifact; do not reconstruct or rename it. The prefix belongs only to the physical filename: keep the logical slug, title, source references, and relationships unchanged. Existing files retain their paths on every update.
