## How to run?
In the root of this project run

```sh docker compose up -d```

Wait for it to start up and then generate test data.

```sh ./generate-test-orders.sh```

### Links 
- Traces: http://localhost:16686/search?end=1748788897662000&limit=1500&lookback=1h&maxDuration&minDuration&service=orders-service&start=1748785297662000
- UI: http://localhost:3001/
- BE: http://localhost:3000/

## Comments about the solution

It was a fun exercise! In total it took about 8h of actual work. As I was approaching the 8h mark I decided to not polish the FE. BE is most polished and I've added some integration tests. FE is lacking tests which I could have added if I was to invest more time in it. 

### What's Been Done
- Set up proper validation and error handling for order creation
- Implemented filtering and sorting functionality for orders
- Added OpenTelemetry integration for request tracing
- Set up Docker-based development environment
- Implemented JWT-based authentication (Token generation mocked for testing)
- Added comprehensive test coverage for backend services

### Areas for Improvement
- FE: Add more comprehensive frontend testing and state management
- BE: Implement caching and performance optimizations for database queries
- BE: Add API documentation and improve error handling
- DEVOPS: Set up CI/CD pipeline and automated testing

## Overall goal

Build a small order-management app composed of a frontend and a backend, demonstrating production-ready code, traceability, and ease of setup.

### Frontend (Angular + TypeScript)

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

### Backend (NestJS + TypeORM + TypeScript)

* Persist orders in a database
* Expose endpoints to:
  * Create orders
  * Fetch orders with country and description filters
* Generate a unique, human-readable, non-guessable ID for each order (for future shareable links)

### Production considerations

* Traceability (logging, request IDs, etc.)
* Quality assurance (validation, testing)
* Ease of setup (clear scripts, configuration)

### Submission

* Push code to a public Git host (GitHub, GitLab, Bitbucket, etc)
* Include a `README` with setup instructions and any relevant comments
* If any requirements are not implemented, note them in comments and focus on code quality
