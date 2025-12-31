# Moments - Coming Soon Website

A beautiful and responsive "Coming Soon" landing page for the Moments project.

## Features

- **Responsive Design**: Works perfectly on all devices and screen sizes
- **Modern UI**: Clean and professional design with smooth animations
- **Email Subscription**: Newsletter signup functionality with form validation
- **Parallax Effects**: Engaging background parallax scrolling
- **Loading Animation**: Elegant preloader with bounce animation
- **Cross-browser Compatible**: Works on all modern browsers

## Technologies Used

- HTML5
- CSS3 (with animations and responsive design)
- JavaScript (ES5)
- Font Awesome Icons
- Google Fonts (Roboto)

## Project Structure

```
Launch/
├── index.html              # Main HTML file
├── assets/
│   ├── css/
│   │   ├── main.css       # Main stylesheet
│   │   └── plugins.css    # Plugin styles
│   ├── js/
│   │   ├── main.js        # Main JavaScript functionality
│   │   └── plugins.js     # JavaScript plugins
│   ├── img/               # Images and icons
│   └── php/
│       └── subscribe.php  # Email subscription handler
├── README.md              # Project documentation
└── .gitignore            # Git ignore file
```

## Getting Started

1. Clone this repository:
   ```bash
   git clone [your-repo-url]
   cd moments-coming-soon
   ```

2. Open `index.html` in your web browser or set up a local server:
   ```bash
   python3 -m http.server 8000
   ```
   Then visit http://localhost:8000

3. For the email subscription functionality to work, you'll need to configure the PHP backend or replace it with your preferred solution.

## Deployment

Deploy to production using Netlify CLI:

```bash
netlify deploy --prod
```

This will deploy directly to https://moments.top

## Customization

- **Logo**: Replace `assets/img/logo.png` with your own logo
- **Background**: Update the background image in `assets/css/main.css`
- **Colors**: Modify the color scheme in the CSS files
- **Content**: Update the text content in `index.html`
- **Email Handler**: Configure `assets/php/subscribe.php` for your email service

## License

This project includes a license file (`_License.txt`). Please refer to it for usage terms and conditions.

## Contact

For questions or support, please refer to the project documentation or contact the development team.

---

© 2025 Moments | All rights reserved | [沪ICP备2025143616号](https://beian.miit.gov.cn/)
