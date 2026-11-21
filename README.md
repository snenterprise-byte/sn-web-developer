# SN WEB DEVELOPER – Portfolio Website

A static site (HTML, CSS, plain JavaScript). No build tools, no paid services, works on GitHub Pages.

```
index.html   page content
style.css    design (colours and fonts at the top)
script.js    animations, menu, form
assets/      favicon.svg and sn-logo-static.svg (static SN logo)
```

## Edit your details
- **Email:** change `soyel4009@gmail.com` in `index.html` (search for it) and in `script.js` (`var EMAIL`).
- **Name/brand:** search `SN WEB DEVELOPER` in `index.html`.
- **Profile photo:** put `profile.jpg` in `assets/`, then in `index.html` uncomment the `<img>` line in the About section.
- **Services:** edit the rows in the Services section.
- **Projects:** each mockup is HTML/CSS in the Work section (classes `m1`–`m5` in `style.css`). Keep the "Demo concept" label until you replace them with real work.
- **Logo:** the SN paths are in the hidden `<symbol id="sn">` at the top of `index.html`. Intro timing is in the `/* INTRO */` part of `style.css`.
- **Social links:** footer, replace each `href="#"`.
- **Colours:** top of `style.css` (`--violet`, `--pink`).
- **WhatsApp (optional):** only with guardian approval. Uncomment the block at the end of the contact section and add the number. Never publish a number you don't want public.

## About the contact form
GitHub Pages has no server, so the form can't send mail itself. It opens the visitor's email app with the message filled in (`mailto:`). For direct submissions you need an external form service (such as Formspree or Web3Forms) or your own backend.

## Publish free on GitHub Pages
1. Sign up at github.com (free) and verify your email.
2. Click **+ → New repository**. Name it `sn-web-developer`, choose **Public**, click **Create repository**.
3. Click **uploading an existing file**, drag in `index.html`, `style.css`, `script.js`, `README.md` and the `assets` folder, then **Commit changes**.
4. Go to **Settings → Pages**. Under *Build and deployment*, choose **Deploy from a branch**, branch **main**, folder **/ (root)**, then **Save**.
5. Wait 1–2 minutes and refresh the Pages screen. Your URL appears at the top: `https://YOUR-USERNAME.github.io/sn-web-developer/`.
6. **To update:** open the file in your repository, click the pencil icon, edit, **Commit changes**. The site refreshes in a minute or two.

## Test it locally
Double-click `index.html` to open it in your browser. Press F12 to check the console for errors.
