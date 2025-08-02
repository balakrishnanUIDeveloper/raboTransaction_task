# 🛒 Transaction Cart Application

A modern Angular application for managing financial transactions with shopping cart functionality. Built with Angular 20, Bootstrap 5.3, and TypeScript.

![Angular](https://img.shields.io/badge/Angular-20.1-red?logo=angular)
![TypeScript](https://img.shields.io/badge/TypeScript-5.7-blue?logo=typescript)
![Bootstrap](https://img.shields.io/badge/Bootstrap-5.3-purple?logo=bootstrap)
![Test Coverage](https://img.shields.io/badge/Coverage-100%25-brightgreen)

## 📋 Table of Contents

- [About](#about)
- [Features](#features)
- [Screenshots](#screenshots)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Usage](#usage)
- [Available Scripts](#available-scripts)
- [Project Structure](#project-structure)
- [Testing](#testing)
- [Technologies Used](#technologies-used)
- [Contributing](#contributing)

## 🎯 About

The Transaction Cart Application is a web-based tool designed to help users browse financial transactions and manage them in a shopping cart-like interface. Users can view transaction details, add transactions to their cart, adjust quantities, and manage their selections.

### Key Highlights
- **Modern Angular 20** with standalone components
- **Bootstrap 5.3** for responsive design
- **100% test coverage** with comprehensive unit tests
- **Semantic HTML** with proper accessibility
- **Clean architecture** with services and models
- **Responsive design** that works on all devices

## ✨ Features

### 🏠 Transaction List Page
- View all available transactions in a clean table format
- See transaction details (contractor name, account number, amount)
- Add transactions to cart with visual feedback
- Real-time cart count display
- Error handling with user-friendly messages

### 🛒 Shopping Cart Page
- View all selected transactions
- Adjust quantity of each transaction
- Remove individual items from cart
- Clear entire cart functionality
- Real-time total calculation
- Empty cart state with helpful messaging

### 🎨 User Experience
- Responsive design for mobile, tablet, and desktop
- Clean and modern Bootstrap 5.3 UI
- Loading states and error handling
- Accessibility-compliant with ARIA labels
- Smooth navigation between pages

## 📱 Screenshots

*Add screenshots of your application here*

## 🔧 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (version 18.x or higher)
- **npm** (version 9.x or higher)
- **Angular CLI** (version 20.x)

You can check your versions with:
```bash
node --version
npm --version
ng --version
```

## 🚀 Installation

1. **Clone the repository**
   ```bash
   git clone <your-repository-url>
   cd raboTransaction_task
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Verify installation**
   ```bash
   ng version
   ```

## 💻 Usage

### Development Server

To start the development server:

```bash
npm start
# or
ng serve
```

The application will be available at `http://localhost:4200/`. The app will automatically reload when you make changes to the source files.

### Production Build

To build the application for production:

```bash
npm run build
# or
ng build
```

The build artifacts will be stored in the `dist/` directory.

### Production Server

To serve the production build locally:

```bash
npm run start:server
```

This will serve the production build at `http://localhost:8080/`.

## 📜 Available Scripts

| Command | Description |
|---------|-------------|
| `npm start` | Start development server |
| `npm run build` | Build for production |
| `npm run start:server` | Serve production build |
| `npm test` | Run tests with coverage |
| `npm run test:watch` | Run tests in watch mode |
| `npm run lint` | Lint the codebase |
| `npm run format` | Format code with Prettier |

## 📁 Project Structure

```
src/
├── app/
│   ├── cart/                          # Cart feature module
│   │   ├── cart.component.*           # Main cart page
│   │   ├── cart-actions/              # Quantity controls
│   │   ├── services/                  # Cart service
│   │   └── total/                     # Cart total component
│   ├── core/                          # Core module
│   │   ├── models/                    # Data models
│   │   └── services/                  # Core services
│   ├── home/                          # Home feature module
│   │   └── home.component.*           # Transaction list page
│   ├── app.component.*                # Root component
│   ├── app.config.ts                  # App configuration
│   └── app.routes.ts                  # Routing configuration
├── assets/                            # Static assets
│   ├── favicon.ico                    # App favicon
│   └── transaction-cart-data.json     # Sample data
├── index.html                         # Main HTML file
├── main.ts                           # Application entry point
└── styles.scss                      # Global styles
```

## 🧪 Testing

The application includes comprehensive test coverage:

### Run Tests
```bash
npm test                    # Run all tests with coverage
npm run test:watch         # Run tests in watch mode
```

### Test Coverage
- **Statements**: 100%
- **Branches**: 73.68%
- **Functions**: 100%
- **Lines**: 100%

Coverage reports are generated in the `coverage/` directory and can be viewed by opening `coverage/transaction-cart-app/index.html` in a browser.

### Test Files
- `*.spec.ts` - Unit tests for components and services
- `karma.conf.js` - Test configuration
- Coverage thresholds configured in Angular configuration

## 🛠️ Technologies Used

### Frontend
- **Angular 20.1** - Web framework
- **TypeScript 5.7** - Programming language
- **Bootstrap 5.3** - CSS framework
- **RxJS** - Reactive programming
- **Angular Signals** - State management

### Development Tools
- **Angular CLI** - Development tooling
- **ESLint** - Code linting
- **Prettier** - Code formatting
- **Karma & Jasmine** - Testing framework
- **ChromeHeadless** - Test runner

### Build & Deployment
- **Webpack** - Module bundler (via Angular CLI)
- **TypeScript Compiler** - Transpilation
- **Angular DevKit** - Build tools

## 📐 Architecture

### Components
- **App Component** - Root component with navigation
- **Home Component** - Transaction list and management
- **Cart Component** - Shopping cart functionality
- **Cart Actions** - Quantity controls
- **Cart Total** - Price calculation display

### Services
- **Transaction Service** - HTTP data fetching
- **Cart Service** - Cart state management

### Models
- **Transaction Model** - Data structure definitions

## 🎨 Styling

- **Bootstrap 5.3** for responsive design
- **Custom SCSS** for component-specific styles
- **Semantic HTML** with proper accessibility
- **Mobile-first** responsive approach

## 🚀 Deployment

The application can be deployed to any static hosting service:

1. **Build for production**
   ```bash
   npm run build
   ```

2. **Deploy the `dist/transaction-cart-app/` folder** to your hosting service

Popular hosting options:
- Netlify
- Vercel
- GitHub Pages
- AWS S3
- Firebase Hosting

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Development Guidelines
- Follow Angular style guide
- Maintain test coverage above 90%
- Use semantic HTML and proper accessibility
- Follow Bootstrap 5.3 best practices
- Run `npm run lint` and `npm run format` before committing

## 📄 License

This project is licensed under the MIT License.

## 🙏 Acknowledgments

- Angular team for the amazing framework
- Bootstrap team for the CSS framework
- RxJS team for reactive programming utilities

---

**Built with ❤️ using Angular 20 and Bootstrap 5.3**
