# Freelance HR & Organizational Development Consultant Template

A professional, ThemeForest-ready HTML5 template customized for freelance HR strategists, culture audit advisors, and organizational design consultants. 

## Design System

### Typography
- **Headings**: Plus Jakarta Sans (Modern, Executive, Editorial)
- **Body**: Inter (Clean, highly legible)

### Theme Color Palette

#### Light Mode
- **Primary (Executive Navy)**: `#0F172A`
- **Secondary (Slate Gray)**: `#475569`
- **Accent (Professional Blue)**: `#2563EB`
- **Highlight (Growth Teal)**: `#0F766E`
- **Background**: `#F8FAFC`
- **Surface**: `#FFFFFF`
- **Text Primary**: `#0F172A`
- **Text Secondary**: `#475569`

#### Dark Mode
- **Background**: `#020617`
- **Surface**: `#0B1120`
- **Accent**: `#3B82F6`
- **Highlight**: `#14B8A6`
- **Text Primary**: `#E2E8F0`
- **Text Secondary**: `#CBD5E1`
- **Glass Surface**: `rgba(255, 255, 255, 0.06)`

---

## Folder Architecture

```
/hr-organizational-development-consultant/
│
├── index.html
├── home-2.html
├── services.html
├── service-details.html
├── people-strategy.html
├── culture-audits.html
├── organizational-design.html
├── case-studies.html
├── case-study-details.html
├── blog.html
├── blog-details.html
├── faq.html
├── project-inquiry.html
├── contact.html
├── 404.html
│
├── assets/
│ ├── css/
│ │ ├── bootstrap.min.css  (Bootstrap 5 Grid-Only)
│ │ ├── style.css          (Light theme base variables and styling)
│ │ ├── dark.css           (Dark theme variable overrides)
│ │ └── animations.css     (CSS Hover and Keyframe fallbacks)
│ │
│ ├── js/
│ │ ├── main.js            (Menu draws, Accordion controls, Wizard validation)
│ │ ├── theme-toggle.js    (Persisted localStorage theme sync)
│ │ └── animations.js      (GSAP ScrollTriggers & counter ticks)
│ │
│ └── images/
│   ├── hero/
│   ├── services/
│   ├── case-studies/
│   ├── leadership/
│   ├── teams/
│   ├── testimonials/
│   └── blog/
```

---

## Technical Features

1. **Synchronous Theme Toggle**: Script runs in the `<head>` of all pages, fetching the preference key `consultant-theme` from `localStorage` immediately. This prevents light theme layout flicker when rendering.
2. **GSAP ScrollTriggers**: Configured reveals (fade-up, staggered card lists, progress timelines, count-up numerical stats) that execute dynamically on scroll.
3. **Vanilla JS Custom Components**: Since we use the Bootstrap 5 Grid exclusively (without Bootstrap bundle JavaScript), custom menu sliders, tab filters, and accordion panels are written in raw Vanilla JS, maintaining high page speed and zero console log errors.
4. **Interactive Inquiry Wizard**: The multi-step diagnosis questionnaire form validates required attributes dynamically on next/prev step shifts.
