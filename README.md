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
