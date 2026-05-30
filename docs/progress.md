# SAC Web App — Day 1 Progress

## Overview

Day 1 focused on establishing the frontend architecture, design system, routing foundation, and scalable project structure for the SAC Web Application demo.

The objective was to create a production-aligned frontend foundation using TypeScript and mock-data-first development, as outlined in the SAC project proposal.

---

# Tech Stack Implemented

- React 18
- Vite
- TypeScript
- Tailwind CSS v4
- shadcn/ui (Radix + Luma preset)
- React Router v6
- Zustand
- React Query
- Lucide Icons

---

# Project Structure

Current frontend structure:

```txt
src/
├── components/
│   ├── layout/
│   └── ui/
├── mock/
├── pages/
├── routes/
├── store/
├── types/
├── App.tsx
├── main.tsx
└── index.css
```

The structure is intentionally aligned with the long-term architecture defined in the SAC proposal document.

---

# Features Completed

## Application Setup

- Vite + React + TypeScript initialized
- Tailwind CSS v4 configured
- shadcn/ui configured successfully
- Import aliases configured using `@/`

---

## Routing

Implemented route-level navigation using React Router.

Current routes:

- `/`
- `/activities`
- `/stats`
- `/gallery`
- `/events`
- `/people`
- `/achievements`
- `/contact`

All routes currently render placeholder page shells.

---

## Global Layout System

Implemented:

- Responsive Navbar
- Mobile Sheet Navigation
- Footer
- Main Layout Wrapper
- Floating Action Button (FAB)

---

## State Management

Configured Zustand store for mock authentication role switching.

Current roles:

- guest
- student
- admin

---

## Mock Data Layer

Created mock data architecture for:

- Activities
- Events

Initial mock datasets added for SAC activities and featured events.

---

## Type System

Created initial TypeScript domain types for:

- Activities
- Events
- People
- Achievements
- Auth

---

# Design Decisions

## Why TypeScript?

TypeScript was selected for:

- long-term scalability
- safer mock-data modeling
- future backend integration
- Prisma schema alignment
- improved maintainability

---

## Why Mock-First Development?

The SAC proposal explicitly prioritizes frontend-first demo development.

This allows:

- rapid UI iteration
- realistic navigation flows
- future backend integration without frontend rewrites

---

# Current Status

The project now has:

- stable frontend architecture
- responsive navigation
- scalable layout system
- working route structure
- Tailwind + shadcn integration
- mock-data-first workflow

The foundation phase is considered complete.

---

# Planned Scope for Day 2

- Homepage hero section
- Star events carousel
- Activities grid
- Activity detail page
- Timings table
- Quick links section
- Improved page visuals

---

# Notes

- Backend implementation is intentionally deferred.
- Current authentication is mock-only.
- All data is temporary mock data.
- Architecture is designed to support future Express + PostgreSQL integration.



## Day 3 Progress

### Gallery Module

Implemented:

- Activity Gallery Hub
- Activity Gallery Detail Pages
- Event Gallery Hub
- Event Gallery Detail Pages
- Image Lightbox Preview

### UI Improvements

- Unified dark theme across navbar and footer
- Consistent visual styling with Activities module
- Improved navigation flow between gallery sections