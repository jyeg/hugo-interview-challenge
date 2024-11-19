# Hugo Take Home - Insurance Application

## Table of Contents

- [Description](#description)
- [Tech & System Requirements](#tech--system-requirements)
- [Features](#features)
- [Usage](#usage)
- [Project Structure](#project-structure)
- [Installation / Setup](#installation--setup)
- [Running the project](#running-the-project)
- [Design Considerations](#design-considerations)
- [Assumptions](#assumptions)
- [Trade-offs and TODOs](#trade-offs-and-todos)

## Description

This project is a simple insurance application built with React, Typescript, and Shadcn/UI. It
allows users to create, edit, and submit insurance applications.

## Tech & System Requirements

- Typescript
- NodeJS
- Express
- Prisma
- SQLLite
- React
- React Hook Form
- React Router
- Shadcn/UI
- TailwindCSS

## Features

- Create, edit, and submit insurance applications
- Add and remove vehicles from an application
- Add and remove dependents from an application
- Basic form validation
- Toast notifications for user feedback
- Loading states for requests

## Usage

1. Navigate to the home page to create a new insurance application.
2. Fill out the personal information, address, vehicles, and dependents sections of the form.
3. Click "Create Application" to save the application and be redirected to the edit page.
4. On the edit page, you can update any of the form fields and click "Save Progress" to persist the
   changes.
5. Once the application is complete, click "Submit Application" to validate the entire form and
   receive a quote.

## Project Structure

- `client/`: Contains the frontend React application
  - `src/`
    - `components/`: Reusable UI components
      - `insurance/`: Insurance application specific components
        - `InsuranceForm.tsx`: The main form component for creating and editing insurance
          applications
        - `PersonalInfo.tsx`: Form section for personal information
        - `Address.tsx`: Form section for address
        - `Vehicles.tsx`: Form section for vehicles
        - `Dependents.tsx`: Form section for dependents
    - `hooks/`: Custom React hooks
      - `useApplicationMutation.ts`: Hooks for creating, saving, and submitting insurance
        applications
      - `use-toast.ts`: Hook for displaying toast notifications
    - `lib/`: Shared TypeScript types and schemas
  - `index.html`: The main HTML file
  - `vite.config.ts`: Vite configuration file
- `api/`: Contains the backend Express application
  - `prisma/`: Prisma schema and migrations
  - `routes/`: API route handlers
  - `utilities/`: Shared utility functions
  - `middleware/`: Express middlewares
  - `controllers/`: API controllers
  - `mappers/`: DTO to entity mappers
  - `services/`: Business logic services
  - `index.ts`: Express application entry point

## Installation / Setup

A step-by-step guide to setting up the project:

1. Clone the repository: `git clone https://github.com/jyeg/hugo-take-home.git`
2. Navigate to the project directory: `cd hugo-take-home`
3. Install dependencies: `npm install`
4. Copy `.env.example` file and create `.env` with your own values.

```bash
cp .env.example .env
```

## Running the project

### Migrations

To create a new migration:

```bash
npm run migrate
```

To run migrations:

```bash
npx prisma generate
```

### Start the development server

```bash
npm run start
```

### Run tests

```bash
npm run test
```

## Design Considerations

### Architecture

- Followed React modular architecture for clear separation of concerns
- Used React Hook Form for form management
- Used React Router for navigation
- Used Shadcn/UI for styling

### Testing

- Comprehensive unit tests for components using jest and React Testing Library

### API Design

- RESTful endpoints following REST conventions
  - `POST /applications`: Create a new insurance application
  - `GET /applications/:id`: Retrieve an existing insurance application
  - `PUT /applications/:id`: Update an existing insurance application
  - `POST /applications/:id/submit`: Submit a completed insurance application and receive a quote
- Consistent error handling and responses
- Validation using common Zod schemas

## Assumptions

1. **Data Model**

   - Users have a first name, last name, date of birth, address, and vehicles
   - Vehicles have a vin, year, make, and model
   - Dependents have a first name, last name, and date of birth

2. **Authorization**
   - No authorization required for this application
   - CORS is enabled for the frontend development server

## Trade-offs and TODOs

1. **Performance vs Simplicity**

   - Used Prisma for database operations but would normally use TypeORM and PostgreSQL for more
     complex applications

2. **Security vs Usability**

   - No authorization required for this application, but would implement user authentication and
     authorization in a real-world scenario

3. **Development Speed vs Scalability**

   - Focused on delivering features quickly, but would consider more scalable architecture for
     larger applications
   - TODO: Create page still requires a full form, if I had more time I would refactor to allow for
     partial data to be saved.

4. **Testing Coverage vs Time**

   - TODO: Added some basic ui tests but couldnt get tests working, decided I would time box fixing
     them.
   - TODO: Would increase test coverage given more time, including integration tests and end-to-end
     tests on api and server side.

5. **Features vs Timeline**
   - Implemented core CRUD functionality for insurance applications
   - TODO: would fix the create page to allow for partial data to be saved, the api allows for this
     but the ui does not.
