# GPAA Database - Quick Reference Cheat Sheet

**Important**: This website has **NO user authentication**. All visitors are guests. The `admin_users` table is for internal use only.

## 🎯 Most Important Tables

### Core Operations

#### 👤 Member Management (No User Accounts)
```sql
-- Members apply directly without logging in
membership_categories → members
  └─ membership_category_benefits

-- Key fields:
members.email (communication only), license_number (UNIQUE), membership_status, membership_expiry_date
admin_users → (for internal approvals only)
```

#### 📰 Content Publishing
```sql
-- Publish content (admin only)
news_categories → news_articles
  └─ author_name (text field, not user ID)

-- Key fields:
news_articles.slug (UNIQUE), status (draft/published), published_at
```

#### 📅 Event Management
```sql
-- Organize events
events → event_registrations
  └─ members (optional)

-- Key fields:
events.event_date, capacity, registration_fee
event_registrations.status, payment_status
```

#### 🎓 CPD Programs
```sql
-- Track CPD
program_categories → programs → program_enrollments
  └─ members

-- Key fields:
programs.cpd_hours, status
program_enrollments.progress_percentage, completed_at
```

## 🔑 Primary Keys & Foreign Keys

### admin_users table (Internal Only)
```
id (PK) ← Referenced by:
  ├─ members.approved_by_admin
  ├─ job_applications.reviewed_by_admin
  ├─ volunteer_applications.reviewed_by_admin
  ├─ contact_messages.assigned_to_admin
  └─ audit_logs.admin_id
```

### members table
```
id (PK) ← Referenced by:
  ├─ event_registrations.member_id (optional)
  ├─ program_enrollments.member_id (optional)
  ├─ job_applications.member_id (optional)
  ├─ volunteer_applications.member_id (optional)
  ├─ donations.member_id (optional)
  └─ executives.member_id (optional)

category_id (FK) → membership_categories.id
approved_by_admin (FK) → admin_users.id
```

## 🔍 Common WHERE Clauses

```sql
-- Active members
WHERE membership_status = 'active'

-- Upcoming events
WHERE status = 'upcoming' AND event_date >= CURDATE()

-- Published articles
WHERE status = 'published' AND published_at IS NOT NULL

-- Expiring soon (30 days)
WHERE membership_expiry_date BETWEEN CURDATE() AND DATE_ADD(CURDATE(), INTERVAL 30 DAY)

-- Completed programs
WHERE status = 'completed' AND completed_at IS NOT NULL

-- Paid registrations
WHERE payment_status = 'paid'
```

## 📊 Essential Queries

### 1. Get Member Profile
```sql
SELECT m.*, mc.title, mc.fees
FROM members m
JOIN membership_categories mc ON m.category_id = mc.id
WHERE m.id = ?;
```

### 2. Latest News
```sql
SELECT na.*, nc.name as category
FROM news_articles na
JOIN news_categories nc ON na.category_id = nc.id
WHERE na.status = 'published'
ORDER BY na.published_at DESC
LIMIT 10;
```

### 3. Upcoming Events with Registration Count
```sql
SELECT e.*, COUNT(er.id) as registrations
FROM events e
LEFT JOIN event_registrations er ON e.id = er.event_id
WHERE e.status = 'upcoming' AND e.event_date >= CURDATE()
GROUP BY e.id
ORDER BY e.event_date ASC;
```

### 4. Member CPD Summary
```sql
SELECT 
  m.first_name, m.last_name,
  SUM(p.cpd_hours) as total_hours,
  COUNT(pe.id) as programs_completed
FROM members m
LEFT JOIN program_enrollments pe ON m.id = pe.member_id AND pe.status = 'completed'
LEFT JOIN programs p ON pe.program_id = p.id
WHERE m.id = ?
GROUP BY m.id;
```

### 5. Membership Statistics by Region
```sql
SELECT 
  region,
  COUNT(*) as total,
  SUM(CASE WHEN membership_status = 'active' THEN 1 ELSE 0 END) as active
FROM members
GROUP BY region
ORDER BY total DESC;
```

## 🚨 Critical Constraints

### UNIQUE Constraints
- `admin_users.email` (internal only)
- `members.email`
- `members.license_number`
- `news_articles.slug`
- `events.slug`
- `programs.slug`
- `donations.receipt_number`

### NOT NULL Requirements
- All `email` fields
- All `title` / `name` fields in main entities
- All `license_number` in members
- All date fields in events

**Note**: No password fields - no authentication system

### ENUM Values
```sql
members.membership_status: 'pending', 'active', 'inactive', 'suspended', 'expired'
news_articles.status: 'draft', 'published', 'archived'
events.status: 'upcoming', 'ongoing', 'past', 'cancelled'
payment_status: 'pending', 'paid', 'failed', 'refunded'
```

**Note**: No user roles - all website visitors are guests

## 📈 Important Indexes

### For Performance
```sql
-- Search & Filter
idx_members_email (email)
idx_members_license (license_number)
idx_members_status (membership_status)
idx_members_region (region)

-- Date Queries
idx_events_date (event_date)
idx_news_published (published_at)
idx_members_expiry (membership_expiry_date)

-- Full-Text Search
FULLTEXT idx_news_search (title, description, content)
FULLTEXT idx_resources_search (title, description)
```

## 💰 Financial Tracking

### Membership Fees
```sql
-- Calculate expected revenue
SELECT 
  mc.title,
  COUNT(m.id) as members,
  mc.fees,
  COUNT(m.id) * mc.fees as expected_revenue
FROM membership_categories mc
LEFT JOIN members m ON mc.id = m.category_id AND m.membership_status = 'active'
GROUP BY mc.id;
```

### Donations
```sql
-- Total donations by campaign
SELECT 
  dc.title,
  COUNT(d.id) as donations,
  SUM(d.amount) as total
FROM donation_campaigns dc
LEFT JOIN donations d ON dc.id = d.campaign_id AND d.payment_status = 'completed'
GROUP BY dc.id;
```

### Event Revenue
```sql
-- Total event revenue
SELECT 
  e.title,
  COUNT(er.id) as registrations,
  e.registration_fee,
  COUNT(er.id) * e.registration_fee as revenue
FROM events e
LEFT JOIN event_registrations er ON e.id = er.event_id AND er.payment_status = 'paid'
GROUP BY e.id;
```

## 🔄 Common Updates

### Approve Membership
```sql
UPDATE members 
SET membership_status = 'active',
    membership_start_date = CURDATE(),
    membership_expiry_date = DATE_ADD(CURDATE(), INTERVAL 1 YEAR),
    approved_at = NOW(),
    approved_by = ?
WHERE id = ?;
```

### Publish Article
```sql
UPDATE news_articles 
SET status = 'published',
    published_at = NOW()
WHERE id = ? AND status = 'draft';
```

### Complete Program
```sql
UPDATE program_enrollments 
SET status = 'completed',
    progress_percentage = 100,
    completed_at = NOW()
WHERE id = ?;
```

### Confirm Event Registration
```sql
UPDATE event_registrations 
SET status = 'confirmed',
    payment_status = 'paid',
    confirmed_at = NOW()
WHERE id = ?;
```

## 🧮 Useful Aggregations

### Count Summary
```sql
-- Dashboard stats
SELECT 
  (SELECT COUNT(*) FROM members WHERE membership_status = 'active') as active_members,
  (SELECT COUNT(*) FROM events WHERE status = 'upcoming') as upcoming_events,
  (SELECT COUNT(*) FROM news_articles WHERE status = 'published') as published_articles,
  (SELECT COUNT(*) FROM contact_messages WHERE status = 'new') as pending_messages;
```

### Growth Metrics
```sql
-- Monthly member growth
SELECT 
  DATE_FORMAT(application_date, '%Y-%m') as month,
  COUNT(*) as new_members
FROM members
WHERE application_date >= DATE_SUB(NOW(), INTERVAL 12 MONTH)
GROUP BY month
ORDER BY month;
```

## 🔐 Security Checks

### Form Validation
```sql
-- Check if email already exists before accepting application
SELECT COUNT(*) FROM members WHERE email = ?;

-- Check if license number already registered
SELECT COUNT(*) FROM members WHERE license_number = ?;

-- Verify membership status for specific features
SELECT membership_status FROM members 
WHERE email = ? AND membership_status = 'active' 
AND membership_expiry_date >= CURDATE();
```

### Audit Trail (Admin Actions)
```sql
-- Recent admin actions
SELECT action, entity_type, entity_id, created_at
FROM audit_logs
WHERE admin_id = ?
ORDER BY created_at DESC
LIMIT 50;
```

**Note**: No user authentication - all website access is open to guests

## 📧 Notification Triggers

**All notifications sent via email** (no in-app notifications as there's no login system)

### When to Send Emails

1. **Membership Approved**
   - Send welcome email to member
   - Include membership details and ID
   - No login credentials needed

2. **Membership Expiring (30 days)**
   - Send renewal reminder
   - Include payment link

3. **Event Registration Confirmed**
   - Send confirmation email
   - Include event details & QR code

4. **Program Completed**
   - Send certificate
   - Award CPD hours

5. **Donation Received**
   - Send receipt
   - Thank you message

6. **Contact Form Submission**
   - Send confirmation to submitter
   - Notify admin team

## 🎨 Status Flow Diagrams

### Membership Application Flow
```
pending → active → expired
   ↓         ↓
inactive  suspended
```

### Article Publishing Flow
```
draft → published → archived
```

### Event Registration Flow
```
pending → confirmed → attended
   ↓
cancelled
```

### Payment Status Flow
```
pending → paid
   ↓
failed → refunded
```

## 📱 Quick Stats Queries

```sql
-- Active members count
SELECT COUNT(*) FROM members WHERE membership_status = 'active';

-- Upcoming events count
SELECT COUNT(*) FROM events WHERE status = 'upcoming' AND event_date >= CURDATE();

-- This year's revenue
SELECT SUM(amount) FROM donations WHERE payment_status = 'completed' AND YEAR(donated_at) = YEAR(NOW());

-- Pending applications
SELECT COUNT(*) FROM members WHERE membership_status = 'pending';

-- Today's registrations
SELECT COUNT(*) FROM event_registrations WHERE DATE(registered_at) = CURDATE();
```

## 🆘 Troubleshooting

### Slow Queries
```sql
-- Check missing indexes
EXPLAIN SELECT ... ;

-- Analyze table
ANALYZE TABLE members;

-- Optimize table
OPTIMIZE TABLE members;
```

### Data Integrity
```sql
-- Find orphaned records
SELECT m.* FROM members m 
LEFT JOIN membership_categories mc ON m.category_id = mc.id 
WHERE mc.id IS NULL;

-- Check for duplicates
SELECT email, COUNT(*) FROM members GROUP BY email HAVING COUNT(*) > 1;
```

---

**💡 Pro Tips:**
- **No authentication** = simpler implementation, no password management
- All forms submit directly to database
- Use email for all communication
- Validate email/license uniqueness on submission
- Always use prepared statements for SQL injection prevention
- Index foreign keys for performance
- Regular backups (daily recommended)
- Monitor slow query log
- Archive old audit logs
- Use transactions for critical operations
- GDPR compliance for data collection

**🔗 Related Docs:**
- [Complete Schema](database-schema.sql)
- [Schema Guide](DATABASE_SCHEMA_GUIDE.md)
- [API Examples](DATABASE_API_EXAMPLES.md)
