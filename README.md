# CrainVision 
CrainVision is a comprehensive industry dashboard platform - Frontend

## Features

- **Multi-Dashboard System**: Automotive, Inventory, and Service department dashboards
- **Theme Support**: Light, Dark, and System preference themes
- **User Preferences**: Customizable dashboard and appearance settings
- **Real-time Charts**: Interactive charts and data visualizations
- **Service Management**: Appointment tracking and revenue analytics
- **Inventory Tracking**: Stock levels, aging analysis, and value monitoring

## Tech Stack

- **Framework**: Next.js 15.2.4 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: Radix UI primitives with shadcn/ui
- **Charts**: Recharts
- **Theme Management**: next-themes

## Prerequisites

Before you begin, ensure you have the following installed:
- Node.js (version 18.0 or higher)
- npm or yarn package manager
- Git

## Getting Started

### 1. Clone the Repository

git clone <repository-url>
cd crainvision
cd frontend

### 2. Install Dependencies

npm install
# or
yarn install

### 3. Run the Development Server

npm run dev
# or
yarn dev


## Configuration

### Environment Variables

Create a `.env.local` file in the root directory (if required):

# Add your environment variables here
NEXT_PUBLIC_APP_NAME=CrainVision
NEXT_PUBLIC_API_URL