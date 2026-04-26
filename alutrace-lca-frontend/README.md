# 🌟 AluTrace LCA Frontend Application

## AI-Driven Life Cycle Assessment Platform for Aluminium Industry

A modern, responsive web application for managing and analyzing Life Cycle Assessment (LCA) data in the aluminium manufacturing industry.

## 🚀 Features

### Core Functionality
- **📊 Real-time Dashboard** - Monitor key metrics and KPIs
- **📤 Data Input** - Upload and manage data from multiple sources
- **⚙️ Processing & Validation** - ML-based data gap filling and validation
- **💾 Storage Management** - Secure data storage with blockchain verification
- **🔌 API Integration** - Connect with ERP, SCADA, and IoT systems
- **📈 Analysis & Reports** - Generate comprehensive LCA reports

### Technical Features
- **Modern Tech Stack**: React 18, TypeScript, Material-UI
- **State Management**: Zustand for global state
- **Data Fetching**: React Query for server state
- **Charts**: Recharts for data visualization
- **Forms**: React Hook Form with Zod validation
- **Routing**: React Router v6

## 📁 Project Structure

```
alutrace-lca-frontend/
├── public/                 # Static assets
│   └── logo.svg           # Application logo
├── src/
│   ├── components/        # Reusable components
│   │   ├── common/       # Common UI components
│   │   ├── dashboard/    # Dashboard specific components
│   │   ├── layout/       # Layout components (Header, Sidebar)
│   │   └── lca/          # LCA specific components
│   ├── pages/            # Page components
│   │   ├── Dashboard.tsx # Main dashboard
│   │   ├── DataInput.tsx # Data upload interface
│   │   ├── SystemFlow.tsx # Complete system visualization
│   │   └── ...
│   ├── services/         # API services
│   ├── store/           # State management
│   │   └── authStore.ts # Authentication store
│   ├── styles/          # Global styles and theme
│   │   ├── global.css   # Global CSS
│   │   └── theme.ts     # MUI theme configuration
│   ├── types/           # TypeScript type definitions
│   ├── utils/           # Utility functions
│   ├── App.tsx          # Main app component
│   └── main.tsx         # Application entry point
├── index.html           # HTML entry point
├── package.json         # Dependencies and scripts
├── tsconfig.json        # TypeScript configuration
├── vite.config.ts       # Vite configuration
└── complete-system-flow.html # Standalone visualization

```

## 🛠️ Installation

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Setup Instructions

1. **Clone the repository**
```bash
cd alutrace-lca-frontend
```

2. **Install dependencies**
```bash
npm install
```

3. **Start development server**
```bash
npm run dev
```

4. **Open in browser**
```
http://localhost:3000
```

## 📜 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 🎨 Key Components

### 1. System Flow Visualization
- **Location**: `src/pages/SystemFlow.tsx`
- **Purpose**: Complete end-to-end visualization of the LCA process
- **Features**: 5-stage workflow, metrics display, integration points

### 2. Dashboard
- **Location**: `src/pages/Dashboard.tsx`
- **Purpose**: Real-time monitoring and KPIs
- **Features**: Charts, metrics cards, alerts, system status

### 3. Data Input
- **Location**: `src/pages/DataInput.tsx`
- **Purpose**: Data upload and management
- **Features**: Drag-drop upload, source connections, file management

### 4. Layout
- **Location**: `src/components/layout/Layout.tsx`
- **Purpose**: Main application layout with sidebar navigation
- **Features**: Responsive design, navigation menu, user profile

## 🔗 Standalone Visualization

The `complete-system-flow.html` file is a standalone visualization that can be opened directly in any browser without requiring Node.js or any build process. Perfect for:
- Presentations
- Stakeholder reviews
- Documentation
- Quick demos

Simply open the file in a browser to view the complete system architecture and workflow.

## 🎯 System Architecture

### Stage 1: Data Capture & Input
- ERP/SCADA integration
- CSV/Excel file uploads
- IoT sensor data
- Manual data entry

### Stage 2: Processing & Validation
- Data cleaning and normalization
- ML-based gap filling
- Quality validation
- Anomaly detection

### Stage 3: Storage & Management
- PostgreSQL database
- Redis caching
- S3 object storage
- Blockchain verification

### Stage 4: APIs & Integrations
- RESTful APIs
- GraphQL endpoints
- WebSocket connections
- OAuth2 authentication

### Stage 5: Output & User Experience
- Interactive dashboards
- PDF/Excel reports
- Real-time visualizations
- Email notifications

## 🌈 Theme Customization

The application uses Material-UI with a custom theme defined in `src/styles/theme.ts`:

- **Primary Color**: #667eea (Purple)
- **Secondary Color**: #764ba2 (Dark Purple)
- **Success**: #4CAF50 (Green)
- **Warning**: #FF9800 (Orange)
- **Error**: #F44336 (Red)

## 🔒 Authentication

The application includes authentication using Zustand for state management. For demo purposes, authentication is set to true by default. Change this in production:

```typescript
// src/store/authStore.ts
isAuthenticated: false // Change to false for production
```

## 📊 Key Metrics Tracked

- **Carbon Footprint**: kg CO₂/kg Al
- **Energy Intensity**: GJ/t
- **Water Usage**: m³/t
- **Recycled Content**: %
- **Data Completeness**: %
- **System Uptime**: %

## 🚦 Performance Targets

- **Response Time**: <200ms
- **Data Processing**: <2s
- **System Uptime**: 99.9%
- **Data Completeness**: 95%+
- **Model Accuracy**: 92%+

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Open a pull request

## 📄 License

This project is part of the Smart India Hackathon 2025 submission.

## 👥 Team

Developed for SIH Problem Statement #25069
- **Organization**: Ministry of Mines (JNARDDC)
- **Category**: Software
- **Theme**: Sustainability in Metallurgy & Mining

## 📞 Support

For issues or questions, please refer to the documentation or contact the development team.

---

**Version**: 1.0.0  
**Status**: Ready for Development  
**Last Updated**: January 2025
