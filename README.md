# Electric Vehicle Catalog Application

A modern web application for browsing and managing electric vehicle information, built with Node.js, React, MongoDB, and Redis.

## 🚀 Features

- **Vehicle Catalog**: Browse through a comprehensive list of electric vehicles
- **Advanced Search**: Filter vehicles by various parameters
- **Detailed Information**: View detailed specifications for each vehicle
- **Responsive Design**: Modern UI that works on desktop and mobile devices
- **Real-time Updates**: Fast data retrieval with Redis caching
- **Pagination**: Efficient handling of large datasets

## 🛠 Tech Stack

### Frontend

- React with TypeScript
- Material-UI (MUI) for UI components
- Vite for build tooling
- React Router for navigation

### Backend

- Node.js with Express
- MongoDB for data storage
- Redis for caching
- Docker for containerization

## 📦 Prerequisites

- Docker and Docker Compose
- Node.js (v20 or later)
- npm or yarn

## 🚀 Getting Started

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd <project-directory>
   ```

2. **Environment Setup**

   ```bash
   # Copy example environment files
   cp backend/.env.example backend/.env
   cp frontend/.env.example frontend/.env
   ```

3. **Start the Application**

   ```bash
   # Start all services using Docker Compose
   docker-compose up -d
   ```

   The application will be available at:

   - Frontend: http://localhost:5173
   - Backend API: http://localhost:3000
   - MongoDB: localhost:27017
   - Redis: localhost:6379

## 🏗 Project Structure

```
.
├── frontend/                # React frontend application
│   ├── src/
│   │   ├── components/     # Reusable UI components
│   │   ├── containers/     # Page components
│   │   ├── services/       # API services
│   │   └── types/         # TypeScript type definitions
│   └── ...
│
├── backend/                # Node.js backend application
│   ├── controllers/       # Request handlers
│   ├── models/           # Database models
│   ├── routes/           # API routes
│   ├── services/         # Business logic
│   └── ...
│
└── docker-compose.yml    # Docker composition file
```

## 🔧 Configuration

### Backend Environment Variables

- `NODE_ENV`: Environment mode (development/production)
- `MONGODB_URI`: MongoDB connection string
- `PORT`: Server port (default: 3000)

### Frontend Environment Variables

- `VITE_API_URL`: Backend API URL

## 📝 API Documentation

### Available Endpoints

- `GET /api/cars`: Get list of cars with pagination
  - Query params: page, limit, search
- `GET /api/cars/:id`: Get car details by ID
- `POST /api/cars`: Create new car entry
- `PUT /api/cars/:id`: Update car details
- `DELETE /api/cars/:id`: Delete car entry

## 🧪 Testing

```bash
# Run backend tests
cd backend
npm test

# Run frontend tests
cd frontend
npm test
```

## 📈 Performance Optimization

- Redis caching for frequently accessed data
- Pagination for large datasets
- Optimized MongoDB queries
- Frontend bundle optimization with Vite

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👥 Authors

- Your Name - Initial work

## 🙏 Acknowledgments

- Material-UI for the component library
- MongoDB for the database
- Redis for caching solution
