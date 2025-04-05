# Editkaro.in - Video Editing Portfolio Website

A professional multi-page website for Editkaro.in, a video editing and social media marketing agency. The website showcases their portfolio across multiple categories, collects leads through an email subscription form, and provides a comprehensive contact system.

## Features

- **Multi-page Structure**: Home, Portfolio, About Us, and Contact pages
- **Responsive Design**: Fully responsive across all devices and screen sizes
- **Portfolio Showcase**: Categorized video portfolio with filtering functionality
- **Video Modal**: Interactive video playback modal for portfolio items
- **Email Collection**: Newsletter subscription form integrated with Google Sheets
- **Contact Form**: Comprehensive contact form with Google Sheets integration
- **Testimonials**: Client testimonials with carousel functionality
- **FAQ Section**: Frequently asked questions with accordion functionality
- **SEO Optimized**: Implemented best practices for search engine visibility

## Technologies Used

- HTML5
- CSS3
- JavaScript (ES6+)
- Google Apps Script (for form handling)
- Google Sheets API (for data storage)
- Font Awesome (for icons)
- Google Fonts

## Installation and Setup

1. Clone the repository:

```bash
git clone https://github.com/yourusername/editkaro-portfolio.git
cd editkaro-portfolio
```

2. Open the project in your preferred code editor.

3. To preview the website locally, use a local server. Example with Python:

```bash
# Python 3
python -m http.server

# Python 2
python -m SimpleHTTPServer
```

Then open `http://localhost:8000` in your browser.

## File Structure

```
editkaro-portfolio/
├── index.html              # Home page
├── portfolio.html          # Portfolio page
├── about.html              # About Us page
├── contact.html            # Contact page
├── css/
│   └── styles.css          # Main stylesheet
├── js/
│   └── script.js           # Main JavaScript file
├── assets/                 # Image assets
├── google-apps-script.js   # Google Apps Script for form handling
└── README.md               # Project documentation
```

## Usage

### Portfolio Management

To add or modify portfolio items in `portfolio.html`:

```html
<div class="portfolio-item category-name">
  <div class="portfolio-item-inner">
    <div class="portfolio-item-img">
      <img src="path/to/image.jpg" alt="Project Title" />
      <div class="view-project">
        <span class="category">Category Name</span>
        <a
          href="#"
          class="play-btn"
          data-video="https://www.youtube.com/embed/VIDEO_ID"
        >
          <i class="fas fa-play"></i>
        </a>
      </div>
    </div>
    <div class="portfolio-info">
      <h3>Project Title</h3>
      <p>Project description</p>
    </div>
  </div>
</div>
```

### Modifying Services

To modify services in `index.html`:

```html
<div class="service-card">
  <div class="service-icon">
    <i class="fas fa-icon-name"></i>
  </div>
  <h3>Service Title</h3>
  <p>Service description</p>
</div>
```

## Customization

### Colors

Modify color variables in `css/styles.css` under `:root`:

```css
:root {
  --primary-color: #ff5e14;
  --secondary-color: #2b2d42;
  --text-color: #333;
  --light-color: #f8f9fa;
  --dark-color: #212529;
  --gray-color: #6c757d;
  --border-color: #e9ecef;
}
```

### Fonts

1. Update the Google Fonts link in each page's `<head>` section.
2. Modify the font-family in CSS.

## Browser Compatibility

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Opera (latest)
- Mobile browsers (iOS Safari, Android Chrome)

## Credits

- Font Awesome
- Google Fonts

## Contact

- Email: [dibyadyutidutta49@gmail.com](mailto:dibyadyutidutta49@gmail.com)
- LinkedIn: [Dibyadyuti Dutta - LinkedIn](linkedin.com/in/dibyadyuti-dutta)
