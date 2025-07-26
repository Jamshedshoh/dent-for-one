# Social Media Content Hub Backend (Local API Scaffold)

This directory contains the local backend API scaffold for the Social Media Content Hub. It is designed to be modular and to work alongside your Supabase setup.

## Structure

- `api/` — RESTful API route handlers for posts, comments, likes, schedules, and analytics
- `lib/` — Utility functions for interacting with Supabase (using the client in `database/client.ts`)
- `types/` — TypeScript types and interfaces for API payloads and database models
- `middleware/` — (Optional) Middleware for authentication, validation, etc.

## Usage

- Each API route is a TypeScript file exporting handler functions (e.g., `getPosts`, `createPost`).
- Utility functions in `lib/` abstract Supabase queries for each resource.
- Types in `types/` ensure type safety across the backend.
- Middleware can be added for authentication, input validation, etc.

---

This scaffold is ready for you to implement local API logic, connect to Supabase, and integrate with your frontend Social Share components.
