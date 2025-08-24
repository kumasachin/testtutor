# ExamKit - Comprehensive Exam Platform

A modern, full-featured examination platform built with Next.js 14, TypeScript, and Supabase. Create, manage, and take professional-quality exams with built-in approval workflows and category-specific organization.

## 🌟 Features

### For Test Creators

- **Intuitive Test Builder**: Create comprehensive exams with multiple-choice questions
- **Rich Question Editor**: Add explanations, set point values, and configure multiple correct answers
- **Category Organization**: Organize tests by domain (Life in UK, Driving Theory, etc.)
- **Real-time Preview**: See how your test will look to students as you build it

### For Administrators

- **Approval Workflow**: Review and approve user-generated content before publication
- **Admin Dashboard**: Comprehensive oversight with stats, user management, and content control
- **Domain Management**: Configure test categories and their specific requirements
- **User Role Management**: Control access levels and permissions

### For Test Takers

- **Category-Specific Routes**: Dedicated pages for different test types
- **Progress Tracking**: Monitor your performance across different test categories
- **Responsive Design**: Take tests on any device with a seamless experience
- **Detailed Results**: Get comprehensive feedback with explanations

### Technical Features

- **Multi-tenant Architecture**: Support for multiple domains and organizations
- **Row Level Security**: Database-level security with Supabase RLS
- **Type-safe Database**: Prisma ORM with full TypeScript integration
- **Modern UI**: Built with Tailwind CSS and responsive design principles
- **API-first Design**: RESTful APIs for all functionality

## 🚀 Quick Start

### Prerequisites

- Node.js 18+
- PostgreSQL database (or Supabase account)
- npm or yarn

### Installation

1. **Clone and setup**:

   ```bash
   git clone <repository-url>
   cd examkit-next
   ./setup.sh
   ```

2. **Configure environment**:
   Update `.env.local` with your database credentials:

   ```env
   DATABASE_URL="postgresql://username:password@localhost:5432/examkit"
   NEXT_PUBLIC_SUPABASE_URL="your-supabase-url"
   NEXT_PUBLIC_SUPABASE_ANON_KEY="your-supabase-anon-key"
   ```

3. **Setup database**:

   ```bash
   npx prisma migrate dev
   npx tsx scripts/seed-domains.ts  # Optional: seed default domains
   ```

4. **Start development**:
   ```bash
   npm run dev
   ```

Visit `http://localhost:3000` to see ExamKit in action!

## 📁 Project Structure

```
src/
├── app/                    # Next.js 14 App Router
│   ├── admin/             # Admin dashboard
│   ├── api/               # API routes
│   ├── create/            # Test creation interface
│   ├── drivingTheory/     # Driving theory category
│   │   ├── car/          # Car theory subcategory
│   │   └── motorcycle/   # Motorcycle theory subcategory
│   ├── lifeInUk/         # Life in UK category
│   └── page.tsx          # Homepage with category navigation
├── lib/                   # Shared utilities
│   ├── examkit-service.ts # Core business logic
│   ├── prisma.ts         # Database client
│   ├── supabase.ts       # Supabase client
│   └── types.ts          # TypeScript definitions
└── components/            # Reusable UI components
```

## 🎯 Test Categories

### Life in UK Tests

- British citizenship preparation
- Official test format with 24 questions
- 45-minute time limit
- 75% passing score

### Driving Theory Tests

- **Car Theory**: DVSA-approved questions for car drivers
- **Motorcycle Theory**: Specialized questions for motorcycle riders
- 50 questions, 57-minute time limit
- 86% passing score

## 🔧 API Documentation

### Core Endpoints

- `GET /api/tests` - List published tests (supports `?category=` filtering)
- `POST /api/tests` - Create new test (requires authentication)
- `GET /api/domains` - List available test domains
- `GET /api/admin/tests/review` - Get tests pending review (admin only)
- `POST /api/admin/tests/[id]/review` - Approve/reject test (admin only)

### Category Filtering

Tests can be filtered by category using query parameters:

```
/api/tests?category=life-in-uk
/api/tests?category=driving-theory
```

## 🛠️ Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npx prisma studio` - Open database admin UI
- `npx prisma migrate dev` - Run database migrations

### Database Management

```bash
# Reset database (development only)
npx prisma migrate reset

# View data
npx prisma studio

# Generate client after schema changes
npx prisma generate
```

## 🔐 Authentication & Security

- **Supabase Auth**: Integrated authentication system
- **Row Level Security**: Database-level access control
- **Role-based Access**: USER, ADMIN roles with different permissions
- **Content Approval**: User-generated content requires admin approval

## 🎨 Customization

### Adding New Test Categories

1. Create domain in database:

   ```typescript
   await ExamKitService.createDomain({
     name: "new-category",
     displayName: "New Category",
     description: "Description of new category",
     config: { passingScore: 80, timeLimit: 60 },
   });
   ```

2. Add route in `src/app/newCategory/page.tsx`

3. Update category navigation in homepage

### Theming

ExamKit uses Tailwind CSS with category-specific color schemes:

- Life in UK: Green theme (`green-*` classes)
- Driving Theory: Blue theme (`blue-*` classes)
- Motorcycle: Orange theme (`orange-*` classes)

## 📊 Monitoring & Analytics

The admin dashboard provides insights into:

- Total tests created and published
- User registration and activity
- Test attempt statistics
- Content approval queue status

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🆘 Support

For support and questions:

- Check the documentation above
- Open an issue on GitHub
- Review the API documentation in the code

---

Built with ❤️ using Next.js, TypeScript, Prisma, and Supabase.
