# GPAA Database - API Examples & Common Queries

This document provides practical examples of database queries and API endpoint implementations for the GPAA website.

**Important**: This website has **no user authentication**. All visitors access content as guests. Forms collect information directly without requiring login.

## Table of Contents
1. [Membership Operations](#membership-operations)
2. [News & Content](#news--content)
3. [Events Management](#events-management)
4. [Programs & CPD](#programs--cpd)
5. [Donations & Reporting](#donations--reporting)
6. [Search Operations](#search-operations)

---

## Membership Operations

### Submit Membership Application

**No login required** - visitors fill out the application form directly.

```sql
-- Insert membership application
INSERT INTO members (
  category_id, first_name, last_name, email, phone, gender, date_of_birth,
  license_number, employer, region, district, address, membership_status
) VALUES (
  1, 'John', 'Doe', 'john.doe@example.com', '+233XXXXXXXXX', 'male', '1990-01-15',
  'PA12345', 'Ridge Hospital', 'Greater Accra', 'Accra Metropolis', 
  'P.O. Box 123, Accra', 'pending'
);
```

**API Endpoint**:
```javascript
POST /api/membership/apply
{
  "category": "Regular Member",
  "first_name": "John",
  "last_name": "Doe",
  "email": "john.doe@example.com",
  "phone": "+233XXXXXXXXX",
  "gender": "male",
  "date_of_birth": "1990-01-15",
  "license_number": "PA12345",
  "employer": "Ridge Hospital",
  "region": "Greater Accra",
  "district": "Accra Metropolis",
  "address": "P.O. Box 123, Accra"
}

Response:
{
  "success": true,
  "message": "Application submitted successfully. We will contact you via email within 48 hours.",
  "application_id": 5678,
  "status": "pending"
}
```

### Approve Membership Application (Admin Only)

```sql
-- Approve membership and set dates
UPDATE members 
SET membership_status = 'active',
    membership_start_date = CURDATE(),
    membership_expiry_date = DATE_ADD(CURDATE(), INTERVAL 1 YEAR),
    approved_at = CURRENT_TIMESTAMP,
    approved_by_admin = 1  -- admin user ID
WHERE id = 5678 AND membership_status = 'pending';
```

**API Endpoint** (Admin Backend):
```javascript
POST /api/admin/membership/approve/{memberId}
{
  "approved_by_admin": 1,
  "send_welcome_email": true
}

Response:
{
  "success": true,
  "message": "Membership approved successfully",
  "member_id": 5678,
  "membership_expiry": "2025-02-27"
}
```

### Get Member Profile

```sql
-- Get complete member profile (no user account linkage)
SELECT 
  m.*,
  mc.title as category_title,
  mc.fees as category_fees
FROM members m
JOIN membership_categories mc ON m.category_id = mc.id
WHERE m.id = 5678;
```

**API Endpoint**:
```javascript
GET /api/members/{memberId}

Response:
{
  "success": true,
  "member": {
    "id": 5678,
    "first_name": "John",
    "last_name": "Doe",
    "email": "john.doe@example.com",
    "phone": "+233XXXXXXXXX",
    "license_number": "PA12345",
    "category": {
      "id": 1,
      "title": "Regular Member",
      "fees": 200.00
    },
    "membership": {
      "status": "active",
      "start_date": "2024-02-27",
      "expiry_date": "2025-02-27"
    },
    "location": {
      "region": "Greater Accra",
      "district": "Accra Metropolis"
    }
  }
}
```

### Get Expiring Memberships

```sql
-- Get memberships expiring in next 30 days
SELECT 
  m.id,
  m.first_name,
  m.last_name,
  m.email,
  m.phone,
  m.membership_expiry_date,
  DATEDIFF(m.membership_expiry_date, CURDATE()) as days_remaining,
  mc.title as category,
  mc.fees as renewal_fee
FROM members m
JOIN membership_categories mc ON m.category_id = mc.id
WHERE m.membership_status = 'active'
  AND m.membership_expiry_date BETWEEN CURDATE() AND DATE_ADD(CURDATE(), INTERVAL 30 DAY)
ORDER BY m.membership_expiry_date ASC;
```

**API Endpoint**:
```javascript
GET /api/admin/membership/expiring?days=30

Response:
{
  "success": true,
  "count": 45,
  "members": [
    {
      "id": 5678,
      "name": "John Doe",
      "email": "john.doe@example.com",
      "expiry_date": "2024-03-15",
      "days_remaining": 17,
      "category": "Regular Member",
      "renewal_fee": 200.00
    }
  ]
}
```

---

## News & Content

### Create News Article (Admin Only)

```sql
-- Insert news article
INSERT INTO news_articles (
  category_id, title, slug, description, content, image,
  author_name, status, is_featured
) VALUES (
  1, -- Announcements category
  'GPAA Annual Conference 2024',
  'gpaa-annual-conference-2024',
  'Join us for the biggest PA conference of the year',
  '<p>Full article content here...</p>',
  '/uploads/conference-2024.jpg',
  'GPAA Communications Team',
  'draft',
  FALSE
);
```

**API Endpoint** (Admin Backend):
```javascript
POST /api/admin/news
{
  "category": "Announcements",
  "title": "GPAA Annual Conference 2024",
  "description": "Join us for the biggest PA conference of the year",
  "content": "<p>Full article content here...</p>",
  "image": "/uploads/conference-2024.jpg",
  "author_name": "GPAA Communications Team",
  "status": "draft",
  "is_featured": false
}

Response:
{
  "success": true,
  "article_id": 123,
  "slug": "gpaa-annual-conference-2024",
  "status": "draft"
}
```

### Publish Article

```sql
-- Publish article
UPDATE news_articles 
SET status = 'published',
    published_at = CURRENT_TIMESTAMP
WHERE id = 123 AND status = 'draft';
```

**API Endpoint**:
```javascript
PUT /api/news/{articleId}/publish

Response:
{
  "success": true,
  "article_id": 123,
  "status": "published",
  "published_at": "2024-02-27T10:30:00Z"
}
```

### Get Latest News

```sql
-- Get latest published news articles
SELECT 
  na.id,
  na.title,
  na.slug,
  na.description,
  na.image,
  na.published_at,
  na.views_count,
  na.is_featured,
  nc.name as category,
  nc.color as category_color
FROM news_articles na
JOIN news_categories nc ON na.category_id = nc.id
WHERE na.status = 'published'
ORDER BY na.published_at DESC
LIMIT 10;
```

**API Endpoint**:
```javascript
GET /api/news?limit=10&page=1

Response:
{
  "success": true,
  "total": 87,
  "page": 1,
  "per_page": 10,
  "articles": [
    {
      "id": 123,
      "title": "GPAA Annual Conference 2024",
      "slug": "gpaa-annual-conference-2024",
      "description": "Join us for the biggest PA conference...",
      "image": "/uploads/conference-2024.jpg",
      "published_at": "2024-02-27T10:30:00Z",
      "views": 234,
      "is_featured": true,
      "category": {
        "name": "Announcements",
        "color": "#3B82F6"
      }
    }
  ]
}
```

---

## Events Management

### Create Event (Admin Only)

```sql
-- Insert new event
INSERT INTO events (
  title, slug, description, event_date, event_time, location, venue,
  type, status, capacity, requires_registration, registration_fee
) VALUES (
  'CPD Workshop: Advanced Clinical Skills',
  'cpd-workshop-advanced-clinical-skills',
  'Hands-on workshop for advanced clinical procedures',
  '2024-06-15',
  '09:00:00',
  'Accra',
  'Accra International Conference Centre',
  'workshop',
  'upcoming',
  150,
  TRUE,
  50.00
);
```

**API Endpoint**:
```javascript
POST /api/events
{
  "title": "CPD Workshop: Advanced Clinical Skills",
  "description": "Hands-on workshop for advanced clinical procedures",
  "event_date": "2024-06-15",
  "event_time": "09:00",
  "location": "Accra",
  "venue": "Accra International Conference Centre",
  "type": "workshop",
  "capacity": 150,
  "registration_fee": 50.00
}

Response:
{
  "success": true,
  "event_id": 456,
  "slug": "cpd-workshop-advanced-clinical-skills",
  "status": "upcoming"
}
```

### Register for Event

**No login required** - visitors can register directly using the form.

```sql
-- Check capacity
SELECT 
  e.capacity,
  COUNT(er.id) as current_registrations
FROM events e
LEFT JOIN event_registrations er ON e.id = er.event_id
WHERE e.id = 456
GROUP BY e.id;

-- Insert registration if capacity available
INSERT INTO event_registrations (
  event_id, member_id, name, email, phone, status, payment_status
) VALUES (
  456,
  5678,
  'John Doe',
  'john.doe@example.com',
  '+233XXXXXXXXX',
  'pending',
  'pending'
);
```

**API Endpoint**:
```javascript
POST /api/events/{eventId}/register
{
  "member_id": 5678,
  "name": "John Doe",
  "email": "john.doe@example.com",
  "phone": "+233XXXXXXXXX"
}

Response:
{
  "success": true,
  "registration_id": 789,
  "event": {
    "title": "CPD Workshop: Advanced Clinical Skills",
    "date": "2024-06-15",
    "location": "Accra"
  },
  "payment": {
    "status": "pending",
    "amount": 50.00,
    "payment_link": "https://payment.gpaa.org.gh/pay/789"
  }
}
```

### Get Event Attendees

```sql
-- Get confirmed attendees for an event
SELECT 
  er.id,
  er.name,
  er.email,
  er.phone,
  er.payment_status,
  er.registered_at,
  m.license_number,
  m.region
FROM event_registrations er
LEFT JOIN members m ON er.member_id = m.id
WHERE er.event_id = 456
  AND er.status = 'confirmed'
ORDER BY er.registered_at ASC;
```

**API Endpoint**:
```javascript
GET /api/events/{eventId}/attendees

Response:
{
  "success": true,
  "event": {
    "id": 456,
    "title": "CPD Workshop: Advanced Clinical Skills",
    "date": "2024-06-15"
  },
  "stats": {
    "capacity": 150,
    "registered": 87,
    "confirmed": 72,
    "available": 63
  },
  "attendees": [
    {
      "id": 789,
      "name": "John Doe",
      "email": "john.doe@example.com",
      "payment_status": "paid",
      "registered_at": "2024-02-20T14:30:00Z"
    }
  ]
}
```

---

## Programs & CPD

### Enroll in Program

```sql
-- Check if already enrolled
SELECT id FROM program_enrollments
WHERE program_id = 123 AND member_id = 5678;

-- Insert enrollment if not exists
INSERT INTO program_enrollments (program_id, member_id, status)
VALUES (123, 5678, 'enrolled');
```

**API Endpoint**:
```javascript
POST /api/programs/{programId}/enroll
{
  "member_id": 5678
}

Response:
{
  "success": true,
  "enrollment_id": 234,
  "program": {
    "id": 123,
    "title": "Advanced Clinical Assessment",
    "cpd_hours": 10,
    "duration": "6 weeks"
  },
  "status": "enrolled"
}
```

### Track CPD Hours

```sql
-- Get member's CPD hours for the year
SELECT 
  SUM(p.cpd_hours) as total_cpd_hours,
  COUNT(DISTINCT pe.program_id) as programs_completed
FROM program_enrollments pe
JOIN programs p ON pe.program_id = p.id
WHERE pe.member_id = 5678
  AND pe.status = 'completed'
  AND YEAR(pe.completed_at) = 2024;

-- Get detailed CPD history
SELECT 
  p.title,
  p.cpd_hours,
  pc.name as category,
  pe.completed_at
FROM program_enrollments pe
JOIN programs p ON pe.program_id = p.id
JOIN program_categories pc ON p.category_id = pc.id
WHERE pe.member_id = 5678
  AND pe.status = 'completed'
ORDER BY pe.completed_at DESC;
```

**API Endpoint**:
```javascript
GET /api/members/{memberId}/cpd?year=2024

Response:
{
  "success": true,
  "member_id": 5678,
  "year": 2024,
  "summary": {
    "total_hours": 45,
    "required_hours": 50,
    "percentage": 90,
    "programs_completed": 8
  },
  "programs": [
    {
      "title": "Advanced Clinical Assessment",
      "cpd_hours": 10,
      "category": "Clinical Skills",
      "completed_at": "2024-02-15"
    }
  ]
}
```

---

## Donations & Reporting

### Process Donation

**No login required** - anyone can donate via the public form.

```sql
-- Insert donation
INSERT INTO donations (
  campaign_id, member_id, donor_name, donor_email, amount,
  donation_type, payment_method, payment_status
) VALUES (
  1,  -- campaign ID
  5678,  -- member ID
  'John Doe',
  'john.doe@example.com',
  100.00,
  'one-time',
  'mobile_money',
  'pending'
);

-- Generate receipt number
UPDATE donations 
SET receipt_number = CONCAT('RCP', YEAR(NOW()), LPAD(LAST_INSERT_ID(), 6, '0'))
WHERE id = LAST_INSERT_ID();
```

**API Endpoint**:
```javascript
POST /api/donations
{
  "campaign_id": 1,
  "amount": 100.00,
  "donation_type": "one-time",
  "donor_name": "John Doe",
  "donor_email": "john.doe@example.com",
  "payment_method": "mobile_money",
  "is_anonymous": false
}

Response:
{
  "success": true,
  "donation_id": 987,
  "receipt_number": "RCP2024000987",
  "amount": 100.00,
  "payment": {
    "status": "pending",
    "payment_link": "https://payment.gpaa.org.gh/donate/987"
  }
}
```

### Donation Report

```sql
-- Monthly donation summary
SELECT 
  DATE_FORMAT(donated_at, '%Y-%m') as month,
  COUNT(*) as donation_count,
  SUM(amount) as total_amount,
  AVG(amount) as avg_amount
FROM donations
WHERE payment_status = 'completed'
  AND donated_at >= DATE_SUB(NOW(), INTERVAL 12 MONTH)
GROUP BY DATE_FORMAT(donated_at, '%Y-%m')
ORDER BY month DESC;

-- Top donors
SELECT 
  donor_name,
  donor_email,
  COUNT(*) as donations_count,
  SUM(amount) as total_donated
FROM donations
WHERE payment_status = 'completed'
  AND is_anonymous = FALSE
  AND YEAR(donated_at) = 2024
GROUP BY donor_email, donor_name
ORDER BY total_donated DESC
LIMIT 10;
```

**API Endpoint**:
```javascript
GET /api/admin/reports/donations?period=year&year=2024

Response:
{
  "success": true,
  "period": "2024",
  "summary": {
    "total_donations": 1234,
    "total_amount": 125000.00,
    "average_amount": 101.30,
    "unique_donors": 987
  },
  "monthly_breakdown": [
    {
      "month": "2024-02",
      "count": 89,
      "amount": 8950.00
    }
  ],
  "top_donors": [
    {
      "name": "John Doe",
      "email": "john.doe@example.com",
      "donations": 5,
      "total": 1500.00
    }
  ]
}
```

---

## Search Operations

### Full-Text Search

```sql
-- Search news articles
SELECT 
  na.id,
  na.title,
  na.slug,
  na.description,
  na.published_at,
  nc.name as category,
  MATCH(na.title, na.description, na.content) AGAINST('clinical skills' IN NATURAL LANGUAGE MODE) as relevance
FROM news_articles na
JOIN news_categories nc ON na.category_id = nc.id
WHERE na.status = 'published'
  AND MATCH(na.title, na.description, na.content) AGAINST('clinical skills' IN NATURAL LANGUAGE MODE)
ORDER BY relevance DESC, na.published_at DESC
LIMIT 20;
```

**API Endpoint**:
```javascript
GET /api/search?q=clinical+skills&type=news&limit=20

Response:
{
  "success": true,
  "query": "clinical skills",
  "type": "news",
  "total": 45,
  "results": [
    {
      "id": 123,
      "title": "CPD Workshop: Advanced Clinical Skills",
      "description": "Hands-on workshop for...",
      "type": "news",
      "relevance": 0.95,
      "url": "/news/cpd-workshop-advanced-clinical-skills"
    }
  ]
}
```

### Member Search

```sql
-- Search members by name, license, or region
SELECT 
  m.id,
  m.first_name,
  m.last_name,
  m.email,
  m.phone,
  m.license_number,
  m.region,
  m.district,
  m.membership_status,
  mc.title as category
FROM members m
JOIN membership_categories mc ON m.category_id = mc.id
WHERE (
  m.first_name LIKE '%john%'
  OR m.last_name LIKE '%john%'
  OR m.email LIKE '%john%'
  OR m.license_number LIKE '%john%'
)
AND m.membership_status IN ('active', 'pending')
ORDER BY m.last_name, m.first_name
LIMIT 50;
```

**API Endpoint**:
```javascript
GET /api/admin/members/search?q=john&status=active,pending

Response:
{
  "success": true,
  "query": "john",
  "total": 23,
  "members": [
    {
      "id": 5678,
      "name": "John Doe",
      "email": "john.doe@example.com",
      "license_number": "PA12345",
      "region": "Greater Accra",
      "status": "active",
      "category": "Regular Member"
    }
  ]
}
```

### Advanced Analytics

```sql
-- Membership statistics by region
SELECT 
  m.region,
  COUNT(*) as total_members,
  SUM(CASE WHEN m.membership_status = 'active' THEN 1 ELSE 0 END) as active_members,
  SUM(CASE WHEN m.membership_status = 'expired' THEN 1 ELSE 0 END) as expired_members,
  SUM(CASE WHEN m.membership_status = 'pending' THEN 1 ELSE 0 END) as pending_applications
FROM members m
GROUP BY m.region
ORDER BY total_members DESC;

-- Event participation rate
SELECT 
  e.title,
  e.event_date,
  e.capacity,
  COUNT(er.id) as registrations,
  ROUND((COUNT(er.id) / e.capacity) * 100, 2) as fill_rate_percentage
FROM events e
LEFT JOIN event_registrations er ON e.id = er.event_id
WHERE e.status IN ('upcoming', 'past')
  AND e.event_date >= DATE_SUB(CURDATE(), INTERVAL 1 YEAR)
GROUP BY e.id
ORDER BY e.event_date DESC;
```

**API Endpoint**:
```javascript
GET /api/admin/analytics/membership-by-region

Response:
{
  "success": true,
  "data": [
    {
      "region": "Greater Accra",
      "total": 1234,
      "active": 1100,
      "expired": 89,
      "pending": 45
    }
  ]
}
```

---

## Error Handling

### Standard Error Response

```javascript
{
  "success": false,
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Invalid input data",
    "details": [
      {
        "field": "email",
        "message": "Email is already registered"
      }
    ]
  }
}
```

### HTTP Status Codes

- `200 OK` - Successful GET/PUT/PATCH
- `201 Created` - Successful POST
- `204 No Content` - Successful DELETE
- `400 Bad Request` - Validation error
- `403 Forbidden` - Admin access required
- `404 Not Found` - Resource not found
- `409 Conflict` - Duplicate resource
- `422 Unprocessable Entity` - Business logic error
- `500 Internal Server Error` - Server error

**Note**: No 401 Unauthorized as there is no authentication system.

---

## Rate Limiting

Implement rate limiting to prevent abuse:

```javascript
// Rate limit headers
X-RateLimit-Limit: 100
X-RateLimit-Remaining: 95
X-RateLimit-Reset: 1635724800

// Rate limit exceeded response
{
  "success": false,
  "error": {
    "code": "RATE_LIMIT_EXCEEDED",
    "message": "Too many requests. Please try again later.",
    "retry_after": 60
  }
}
```

---

## Pagination

Standard pagination parameters:

```javascript
GET /api/news?page=2&per_page=20

Response:
{
  "success": true,
  "data": [...],
  "pagination": {
    "total": 87,
    "count": 20,
    "per_page": 20,
    "current_page": 2,
    "total_pages": 5,
    "links": {
      "first": "/api/news?page=1&per_page=20",
      "prev": "/api/news?page=1&per_page=20",
      "next": "/api/news?page=3&per_page=20",
      "last": "/api/news?page=5&per_page=20"
    }
  }
}
```

---

For more examples and documentation, visit the API documentation at: https://api.gpaa.org.gh/docs
