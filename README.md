## How to run?
In the root of this project run

- docker compose up -d

SQL to generate dummy orders:
```sql
-- Ensure uuid_generate_v4 is available
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Insert 100 fake orders with valid country and currency codes
INSERT INTO orders (
    public_id,
    order_number,
    payment_description,
    street_address,
    town,
    country,
    amount,
    currency,
    payment_due_date
)
SELECT
    md5(random()::text) AS public_id,
    'ORD-' || LPAD((1000 + gs)::text, 5, '0') AS order_number,
    'Payment for order #' || gs AS payment_description,
    'Street ' || gs || 'B' AS street_address,
    'Town' || (gs % 20) AS town,
    countries[(floor(random() * array_length(countries, 1)) + 1)::int] AS country,
    round((random() * 500 + 50)::numeric, 2) AS amount,
    currencies[(floor(random() * array_length(currencies, 1)) + 1)::int] AS currency,
    now() + (gs || ' days')::interval AS payment_due_date
FROM generate_series(1, 200) AS gs,
     (SELECT ARRAY['EST', 'FIN', 'LVA', 'LTU', 'SWE', 'NOR', 'DNK', 'POL', 'DEU', 'NLD'] AS countries) AS c,
     (SELECT ARRAY['EUR', 'USD', 'GBP', 'SEK', 'NOK'] AS currencies) AS cu;
```

## Overall goal

Build a small order-management app composed of a frontend and a backend, demonstrating production-ready code, traceability, and ease of setup.

## Frontend (Angular + TypeScript)

* **Order creation form** with eight fields:

  * `order number`
  * `payment description`
  * `street address`
  * `town`
  * `country`
  * `amount`
  * `currency`
  * `payment due date`
* Prevent duplicate order numbers and display a validation error
* **Order list page** with:
  * Country filter
  * Description-text search filter
  * Show orders in Estonia first (if any), then all orders sorted by payment due date ascending

## Backend (NestJS + TypeORM + TypeScript)

* Persist orders in a database
* Expose endpoints to:
  * Create orders
  * Fetch orders with country and description filters
* Generate a unique, human-readable, non-guessable ID for each order (for future shareable links)

## Production considerations

* Traceability (logging, request IDs, etc.)
* Quality assurance (validation, testing)
* Ease of setup (clear scripts, configuration)

## Submission

* Push code to a public Git host (GitHub, GitLab, Bitbucket, etc)
* Include a `README` with setup instructions and any relevant comments
* If any requirements are not implemented, note them in comments and focus on code quality
