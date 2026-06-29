---
icon: sparkles
---

# AI Connector

The AI Connector lets you control **Mega Menu Pro + Header Builder** through a conversational AI agent — describe what you want in plain English and the agent makes it happen directly inside your Etch Builder.

> **Supported AI:** Claude by Anthropic (recommended). Use [claude.ai](https://claude.ai) or the [Claude desktop app](https://claude.ai/download).

***

## How it works

1. You enable the AI Connector in Etch Builder
2. You connect it to an external AI agent (Claude)
3. You load the MMPro Skills File into your Claude conversation
4. You chat with Claude — it reads your live builder state and applies changes directly

The AI never guesses. It reads your actual component IDs, live props, and style entries before touching anything.

***

## Prerequisites

* Etch Builder with Mega Menu Pro + Header Builder installed
* [Node.js](https://nodejs.org) installed (v18 or later)
* A [Claude](https://claude.ai) account (Pro plan recommended for longer sessions)

***

## Setup

### Step 1 — Enable AI Connector in Etch

1. Open **Etch Builder** and go to **Settings**
2. Enable **AI Connector**
3. Click the **AI sparkles button** in the lower-left settings bar
4. Select **"Connect external AI agent"**

### Step 2 — Start the connector server

Open your terminal and run:

```bash
npx @digital-gravy/etch-connector serve
```

Leave this terminal running. You'll see output like:

```
[etch-connector] + tab "your-site.com" (...)
```

Copy that entire output — you'll paste it into Claude.

### Step 3 — Load the Skills File into Claude

The Skills File is what teaches Claude how Mega Menu Pro works. You need to load it at the start of every new conversation.

[Download the MMPro Skills File](https://github.com/udoro/MMPro-Etch-Docs/blob/main/ai-connector/mega-menu-pro-skills.md)

**To load it into Claude:**

1. Open a new Claude conversation
2. Attach the downloaded `mega-menu-pro-skills.md` file (use the paperclip / attachment button)
3. Paste the connector server output from Step 2 into the chat and send it

Claude will confirm it's connected and ask what you'd like to change.

***

## Using the AI

Once connected, just describe what you want in plain English:

> *"Make the header transparent on load with a white blur when a dropdown opens"*

> *"Add a mega menu to the Shop nav item with a 4-column grid"*

> *"Move the search icon outside the mobile menu, next to the hamburger"*

> *"Change the nav item colour to dark gray, hover to black"*

Claude will confirm your intent before making any structural changes, and will always back up your layout before a full rebuild.

***

## Tips

* **Reload the Skills File each session** — Claude's memory doesn't persist between conversations. Attach the file at the start of every new chat.
* **Keep the serve terminal open** — closing it disconnects the agent.
* **One tab at a time** — connect to one Etch Builder tab per site. Multiple tabs on the same site will cause conflicts.
* **Confirm before big changes** — Claude will ask before wiping and rebuilding. Read its confirmation carefully.
* **Session recovery** — if Claude loses the connection mid-session, check that the original serve terminal and your Etch Builder tab are still open. Usually you don't need to re-run `serve`.

***

## Troubleshooting

| Problem | Fix |
|---|---|
| Claude says it can't find the DWC Header/Nav | Make sure the DWC Header is placed on the current page/template in Etch |
| Connection drops | Check the serve terminal is still running and the Builder tab is still open |
| "Tab not found" error | Re-run `npx @digital-gravy/etch-connector serve` and paste the new output into Claude |
| Changes not saving | Claude runs `saveAsync()` after each change — if it times out, ask Claude to save again |
