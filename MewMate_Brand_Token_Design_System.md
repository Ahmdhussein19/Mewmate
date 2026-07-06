# MewMate Brand Token Design System

MewMate is a warm, playful, trustworthy pet-tech brand built around safety, care, and the emotional bond between pets and their owners. The visual system should feel soft, premium, cute, and reliable without becoming childish.

The system is built around a ginger cat mascot, a dark green identity color, warm beige backgrounds, gold safety-tag accents, and rounded friendly UI elements.

---

## 1. Brand Personality Tokens

### Brand Attributes

Warm · Protective · Friendly · Cute · Trustworthy · Soft · Premium · Simple · Caring · Pet-first

### Visual Direction

MewMate should look like a modern pet-care product with an emotional heart. It should not feel overly corporate, cold, medical, or childish.

The design language should combine:

- Soft rounded shapes
- Warm natural colors
- Friendly typography
- Clear mobile-first UI
- Gentle shadows
- High readability
- Pet-inspired micro details

---

## 2. Color System

### 2.1 Core Brand Colors

#### Forest Green

Primary brand color. Used for the logo, headlines, primary buttons, navigation, icons, and key interface elements.

```css
--color-forest-900: #0F2F20;
--color-forest-800: #173D2A;
--color-forest-700: #1F4D34;
--color-forest-600: #2B6546;
--color-forest-500: #3A7A58;
```

Main token:

```css
--color-primary: #1F4D34;
```

**Usage:**

- Logo wordmark
- Primary CTA buttons
- Header/navigation
- Active states
- Important icons
- Trust and security messages

#### Gold

Premium safety-tag accent color. Used for QR tag details, highlights, badges, small icons, success accents, and decorative details.

```css
--color-gold-700: #A77F16;
--color-gold-600: #C99B24;
--color-gold-500: #D4AF37;
--color-gold-400: #E3C65F;
--color-gold-300: #F1D989;
```

Main token:

```css
--color-accent: #D4AF37;
```

**Usage:**

- QR medallion
- Small highlights
- Premium plan badges
- Decorative stars/hearts
- Success illustrations
- Important small UI details

#### Hazel Peach

Main warm brand background. This is the signature brand canvas color used behind the primary logo and brand visuals.

```css
--color-hazel-peach: #F4DBB8;
```

**Usage:**

- Brand backgrounds
- Hero sections
- App icon background
- Packaging backgrounds
- Social media templates
- Empty states

### 2.2 Neutral Colors

#### Cream

Soft clean background color for cards and light sections.

```css
--color-cream: #FFF7EB;
```

**Usage:**

- Card backgrounds
- Modal surfaces
- Profile panels
- QR print sheets
- Soft UI areas

#### Beige

Warm secondary background for larger page sections.

```css
--color-beige: #F2E3C6;
```

**Usage:**

- Page backgrounds
- Secondary sections
- Onboarding screens
- Pet profile backgrounds

#### Taupe

Muted neutral for borders, secondary surfaces, and supporting UI.

```css
--color-taupe: #CBBFA7;
```

**Usage:**

- Soft borders
- Dividers
- Disabled elements
- Secondary text backgrounds

#### Charcoal

Main text color.

```css
--color-charcoal: #2B2B2B;
```

**Usage:**

- Body text
- Form labels
- Dense information
- Legal/privacy pages
- High-contrast copy

### 2.3 Accent Colors

#### Terracotta

Energetic warm accent. Use carefully for alerts, playful details, or emotional emphasis.

```css
--color-terracotta: #E07A3F;
```

**Usage:**

- Warning states
- Lost Mode urgency
- Small playful illustrations
- Highlight chips

#### Sage Green

Calm secondary green.

```css
--color-sage: #A8B99A;
```

**Usage:**

- Secondary buttons
- Soft status backgrounds
- Calm confirmation areas
- Pet-care content blocks

#### Blush Pink

Gentle caring accent.

```css
--color-blush: #F4C1C7;
```

**Usage:**

- Love/care moments
- Pet profile decorative elements
- Soft emotional highlights
- Gift-related visuals

#### Mint

Fresh, clean, friendly accent.

```css
--color-mint: #BFE3D6;
```

**Usage:**

- Success states
- Safe status
- Calm information blocks
- Background tags

---

## 3. Semantic Color Tokens

Semantic tokens should be used in product UI instead of raw color names.

```css
:root {
  --color-bg-page: #F4DBB8;
  --color-bg-soft: #F2E3C6;
  --color-bg-card: #FFF7EB;
  --color-bg-elevated: #FFFFFF;
  --color-text-primary: #2B2B2B;
  --color-text-secondary: #6B6255;
  --color-text-muted: #8A7D6B;
  --color-text-inverse: #FFF7EB;
  --color-brand-primary: #1F4D34;
  --color-brand-primary-hover: #173D2A;
  --color-brand-primary-active: #0F2F20;
  --color-brand-accent: #D4AF37;
  --color-brand-accent-hover: #C99B24;
  --color-border-soft: #E6D6BC;
  --color-border-strong: #CBBFA7;
  --color-success: #3A7A58;
  --color-success-soft: #BFE3D6;
  --color-warning: #D4AF37;
  --color-warning-soft: #F7E6A7;
  --color-danger: #E07A3F;
  --color-danger-soft: #F8D2BE;
  --color-info: #BFE3D6;
}
```

---

## 4. Color Usage Ratios

Recommended visual balance:

| Ratio | Purpose | Colors |
|-------|---------|--------|
| 60% | Warm backgrounds | Hazel Peach, Cream, Beige |
| 25% | Forest Green | Logo, CTAs, headings, key UI |
| 10% | Gold | Highlights, medallion, premium accents |
| 5% | Accent colors | Terracotta, Sage, Blush, Mint |

The brand should feel warm and soft first, with green acting as the trustworthy anchor.

---

## 5. Typography System

### 5.1 Typefaces

#### Display Typeface

```css
--font-display: "Cooper BT", "Cooper Black", Georgia, serif;
```

Use Cooper BT for expressive brand moments.

**Best for:**

- Logo-inspired headings
- Hero headlines
- Campaign lines
- Packaging
- Social media headlines
- Emotional brand copy

**Avoid using Cooper BT for:**

- Long paragraphs
- Legal text
- Form fields
- Small UI labels
- Dense dashboards

#### Body Typeface

```css
--font-body: "Telegraph", Inter, Arial, sans-serif;
```

Use Telegraph for clear, readable product communication.

**Best for:**

- Body copy
- App UI
- Buttons
- Forms
- Navigation
- Pet profile data
- Lost Mode instructions
- Help text
- Notifications

---

## 6. Typography Scale

### Desktop Type Scale

```css
--font-size-xs: 12px;
--font-size-sm: 14px;
--font-size-base: 16px;
--font-size-md: 18px;
--font-size-lg: 22px;
--font-size-xl: 28px;
--font-size-2xl: 36px;
--font-size-3xl: 48px;
--font-size-4xl: 64px;
--font-size-5xl: 72px;
```

### Mobile Type Scale

```css
--font-size-mobile-xs: 12px;
--font-size-mobile-sm: 13px;
--font-size-mobile-base: 15px;
--font-size-mobile-md: 16px;
--font-size-mobile-lg: 20px;
--font-size-mobile-xl: 24px;
--font-size-mobile-2xl: 32px;
--font-size-mobile-3xl: 40px;
```

---

## 7. Typography Hierarchy

### Hero Display

```css
--type-hero-font: var(--font-display);
--type-hero-size: clamp(40px, 6vw, 72px);
--type-hero-line-height: 0.95;
--type-hero-letter-spacing: -0.02em;
--type-hero-weight: 900;
```

Use for: Main landing page headline, Brand campaign headlines, Emotional messaging.

Example: *Helping every pet find their way home.*

### Page Title

```css
--type-title-font: var(--font-display);
--type-title-size: clamp(32px, 4.8vw, 56px);
--type-title-line-height: 1.05;
--type-title-letter-spacing: -0.015em;
--type-title-weight: 900;
```

Use for: Page titles, Main dashboard title, Product section titles.

### Section Heading

```css
--type-section-font: var(--font-display);
--type-section-size: clamp(26px, 3.4vw, 40px);
--type-section-line-height: 1.1;
--type-section-letter-spacing: -0.01em;
--type-section-weight: 800;
```

Use for: Landing page sections, Feature headings, Onboarding screens.

### Card Heading

```css
--type-card-font: var(--font-body);
--type-card-size: 22px;
--type-card-line-height: 1.25;
--type-card-weight: 700;
```

Use for: Dashboard cards, Pet profile cards, Pricing cards, Modal titles.

### Body Text

```css
--type-body-font: var(--font-body);
--type-body-size: 16px;
--type-body-line-height: 1.6;
--type-body-weight: 400;
```

Use for: Paragraphs, Descriptions, Informational copy.

### Small Text

```css
--type-small-font: var(--font-body);
--type-small-size: 14px;
--type-small-line-height: 1.45;
--type-small-weight: 400;
```

Use for: Helper text, Captions, Notes, Metadata.

### Label Text

```css
--type-label-font: var(--font-body);
--type-label-size: 13px;
--type-label-line-height: 1.3;
--type-label-weight: 600;
--type-label-letter-spacing: 0.01em;
```

Use for: Form labels, Input labels, Settings labels, Dashboard metadata.

### Button Text

```css
--type-button-font: var(--font-body);
--type-button-size: 16px;
--type-button-line-height: 1;
--type-button-weight: 700;
--type-button-letter-spacing: 0;
```

Use for: Primary buttons, Secondary buttons, Navigation CTAs.

---

## 8. Spacing System

MewMate uses an 8px-based spacing system with small 4px steps for fine details.

### Base Unit

```css
--space-unit: 8px;
```

### Spacing Tokens

```css
--space-0: 0;
--space-1: 4px;
--space-2: 8px;
--space-3: 12px;
--space-4: 16px;
--space-5: 20px;
--space-6: 24px;
--space-8: 32px;
--space-10: 40px;
--space-12: 48px;
--space-16: 64px;
--space-20: 80px;
--space-24: 96px;
--space-32: 128px;
```

### Usage Guidelines

| Value | Usage |
|-------|-------|
| 4px | Micro spacing, icon gaps, tiny decorative details |
| 8px | Small component internal spacing |
| 12px | Form label/input gaps |
| 16px | Standard card padding on mobile |
| 24px | Standard card padding on desktop |
| 32px | Section internal gaps |
| 48px | Section spacing on mobile |
| 64px | Section spacing on desktop |
| 96px | Large landing page spacing |
| 128px | Hero-level spacing |

---

## 9. Layout Tokens

### Page Width

```css
--container-xs: 480px;
--container-sm: 640px;
--container-md: 768px;
--container-lg: 1024px;
--container-xl: 1200px;
--container-2xl: 1440px;
```

### Main Website Container

```css
--container-main: 1200px;
```

### Dashboard Container

```css
--container-dashboard: 1280px;
```

### Reading Width

```css
--container-reading: 720px;
```

### Page Padding

```css
--page-padding-mobile: 16px;
--page-padding-tablet: 24px;
--page-padding-desktop: 40px;
```

Recommended CSS:

```css
.page-container {
  width: min(100% - 32px, 1200px);
  margin-inline: auto;
}

@media (min-width: 768px) {
  .page-container {
    width: min(100% - 48px, 1200px);
  }
}

@media (min-width: 1200px) {
  .page-container {
    width: min(100% - 80px, 1200px);
  }
}
```

---

## 10. Border Radius System

MewMate should feel soft and friendly, so corners should be rounded but not overly childish.

```css
--radius-none: 0;
--radius-xs: 4px;
--radius-sm: 8px;
--radius-md: 12px;
--radius-lg: 16px;
--radius-xl: 24px;
--radius-2xl: 32px;
--radius-3xl: 40px;
--radius-pill: 999px;
--radius-circle: 50%;
```

### Usage

| Value | Usage |
|-------|-------|
| 4px | Tiny controls, QR module previews |
| 8px | Small chips, tags, badges |
| 12px | Inputs, small cards |
| 16px | Buttons, medium cards |
| 24px | Main cards, panels |
| 32px | Hero cards, app icon container |
| 40px | Large mascot containers |
| 999px | Pills, rounded buttons |
| 50% | Circular icons, pet avatars, QR medallions |

### App Icon Radius

```css
--radius-app-icon: 28%;
```

Use a soft rounded square with inner shadows and warm background.

---

## 11. Border Tokens

```css
--border-width-hairline: 1px;
--border-width-thin: 1.5px;
--border-width-medium: 2px;
--border-width-bold: 3px;
```

### Border Colors

```css
--border-color-soft: #E6D6BC;
--border-color-medium: #CBBFA7;
--border-color-strong: #1F4D34;
--border-color-gold: #D4AF37;
```

**Usage:**

- Cards: 1px soft border
- Inputs: 1px medium border
- Focus states: 2px forest green or gold
- QR tag: 2px gold border
- App icon container: soft inset border

---

## 12. Shadow System

MewMate shadows should be soft, warm, and subtle. Avoid harsh black shadows.

### Standard Shadows

```css
--shadow-xs: 0 1px 2px rgba(43, 43, 43, 0.06);
--shadow-sm: 0 4px 10px rgba(43, 43, 43, 0.08);
--shadow-md: 0 10px 24px rgba(43, 43, 43, 0.10);
--shadow-lg: 0 18px 40px rgba(43, 43, 43, 0.14);
--shadow-xl: 0 28px 64px rgba(43, 43, 43, 0.18);
```

### Warm Brand Shadows

```css
--shadow-warm-sm: 0 6px 16px rgba(129, 89, 38, 0.10);
--shadow-warm-md: 0 14px 32px rgba(129, 89, 38, 0.14);
--shadow-warm-lg: 0 24px 56px rgba(129, 89, 38, 0.18);
```

### Gold Glow

Use sparingly.

```css
--shadow-gold-glow: 0 0 0 4px rgba(212, 175, 55, 0.16);
```

### App Icon Inner Shadow

```css
--shadow-icon-inner:
  inset 0 2px 8px rgba(255, 255, 255, 0.45),
  inset 0 -8px 18px rgba(129, 89, 38, 0.16),
  0 12px 28px rgba(43, 43, 43, 0.12);
```

---

## 13. Component Sizing Tokens

### Buttons

```css
--button-height-sm: 36px;
--button-height-md: 44px;
--button-height-lg: 52px;
--button-height-xl: 60px;
--button-padding-sm: 12px;
--button-padding-md: 16px;
--button-padding-lg: 20px;
--button-padding-xl: 24px;
--button-radius: 999px;
```

### Inputs

```css
--input-height-sm: 40px;
--input-height-md: 48px;
--input-height-lg: 56px;
--input-padding-x: 16px;
--input-padding-y: 12px;
--input-radius: 16px;
```

### Cards

```css
--card-padding-mobile: 16px;
--card-padding-desktop: 24px;
--card-radius: 24px;
--card-gap: 16px;
```

### Modals

```css
--modal-width-sm: 420px;
--modal-width-md: 560px;
--modal-width-lg: 720px;
--modal-radius: 32px;
--modal-padding: 32px;
```

---

## 14. Logo System Tokens

### Primary Logo

Full mascot logo with cat, MewMate wordmark, and decorative elements.

Use for: Hero sections, Splash screens, Packaging, Posters, Brand presentations, Social covers.

Recommended sizes:

```css
--logo-primary-desktop: 360px;
--logo-primary-mobile: 260px;
--logo-primary-min: 220px;
--logo-primary-max: 420px;
```

CSS:

```css
.logo-primary {
  width: clamp(240px, 32vw, 420px);
  height: auto;
}
```

### Secondary Logo

Wordmark with small QR/paw tag detail.

Use for: Website header, Mobile app header, Email signatures, Documents, Invoices, Partner decks.

Recommended sizes:

```css
--logo-secondary-desktop: 180px;
--logo-secondary-mobile: 132px;
--logo-secondary-min: 120px;
--logo-secondary-max: 220px;
```

CSS:

```css
.logo-secondary {
  width: clamp(132px, 14vw, 200px);
  height: auto;
}
```

### Icon Logo

Cat face in rounded square container.

Use for: App icon, Favicon, Social avatar, Loading screen, Small brand marks.

Recommended sizes:

```css
--logo-icon-xs: 24px;
--logo-icon-sm: 32px;
--logo-icon-md: 48px;
--logo-icon-lg: 64px;
--logo-icon-xl: 96px;
--logo-icon-2xl: 128px;
```

---

## 15. Iconography Tokens

Icon style should be rounded, friendly, and slightly playful.

```css
--icon-size-xs: 14px;
--icon-size-sm: 16px;
--icon-size-md: 20px;
--icon-size-lg: 24px;
--icon-size-xl: 32px;
--icon-size-2xl: 48px;
--icon-stroke-sm: 1.5px;
--icon-stroke-md: 2px;
--icon-stroke-lg: 2.5px;
```

### Icon Rules

- Use rounded line caps.
- Avoid sharp technical icons.
- Use forest green as the default icon color.
- Use gold only for highlights and premium/safety moments.
- Pet-related icons may use filled shapes.
- Functional UI icons should remain simple and clear.

---

## 16. QR Tag Design Tokens

The QR tag is a core product element and should be treated as a brand object.

```css
--qr-tag-size-sm: 32px;
--qr-tag-size-md: 48px;
--qr-tag-size-lg: 72px;
--qr-tag-size-xl: 96px;
--qr-tag-border: #D4AF37;
--qr-tag-bg: #FFF7EB;
--qr-tag-code: #1F4D34;
--qr-tag-radius: 50%;
```

### QR Tag Rules

- QR code should always remain high contrast.
- Do not place QR code over gradients or busy imagery.
- Keep enough white/cream quiet zone around the QR code.
- Decorative paw elements must not reduce scan reliability.
- Real printed QR codes should use black/dark green on white/cream.

---

## 17. App Icon Container Tokens

The app icon should feel like a soft physical object that supports the realistic cat face.

```css
--app-icon-bg: #F4DBB8;
--app-icon-radius: 28%;
--app-icon-padding: 14%;
--app-icon-inner-shadow:
  inset 0 2px 8px rgba(255, 255, 255, 0.45),
  inset 0 -8px 18px rgba(129, 89, 38, 0.16);
--app-icon-outer-shadow: 0 12px 28px rgba(43, 43, 43, 0.12);
```

### App Icon Composition Rules

- Cat face should be centered.
- Ears should not touch the top edge.
- Leave 10–14% internal padding.
- QR medallion should be visible but not dominate.
- Background should be warm and simple.
- Container should have subtle inner shadow to match the 3D cat rendering.
- Avoid flat containers behind hyper-realistic cat artwork.

---

## 18. Motion Tokens

MewMate motion should be gentle, reassuring, and soft.

```css
--duration-fast: 120ms;
--duration-base: 180ms;
--duration-slow: 260ms;
--duration-slower: 420ms;
--ease-standard: cubic-bezier(0.2, 0, 0, 1);
--ease-soft: cubic-bezier(0.16, 1, 0.3, 1);
--ease-bounce-soft: cubic-bezier(0.34, 1.56, 0.64, 1);
```

### Motion Usage

| Duration | Usage |
|----------|-------|
| 120ms | Hover/focus color change |
| 180ms | Button press, chip selection |
| 260ms | Modal/card entrance |
| 420ms | Onboarding illustration movement |

### Motion Rules

- Avoid aggressive bouncing.
- Avoid fast spinning animations.
- Loading states can use soft pulsing.
- Lost Mode should be urgent but not alarming.
- Reduce motion for accessibility.

---

## 19. Opacity Tokens

```css
--opacity-disabled: 0.4;
--opacity-muted: 0.64;
--opacity-hover: 0.88;
--opacity-overlay-light: 0.16;
--opacity-overlay-medium: 0.32;
--opacity-overlay-strong: 0.56;
```

**Usage:**

- Disabled buttons: 40%
- Secondary text: 64%
- Modal overlay: 32–56%
- Hover effect: 88–100%

---

## 20. Z-Index Tokens

```css
--z-base: 0;
--z-raised: 10;
--z-sticky: 100;
--z-header: 200;
--z-dropdown: 300;
--z-modal: 500;
--z-toast: 700;
--z-tooltip: 800;
```

---

## 21. Breakpoints

```css
--breakpoint-xs: 360px;
--breakpoint-sm: 480px;
--breakpoint-md: 768px;
--breakpoint-lg: 1024px;
--breakpoint-xl: 1280px;
--breakpoint-2xl: 1440px;
```

### Layout Behavior

| Breakpoint | Target |
|------------|--------|
| 360px | Small mobile |
| 480px | Large mobile |
| 768px | Tablet |
| 1024px | Small desktop |
| 1280px | Standard desktop |
| 1440px | Wide desktop |

---

## 22. Grid System

### Website Grid

```css
--grid-columns-mobile: 4;
--grid-columns-tablet: 8;
--grid-columns-desktop: 12;
--grid-gap-mobile: 16px;
--grid-gap-tablet: 20px;
--grid-gap-desktop: 24px;
```

### Dashboard Grid

```css
--dashboard-sidebar-width: 280px;
--dashboard-gap: 24px;
--dashboard-card-min-width: 280px;
```

---

## 23. Component Tokens

### Primary Button

```css
--button-primary-bg: #1F4D34;
--button-primary-bg-hover: #173D2A;
--button-primary-bg-active: #0F2F20;
--button-primary-text: #FFF7EB;
--button-primary-shadow: 0 6px 16px rgba(31, 77, 52, 0.20);
```

### Secondary Button

```css
--button-secondary-bg: #FFF7EB;
--button-secondary-bg-hover: #F2E3C6;
--button-secondary-text: #1F4D34;
--button-secondary-border: #CBBFA7;
```

### Gold Button

```css
--button-gold-bg: #D4AF37;
--button-gold-bg-hover: #C99B24;
--button-gold-text: #1F4D34;
```

### Danger Button / Lost Mode

```css
--button-danger-bg: #E07A3F;
--button-danger-bg-hover: #C9632D;
--button-danger-text: #FFF7EB;
```

---

## 24. Form Tokens

```css
--form-bg: #FFF7EB;
--form-border: #CBBFA7;
--form-border-focus: #1F4D34;
--form-border-error: #E07A3F;
--form-placeholder: #8A7D6B;
--form-text: #2B2B2B;
--form-radius: 16px;
--form-focus-shadow: 0 0 0 4px rgba(31, 77, 52, 0.12);
```

---

## 25. Status Tokens

### Safe / Active

```css
--status-safe-bg: #BFE3D6;
--status-safe-text: #1F4D34;
```

### Lost Mode

```css
--status-lost-bg: #F8D2BE;
--status-lost-text: #8F3E20;
--status-lost-accent: #E07A3F;
```

### Warning

```css
--status-warning-bg: #F7E6A7;
--status-warning-text: #73580F;
```

### Neutral

```css
--status-neutral-bg: #F2E3C6;
--status-neutral-text: #6B6255;
```

---

## 26. Illustration Style Tokens

MewMate illustrations should match the primary mascot system.

### Illustration Style

- Soft photorealistic or high-detail illustrated rendering
- Warm lighting
- Detailed ginger fur
- Dark green collar
- Gold QR medallion
- Gentle shadows
- Friendly face expressions
- Rounded containers
- No harsh outlines
- No neon colors

### Illustration Rules

- Keep pet imagery warm and emotionally expressive.
- Avoid scary lost-pet imagery.
- QR medallion should be visible when relevant.
- Use soft beige or transparent backgrounds.
- Decorative elements should be minimal: paw, heart, star, curved line.

---

## 27. Decorative Elements

MewMate decorative elements should be used lightly.

### Allowed Elements

- Paw print
- Small heart
- Gold sparkle
- Curved tail line
- QR medallion
- Soft circular frame
- Rounded square container

### Decorative Colors

```css
--decor-paw: #1F4D34;
--decor-heart: #D4AF37;
--decor-sparkle: #D4AF37;
--decor-line: #1F4D34;
```

### Usage Rules

- Use maximum 2–3 decorative elements per composition.
- Do not overcrowd UI screens.
- Avoid decoration near functional QR codes.
- Use decorative elements more in marketing, less in dashboard UI.

---

## 28. Surface Tokens

```css
--surface-page: #F4DBB8;
--surface-section: #F2E3C6;
--surface-card: #FFF7EB;
--surface-card-hover: #FFFFFF;
--surface-green: #1F4D34;
--surface-gold: #D4AF37;
```

### Surface Rules

- Use Hazel Peach for emotional brand pages.
- Use Cream for cards and clean UI blocks.
- Use White only when extra clarity is needed.
- Use Forest Green surfaces sparingly for strong brand moments.
- Use Gold surfaces only for small premium accents.

---

## 29. Full CSS Token File

```css
:root {
  /* Fonts */
  --font-display: "Cooper BT", "Cooper Black", Georgia, serif;
  --font-body: "Telegraph", Inter, Arial, sans-serif;

  /* Core Colors */
  --color-forest-900: #0F2F20;
  --color-forest-800: #173D2A;
  --color-forest-700: #1F4D34;
  --color-forest-600: #2B6546;
  --color-forest-500: #3A7A58;
  --color-gold-700: #A77F16;
  --color-gold-600: #C99B24;
  --color-gold-500: #D4AF37;
  --color-gold-400: #E3C65F;
  --color-gold-300: #F1D989;
  --color-hazel-peach: #F4DBB8;
  --color-cream: #FFF7EB;
  --color-beige: #F2E3C6;
  --color-taupe: #CBBFA7;
  --color-charcoal: #2B2B2B;
  --color-terracotta: #E07A3F;
  --color-sage: #A8B99A;
  --color-blush: #F4C1C7;
  --color-mint: #BFE3D6;

  /* Semantic Colors */
  --color-bg-page: #F4DBB8;
  --color-bg-soft: #F2E3C6;
  --color-bg-card: #FFF7EB;
  --color-bg-elevated: #FFFFFF;
  --color-text-primary: #2B2B2B;
  --color-text-secondary: #6B6255;
  --color-text-muted: #8A7D6B;
  --color-text-inverse: #FFF7EB;
  --color-brand-primary: #1F4D34;
  --color-brand-primary-hover: #173D2A;
  --color-brand-primary-active: #0F2F20;
  --color-brand-accent: #D4AF37;
  --color-brand-accent-hover: #C99B24;
  --color-border-soft: #E6D6BC;
  --color-border-strong: #CBBFA7;
  --color-success: #3A7A58;
  --color-success-soft: #BFE3D6;
  --color-warning: #D4AF37;
  --color-warning-soft: #F7E6A7;
  --color-danger: #E07A3F;
  --color-danger-soft: #F8D2BE;

  /* Typography Scale */
  --font-size-xs: 12px;
  --font-size-sm: 14px;
  --font-size-base: 16px;
  --font-size-md: 18px;
  --font-size-lg: 22px;
  --font-size-xl: 28px;
  --font-size-2xl: 36px;
  --font-size-3xl: 48px;
  --font-size-4xl: 64px;
  --font-size-5xl: 72px;

  /* Font Weights */
  --font-weight-regular: 400;
  --font-weight-medium: 500;
  --font-weight-semibold: 600;
  --font-weight-bold: 700;
  --font-weight-black: 900;

  /* Line Heights */
  --line-height-tight: 0.95;
  --line-height-heading: 1.15;
  --line-height-body: 1.6;
  --line-height-caption: 1.4;

  /* Letter Spacing */
  --letter-spacing-tight: -0.02em;
  --letter-spacing-normal: 0;
  --letter-spacing-wide: 0.02em;

  /* Spacing */
  --space-0: 0;
  --space-1: 4px;
  --space-2: 8px;
  --space-3: 12px;
  --space-4: 16px;
  --space-5: 20px;
  --space-6: 24px;
  --space-8: 32px;
  --space-10: 40px;
  --space-12: 48px;
  --space-16: 64px;
  --space-20: 80px;
  --space-24: 96px;
  --space-32: 128px;

  /* Radius */
  --radius-xs: 4px;
  --radius-sm: 8px;
  --radius-md: 12px;
  --radius-lg: 16px;
  --radius-xl: 24px;
  --radius-2xl: 32px;
  --radius-3xl: 40px;
  --radius-pill: 999px;
  --radius-circle: 50%;
  --radius-app-icon: 28%;

  /* Shadows */
  --shadow-xs: 0 1px 2px rgba(43, 43, 43, 0.06);
  --shadow-sm: 0 4px 10px rgba(43, 43, 43, 0.08);
  --shadow-md: 0 10px 24px rgba(43, 43, 43, 0.10);
  --shadow-lg: 0 18px 40px rgba(43, 43, 43, 0.14);
  --shadow-xl: 0 28px 64px rgba(43, 43, 43, 0.18);
  --shadow-warm-sm: 0 6px 16px rgba(129, 89, 38, 0.10);
  --shadow-warm-md: 0 14px 32px rgba(129, 89, 38, 0.14);
  --shadow-warm-lg: 0 24px 56px rgba(129, 89, 38, 0.18);
  --shadow-gold-glow: 0 0 0 4px rgba(212, 175, 55, 0.16);
  --shadow-icon-inner:
    inset 0 2px 8px rgba(255, 255, 255, 0.45),
    inset 0 -8px 18px rgba(129, 89, 38, 0.16),
    0 12px 28px rgba(43, 43, 43, 0.12);

  /* Layout */
  --container-main: 1200px;
  --container-dashboard: 1280px;
  --container-reading: 720px;
  --page-padding-mobile: 16px;
  --page-padding-tablet: 24px;
  --page-padding-desktop: 40px;

  /* Buttons */
  --button-height-sm: 36px;
  --button-height-md: 44px;
  --button-height-lg: 52px;
  --button-height-xl: 60px;
  --button-radius: 999px;

  /* Inputs */
  --input-height-md: 48px;
  --input-radius: 16px;

  /* Motion */
  --duration-fast: 120ms;
  --duration-base: 180ms;
  --duration-slow: 260ms;
  --duration-slower: 420ms;
  --ease-standard: cubic-bezier(0.2, 0, 0, 1);
  --ease-soft: cubic-bezier(0.16, 1, 0.3, 1);
  --ease-bounce-soft: cubic-bezier(0.34, 1.56, 0.64, 1);

  /* Z Index */
  --z-base: 0;
  --z-raised: 10;
  --z-sticky: 100;
  --z-header: 200;
  --z-dropdown: 300;
  --z-modal: 500;
  --z-toast: 700;
  --z-tooltip: 800;
}
```

---

## 30. Example Component Styling

### Primary Button

```css
.button-primary {
  height: var(--button-height-lg);
  padding: 0 var(--space-6);
  border-radius: var(--button-radius);
  border: 0;
  background: var(--color-brand-primary);
  color: var(--color-text-inverse);
  font-family: var(--font-body);
  font-size: var(--font-size-base);
  font-weight: var(--font-weight-bold);
  box-shadow: var(--shadow-warm-sm);
  transition:
    background var(--duration-base) var(--ease-standard),
    transform var(--duration-fast) var(--ease-standard),
    box-shadow var(--duration-base) var(--ease-standard);
}

.button-primary:hover {
  background: var(--color-brand-primary-hover);
  box-shadow: var(--shadow-warm-md);
}

.button-primary:active {
  transform: translateY(1px);
}
```

### Card

```css
.card {
  background: var(--color-bg-card);
  border: 1px solid var(--color-border-soft);
  border-radius: var(--radius-xl);
  padding: var(--space-6);
  box-shadow: var(--shadow-sm);
}
```

### Input

```css
.input {
  height: var(--input-height-md);
  padding: 0 var(--space-4);
  border-radius: var(--input-radius);
  border: 1px solid var(--color-border-strong);
  background: var(--color-bg-card);
  color: var(--color-text-primary);
  font-family: var(--font-body);
  font-size: var(--font-size-base);
}

.input:focus {
  outline: none;
  border-color: var(--color-brand-primary);
  box-shadow: 0 0 0 4px rgba(31, 77, 52, 0.12);
}
```

### App Icon Container

```css
.app-icon-container {
  width: 128px;
  height: 128px;
  border-radius: var(--radius-app-icon);
  background: var(--color-hazel-peach);
  box-shadow: var(--shadow-icon-inner);
  overflow: hidden;
  display: grid;
  place-items: center;
  padding: 14%;
}
```

---

## 31. Brand Rules Summary

### Do

- Use warm beige and cream backgrounds.
- Use forest green for trust and structure.
- Use gold for the QR safety tag and premium details.
- Keep shapes rounded and soft.
- Use Cooper BT for emotional brand moments.
- Use Telegraph for clarity and usability.
- Keep QR codes clear and high-contrast.
- Use subtle shadows and inner shadows when combining 3D assets with containers.
- Keep decorative elements minimal.

### Do Not

- Do not overuse gradients.
- Do not place text over busy fur details.
- Do not use harsh black shadows.
- Do not make the brand too childish.
- Do not use sharp geometric UI corners.
- Do not use low-contrast QR codes.
- Do not overcrowd small mobile screens with mascot details.
- Do not use Cooper BT for long UI text.

---

## 32. Final Design Direction

MewMate's token system should make every touchpoint feel warm, safe, and easy to use. The brand should look cute enough to be loved by pet owners, but structured enough to be trusted in a real lost-pet emergency.

The core identity is:

> Warm backgrounds + forest green trust + gold QR safety tag + soft rounded UI + playful display typography + clear body typography.
