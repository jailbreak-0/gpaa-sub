# Database Migration & Setup Guide

## Overview

This guide provides step-by-step instructions for setting up the GPAA database schema and migrating data.

## Prerequisites

### For MySQL/MariaDB
- MySQL 8.0+ or MariaDB 10.5+
- Database user with CREATE, ALTER, DROP, INSERT, UPDATE, DELETE privileges
- Sufficient disk space (recommend 10GB+ for production)

### For PostgreSQL (Alternative)
- PostgreSQL 13+
- Similar privilege requirements

## MySQL Setup

### 1. Create Database

```sql
-- Connect to MySQL
mysql -u root -p

-- Create database
CREATE DATABASE gpaa_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- Create database user
CREATE USER 'gpaa_user'@'localhost' IDENTIFIED BY 'your_secure_password';

-- Grant privileges
GRANT ALL PRIVILEGES ON gpaa_db.* TO 'gpaa_user'@'localhost';
FLUSH PRIVILEGES;

-- Switch to database
USE gpaa_db;
```

### 2. Import Schema

```bash
# From command line
mysql -u gpaa_user -p gpaa_db < database-schema.sql

# Or from MySQL prompt
source /path/to/database-schema.sql;
```

### 3. Verify Installation

```sql
-- Check tables
SHOW TABLES;

-- Check table structure
DESCRIBE users;
DESCRIBE members;

-- Verify initial data
SELECT * FROM news_categories;
SELECT * FROM site_settings;
```

## PostgreSQL Setup (Alternative)

### Convert MySQL to PostgreSQL

Key differences to address:
1. `AUTO_INCREMENT` → `SERIAL` or `BIGSERIAL`
2. `ENUM` types need to be created separately
3. Different syntax for timestamps and defaults
4. `LONGTEXT` → `TEXT` (no size limit in PostgreSQL)

```sql
-- Create database
CREATE DATABASE gpaa_db WITH ENCODING 'UTF8';

-- Connect
\c gpaa_db

-- Create custom enum types
CREATE TYPE user_role AS ENUM ('admin', 'member', 'guest');
CREATE TYPE membership_status AS ENUM ('pending', 'active', 'inactive', 'suspended', 'expired');
CREATE TYPE article_status AS ENUM ('draft', 'published', 'archived');
-- ... (create all other enum types)

-- Create tables with PostgreSQL syntax
CREATE TABLE users (
    id BIGSERIAL PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    role user_role DEFAULT 'guest',
    is_active BOOLEAN DEFAULT TRUE,
    email_verified BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    last_login TIMESTAMP NULL
);

-- Create indexes
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_role ON users(role);
-- ... (continue with other tables)
```

## MongoDB Setup (NoSQL Alternative)

### Schema Design for MongoDB

```javascript
// Connect to MongoDB
use gpaa_db;

// Create collections with validation

// Users Collection
db.createCollection("users", {
  validator: {
    $jsonSchema: {
      bsonType: "object",
      required: ["email", "password_hash", "role"],
      properties: {
        email: {
          bsonType: "string",
          pattern: "^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$"
        },
        password_hash: { bsonType: "string" },
        role: { enum: ["admin", "member", "guest"] },
        is_active: { bsonType: "bool" },
        email_verified: { bsonType: "bool" },
        created_at: { bsonType: "date" },
        updated_at: { bsonType: "date" },
        last_login: { bsonType: ["date", "null"] }
      }
    }
  }
});

// Members Collection (embedded user reference)
db.createCollection("members", {
  validator: {
    $jsonSchema: {
      bsonType: "object",
      required: ["first_name", "last_name", "email", "license_number", "category"],
      properties: {
        user_id: { bsonType: "objectId" },
        category: {
          bsonType: "object",
          properties: {
            id: { bsonType: "int" },
            title: { bsonType: "string" },
            fees: { bsonType: "decimal" }
          }
        },
        personal_info: {
          bsonType: "object",
          properties: {
            first_name: { bsonType: "string" },
            last_name: { bsonType: "string" },
            email: { bsonType: "string" },
            phone: { bsonType: "string" },
            gender: { enum: ["male", "female", "other", "prefer_not_to_say"] },
            date_of_birth: { bsonType: "date" }
          }
        },
        professional_info: {
          bsonType: "object",
          properties: {
            license_number: { bsonType: "string" },
            staff_id: { bsonType: "string" },
            employer: { bsonType: "string" },
            institution: { bsonType: "string" },
            workplace: { bsonType: "string" }
          }
        },
        location: {
          bsonType: "object",
          properties: {
            region: { bsonType: "string" },
            district: { bsonType: "string" },
            address: { bsonType: "string" }
          }
        },
        membership: {
          bsonType: "object",
          properties: {
            status: { enum: ["pending", "active", "inactive", "suspended", "expired"] },
            start_date: { bsonType: "date" },
            expiry_date: { bsonType: "date" }
          }
        }
      }
    }
  }
});

// Create indexes
db.users.createIndex({ email: 1 }, { unique: true });
db.users.createIndex({ role: 1 });
db.members.createIndex({ "personal_info.email": 1 }, { unique: true });
db.members.createIndex({ "professional_info.license_number": 1 }, { unique: true });
db.members.createIndex({ "location.region": 1 });
db.members.createIndex({ "membership.status": 1 });

// News Articles with embedded category
db.createCollection("news_articles");
db.news_articles.createIndex({ slug: 1 }, { unique: true });
db.news_articles.createIndex({ status: 1 });
db.news_articles.createIndex({ published_at: -1 });
db.news_articles.createIndex({ 
  title: "text", 
  description: "text", 
  content: "text" 
});

// Events with embedded registrations
db.createCollection("events");
db.events.createIndex({ slug: 1 }, { unique: true });
db.events.createIndex({ event_date: 1 });
db.events.createIndex({ type: 1 });
db.events.createIndex({ status: 1 });

// Programs with embedded enrollments
db.createCollection("programs");
db.programs.createIndex({ slug: 1 }, { unique: true });

// ... continue for other collections
```

### Sample MongoDB Documents

```javascript
// Sample User Document
{
  _id: ObjectId("..."),
  email: "john.doe@example.com",
  password_hash: "$2a$12$...",
  role: "member",
  is_active: true,
  email_verified: true,
  profile: {
    first_name: "John",
    last_name: "Doe",
    phone: "+233XXXXXXXXX"
  },
  created_at: ISODate("2024-01-01T00:00:00Z"),
  updated_at: ISODate("2024-01-01T00:00:00Z"),
  last_login: ISODate("2024-02-27T10:30:00Z")
}

// Sample Member Document
{
  _id: ObjectId("..."),
  user_id: ObjectId("..."),
  category: {
    id: 1,
    title: "Regular Member",
    fees: 200.00
  },
  personal_info: {
    first_name: "John",
    last_name: "Doe",
    email: "john.doe@example.com",
    phone: "+233XXXXXXXXX",
    gender: "male",
    date_of_birth: ISODate("1990-01-01T00:00:00Z")
  },
  professional_info: {
    license_number: "PA12345",
    employer: "Ridge Hospital",
    institution: "University of Ghana",
    workplace: "Emergency Department"
  },
  location: {
    region: "Greater Accra",
    district: "Accra Metropolis",
    address: "P.O. Box 123, Accra"
  },
  membership: {
    status: "active",
    start_date: ISODate("2024-01-01T00:00:00Z"),
    expiry_date: ISODate("2025-01-01T00:00:00Z")
  },
  application_date: ISODate("2023-12-15T00:00:00Z"),
  approved_at: ISODate("2024-01-01T00:00:00Z")
}

// Sample Event with Embedded Registrations
{
  _id: ObjectId("..."),
  title: "Annual CPD Workshop 2024",
  slug: "annual-cpd-workshop-2024",
  description: "Comprehensive CPD workshop for all members",
  event_date: ISODate("2024-06-15T00:00:00Z"),
  event_time: "09:00",
  location: "Accra International Conference Centre",
  type: "workshop",
  status: "upcoming",
  capacity: 200,
  requires_registration: true,
  registration_fee: 50.00,
  registrations: [
    {
      registration_id: ObjectId("..."),
      member_id: ObjectId("..."),
      name: "John Doe",
      email: "john.doe@example.com",
      status: "confirmed",
      payment_status: "paid",
      registered_at: ISODate("2024-02-01T00:00:00Z")
    }
  ],
  registration_count: 45,
  created_at: ISODate("2024-01-15T00:00:00Z")
}
```

## Data Migration

### From Existing System to MySQL

#### 1. Export Data from Old System

```bash
# If migrating from another MySQL database
mysqldump -u old_user -p old_database > old_data.sql

# If migrating from CSV files
# Prepare CSV files for each table
```

#### 2. Transform Data

```python
# Example Python script for data transformation
import pandas as pd
import mysql.connector

# Read old data
old_members = pd.read_csv('old_members.csv')

# Transform data
new_members = old_members.rename(columns={
    'fullname': 'first_name',
    'surname': 'last_name',
    'contact': 'phone'
})

# Split full name if needed
new_members[['first_name', 'last_name']] = new_members['fullname'].str.split(' ', n=1, expand=True)

# Connect to new database
conn = mysql.connector.connect(
    host='localhost',
    user='gpaa_user',
    password='your_password',
    database='gpaa_db'
)

cursor = conn.cursor()

# Insert data
for index, row in new_members.iterrows():
    sql = """INSERT INTO members 
             (first_name, last_name, email, phone, license_number, category_id, membership_status) 
             VALUES (%s, %s, %s, %s, %s, %s, %s)"""
    values = (
        row['first_name'], 
        row['last_name'], 
        row['email'], 
        row['phone'],
        row['license_number'],
        1,  # default category
        'active'
    )
    cursor.execute(sql, values)

conn.commit()
cursor.close()
conn.close()
```

#### 3. Import Transformed Data

```bash
mysql -u gpaa_user -p gpaa_db < transformed_data.sql
```

### From MySQL to MongoDB

```javascript
// Node.js migration script
const mysql = require('mysql2/promise');
const { MongoClient } = require('mongodb');

async function migrate() {
  // Connect to MySQL
  const mysqlConn = await mysql.createConnection({
    host: 'localhost',
    user: 'gpaa_user',
    password: 'your_password',
    database: 'gpaa_db'
  });

  // Connect to MongoDB
  const mongoClient = await MongoClient.connect('mongodb://localhost:27017');
  const db = mongoClient.db('gpaa_db');

  // Migrate users
  const [users] = await mysqlConn.execute('SELECT * FROM users');
  await db.collection('users').insertMany(users);

  // Migrate members with category embedded
  const [members] = await mysqlConn.execute(`
    SELECT m.*, mc.title as category_title, mc.fees as category_fees
    FROM members m
    JOIN membership_categories mc ON m.category_id = mc.id
  `);

  const transformedMembers = members.map(m => ({
    user_id: m.user_id,
    category: {
      id: m.category_id,
      title: m.category_title,
      fees: m.category_fees
    },
    personal_info: {
      first_name: m.first_name,
      last_name: m.last_name,
      email: m.email,
      phone: m.phone,
      gender: m.gender,
      date_of_birth: m.date_of_birth
    },
    professional_info: {
      license_number: m.license_number,
      staff_id: m.staff_id,
      employer: m.employer,
      institution: m.institution,
      workplace: m.workplace
    },
    location: {
      region: m.region,
      district: m.district,
      address: m.address
    },
    membership: {
      status: m.membership_status,
      start_date: m.membership_start_date,
      expiry_date: m.membership_expiry_date
    },
    application_date: m.application_date,
    approved_at: m.approved_at
  }));

  await db.collection('members').insertMany(transformedMembers);

  // Close connections
  await mysqlConn.end();
  await mongoClient.close();
  
  console.log('Migration completed!');
}

migrate().catch(console.error);
```

## Database Backup & Restore

### MySQL Backup

```bash
# Full backup
mysqldump -u gpaa_user -p gpaa_db > backup_$(date +%Y%m%d).sql

# Backup with gzip compression
mysqldump -u gpaa_user -p gpaa_db | gzip > backup_$(date +%Y%m%d).sql.gz

# Backup specific tables
mysqldump -u gpaa_user -p gpaa_db members events donations > members_backup.sql

# Automated daily backup script
#!/bin/bash
BACKUP_DIR="/var/backups/mysql"
DATE=$(date +%Y%m%d_%H%M%S)
mysqldump -u gpaa_user -p'password' gpaa_db | gzip > $BACKUP_DIR/gpaa_db_$DATE.sql.gz
find $BACKUP_DIR -name "*.sql.gz" -mtime +7 -delete  # Keep 7 days
```

### MySQL Restore

```bash
# Restore from backup
mysql -u gpaa_user -p gpaa_db < backup_20240227.sql

# Restore from compressed backup
gunzip < backup_20240227.sql.gz | mysql -u gpaa_user -p gpaa_db

# Restore specific table
mysql -u gpaa_user -p gpaa_db < members_backup.sql
```

### MongoDB Backup

```bash
# Full backup
mongodump --db=gpaa_db --out=/backup/$(date +%Y%m%d)

# Backup specific collection
mongodump --db=gpaa_db --collection=members --out=/backup/members

# Compressed backup
mongodump --db=gpaa_db --archive=gpaa_db.$(date +%Y%m%d).archive --gzip
```

### MongoDB Restore

```bash
# Restore full database
mongorestore --db=gpaa_db /backup/20240227/gpaa_db

# Restore specific collection
mongorestore --db=gpaa_db --collection=members /backup/members/members.bson

# Restore from compressed archive
mongorestore --archive=gpaa_db.20240227.archive --gzip
```

## Environment Configuration

### .env File Template

```ini
# Database Configuration
DB_TYPE=mysql                    # mysql, postgresql, mongodb
DB_HOST=localhost
DB_PORT=3306                     # 3306 for MySQL, 5432 for PostgreSQL, 27017 for MongoDB
DB_NAME=gpaa_db
DB_USER=gpaa_user
DB_PASSWORD=your_secure_password

# Connection Pool
DB_POOL_MIN=2
DB_POOL_MAX=10
DB_POOL_IDLE_TIMEOUT=10000

# Application Settings
APP_ENV=production               # development, staging, production
APP_URL=https://gpaa.org.gh
API_VERSION=v1

# Security
JWT_SECRET=your_jwt_secret_key
SESSION_SECRET=your_session_secret
ENCRYPTION_KEY=your_encryption_key

# Email
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=noreply@gpaa.org.gh
SMTP_PASSWORD=your_email_password
EMAIL_FROM=GPAA <noreply@gpaa.org.gh>

# File Storage
UPLOAD_DIR=/var/www/gpaa/uploads
MAX_FILE_SIZE=10485760           # 10MB in bytes
ALLOWED_FILE_TYPES=pdf,doc,docx,jpg,jpeg,png

# Cache
REDIS_HOST=localhost
REDIS_PORT=6379
REDIS_PASSWORD=
CACHE_TTL=3600                   # 1 hour

# Backup
BACKUP_DIR=/var/backups/gpaa
BACKUP_RETENTION_DAYS=30
```

## Performance Optimization

### MySQL Optimization

```sql
-- Analyze tables
ANALYZE TABLE members, events, news_articles;

-- Optimize tables
OPTIMIZE TABLE members, events, news_articles;

-- Check slow queries
SHOW FULL PROCESSLIST;
SHOW STATUS LIKE 'Slow_queries';

-- Enable query cache (if applicable)
SET GLOBAL query_cache_size = 1048576;
```

### Add Composite Indexes

```sql
-- For common queries
CREATE INDEX idx_members_status_region ON members(membership_status, region);
CREATE INDEX idx_events_status_date ON events(status, event_date);
CREATE INDEX idx_news_status_published ON news_articles(status, published_at);
CREATE INDEX idx_donations_status_date ON donations(payment_status, donated_at);
```

### MongoDB Optimization

```javascript
// Create compound indexes
db.members.createIndex({ "membership.status": 1, "location.region": 1 });
db.events.createIndex({ status: 1, event_date: -1 });
db.news_articles.createIndex({ status: 1, published_at: -1 });

// Analyze query performance
db.members.find({ "membership.status": "active" }).explain("executionStats");

// Enable profiling
db.setProfilingLevel(1, { slowms: 100 });
```

## Testing

### Verify Data Integrity

```sql
-- Check for orphaned records
SELECT m.* FROM members m 
LEFT JOIN membership_categories mc ON m.category_id = mc.id 
WHERE mc.id IS NULL;

-- Check for duplicate emails
SELECT email, COUNT(*) as count FROM members 
GROUP BY email HAVING count > 1;

-- Check for invalid dates
SELECT * FROM members WHERE membership_expiry_date < membership_start_date;

-- Verify foreign key constraints
SELECT TABLE_NAME, CONSTRAINT_NAME 
FROM information_schema.TABLE_CONSTRAINTS 
WHERE CONSTRAINT_TYPE = 'FOREIGN KEY' AND TABLE_SCHEMA = 'gpaa_db';
```

## Troubleshooting

### Common Issues

#### 1. Connection Refused
```bash
# Check if MySQL is running
sudo systemctl status mysql

# Check port
sudo netstat -tlnp | grep 3306

# Check user permissions
mysql -u gpaa_user -p
SHOW GRANTS FOR 'gpaa_user'@'localhost';
```

#### 2. Slow Queries
```sql
-- Enable slow query log
SET GLOBAL slow_query_log = 'ON';
SET GLOBAL long_query_time = 2;

-- Check slow queries
SELECT * FROM mysql.slow_log;
```

#### 3. Disk Space Issues
```bash
# Check disk usage
df -h

# Check MySQL data directory size
du -sh /var/lib/mysql/gpaa_db

# Clean up binary logs
PURGE BINARY LOGS BEFORE DATE_SUB(NOW(), INTERVAL 7 DAY);
```

## Support

For migration assistance:
- Email: support@gpaa.org.gh
- Documentation: /docs/database-migration
- Issue Tracker: GitHub Issues
