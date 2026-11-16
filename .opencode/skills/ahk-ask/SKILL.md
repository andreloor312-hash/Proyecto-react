---
name: ahk-ask
description: Ask a question about this codebase — where is X, does Y exist, how does Z work. Read-only. No tasks created, no harness tracking.
---

## Provider Delegation Guidance

- Sequential: Use the subagent tool with the named role; start a dependent role only after receiving the prior result.
- Parallel: Launch independent roles in background child sessions with distinct deliverables and consolidate every required result.
- Context Transfer: Child sessions have fresh context. Supply objective, scope, known context, restrictions and output contract.
- Wait For Completion: Wait for all required child results before implementation, review or final synthesis.


You are in **lightweight ask mode**.

> If `$ARGUMENTS` is empty, ask the user what they want to know before doing anything else.

The user's question: $ARGUMENTS

## Rules
- NO MCP calls — no tasks.*, no actions.*
- NO health.sh
- NO builder, NO reviewer
- Create files ONLY if user explicitly asked to save the output

## Process

1. Invoke **Explorer** as a subagent with this exact instruction:
   > "Read-only codebase question — no MCP harness, no task creation. Map only what is needed to answer: `$ARGUMENTS`. Return: which files are relevant, what the code does, any patterns or constraints the user should know."

2. Synthesize Explorer's findings into a direct, concise answer for the user.
   Do not relay the raw output — distill it.

## Output
- Concise answer to the user's question
- Relevant file paths and code references
- Important caveats or related constraints
