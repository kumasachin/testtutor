# ExamKit Deployment Guide

This guide covers deploying ExamKit to various platforms with production-ready configurations.

## 🚀 Quick Deploy Options

### Option 1: Vercel + Supabase (Recommended)

**Advantages:**

- Zero-config deployment
- Automatic SSL and CDN
- Built-in analytics
- Serverless scaling

**Steps:**

1. **Prepare Supabase Database**

   ```bash
   # Create new Supabase project at https://supabase.com
   # Note down your project URL and anon key
   ```

2. **Configure Environment Variables**

   ```bash
   # In Vercel dashboard or .env.production
   DATABASE_URL="postgresql://postgres:[password]@[host]:5432/postgres"
   NEXT_PUBLIC_SUPABASE_URL="https://[project-id].supabase.co"
   NEXT_PUBLIC_SUPABASE_ANON_KEY="your-anon-key"
   SUPABASE_SERVICE_ROLE_KEY="your-service-role-key"
   NEXTAUTH_URL="https://your-domain.vercel.app"
   NEXTAUTH_SECRET="your-production-secret"
   ```

3. **Deploy to Vercel**

   ```bash
   # Install Vercel CLI
   npm i -g vercel

   # Login and deploy
   vercel login
   vercel --prod
   ```

4. **Run Database Migrations**

   ```bash
   # Run migrations on production database
   npx prisma migrate deploy

   # Seed initial data
   npx tsx scripts/seed-domains.ts
   npx tsx scripts/import-questions.ts ./data/
   ```

### Option 2: Netlify + PlanetScale

**Advantages:**

- Git-based deployments
- Preview deployments
- Global CDN
- Database branching

**Steps:**

1. **Set up PlanetScale Database**

   ```bash
   # Create account at https://planetscale.com
   # Create new database
   # Get connection string
   ```

2. **Configure Build Settings**

   ```toml
   # netlify.toml
   [build]
     command = "npm run build"
     publish = ".next"

   [[plugins]]
     package = "@netlify/plugin-nextjs"

   [build.environment]
     NEXT_TELEMETRY_DISABLED = "1"
   ```

3. **Deploy via Git**
   ```bash
   git push origin main
   # Netlify will auto-deploy
   ```

### Option 3: Self-Hosted (VPS)

**Advantages:**

- Full control
- Cost-effective for high traffic
- Custom configurations

**Requirements:**

- Ubuntu 20.04+ VPS
- Docker & Docker Compose
- Domain with SSL

**Steps:**

1. **Server Setup**

   ```bash
   # Install Docker
   curl -fsSL https://get.docker.com | sh
   sudo usermod -aG docker $USER

   # Install Docker Compose
   sudo curl -L "https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
   sudo chmod +x /usr/local/bin/docker-compose
   ```

2. **Create Production Docker Setup**

   ```yaml
   # docker-compose.prod.yml
   version: "3.8"

   services:
     postgres:
       image: postgres:15
       environment:
         POSTGRES_DB: examkit
         POSTGRES_USER: examkit
         POSTGRES_PASSWORD: ${DB_PASSWORD}
       volumes:
         - postgres_data:/var/lib/postgresql/data
       restart: unless-stopped

     app:
       build: .
       environment:
         DATABASE_URL: postgresql://examkit:${DB_PASSWORD}@postgres:5432/examkit
         NEXTAUTH_URL: https://${DOMAIN}
         NEXTAUTH_SECRET: ${NEXTAUTH_SECRET}
       depends_on:
         - postgres
       restart: unless-stopped

     nginx:
       image: nginx:alpine
       ports:
         - "80:80"
         - "443:443"
       volumes:
         - ./nginx.conf:/etc/nginx/nginx.conf
         - /etc/letsencrypt:/etc/letsencrypt
       depends_on:
         - app
       restart: unless-stopped

   volumes:
     postgres_data:
   ```

3. **Deploy**

   ```bash
   # Clone repository
   git clone [your-repo]
   cd examkit-next

   # Set environment variables
   echo "DB_PASSWORD=your_secure_password" > .env
   echo "DOMAIN=your-domain.com" >> .env
   echo "NEXTAUTH_SECRET=your_nextauth_secret" >> .env

   # Deploy
   docker-compose -f docker-compose.prod.yml up -d

   # Run migrations
   docker-compose exec app npx prisma migrate deploy
   ```

## 🔧 Production Optimizations

### Performance Optimizations

1. **Enable Compression**

   ```javascript
   // next.config.js
   module.exports = {
     compress: true,
     images: {
       domains: ["your-domain.com"],
       formats: ["image/webp", "image/avif"],
     },
   };
   ```

2. **Database Connection Pooling**

   ```javascript
   // lib/prisma.ts
   import { PrismaClient } from '@prisma/client';

   const globalForPrisma = globalThis as unknown as {
     prisma: PrismaClient | undefined;
   };

   export const prisma = globalForPrisma.prisma ?? new PrismaClient({
     datasources: {
       db: {
         url: process.env.DATABASE_URL + "?connection_limit=20&pool_timeout=20"
       }
     }
   });

   if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;
   ```

3. **Caching Strategy**

   ```javascript
   // Add to API routes
   export async function GET() {
     const data = await fetchData();

     return NextResponse.json(data, {
       headers: {
         "Cache-Control": "public, s-maxage=300, stale-while-revalidate=3600",
       },
     });
   }
   ```

### Security Enhancements

1. **Environment Security**

   ```bash
   # Production environment variables
   NODE_ENV=production
   NEXTAUTH_SECRET="complex-secret-key-32-chars-min"
   DATABASE_URL="encrypted-connection-string"

   # Rate limiting
   RATE_LIMIT_MAX=100
   RATE_LIMIT_WINDOW=900000

   # CORS settings
   ALLOWED_ORIGINS="https://your-domain.com,https://admin.your-domain.com"
   ```

2. **Security Headers**
   ```javascript
   // next.config.js
   module.exports = {
     async headers() {
       return [
         {
           source: "/(.*)",
           headers: [
             {
               key: "X-Content-Type-Options",
               value: "nosniff",
             },
             {
               key: "X-Frame-Options",
               value: "DENY",
             },
             {
               key: "X-XSS-Protection",
               value: "1; mode=block",
             },
           ],
         },
       ];
     },
   };
   ```

### Monitoring & Analytics

1. **Error Monitoring with Sentry**

   ```bash
   npm install @sentry/nextjs
   ```

   ```javascript
   // sentry.client.config.js
   import * as Sentry from "@sentry/nextjs";

   Sentry.init({
     dsn: process.env.SENTRY_DSN,
     environment: process.env.NODE_ENV,
   });
   ```

2. **Database Monitoring**

   ```javascript
   // lib/monitoring.ts
   export function logDatabaseQuery(query: string, duration: number) {
     if (duration > 1000) {
       console.warn(`Slow query detected: ${query} (${duration}ms)`);
     }
   }
   ```

3. **Performance Monitoring**
   ```javascript
   // lib/analytics.ts
   export function trackUserAction(action: string, metadata?: any) {
     if (typeof window !== "undefined") {
       // Google Analytics, PostHog, etc.
       gtag("event", action, metadata);
     }
   }
   ```

## 📊 Post-Deployment Checklist

### Immediate Checks

- [ ] Application loads correctly
- [ ] Database connection working
- [ ] Authentication flow functional
- [ ] Test creation and taking works
- [ ] Admin dashboard accessible
- [ ] API endpoints responding

### Performance Checks

- [ ] Page load times < 3 seconds
- [ ] Database queries optimized
- [ ] Images properly compressed
- [ ] CDN configured correctly

### Security Checks

- [ ] HTTPS enabled
- [ ] Environment variables secured
- [ ] Rate limiting configured
- [ ] Input validation working
- [ ] CORS policies correct

### Monitoring Setup

- [ ] Error tracking configured
- [ ] Performance monitoring active
- [ ] Database monitoring enabled
- [ ] Backup strategy implemented
- [ ] Uptime monitoring configured

## 🔄 Maintenance Tasks

### Daily

- Monitor error rates
- Check system performance
- Review user feedback

### Weekly

- Database performance review
- Security updates check
- Backup verification

### Monthly

- Dependency updates
- Security audit
- Performance optimization review
- User analytics review

## 🆘 Troubleshooting

### Common Issues

1. **Database Connection Errors**

   ```bash
   # Check connection
   npx prisma db ping

   # Reset connection pool
   npx prisma generate
   ```

2. **Build Failures**

   ```bash
   # Clear cache
   rm -rf .next
   npm run build

   # Check TypeScript errors
   npx tsc --noEmit
   ```

3. **Memory Issues**
   ```javascript
   // Increase Node.js memory limit
   "build": "NODE_OPTIONS='--max_old_space_size=4096' next build"
   ```

### Performance Issues

1. **Slow Database Queries**

   ```sql
   -- Add indexes
   CREATE INDEX idx_tests_domain_status ON tests(domain_id, status);
   CREATE INDEX idx_questions_test_order ON questions(test_id, order);
   ```

2. **High Memory Usage**
   ```javascript
   // Implement pagination
   const tests = await prisma.test.findMany({
     skip: (page - 1) * pageSize,
     take: pageSize,
   });
   ```

## 📞 Support

For deployment issues:

1. Check logs: `docker-compose logs app`
2. Review error monitoring dashboard
3. Consult database performance metrics
4. Contact support with specific error messages

---

**🎉 Congratulations!** Your ExamKit platform is now live and ready to serve users worldwide!
