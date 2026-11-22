# Ritesh Pawar's portfolio

The source for [riteshhpawar23.github.io/Portfolio](https://riteshhpawar23.github.io/Portfolio/), built with React and Vite.

## How to change the resume

The resume is one file: `public/resume.pdf`. Replace it and every Resume button on the site shows the new one. There's no code to change.

The name has to be exactly `resume.pdf`, all lowercase.

### Before you upload

- Open the PDF and read it once.
- Click each link in it in an incognito window. If a link asks you to sign in, recruiters can't open it either.
- Remember the file is public, along with any phone number or address in it.

### Option 1: On GitHub (easiest)

This works on a phone too.

1. Rename your new PDF to `resume.pdf`.
2. Open the [Portfolio repository](https://github.com/Riteshhpawar23/Portfolio) and make sure the branch is `main`.
3. Open the `public` folder.
4. Click **Add file**, then **Upload files**.
5. Drop in the PDF and click **Commit changes**.
6. Wait for the green tick in the [Actions tab](https://github.com/Riteshhpawar23/Portfolio/actions). The site updates by itself.

### Option 2: From your computer

Open PowerShell in the project folder and run these one at a time.

Get the latest version of the site:

```powershell
git switch main
```

```powershell
git pull origin main
```

Copy in your new resume. Change `My_New_Resume.pdf` to the name of your file:

```powershell
Copy-Item "$env:USERPROFILE\Downloads\My_New_Resume.pdf" "public\resume.pdf" -Force
```

Save it and publish:

```powershell
git add public/resume.pdf
```

```powershell
git commit -m "Update resume"
```

```powershell
git push origin main
```

### See it before publishing (optional)

Do this after copying the file and before `git add`. It needs [Node.js](https://nodejs.org/) 22.12 or newer.

The first time only:

```powershell
npm ci
```

Then each time:

```powershell
npm run build
```

```powershell
npm run preview
```

Open http://127.0.0.1:5500/Portfolio/ and click Resume. Press Ctrl+C in PowerShell when you're done.

### Check that it worked

Open https://riteshhpawar23.github.io/Portfolio/resume.pdf and press Ctrl+F5.

### If something goes wrong

| Problem | What to do |
|---|---|
| The old resume still shows | Browsers can keep it for up to 10 minutes. Wait, then press Ctrl+F5. |
| The Resume button shows "404" | The file has the wrong name or folder. It must be `public/resume.pdf`. |
| The Actions tab shows a red cross | Open the failed run to read the error. The site keeps showing the last working version until it's fixed. |
| Git says "nothing to commit" | The new PDF is the same as the old one. Check that you copied the right file. |
| `git switch main` refuses to run | You have unfinished changes. Commit them on their own branch first, or use Option 1. |
| You uploaded the wrong resume | Upload the correct one the same way. It replaces the file, but the old one stays visible in the Git history. |
