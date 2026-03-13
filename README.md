<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# Run and deploy your AI Studio app

This contains everything you need to run your app locally.

View your app in AI Studio: https://ai.studio/apps/temp/1

## Run Locally

**Prerequisites:**  Node.js


1. Install dependencies:
   `npm install`
2. Set the `GEMINI_API_KEY` in [.env.local](.env.local) to your Gemini API key
3. Run the app:
   `npm run dev`

## Version Management

The app includes an automatic version checker that prompts users to refresh when new updates are deployed.

### How it works:
- The app checks [metadata.json](metadata.json) every 5 minutes for version updates
- Also checks when the browser tab becomes visible again
- Displays a banner notification when a new version is detected
- Users can refresh immediately or dismiss and refresh later

### Deploying Updates:
When deploying new changes, update the `buildTimestamp` in [metadata.json](metadata.json):

```json
{
  "version": "1.0.0",
  "buildTimestamp": 1739923200000  // Update this with current timestamp
}
```

You can generate a new timestamp in the browser console:
```javascript
Date.now()
```

Or using Node.js:
```bash
node -e "console.log(Date.now())"
```

## Database Schema

This project includes comprehensive database schema documentation for backend implementation.

**Important**: This is a **public website with NO user authentication**. All visitors access content as guests without logging in. Forms collect information directly.

### 📚 Documentation Files

- **[DATABASE_README.md](DATABASE_README.md)** - Complete overview and quick start guide
- **[database-schema.sql](database-schema.sql)** - Production-ready MySQL schema (31 tables)
- **[DATABASE_SCHEMA_GUIDE.md](DATABASE_SCHEMA_GUIDE.md)** - Detailed schema documentation
- **[DATABASE_ERD.md](DATABASE_ERD.md)** - Entity relationship diagrams (Mermaid)
- **[DATABASE_MIGRATION_GUIDE.md](DATABASE_MIGRATION_GUIDE.md)** - Setup and migration instructions
- **[DATABASE_API_EXAMPLES.md](DATABASE_API_EXAMPLES.md)** - REST API implementation examples
- **[DATABASE_CHEAT_SHEET.md](DATABASE_CHEAT_SHEET.md)** - Quick reference guide

### 🎯 Key Features

The database schema supports:
- **No Authentication** - Public website, all visitors are guests
- **Membership System** - Applications via forms (no login required)
- **Content Management** - News articles, events, programs
- **Event Registration** - Direct registration with payment tracking
- **CPD Tracking** - Program enrollment and CPD hours monitoring
- **Recruitment** - Job postings and application tracking
- **Volunteers** - Volunteer program management
- **Donations** - Fundraising campaigns and donation tracking
- **Communications** - Email-based notifications and contact forms
- **Admin System** - Internal admin tracking (backend only)

### 🚀 Quick Database Setup

```bash
# Create database
mysql -u root -p -e "CREATE DATABASE gpaa_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;"

# Import schema
mysql -u root -p gpaa_db < database-schema.sql
```

See [DATABASE_README.md](DATABASE_README.md) for complete setup instructions.
