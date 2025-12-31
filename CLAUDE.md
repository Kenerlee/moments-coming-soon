# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a static HTML "Coming Soon" landing page for the Moments project, deployed on Netlify. The site features a responsive design with parallax effects, preloader animation, and an email subscription popup.

## Architecture

### Frontend Structure
- **HTML**: Single-page layout in [index.html](index.html) with semantic sections (hero, popup, preloader)
- **CSS**: Split into [assets/css/main.css](assets/css/main.css) (core styles) and [assets/css/plugins.css](assets/css/plugins.css) (third-party styles)
- **JavaScript**: Uses jQuery for DOM manipulation and AJAX in [assets/js/main.js](assets/js/main.js)
  - Parallax library integration for background effects
  - Staggered animation system using `data-animation-delay` attributes
  - Popup modal system with dynamic backdrop

### Email Subscription Flow
1. User clicks "Notify Me" button → popup appears
2. Form submission via AJAX to [assets/php/subscribe.php](assets/php/subscribe.php)
3. PHP script validates email and appends to `subscriber-list.txt`
4. Honeypot field (`phone`) prevents bot submissions
5. Response updates UI with success/error state

### Animation System
The site uses a custom animation system with three key components:
- **Preloader**: Bounce animation that hides on page load
- **Staggered Animations**: Elements with `.animation-container` and `data-animation-delay` animate in sequence (0ms, 300ms, 600ms, 900ms, 1200ms)
- **Parallax**: Background image with depth-based parallax scrolling

## Development

### Local Development
Simply open [index.html](index.html) in a browser. For testing PHP functionality, use a local PHP server:
```bash
php -S localhost:8000
```

### Deployment
Deployed to Netlify. **Use Netlify CLI to deploy (NOT git push)**:

```bash
cd /Users/kadenliu/Documents/GitHub/moments-coming-soon
netlify deploy --prod
```

This will deploy directly to https://moments.top

Configuration in [netlify.toml](netlify.toml):
- Publish directory: `.` (root)
- Static assets cached for 1 year
- Security headers applied (X-Frame-Options, X-XSS-Protection, etc.)
- 404s redirect to index.html

### File Organization
- `assets/img/` - Logo, favicon, background images
- `assets/fonts/` - FontAwesome webfonts
- `assets/php/subscribe.php` - Backend email collection (requires PHP environment)

## Key Technical Notes

1. **PHP Dependency**: Email subscription requires PHP runtime. In Netlify deployment, this won't work without serverless function migration.
2. **jQuery Dependency**: All JavaScript relies on jQuery loaded via [assets/js/plugins.js](assets/js/plugins.js)
3. **External Fonts**: Google Fonts (Roboto) loaded via CDN
4. **ICP License**: Chinese ICP registration number included in footer (沪ICP备2025143616号)
