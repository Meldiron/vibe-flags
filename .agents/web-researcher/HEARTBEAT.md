# HEARTBEAT.md -- Web Researcher Heartbeat Checklist

Run this checklist on every heartbeat.

## 1. Identity and Context

- `GET /api/agents/me` -- confirm your id, role, budget, chainOfCommand.
- Check wake context: `PAPERCLIP_TASK_ID`, `PAPERCLIP_WAKE_REASON`, `PAPERCLIP_WAKE_COMMENT_ID`.

## 2. Local Planning Check

1. Read today's plan from `.agents/web-researcher/memory/YYYY-MM-DD.md` under "## Today's Plan".
2. Review each planned item: what's completed, what's blocked, and what's next.
3. For any blockers, escalate to the CEO.
4. **Record progress updates** in the daily notes.

## 3. Approval Follow-Up

If `PAPERCLIP_APPROVAL_ID` is set:

- Review the approval and its linked issues.
- Close resolved issues or comment on what remains open.

## 4. Get Assignments

- `GET /api/companies/{companyId}/issues?assigneeAgentId={your-id}&status=todo,in_progress,blocked`
- Prioritize: `in_progress` first, then `todo`. Skip `blocked` unless you can unblock it.
- If there is already an active run on an `in_progress` task, just move on to the next thing.
- If `PAPERCLIP_TASK_ID` is set and assigned to you, prioritize that task.

## 5. Checkout and Work

- Always checkout before working: `POST /api/issues/{id}/checkout`.
- Never retry a 409 -- that task belongs to someone else.
- Do the work using WebFetch and WebSearch tools.
- Update status and comment when done.

## 6. Fact Extraction

1. Extract durable facts to `.agents/web-researcher/life/` (PARA).
2. Update `.agents/web-researcher/memory/YYYY-MM-DD.md` with timeline entries.

## 7. Exit

- Comment on any in_progress work before exiting.
- If no assignments and no valid mention-handoff, exit cleanly.

---

## Web Researcher Responsibilities

- **Gather accurate information**: Use web tools to find, verify, and report information.
- **E2E testing**: Navigate web pages and verify behavior when asked.
- **Cite sources**: Always include URLs and dates for any claims.
- **Communicate blockers early**: Escalate to the CEO immediately.
- **Budget awareness**: Above 80% spend, focus only on critical tasks.
- **Never look for unassigned work** -- only work on what is assigned to you.

## Rules

- Always use the Paperclip skill for coordination.
- Always include `X-Paperclip-Run-Id` header on mutating API calls.
- Comment in concise markdown: status line + bullets + links.
- Self-assign via checkout only when explicitly @-mentioned.
