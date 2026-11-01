# mmpro-agentic-skills-etch

Installs the Mega Menu Pro AI Connector skills files and component prop docs into any project, so users
don't have to clone or download the docs repo by hand.

```
npx mmpro-agentic-skills-etch
```

Installs into the current directory:

```
mmpro-skills/mega-menu-pro-skills.md
mmpro-skills/mega-menu-pro-skills-reference.md
components/*.md
```

Options: `--force` / `-f` to overwrite an existing install, a path argument to install elsewhere
(e.g. `npx mmpro-agentic-skills-etch ./my-site-project`), `--ref <branch or tag>`, `--help` / `-h`.

The installer downloads the current files from this repo on GitHub every time. If any file can't be
downloaded, it stops with a message and installs nothing. The package holds no copy of the skills.

## Maintaining this package

The files it installs live at:

- `../mmpro-skills/*.md`
- `../../components/*.md`

A change to one of them reaches users as soon as it's pushed. No npm publish is needed.

After adding, removing or renaming one of those files, run:

```
npm run build
```

and commit `../skills-manifest.json`: it's the file list the installer reads from GitHub. The build
also fails on a link that would break in an installed project: a link out of `components/`, or a
`../../` link in a skills file that `PATH_REWRITE` doesn't rewrite.

## Publishing a new version

Only needed when `bin/` or `lib/` change.

```
npm version patch   # or minor/major
npm publish
```

(Requires `npm adduser` / `npm login` first.)
