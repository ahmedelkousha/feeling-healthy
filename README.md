# Feeling Healthy — Holistic Health & Wellbeing Centre

A modern, responsive web application for Feeling Healthy, a holistic health and wellbeing centre offering massage, counselling, naturopathy, nutrition, clinical hypnosis, and more.

Built with **Next.js 16 (App Router)**, **React 19**, and **Tailwind CSS v4**.

## Features

- **Services Overview & Pages**: Comprehensive breakdown of holistic health services with detailed information, expectations, and FAQs.
- **Your Wellbeing Guides**: Goal-focused support areas (Stress & Anxiety, Women's Health, Digestive Support, etc.).
- **Interactive Service Finder**: Discover services matching specific health goals.
- **Practitioner Profiles**: Detailed bios, qualifications, and specialties.
- **Booking Flow**: Multi-step interactive appointment request system.
- **Responsive & Accessible**: Clean design system with mobile navigation and quick booking bar.

## Getting Started

First, install dependencies:

```bash
npm install
```

Then, run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Project Structure

```
├── public/              # Static assets (favicon, robots.txt)
├── src/
│   ├── app/             # Next.js App Router pages and layouts
│   ├── components/      # UI & Site components (shadcn/ui)
│   ├── data/            # Site content and domain data
│   ├── hooks/           # Custom React hooks
│   └── lib/             # Utility functions
└── package.json
```

## Build for Production

To create a production build:

```bash
npm run build
npm run start
```
