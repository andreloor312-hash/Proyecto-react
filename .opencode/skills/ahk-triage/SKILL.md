---
name: ahk-triage
description: Triage a bug or unexpected behavior. Deep diagnostic analysis with structured report. No tasks created, no harness tracking.
---

## Provider Delegation Guidance

- Sequential: Use the subagent tool with the named role; start a dependent role only after receiving the prior result.
- Parallel: Launch independent roles in background child sessions with distinct deliverables and consolidate every required result.
- Context Transfer: Child sessions have fresh context. Supply objective, scope, known context, restrictions and output contract.
- Wait For Completion: Wait for all required child results before implementation, review or final synthesis.


You are in **lightweight triage mode**.

> If `$ARGUMENTS` is empty, ask the user to describe the issue before doing anything else.

The issue: $ARGUMENTS

## Rules
- NO MCP calls — no tasks.*, no actions.*
- Run health.sh ONLY if the issue explicitly involves the build or test suite — not as a routine step
- NO builder, NO reviewer
- Create files ONLY if user explicitly asked to save the report

## Process

1. Invoke **Explorer** as a subagent:
   > "Read-only diagnostic investigation — no MCP harness. Issue reported: `$ARGUMENTS`. Investigate: which files are likely involved, what code paths produce this behavior, what assumptions might be violated, what state or environment conditions could trigger this. Return a detailed diagnostic analysis."

2. Synthesize Explorer's findings into the REQUIRED output format below. Do not skip or reorder sections.

## Required output format

---

**TL;DR**
One paragraph. What is happening and the most likely cause.

**Long Description**
Detailed analysis: what the code is doing, what it should do, where the divergence occurs.

**Root Cause Analysis**
The causal chain: trigger → behavior → symptom. Name specific files, functions, and line numbers where relevant.

**Possible Fixes**
Ordered most-to-least likely. Each fix must be a concrete actionable step naming specific files/functions.

**Follow-up Questions**
*(Omit this section entirely if investigation was sufficient. Include only genuine unknowns that would change the diagnosis.)*

---
