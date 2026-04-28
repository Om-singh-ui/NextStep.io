# NextStep.io

**Your AI-Powered Career Companion**

[![Next.js](https://img.shields.io/badge/Next.js-16-black?logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19-61DAFB?logo=react)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?logo=typescript)](https://www.typescriptlang.org/)
[![Prisma](https://img.shields.io/badge/Prisma-6-2D3748?logo=prisma)](https://www.prisma.io/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-06B6D4?logo=tailwind-css)](https://tailwindcss.com/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-Database-336791?logo=postgresql)](https://www.postgresql.org/)
[![Three.js](https://img.shields.io/badge/Three.js-3D-black?logo=three.js)](https://threejs.org/)
[![Google Gemini](https://img.shields.io/badge/AI-Gemini-4285F4?logo=google)](https://deepmind.google/technologies/gemini/)
[![Clerk](https://img.shields.io/badge/Auth-Clerk-6C47FF?logo=clerk)](https://clerk.com/)
[![License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

[![Status](https://img.shields.io/badge/Status-Active_Development-blue)](https://github.com/Om-singh-ui/NextStep.io)
[![PRs](https://img.shields.io/badge/PRs-Welcome-brightgreen)](CONTRIBUTING.md)
[![AI Powered](https://img.shields.io/badge/AI-Powered-purple)](https://github.com/Om-singh-ui/NextStep.io)
[![3D Visualizations](https://img.shields.io/badge/3D-Visualizations-orange)](https://github.com/Om-singh-ui/NextStep.io)


## Overview

NextStep.io transforms resumes and transcripts into actionable career insights, immersive 3D visualizations, and personalized growth paths. The platform leverages Google Gemini AI to extract skills, map career trajectories, and deliver automated guidance — all within an interactive dashboard experience.

### Mission

Empower individuals to visualize and navigate their career journey with AI-driven intelligence, immersive technology, and personalized automation.

## App Preview

<div align="center">
  <img src="https://github.com/user-attachments/assets/b835336c-c982-4351-941c-088c44e4795a" alt="NextStep.io Dashboard" width="800" />
  <p><em>Career Intelligence Infra</em></p>
</div>

<br />

<div align="center">
  <img src="https://github.com/user-attachments/assets/67ed0309-54c0-4ee0-bdf9-cea2c953fe0d" alt="NextStep.io Platform" width="800" />
  <p><em>Career Path Visualization</em></p>
</div>

## App Workflow

```mermaid
flowchart LR
  %% Upload & Authentication
  A[📄 Upload Resume/Transcript] --> B[🤖 AI Skill Extraction - Gemini & Vertex AI]
  A --> G[🔑 User Authentication - Clerk]

  %% Career Recommendation & Visualization
  B --> C[🧭 Career Recommendation Engine]
  C --> D[🌐 3D Career Path Visualization - Three.js]
  D --> E[📊 Dashboard & Interaction]
  
  %% Database & Automation
  C --> H[💾 Database Update - Postgres & Prisma]
  H --> I[⚡ Serverless Workflow Trigger - Inngest]
  I --> F[📧 Automated Email Reports - Resend]

  %% Link AI insights to notifications
  C --> F

  %% Style nodes with enhanced colors
  style A fill:#e0f7fa,stroke:#00acc1,stroke-width:2px,stroke-dasharray: 5 3
  style B fill:#f1f8e9,stroke:#7cb342,stroke-width:2px
  style C fill:#fff9c4,stroke:#fdd835,stroke-width:2px
  style D fill:#ede7f6,stroke:#5e35b1,stroke-width:2px
  style E fill:#f3e5f5,stroke:#ab47bc,stroke-width:2px
  style F fill:#ffebee,stroke:#e53935,stroke-width:2px
  style G fill:#e3f2fd,stroke:#1e88e5,stroke-width:2px
  style H fill:#fff3e0,stroke:#fb8c00,stroke-width:2px