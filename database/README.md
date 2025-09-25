# Database Setup

This directory contains database migrations and seeders for the e-commerce application.

## Prerequisites

1. PostgreSQL database server running
2. Database created (e.g., `ecommerce_dev`)
3. Environment variables configured in `.env` file

## Setup Instructions

### 1. Configure Environment Variables

Copy `.env.example` to `.env` and update the database connection string:

```bash
cp .env.example .env
```

Update the `DB_URI` in `.env`:
```
DB_URI=postgresql://username:password@localhost:5432/ecommerce_dev
```

### 2. Run Migrations

Create all database tables:

```bash
npm run db:migrate
```

### 3. Run Seeders

Populate tables with sample data:

```bash
npm run db:seed
```

### 4. Reset Database (Optional)

To reset the entire database:

```bash
npm run db:reset
```

## Available Scripts

- `npm run db:migrate` - Run all pending migrations
- `npm run db:migrate:undo` - Undo the last migration
- `npm run db:migrate:undo:all` - Undo all migrations
- `npm run db:seed` - Run all seeders
- `npm run db:seed:undo` - Undo all seeders
- `npm run db:reset` - Reset database (undo all, migrate, seed)
- `npm run migration:generate -- migration-name` - Generate new migration
- `npm run seeder:generate -- seeder-name` - Generate new seeder

## Database Schema

### Core Tables

1. **Users** - User accounts and authentication
2. **Categories** - Product categories (hierarchical)
3. **Brands** - Product brands
4. **Products** - Product catalog
5. **Addresses** - User shipping/billing addresses
6. **Carts** - Shopping carts
7. **CartItems** - Items in shopping carts
8. **Wishlists** - User wishlists
9. **WishlistItems** - Items in wishlists

### Sample Data

The seeders create:
- 4 demo users (admin, vendor, 2 regular users)
- 8 categories (4 main + 4 subcategories)
- 8 brands (Apple, Samsung, Nike, Adidas, etc.)
- 6 sample products across different categories

### Default Users

After running seeders, you can login with:

- **Admin**: admin@example.com / admin123
- **Vendor**: vendor@example.com / vendor123
- **User**: john@example.com / password123
- **User**: jane@example.com / password123

## Migration Files

- `20250918000001-create-users.js` - Users table
- `20250918000002-create-categories.js` - Categories table
- `20250918000003-create-brands.js` - Brands table
- `20250918000004-create-products.js` - Products table
- `20250918000005-create-core-tables.js` - Addresses, Carts, Wishlists

## Seeder Files

- `20250918000001-demo-users.js` - Demo users
- `20250918000002-demo-categories.js` - Product categories
- `20250918000003-demo-brands.js` - Product brands
- `20250918000004-demo-products.js` - Sample products

## Notes

- All tables use UUID primary keys
- Soft deletes are enabled (deletedAt column)
- Proper indexes are created for performance
- Foreign key constraints maintain data integrity
- Passwords are hashed using bcrypt
