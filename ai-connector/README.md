---
icon: sparkles
---

# AI Connector

The AI Connector lets you control **Mega Menu Pro + Header Builder** through a conversational AI agent — describe what you want in plain English and the agent makes it happen directly inside your Etch Builder.

***

## Requirements

* Etch Builder with Mega Menu Pro + Header Builder installed
* [Node.js](https://nodejs.org) (v18 or later)
* An **AI coding agent with terminal access** — the AI needs to be able to run terminal commands against your live Etch Builder tab. Any of the following will work:

| Agent | How to get it |
|---|---|
| [Claude Code](https://docs.anthropic.com/en/claude-code/getting-started) | VS Code / JetBrains extension, or CLI — use **Opus 4.8 or later** for best design output |
| [Cursor](https://www.cursor.com) | Standalone AI IDE with built-in agent mode |
| [OpenAI Codex](https://openai.com/codex) | CLI agent |

> The AI must be running in **agent mode** with terminal access enabled — a standard chat-only interface (e.g. a web chat with no tools) will not work.

***

## How it works

1. You enable the AI Connector in Etch Builder
2. You load the MMPro Skills File into your AI agent so it understands the system
3. You tell the agent you're connected — it runs the connector and links to your builder tab
4. The agent reads your live layout state and makes changes directly
5. You just chat — the agent handles everything else

***

## Setup

### Step 1 — Enable AI Connector in Etch

1. Open **Etch Builder** and go to **Settings**
2. Enable **AI Connector**
3. Click the **AI sparkles button** in the lower-left settings bar
4. Select **"Connect external AI agent"**

### Step 2 — Load the Skills File

The Skills File teaches your AI agent how Mega Menu Pro works. Download it and place it in the folder you'll open in your IDE, or attach it at the start of each agent session.

[Download the MMPro Skills File](https://github.com/udoro/MMPro-Etch-Docs/blob/main/ai-connector/mega-menu-pro-skills.md)

### Step 3 — Connect

Open your project in your IDE and start an agent session with the Skills File loaded. Then let the agent know you've completed the Etch setup — for example:

> *"I've enabled the AI Connector in Etch and clicked Connect external AI agent."*

The agent will run the connection command, detect your Etch Builder tab, confirm it's connected, and ask what you'd like to change.

***

## Using the AI

Once connected, just describe what you want:

> *"Make the header transparent on load with a white blur when a dropdown opens"*

> *"Add a mega menu to the Shop nav item with a 4-column grid"*

> *"Move the search icon outside the mobile menu, next to the hamburger"*

> *"Change the nav item colour to dark gray, hover to black"*

The agent will confirm your intent before making any structural changes, and will back up your layout before a full rebuild.

***

## Tips

* **Reload the Skills File each session** — AI agents don't retain memory between conversations. Place the file in your project folder or re-attach it at the start of each new session.
* **Keep the agent session open** — closing it disconnects the connector.
* **One tab at a time** — connect to one Etch Builder tab per site.
* **Session recovery** — if the agent loses the connection mid-session, check that the Etch Builder tab is still open. You usually don't need to reconnect.

***

## Troubleshooting

| Problem | Fix |
|---|---|
| Agent says it can't find the DWC Header/Nav | Make sure the DWC Header is placed on the current page/template in Etch |
| Agent can't connect | Make sure Node.js is installed and the Etch Builder tab is open |
| Changes not saving | Ask the agent to save — it runs `saveAsync()` after each change |
