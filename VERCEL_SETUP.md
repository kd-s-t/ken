# Vercel Deployment Setup Guide

## Step 1: Set up Vercel Postgres Database

1. Go to your Vercel dashboard: https://vercel.com/dashboard
2. Navigate to your project (or create a new one)
3. Go to the **Storage** tab
4. Click **Create Database** → Select **Postgres**
5. Choose a plan (Hobby plan is free for development)
6. Select a region closest to your users
7. Click **Create**

## Step 2: Get Database Connection String

1. After creating the database, go to the **Storage** tab
2. Click on your Postgres database
3. Go to the **.env.local** tab
4. Copy the `POSTGRES_URL` - this is your `DATABASE_URL`

## Step 3: Set Environment Variables in Vercel

1. Go to your project settings in Vercel
2. Navigate to **Settings** → **Environment Variables**
3. Add the following variables:

```
DATABASE_URL=your_postgres_connection_string_from_step_2
RESEND_API_KEY=re_e6jPG7TW_6mjH6Fxy4d4tJ6fR2wGN12Sr
CONTACT_EMAIL=ollololl.ollooloo@gmail.com
```

4. Make sure to add them for **Production**, **Preview**, and **Development** environments
5. Click **Save**

## Step 4: Create Initial Migration

Before deploying, create your initial migration:

```bash
# This will create a migration file
npx prisma migrate dev --name init
```

This creates a migration that will be applied when you deploy.

## Step 5: Run Database Migrations on Vercel

After first deployment, you need to run migrations:

### Option A: Using Vercel CLI (Recommended)

```bash
# Install Vercel CLI if you haven't
npm i -g vercel

# Link your project
vercel link

# Pull environment variables
vercel env pull .env.local

# Run migrations
npx prisma migrate deploy
```

### Option B: Add Migration to Build Script

You can also add migrations to the build process by updating `package.json`:

```json
"build": "prisma generate && prisma migrate deploy && next build"
```

**Note**: This is already configured, but migrations will only work if you've created them locally first.

## Step 5: Create Initial Migration (Before First Deploy)

**Important**: You must create migrations locally first before deploying:

```bash
# Make sure you have DATABASE_URL set to your Vercel Postgres in .env.local
# Or use a local PostgreSQL for this step

# Create the initial migration
npx prisma migrate dev --name init

# This creates migration files in prisma/migrations/
# Commit these files to git
```

## Step 6: Deploy to Vercel

1. Push your code (including migration files) to GitHub/GitLab/Bitbucket
2. Import the repository in Vercel
3. Vercel will automatically detect Next.js
4. The build will automatically:
   - Run `postinstall` (generates Prisma Client)
   - Run `build` (includes `prisma migrate deploy` to apply migrations)

## Important Notes

### Local Development Options

**Option 1: Use Vercel Postgres for Local Dev (Recommended)**
- Use the same `DATABASE_URL` from Vercel in your local `.env`
- Your local and production will share the same database
- Simple setup, but be careful not to delete production data

**Option 2: Use Local PostgreSQL**
- Install PostgreSQL locally
- Set `DATABASE_URL="postgresql://user:password@localhost:5432/portfolio"` in your local `.env`
- Run `npx prisma migrate dev` to create local database

**Option 3: Use SQLite for Local, PostgreSQL for Production**
- This requires manually switching the Prisma schema provider
- Not recommended as it can cause migration issues

### Production
- Vercel will use the PostgreSQL database from environment variables
- Migrations run automatically during build (`prisma migrate deploy` in build script)
- First deployment: Make sure to run migrations manually if build fails

### Prisma Studio
- Local: `npx prisma studio` (connects to your local or Vercel Postgres)
- Production: Connect to Vercel Postgres using the connection string

## Troubleshooting

### If migrations fail:
```bash
# Check connection
npx prisma db pull

# Create migration
npx prisma migrate dev --name init

# Deploy migration
npx prisma migrate deploy
```

### If Prisma Client generation fails:
The `postinstall` script in package.json will automatically generate Prisma Client during Vercel builds.

### Database Connection Issues:
- Make sure `DATABASE_URL` is set correctly in Vercel environment variables
- Check that your database region matches your Vercel deployment region
- Ensure your database is not paused (Hobby plan databases pause after 7 days of inactivity)
