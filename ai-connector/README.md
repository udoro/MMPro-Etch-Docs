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

### Step 2 — Load the Skills Package

The Skills Package teaches your AI agent how Mega Menu Pro works. In your project folder, run:

```
npx mmpro-agentic-skills-etch
```

This installs `mmpro-skills/mega-menu-pro-skills.md`, its lookup-only reference-file companion, and the
full component prop docs in `components/` — all working together, with no manual download needed. Point
your agent at `mmpro-skills/mega-menu-pro-skills.md` to load it.

**Already have files installed and want to update them?** Re-run with `--force`:

```
npx mmpro-agentic-skills-etch --force
```

**Prefer a manual download?** [Download this repository](https://github.com/udoro/MMPro-Etch-Docs/archive/refs/heads/main.zip)
and point your agent at `ai-connector/mmpro-skills/mega-menu-pro-skills.md`, or browse to the
[`mmpro-skills` folder](https://github.com/udoro/MMPro-Etch-Docs/tree/main/ai-connector/mmpro-skills) for
just the skills file on its own — it still works without the local `components/` folder, falling back to
fetching the same docs from this live GitBook site when it needs them.

### Step 3 — Connect

Open your project in your IDE and start an agent session with the Skills File loaded. Then paste the following command into the chat and send it:

```
npx @digital-gravy/etch-connector serve
```

The agent will run the command, detect your Etch Builder tab, confirm it's connected, and ask what you'd like to change.

***

## What you can do

Once connected, describe what you want in plain English. Here are some examples of what the agent can help with.

***

### Recreate a navigation from a reference site

You can ask the agent to build a navigation inspired by any website.

> *"Build me a navigation like Stripe's — transparent header on load, full-width mega menus with a subtle fade-in, search and login icons on the right, hamburger on mobile."*

> *"Recreate the Apple navigation — items centered with the logo, dropdowns on hover, full-width panel, smooth height transition between open dropdowns, no hover background on items."*

**For best results:**

* Attach a **screenshot** of the navigation you want to recreate
* Describe the **behaviour** — hover or click to open, animations, sticky or overlay
* Describe the **appearance** — colours, layout, spacing, mobile behaviour
* Mention specific details — icon buttons, CTA buttons, backdrop blur, centered logo

The agent maps your description to the available props and CSS variables and builds it without writing unnecessary custom CSS.

***

### Style and appearance

> *"Change the nav item colour to white, hover to light gray. Dropdown panel background dark navy."*

> *"Add a frosted glass effect to the header when a dropdown opens."*

> *"Make the last nav item a pill CTA button with a blue background."*

***

### Mega menus

> *"Add a mega menu to the Services nav item — 3 columns, each with an icon, title, and description."*

> *"Make the mega menu full width and match the header width."*

***

### Header behaviour

> *"Make the header transparent on load and switch to white with a shadow after scrolling."*

> *"Hide the header on scroll down, show it on scroll up."*

> *"Sticky header with a smaller height after scrolling."*

***

### Mobile menu

> *"Slide the mobile menu in from the right with a fade on the items."*

> *"Move the search and cart icons outside the mobile menu so they sit next to the hamburger."*

> *"Use a fullscreen mobile menu that opens over the header."*

***

### Accessibility

> *"Configure the skip links with advanced parameters — add one for the main content and one for the footer navigation."*

***

The agent will always confirm your intent before making structural changes, and will back up your layout before a full rebuild.

***

## Your context file

The agent supports a personal context file called `mmpro-user-context.md`, stored in the same folder as your Skills File. At the start of each session, if the file exists, the agent reads it silently — giving it a head start on your preferences, saved templates, and anything useful from previous sessions.

If the file doesn't exist yet, the agent creates it automatically on your first session and will let you know. It then updates it at the end of every session with anything new it learned about your setup — without you having to ask.

**You can also prompt it directly:**

* *"Save this mega menu layout to my context file so I can reuse it."*
* *"Update my context file — I always want mega menus to use `#dwc-header` for width."*
* *"Update the context file with anything new you learned about my setup."*

Keep the Skills File in a consistent project folder so the context file persists between sessions and grows more useful over time.

***

## Tips

* **Reload the Skills File each session** — AI agents don't retain memory between conversations. Place the file in your project folder or re-attach it at the start of each new session.
* **Keep the agent session open** — closing it disconnects the connector.
* **One tab at a time** — connect to one Etch Builder tab per site.
* **Session recovery** — if the agent loses the connection mid-session, check that the Etch Builder tab is still open. You usually don't need to reconnect.
* **Not happy with the result?** Before any full rebuild, the agent automatically backs up your header. If you're not satisfied, just ask: *"Restore my header from the backup"* — the agent will revert to the saved version.

***

## Troubleshooting

| Problem | Fix |
|---|---|
| Agent says it can't find the DWC Header/Nav | Make sure the DWC Header is placed on the current page/template in Etch |
| Agent can't connect | Make sure Node.js is installed and the Etch Builder tab is open |
| Changes not saving | Ask the agent to save — it runs `saveAsync()` after each change |
