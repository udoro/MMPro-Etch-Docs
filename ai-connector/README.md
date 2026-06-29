---
icon: sparkles
---

# AI Connector

The AI Connector lets you control **Mega Menu Pro + Header Builder** through a conversational AI agent — describe what you want in plain English and the agent makes it happen directly inside your Etch Builder.

***

## Requirements

* Etch Builder with Mega Menu Pro + Header Builder installed
* [Node.js](https://nodejs.org) (v18 or later)
* **Claude Code** — the AI must run inside an IDE with terminal access so it can execute connector commands. Claude Code is available as a [VS Code extension](https://marketplace.visualstudio.com/items?itemName=anthropic.claude-code), a [JetBrains plugin](https://plugins.jetbrains.com/plugin/24996-claude-code), or the [CLI](https://docs.anthropic.com/en/claude-code/getting-started)

> **Why Claude Code?** The AI needs to run terminal commands against your live Etch Builder tab. Regular claude.ai (web) has no terminal access and cannot use the connector.

***

## How it works

1. You enable the AI Connector in Etch Builder
2. You tell Claude Code you're connected — Claude runs the connector and links to your builder tab
3. Claude reads your live layout state and makes changes directly
4. You just chat — Claude handles everything else

***

## Setup

### Step 1 — Enable AI Connector in Etch

1. Open **Etch Builder** and go to **Settings**
2. Enable **AI Connector**
3. Click the **AI sparkles button** in the lower-left settings bar
4. Select **"Connect external AI agent"**

### Step 2 — Load the Skills File

The Skills File teaches Claude how Mega Menu Pro works. Download it and place it in the folder you'll open in your IDE, or attach it at the start of each Claude Code session.

[Download the MMPro Skills File](https://github.com/udoro/MMPro-Etch-Docs/blob/main/ai-connector/mega-menu-pro-skills.md)

### Step 3 — Connect

Open your project in VS Code (or your IDE) and start a Claude Code session with the Skills File loaded. Then let Claude know you've completed the Etch setup — for example:

> *"I've enabled the AI Connector in Etch and clicked Connect external AI agent."*

Claude will run the connection command, detect your Etch Builder tab, confirm it's connected, and ask what you'd like to change.

***

## Using the AI

Once connected, just describe what you want:

> *"Make the header transparent on load with a white blur when a dropdown opens"*

> *"Add a mega menu to the Shop nav item with a 4-column grid"*

> *"Move the search icon outside the mobile menu, next to the hamburger"*

> *"Change the nav item colour to dark gray, hover to black"*

Claude will confirm your intent before making any structural changes, and will back up your layout before a full rebuild.

***

## Tips

* **Reload the Skills File each session** — Claude's memory doesn't persist between conversations. Place the file in your project folder or re-attach it at the start of each new chat.
* **Keep Claude Code open** — closing the session disconnects the agent.
* **One tab at a time** — connect to one Etch Builder tab per site.
* **Session recovery** — if Claude loses the connection mid-session, check that the Etch Builder tab is still open. You usually don't need to reconnect.

***

## Troubleshooting

| Problem | Fix |
|---|---|
| Claude says it can't find the DWC Header/Nav | Make sure the DWC Header is placed on the current page/template in Etch |
| Claude can't connect | Make sure Node.js is installed and the Etch Builder tab is open |
| Changes not saving | Ask Claude to save — it runs `saveAsync()` after each change |
