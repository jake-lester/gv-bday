# 🎉 Birthday Countdown Website

A beautiful, interactive countdown website that reveals a special birthday postcard when September 5th arrives!

## 🌐 Clean URL Routing

This website supports clean URLs without `.html` extensions:

- `guyvardi.com/` - Landing page
- `guyvardi.com/countdown` - Countdown & memory game
- `guyvardi.com/wishes` - Birthday wishes postcard

## 🚀 Local Development

### Option 1: Python Server (Recommended)

Use the included server with clean URL support:

```bash
python server.py
```

Or specify a different port:

```bash
python server.py --port 8001
```

This provides:

- ✅ Clean URLs (no .html needed)
- ✅ Proper routing
- ✅ Development headers
- ✅ Automatic file mapping

### Option 2: Simple HTTP Server

For basic testing (URLs will show .html):

```bash
python -m http.server 8000
```

## 🌟 Features

- **Real-time Countdown**: Live timer showing days, hours, minutes, and seconds until the birthday
- **Excitement Meter**: Visual indicator that fills up as the birthday approaches
- **Animated Birthday Postcard**: Beautiful reveal with decorations, balloons, and wishes
- **Interactive Elements**:
  - Click countdown items for fun animations
  - Hover over birthday decorations for effects
  - Celebrate button with confetti and fireworks
  - Easter egg: Try the Konami code! ⬆️⬆️⬇️⬇️⬅️➡️⬅️➡️BA
- **Sound Effects**: Celebratory tones when the birthday arrives
- **Responsive Design**: Works perfectly on desktop, tablet, and mobile
- **Beautiful Animations**: Floating elements, smooth transitions, and delightful effects

## 🚀 Deployment to GitHub Pages

### Step 1: Create Repository

1. Create a new repository on GitHub named `gv-bday` (or any name you prefer)
2. Upload all the files from this project to the repository

### Step 2: Enable GitHub Pages

1. Go to your repository settings
2. Scroll down to "Pages" section
3. Under "Source", select "Deploy from a branch"
4. Choose "main" branch and "/ (root)" folder
5. Click "Save"

### Step 3: Configure Custom Domain

1. In the "Pages" settings, under "Custom domain", enter: `guyvardi.com`
2. Check "Enforce HTTPS" (recommended)
3. GitHub will automatically use the `CNAME` file included in this project

### Step 4: Update DNS Settings

In your domain registrar (where you bought guyvardi.com):

1. Add the following DNS records:

**For apex domain (guyvardi.com):**

```
Type: A
Name: @
Value: 185.199.108.153
```

```
Type: A
Name: @
Value: 185.199.109.153
```

```
Type: A
Name: @
Value: 185.199.110.153
```

```
Type: A
Name: @
Value: 185.199.111.153
```

**For www subdomain (optional):**

```
Type: CNAME
Name: www
Value: yourusername.github.io
```

### Step 5: GitHub Pages Clean URLs

The included `404.html` file automatically handles clean URL routing on GitHub Pages:

- Users can visit `/countdown` and `/wishes` directly
- 404 redirects are handled transparently
- No server configuration needed

### Step 6: Wait for DNS Propagation

- DNS changes can take up to 24 hours to propagate
- You can check the status in your GitHub Pages settings
- The site will be available at `https://guyvardi.com` once configured

## 🎨 Customization

Feel free to customize the website:

- **Date**: Change the target date in `script.js` (line 2)
- **Name**: Update "Guy" to the birthday person's name throughout the files
- **Colors**: Modify the gradient colors in `style.css`
- **Messages**: Edit the birthday wishes in `index.html`
- **Animations**: Adjust timing and effects in `style.css` and `script.js`

## 📱 Browser Compatibility

- Chrome (recommended)
- Firefox
- Safari
- Edge
- Mobile browsers

## 🎵 Features Breakdown

### Countdown Timer

- Automatically updates every second
- Smooth number animations when values change
- Special effects during final 10 seconds

### Birthday Reveal

- Animated postcard entrance
- Floating balloons and confetti
- Personalized birthday message
- Interactive celebration button

### Visual Effects

- Background floating elements
- Hover animations
- Click interactions
- Confetti and fireworks on celebration

## 🛠️ Technical Details

- **Pure HTML/CSS/JavaScript**: No external dependencies
- **Responsive**: Mobile-first design
- **Performance Optimized**: Animations pause when tab not visible
- **Accessibility**: Proper semantic HTML structure
- **Modern Features**: CSS Grid, Flexbox, CSS animations, Web Audio API

## 📅 Countdown Logic

The countdown automatically detects:

- Current year vs target year
- Leap years
- Time zones (uses visitor's local time)
- Handles countdown completion gracefully

## 🎁 Easter Eggs

- Konami Code: ⬆️⬆️⬇️⬇️⬅️➡️⬅️➡️BA for super celebration
- Click countdown numbers for spin animations
- Hover birthday decorations for scaling effects
- Mobile touch interactions

Enjoy the countdown! 🎂✨
