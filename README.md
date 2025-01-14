# Personal Portfolio Website

A modern, responsive portfolio website showcasing my projects, skills, and experience.

## Features

- **Home Page**: Personal introduction and professional overview
- **Projects Page**: Showcase of GitHub repositories and live projects
- **About Page**: Detailed background, skills, and experience
- **Contact Page**: Contact form and social media links

## Technologies Used

- HTML5
- CSS3
- JavaScript
- Bootstrap 5
- Font Awesome Icons

## Project Structure

```
portfolio/
├── index.html          # Home page
├── projects.html       # Projects showcase
├── about.html         # About me page
├── contact.html       # Contact form and information
├── css/
│   └── style.css      # Custom styles
├── js/
│   └── main.js        # JavaScript functionality
└── assets/            # Images and other media files
```

## Setup Instructions

1. Clone the repository:
   ```bash
   git clone [repository-url]
   ```

2. Navigate to the project directory:
   ```bash
   cd portfolio
   ```

3. Customize the content:
   - Replace `[Your Name]` with your actual name
   - Update the bio and introduction in `index.html`
   - Add your projects in `projects.html`
   - Update your experience and skills in `about.html`
   - Add your contact information in `contact.html`
   - Replace `profile-photo.jpg` in the assets directory with your photo

4. Update social media links:
   - Replace the placeholder URLs in the navigation and contact sections
   - Add your GitHub, LinkedIn, and other social media profiles

5. Deploy the website:
   - You can use GitHub Pages, Netlify, or any other static site hosting service
   - Make sure to update the repository links and live demo URLs in the projects section

## Customization

### Colors
The website uses a customizable color scheme defined in CSS variables. To change the colors, modify the following variables in `css/style.css`:

```css
:root {
    --primary-color: #007bff;
    --secondary-color: #6c757d;
    --dark-color: #343a40;
    --light-color: #f8f9fa;
}
```

### Typography
The website uses 'Segoe UI' as the primary font. To change the font, modify the `font-family` property in the `body` selector in `css/style.css`.

### Projects
To add a new project:
1. Copy an existing project card structure in `projects.html`
2. Update the content with your project details
3. Add relevant technology badges
4. Update the GitHub and live demo links

## Contact Form
The contact form includes client-side validation and is ready to be connected to a backend service. To set up form submission:

1. Create a backend API endpoint to handle form submissions
2. Update the `handleFormSubmit` function in `js/main.js` to send data to your endpoint
3. Add appropriate error handling and success messages

## Browser Support

The website is compatible with:
- Google Chrome (latest)
- Mozilla Firefox (latest)
- Microsoft Edge (latest)
- Safari (latest)

## Contributing

If you'd like to contribute to this project:
1. Fork the repository
2. Create a new branch
3. Make your changes
4. Submit a pull request
