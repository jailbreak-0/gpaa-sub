# GPAA Website - Database Schema Guide

## Overview

This document provides a comprehensive guide to the database schema for the Ghana Physician Assistants Association (GPAA) website. The schema is designed to support a full-featured professional association management system.

## Database Design Philosophy

- **Normalized Structure**: Tables follow 3rd Normal Form to reduce redundancy
- **Scalability**: Designed to handle growing membership and content
- **Flexibility**: Modular design allows for easy extension
- **No Authentication**: Public-facing website with no user login - all visitors are guests
- **Admin Access**: Separate internal admin tracking for management purposes only
- **Audit Trail**: Comprehensive logging and tracking capabilities

## Core Modules

### 1. Admin Users (Internal Only)
**Tables**: `admin_users`

**No Public Authentication**: The website has no public user login or authentication system. All website visitors access content as guests without creating accounts.

**Admin Users**: For internal management only:
- `admin_users` table tracks internal staff for administrative purposes
- Used for approving memberships, managing content, and tracking changes
- Not exposed to public website - backend admin panel only

### 2. Membership Management
**Tables**: `membership_categories`, `membership_category_benefits`, `members`

**Membership Categories**: Different membership tiers (e.g., Regular, Student, Associate)
- Each category has configurable fees and benefits
- Benefits stored separately for flexibility

**Members**: Complete member profiles including:
- Personal information (name, contact, DOB)
- Professional credentials (license number, employer)
- Geographic location (region, district)
- Membership status tracking (pending, active, expired, etc.)
- **Note**: No user account linkage - members apply via forms without logging in

**Key Features**:
- License number validation (unique)
- Membership expiry tracking
- Application approval workflow (by admin)
- Regional/district analytics support
- Email-based communication (no login required)

### 3. News & Articles
**Tables**: `news_categories`, `news_articles`

Full-featured content management for news and articles:
- Category-based organization
- SEO optimization (meta tags, slugs)
- Publishing workflow (draft → published → archived)
- Featured articles support
- View count tracking
- Full-text search capability

### 4. Events Management
**Tables**: `events`, `event_registrations`

Comprehensive event management system:
- Multiple event types (conference, workshop, seminar, webinar, etc.)
- Registration management with capacity control
- Payment tracking for paid events
- Status tracking (upcoming, ongoing, past, cancelled)
- Attendance tracking

**Event Registrations**: 
- Both member and non-member registration
- Payment status tracking
- Confirmation workflow
- Attendance marking

### 5. Programs & CPD
**Tables**: `program_categories`, `programs`, `program_enrollments`

Continuing Professional Development (CPD) management:
- Categorized programs
- CPD hours tracking
- Skill level classification
- Enrollment and progress tracking
- Completion certificates support

### 6. Careers & Recruitment
**Tables**: `job_postings`, `job_applications`

Complete recruitment management:
- Job posting with rich details
- Application deadline tracking
- Application materials (resume, cover letter)
- Application status workflow
- Application review and notes

### 7. Contact & Inquiries
**Tables**: `contact_messages`

Customer support and inquiry management:
- Subject-based categorization
- Priority levels (low, medium, high, urgent)
- Status tracking (new, in progress, resolved)
- Assignment to staff members
- Response tracking

### 8. Volunteers
**Tables**: `volunteer_areas`, `volunteer_applications`

Volunteer program management:
- Pre-defined volunteer areas
- Application and approval workflow
- Experience and availability tracking
- Active volunteer management

### 9. Donations
**Tables**: `donation_campaigns`, `donations`

Fundraising and donation management:
- Campaign-based donations
- Multiple donation types (one-time, recurring)
- Payment status tracking
- Anonymous donation support
- Receipt generation
- Goal tracking for campaigns

### 10. Partnerships
**Tables**: `partners`

Partner organization management:
- Multiple partnership types (institutional, corporate, academic, etc.)
- Contact information tracking
- Partnership duration tracking
- Featured partners support

### 11. Leadership & Governance
**Tables**: `executive_positions`, `executives`

Executive board management:
- Hierarchical position structure
- Term-based leadership tracking
- Current vs. historical executives
- Bio and contact information

### 12. History & Archives
**Tables**: `history_events`, `conferences`, `conference_materials`

Organizational history and conference archives:
- Timeline of milestones
- Conference archives with materials
- Searchable historical records
- Multiple material types (presentations, photos, videos)

### 13. Resources & Documents
**Tables**: `resource_categories`, `resources`

Document library management:
- Hierarchical category structure
- Multiple resource types
- Access control levels (public, members, restricted)
- Version tracking
- Download and view analytics

### 14. System Management
**Tables**: `site_settings`, `email_templates`, `email_logs`, `audit_logs`

**Site Settings**: Configurable system-wide settings
**Email Management**: Template-based email system with logging
- All notifications sent via email (no in-app notifications)
- Email receipts for donations, event registrations, etc.
**Audit Logs**: Complete audit trail of admin actions

## Entity Relationships

### Primary Relationships

```
admin_users (1) ←→ (*) members (approver)
admin_users (1) ←→ (*) job_applications (reviewer)
admin_users (1) ←→ (*) audit_logs

membership_categories (1) ←→ (*) members
membership_categories (1) ←→ (*) membership_category_benefits

news_categories (1) ←→ (*) news_articles

events (1) ←→ (*) event_registrations
members (1) ←→ (*) event_registrations

program_categories (1) ←→ (*) programs
programs (1) ←→ (*) program_enrollments
members (1) ←→ (*) program_enrollments

job_postings (1) ←→ (*) job_applications

volunteer_areas (1) ←→ (*) volunteer_applications
members (1) ←→ (*) volunteer_applications

donation_campaigns (1) ←→ (*) donations
members (1) ←→ (*) donations

executive_positions (1) ←→ (*) executives
members (1) ←→ (*) executives

resource_categories (1) ←→ (*) resources
resource_categories (1) ←→ (*) resource_categories (self-reference)

conferences (1) ←→ (*) conference_materials
```

## Indexing Strategy

### Primary Indexes
- All tables have primary key indexes (AUTO_INCREMENT)
- Unique constraints on email addresses, license numbers, slugs

### Foreign Key Indexes
- All foreign key columns are indexed for efficient joins

### Search Optimization
- Full-text indexes on content-heavy tables (news, jobs, resources)
- Composite indexes for common query patterns

### Performance Indexes
- Date columns (event_date, published_at, created_at)
- Status and type columns for filtering
- Boolean flags (is_active, is_featured, is_current)

## Data Types & Constraints

### Common Field Types
- **IDs**: BIGINT for scalability
- **Strings**: VARCHAR with appropriate lengths
- **Text**: TEXT for short content, LONGTEXT for rich content
- **Decimals**: DECIMAL(10,2) for currency, DECIMAL(5,2) for percentages
- **Dates**: DATE for date-only, TIMESTAMP for date-time
- **Enums**: Used for fixed value sets

### Constraints
- NOT NULL on required fields
- UNIQUE constraints on identifiers
- Foreign keys with appropriate ON DELETE actions
- DEFAULT values for status and boolean fields

## Security Considerations

### Access Control
- **No public authentication** - all website visitors are guests
- Admin access handled separately (backend system)
- Resource-level access control (`resources.access_level`) for public vs. member content
- Audit logging for all admin actions

### Data Protection
- **No passwords stored** - no user authentication system
- Sensitive member data protected by application-level security
- Email addresses collected for communication only
- IP address logging for form submissions
- GDPR compliance for data collection

## Migration & Deployment

### Initial Setup
1. Run `database-schema.sql` to create all tables
2. Default data is automatically seeded
3. Create admin user manually
4. Configure site settings

### Backup Strategy
- Daily automated backups recommended
- Point-in-time recovery enabled
- Test restore procedures regularly

### Performance Tuning
- Monitor slow queries
- Add indexes based on query patterns
- Implement caching layer for frequently accessed data
- Archive old records periodically

## API Integration Points

### Public APIs
- News articles (public)
- Events (public)
- Job postings (public)
- Resources (public or restricted)
- Membership application submission
- Event registration
- Contact forms
- Donation processing

### Admin APIs (Backend Only)
- Membership approval
- Content management
- Application review
- Analytics and reporting
- System configuration

## Analytics & Reporting

### Built-in Analytics
- View counts (news, resources, jobs)
- Registration counts (events)
- Download counts (resources)
- Donation tracking
- Membership statistics

### Recommended Reports
1. **Membership Reports**
   - Active members by region
   - Membership growth trends
   - Expiring memberships
   - New applications pending

2. **Financial Reports**
   - Donation summaries
   - Membership fee collection
   - Event registration revenue

3. **Engagement Reports**
   - Event attendance
   - Program enrollments
   - Resource downloads
   - Website activity

4. **Operational Reports**
   - Pending applications (membership, volunteer, job)
   - Unresolved contact messages
   - Upcoming event deadlines

## Future Enhancements

### Potential Extensions
1. **Payment Integration**
   - Payment gateway integration table
   - Transaction history
   - Invoice generation

2. **Discussion Forums**
   - Member forums
   - Topic/post management
   - Moderation tools

3. **Certification System**
   - CPD certificates
   - Achievement tracking
   - Digital badges

4. **Multi-language Support**
   - Translation tables
   - Language preferences

5. **Mobile App Support**
   - Push notifications
   - App sessions
   - Device management

## Best Practices

### Development
- Use prepared statements to prevent SQL injection
- Implement proper transaction handling
- Validate data at application layer
- Use ORM for complex queries

### Maintenance
- Regular database optimization
- Monitor table sizes and growth
- Archive historical data
- Keep statistics updated

### Documentation
- Document custom queries
- Maintain data dictionary
- Update schema docs with changes
- Version control schema files

## Support & Resources

### Common Queries

**Get active members by region:**
```sql
SELECT region, COUNT(*) as member_count 
FROM members 
WHERE membership_status = 'active' 
GROUP BY region 
ORDER BY member_count DESC;
```

**Find expiring memberships (next 30 days):**
```sql
SELECT id, first_name, last_name, email, membership_expiry_date 
FROM members 
WHERE membership_status = 'active' 
AND membership_expiry_date BETWEEN CURDATE() AND DATE_ADD(CURDATE(), INTERVAL 30 DAY)
ORDER BY membership_expiry_date;
```

**Get event registration summary:**
```sql
SELECT e.title, e.event_date, 
       COUNT(er.id) as registrations,
       SUM(CASE WHEN er.status = 'confirmed' THEN 1 ELSE 0 END) as confirmed
FROM events e
LEFT JOIN event_registrations er ON e.id = er.event_id
WHERE e.status = 'upcoming'
GROUP BY e.id
ORDER BY e.event_date;
```

**Calculate total donations by campaign:**
```sql
SELECT dc.title, dc.goal_amount,
       SUM(d.amount) as total_raised,
       COUNT(d.id) as number_of_donations
FROM donation_campaigns dc
LEFT JOIN donations d ON dc.id = d.campaign_id AND d.payment_status = 'completed'
WHERE dc.is_active = TRUE
GROUP BY dc.id;
```

## Version History

- **v1.0.0** (2024) - Initial schema design
  - Core membership management
  - Content management (news, events, programs)
  - Recruitment and volunteer management
  - Donation and partnership tracking
  - Complete audit and notification system

## Contact

For schema questions or suggestions:
- Email: dev@gpaa.org.gh
- Documentation: /docs/database
