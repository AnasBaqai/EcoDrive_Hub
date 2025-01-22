# Car Management System

A modern web application for managing car inventory with advanced filtering, sorting, and pagination capabilities.

## Features

- 🚗 Comprehensive car inventory management
- 🔍 Advanced filtering and search functionality
- 📊 Customizable data grid with:
  - Column sorting
  - Multi-column filtering
  - Custom pagination
  - Responsive design
- 👁️ View and delete operations for each car entry
- 🎨 Modern Material-UI design with custom theming
- ⚡ Optimized performance with debounced search
- 📱 Responsive layout for all screen sizes
- 🐳 Docker containerization for easy deployment
- 📦 MongoDB database with CSV data import capability

## Tech Stack

- **Frontend**:

  - React
  - TypeScript
  - Material-UI (MUI)
  - AG Grid Enterprise
  - React Icons

- **Backend & Infrastructure**:
  - Node.js
  - MongoDB
  - Docker
  - Docker Compose

## Getting Started

### Prerequisites

- Docker and Docker Compose
- Node.js (v14 or higher) - for local development only
- npm or yarn - for local development only

### Docker Setup

1. Clone the repository:

```bash
git clone <repository-url>
cd <project-directory>
```

2. Start the application using Docker Compose:

```bash
docker-compose up -d
```

This will start:

- Frontend application (available at http://localhost:5173)
- Backend API (available at http://localhost:3000)
- MongoDB database

3. Import sample data into MongoDB:

```bash
docker-compose exec api npm run import-data
```

This command will import the car data from the CSV file into MongoDB.

### Local Development Setup

If you prefer to run the application without Docker:

1. Install dependencies:

```bash
npm install
# or
yarn install
```

2. Start the development server:

```bash
npm start
# or
yarn start
```

The application will be available at `http://localhost:3000`

## Docker Commands

### Basic Commands

```bash
# Start all services
docker-compose up -d

# Stop all services
docker-compose down

# View logs
docker-compose logs -f

# Rebuild containers
docker-compose up -d --build
```

### Database Management

```bash
# Access MongoDB shell
docker-compose exec mongodb mongo

# Import data from CSV
docker-compose exec api npm run import-data

# Backup database
docker-compose exec mongodb mongodump --out /backup

# Restore database
docker-compose exec mongodb mongorestore /backup
```

## Usage

### Data Grid Features

1. **Filtering**:

   - Use the filter row below column headers
   - Supports text and number filters
   - Multiple filters can be applied simultaneously

2. **Pagination**:

   - Customize rows per page (10, 25, 50, 100)
   - Navigate through pages using prev/next buttons
   - Shows current page and total pages

3. **Column Management**:

   - Resize columns by dragging
   - Sort by clicking column headers
   - Multi-column sorting supported

4. **Row Actions**:
   - View button: Opens detailed view of car
   - Delete button: Removes car from inventory

### Search Functionality

- Real-time search with debouncing
- Searches across all car properties
- Results update automatically

## Component Structure

### DataGrid Component

The main grid component (`DataGrid.tsx`) provides:

- Custom pagination
- Row selection
- Action buttons
- Loading states
- Filter change handling
- Responsive layout

### Key Props

```typescript
interface DataGridProps {
  rowData: Car[]; // Data to display
  totalRows: number; // Total number of rows
  page: number; // Current page number
  pageSize: number; // Items per page
  isLoading?: boolean; // Loading state
  onGridReady?: Function; // Grid initialization callback
  onViewClick?: Function; // View action callback
  onDeleteClick?: Function; // Delete action callback
  onPageChange?: Function; // Page change callback
  onFilterChange?: Function; // Filter change callback
}
```

## Styling

- Custom Material-UI theme
- AG Grid theme customization
- Responsive design with breakpoints
- Smooth animations and transitions

## Best Practices

- Memoized components for optimal performance
- Debounced search for better UX
- Type-safe implementation with TypeScript
- Consistent error handling
- Loading states for async operations

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

# Demo

Here is a demo of the project:

## Project Demo

https://github.com/user-attachments/assets/475c4322-89e4-422c-96aa-021062244c6e
