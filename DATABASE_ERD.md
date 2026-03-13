# GPAA Database - Entity Relationship Diagram

This file contains the Entity Relationship Diagram for the GPAA database schema in Mermaid format.

**Important**: This website has **NO user authentication**. All visitors access content as guests. The `admin_users` table is for internal administrative use only and is not exposed to the public website.

## Core Entities Diagram

```mermaid
erDiagram
    %% Core Admin & Membership (No Public Authentication)
    admin_users ||--o{ members : "approves"
    admin_users ||--o{ audit_logs : "performs actions"
    
    membership_categories ||--o{ members : "categorizes"
    membership_categories ||--o{ membership_category_benefits : "includes"
    
    members ||--o{ event_registrations : "registers for"
    members ||--o{ program_enrollments : "enrolls in"
    members ||--o{ job_applications : "applies for"
    members ||--o{ volunteer_applications : "volunteers"
    members ||--o{ donations : "donates"
    members ||--o| executives : "serves as"
    
    %% News & Content
    news_categories ||--o{ news_articles : "categorizes"
    
    %% Events
    events ||--o{ event_registrations : "has registrations"
    
    %% Programs & CPD
    program_categories ||--o{ programs : "categorizes"
    programs ||--o{ program_enrollments : "has enrollments"
    
    %% Jobs & Careers
    job_postings ||--o{ job_applications : "receives applications"
    admin_users ||--o{ job_applications : "reviews"
    
    %% Volunteers
    volunteer_areas ||--o{ volunteer_applications : "receives applications"
    admin_users ||--o{ volunteer_applications : "reviews"
    
    %% Donations
    donation_campaigns ||--o{ donations : "collects"
    
    %% Leadership
    executive_positions ||--o{ executives : "defines"
    
    %% Resources
    resource_categories ||--o{ resources : "organizes"
    resource_categories ||--o{ resource_categories : "parent-child"
    
    %% Conferences
    conferences ||--o{ conference_materials : "archives"
    
    %% Communications
    admin_users ||--o{ contact_messages : "assigned to"
    email_templates ||--o{ email_logs : "used in"
    
    %% Settings
    admin_users ||--o{ site_settings : "updates"

    %% Entity Definitions
    admin_users {
        int id PK
        string name
        string email UK
        boolean is_active
        timestamp created_at
    }
    
    members {
        bigint id PK
        int category_id FK
        string first_name
        string last_name
        string license_number UK
        enum membership_status
        date membership_expiry_date
    }
    
    membership_categories {
        int id PK
        string title
        decimal fees
        boolean is_active
    }
    
    news_articles {
        bigint id PK
        int category_id FK
        string title
        string slug UK
        text content
        enum status
        timestamp published_at
    }
    
    events {
        bigint id PK
        string title
        date event_date
        string location
        enum type
        enum status
    }
    
    programs {
        bigint id PK
        int category_id FK
        string title
        decimal cpd_hours
        enum status
    }
    
    job_postings {
        bigint id PK
        string title
        enum type
        string location
        enum status
        date application_deadline
    }
    
    donations {
        bigint id PK
        int campaign_id FK
        bigint member_id FK
        decimal amount
        enum donation_type
        enum payment_status
    }
```

## Detailed Relationships

### Admin Management (Internal Only)
```mermaid
erDiagram
    admin_users ||--o{ members : "1:N approves"
    admin_users ||--o{ audit_logs : "1:N actions"
    
    admin_users {
        int id PK
        string name
        string email UK
        text notes
        boolean is_active
    }
    
    members {
        bigint id PK
        int category_id FK
        string first_name
        string last_name
        string email UK
        string license_number UK
        enum membership_status
        date membership_expiry_date
        int approved_by_admin FK
    }
    
    audit_logs {
        bigint id PK
        int admin_id FK
        string action
        string entity_type
        bigint entity_id
        json old_values
        json new_values
        timestamp created_at
    }
```

### Membership Structure
```mermaid
erDiagram
    membership_categories ||--o{ members : "categorizes"
    membership_categories ||--o{ membership_category_benefits : "has benefits"
    
    membership_categories {
        int id PK
        string title
        text description
        decimal fees
        string icon
        boolean is_active
        int display_order
    }
    
    membership_category_benefits {
        int id PK
        int category_id FK
        text benefit
        int display_order
    }
    
    members {
        bigint id PK
        int category_id FK
        string first_name
        string last_name
        string license_number UK
        string region
        string district
        enum membership_status
    }
```

### News & Content Management
```mermaid
erDiagram
    news_categories ||--o{ news_articles : "categorizes"
    
    news_categories {
        int id PK
        string name UK
        string slug UK
        text description
        string color
    }
    
    news_articles {
        bigint id PK
        int category_id FK
        string title
        string slug UK
        text description
        longtext content
        string image
        string author_name
        enum status "draft|published|archived"
        timestamp published_at
        boolean is_featured
        int views_count
    }
```

### Events & Registrations
```mermaid
erDiagram
    events ||--o{ event_registrations : "has registrations"
    members ||--o{ event_registrations : "registers"
    
    events {
        bigint id PK
        string title
        string slug UK
        date event_date
        time event_time
        string location
        enum type "conference|workshop|seminar|webinar|training"
        enum status "upcoming|ongoing|past|cancelled"
        int capacity
        boolean requires_registration
        decimal registration_fee
    }
    
    event_registrations {
        bigint id PK
        bigint event_id FK
        bigint member_id FK "nullable"
        string name
        string email
        enum status "pending|confirmed|cancelled|attended"
        enum payment_status "pending|paid|refunded"
        timestamp registered_at
    }
```

### Programs & CPD Tracking
```mermaid
erDiagram
    program_categories ||--o{ programs : "categorizes"
    programs ||--o{ program_enrollments : "enrollments"
    members ||--o{ program_enrollments : "enrolls"
    
    program_categories {
        int id PK
        string name UK
        string slug UK
        text description
        string icon
    }
    
    programs {
        bigint id PK
        int category_id FK
        string title
        string slug UK
        text description
        decimal cpd_hours
        enum level "beginner|intermediate|advanced|all"
        enum status "active|inactive|completed"
    }
    
    program_enrollments {
        bigint id PK
        bigint program_id FK
        bigint member_id FK
        enum status "enrolled|in_progress|completed|dropped"
        decimal progress_percentage
        timestamp enrolled_at
        timestamp completed_at
    }
```

### Recruitment System
```mermaid
erDiagram
    job_postings ||--o{ job_applications : "receives"
    members ||--o{ job_applications : "applies"
    admin_users ||--o{ job_applications : "reviews"
    
    job_postings {
        bigint id PK
        string title
        string slug UK
        enum type "full-time|part-time|contract|internship|volunteer"
        string department
        string location
        date application_deadline
        enum status "open|closed|filled"
        int views_count
        int applications_count
    }
    
    job_applications {
        bigint id PK
        bigint job_id FK
        bigint member_id FK "nullable"
        string name
        string email
        string resume_url
        text cover_letter
        enum status "submitted|under_review|shortlisted|interview|rejected|accepted"
        timestamp applied_at
    }
```

### Volunteer Management
```mermaid
erDiagram
    volunteer_areas ||--o{ volunteer_applications : "receives"
    members ||--o{ volunteer_applications : "applies"
    
    volunteer_areas {
        int id PK
        string title
        text description
        string icon
        string color
        text requirements
        boolean is_active
    }
    
    volunteer_applications {
        bigint id PK
        int area_id FK
        bigint member_id FK "nullable"
        string name
        string email
        text availability
        text experience
        enum status "pending|approved|rejected|active|inactive"
        timestamp applied_at
    }
```

### Donation & Fundraising
```mermaid
erDiagram
    donation_campaigns ||--o{ donations : "collects"
    members ||--o{ donations : "makes"
    
    donation_campaigns {
        int id PK
        string title
        text description
        decimal goal_amount
        decimal current_amount
        date start_date
        date end_date
        boolean is_active
    }
    
    donations {
        bigint id PK
        int campaign_id FK "nullable"
        bigint member_id FK "nullable"
        string donor_name
        string donor_email
        decimal amount
        enum donation_type "one-time|monthly|quarterly|annual"
        enum payment_status "pending|completed|failed|refunded"
        string receipt_number UK
        timestamp donated_at
    }
```

### Leadership Structure
```mermaid
erDiagram
    executive_positions ||--o{ executives : "defines"
    members ||--o| executives : "serves as"
    
    executive_positions {
        int id PK
        string title
        text description
        int level
        int display_order
    }
    
    executives {
        int id PK
        int position_id FK
        bigint member_id FK "nullable"
        string name
        string email
        string image
        text bio
        date term_start_date
        date term_end_date
        boolean is_current
    }
```

### Resource Library
```mermaid
erDiagram
    resource_categories ||--o{ resources : "organizes"
    resource_categories ||--o{ resource_categories : "parent-child"
    
    resource_categories {
        int id PK
        string name UK
        string slug UK
        text description
        int parent_id FK "nullable"
    }
    
    resources {
        bigint id PK
        int category_id FK
        string title
        string slug UK
        enum type "document|guideline|policy|form|template|publication"
        string file_url
        enum access_level "public|members|restricted"
        int downloads_count
        int views_count
    }
```

### Conference Archives
```mermaid
erDiagram
    conferences ||--o{ conference_materials : "archives"
    
    conferences {
        int id PK
        string title
        string slug UK
        int year
        string location
        date start_date
        date end_date
        string theme
        int total_participants
    }
    
    conference_materials {
        bigint id PK
        int conference_id FK
        string title
        enum type "presentation|abstract|poster|photo|video|report"
        string file_url
        string author
    }
```

### Communication System
```mermaid
erDiagram
    admin_users ||--o{ contact_messages : "handles"
    email_templates ||--o{ email_logs : "generates"
    
    contact_messages {
        bigint id PK
        string name
        string email
        string subject
        text message
        enum status "new|in_progress|resolved|closed"
        enum priority "low|medium|high|urgent"
        int assigned_to_admin FK "nullable"
    }
    
    email_templates {
        int id PK
        string name UK
        string subject
        text body
        boolean is_active
    }
    
    email_logs {
        bigint id PK
        int template_id FK "nullable"
        string recipient_email
        enum status "pending|sent|failed|bounced"
        timestamp sent_at
    }
```

**Note**: No in-app notifications - all communication via email since there's no user authentication system.

## Database Statistics

### Estimated Table Sizes (after 5 years)

| Table | Estimated Rows | Growth Rate |
|-------|----------------|-------------|
| admin_users | 10-20 | Internal staff only |
| members | 5,000 | 1,000/year |
| news_articles | 1,000 | 200/year |
| events | 500 | 100/year |
| event_registrations | 25,000 | 5,000/year |
| programs | 100 | 20/year |
| program_enrollments | 50,000 | 10,000/year |
| job_postings | 200 | 40/year |
| job_applications | 2,000 | 400/year |
| contact_messages | 5,000 | 1,000/year |
| donations | 10,000 | 2,000/year |
| audit_logs | 500,000 | 100,000/year |

**Note**: Without user authentication system, reduced overhead in user management and session tracking.

## Implementation Notes

1. **Indexing**: All foreign keys are indexed for optimal join performance
2. **Full-Text Search**: Implemented on title/description fields for search functionality
3. **No Authentication**: Simplified architecture without password management or session handling
4. **Email-Based Communication**: All notifications sent via email
5. **Archiving**: Implement archiving strategy for old audit logs and completed events
6. **Partitioning**: Consider partitioning audit_logs by date for better performance
7. **Caching**: Implement application-level caching for frequently accessed data
8. **GDPR Compliance**: Ensure data collection forms comply with privacy regulations

## Visual Tools

To visualize this ERD:
1. Copy the Mermaid code blocks
2. Paste into [Mermaid Live Editor](https://mermaid.live/)
3. Export as PNG/SVG for documentation

Or use VS Code extensions:
- Markdown Preview Mermaid Support
- Mermaid Markdown Syntax Highlighting
