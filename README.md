# ExamKit

A modern exam management platform built with Next.js. Create, manage, and take exams with approval workflows.

## Features

### Core Functionality

- Multiple question types (multiple choice, text-based)
- Domain-based organization
- Guest and authenticated testing
- Real-time scoring and feedback

### User Management

- Role-based access control
- Secure authentication via Supabase
- User profiles and test history

### Approval System

- Admin review process for submitted tests
- Quality control with approve/reject workflow
- Status tracking and review comments

### Analytics

- Performance metrics and test analytics
- User progress tracking
- Question difficulty analysis

## Tech Stack

- Next.js 14 with TypeScript
- PostgreSQL with Prisma ORM
- Supabase for auth and database
- Tailwind CSS for styling
- Zod for validation

## Project Structure

```
examkit-next/
├── prisma/
│   └── schema.prisma          # Database schema
├── src/
│   ├── app/
│   │   ├── api/               # API routes
│   │   │   ├── tests/         # Test management endpoints
│   │   │   ├── attempts/      # Test attempt endpoints
│   │   │   ├── admin/         # Admin approval endpoints
│   │   │   └── domains/       # Domain management endpoints
│   │   ├── layout.tsx         # Root layout
## Project Structure

```

examkit-next/
├── prisma/
│ └── schema.prisma
├── src/
│ ├── app/
│ │ ├── api/
│ │ ├── page.tsx
│ │ └── layout.tsx
│ └── lib/
│ ├── prisma.ts
│ ├── supabase.ts
│ ├── types.ts
│ └── examkit-service.ts
└── package.json

````

## Setup

### Requirements
- Node.js 18+
- PostgreSQL database
- npm or yarn

### Installation

1. Clone and install
   ```bash
   git clone <your-repo>
   cd examkit-next
   npm install
````

2. Configure environment

   ```bash
   cp .env.example .env.local
   ```

   Update `.env.local`:

   ```env
   DATABASE_URL="postgresql://user:pass@localhost:5432/examkit"
   NEXT_PUBLIC_SUPABASE_URL="your-supabase-url"
   NEXT_PUBLIC_SUPABASE_ANON_KEY="your-anon-key"
   SUPABASE_SERVICE_ROLE_KEY="your-service-key"
   ```

3. Setup database

   ```bash
   npx prisma generate
   npx prisma db push
   ```

4. Start development
   ```bash
   npm run dev
   ```

## API Routes

### Public

- `GET /api/tests` - List tests
- `GET /api/tests/[id]` - Test details
- `POST /api/tests/[id]/attempt` - Start attempt
- `GET /api/domains` - List domains

### Authenticated

- `POST /api/tests` - Create test
- `PUT /api/attempts/[id]` - Update attempt
- `POST /api/attempts/[id]` - Complete attempt

### Admin

- `GET /api/admin/tests/review` - Pending tests
- `POST /api/admin/tests/[id]/review` - Approve/reject

## Usage

### Creating Tests

1. Register and login
2. Create test with questions
3. Submit for admin approval
4. Get notified of status

### Taking Tests

1. Browse available tests
2. Start attempt (login optional)
3. Complete within time limit
4. View results

### Admin Panel

1. Access admin interface
2. Review submitted tests
3. Approve or reject with comments

## Development

Key files:

- `src/lib/types.ts` - Type definitions
- `src/lib/examkit-service.ts` - Business logic
- `prisma/schema.prisma` - Database schema
- `src/app/api/` - API endpoints

## License

MIT
