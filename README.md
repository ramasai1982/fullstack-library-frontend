# fullstack-library-frontend

1. Prerequisites

Make sure you have the following installed:

Node.js (v16 or later)
Angular CLI

npm install -g @angular/cli

2. Clone the Frontend Repository

git clone https://github.com/ramasai1982/fullstack-library-frontend.git
cd fullstack-library-frontend/fullstack-library-frontend

3. Install Dependencies

npm install

4. Run the Frontend

ng serve --open

App will open at: http://localhost:4200

5. Testing

Run Unit Tests: ng test

6. Project Structure

fullstack-library-frontend/
│── src/
│   ├── app/
│   │   ├── components/      # UI Components
│   │   │   ├── book-list/       # Displays list of books
│   │   │   ├── book-details/    # Displays book details
│   │   │   ├── search-bar/      # Search input for books
│   │   ├── services/        # Services (API calls)
│   │   │   ├── book.service.ts  # Handles book-related API calls
│   ├── environments/
│   │   ├── environment.ts  # API Configuration
│── angular.json
│── package.json
README.md
