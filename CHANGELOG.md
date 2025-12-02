# Changelog

All notable changes to this project will be documented in this file.

## v0.0.4 - 2025-12-02

### Changed
- Refactored stylesheets: Split `assets/css/style.css` into three files.
  - `style.css` now contains only base styles (reset, layout, color, typography).
  - Moved all component styles to `assets/css/components.css`.
  - Moved all experimental/interactive styles to `assets/css/experimental.css`.
- Updated `index.html` and `experimental.html` to link all three CSS files.

## v0.0.3 - 2025-12-01

### Added
- New experimental playground `experimental.html` featuring 20 advanced interactive demos (color picker, drag/reorder, canvas drawing, code editor, audio visualizer, swipe cards, password strength meter, emoji picker, particle system, 3D flip card, parallax scroll, morphing button, animated counter, dual range slider, ripple effect, skeleton loader, gradient builder, notification stack, typewriter effect, and infinite scroll).
- Corresponding `assets/js/experimental.js` to power all experimental interactive components.

### Changed
- Ratio utilities now use a wrapper-based container-unit approach (`.tile-wrapper` as the container, `.tile` using `min-height: cqw`) to deliver "soft" aspect ratios that expand gracefully with content.
- Updated `VERSION` to v0.0.3.

## v0.0.2 - 2025-11-30

### Added
- Git commit and push automation script (`git-commit-push.sh`) with user confirmation prompts for staging, committing, and pushing changes.

## v0.0.1 - 2025-11-30

### Added

- Initial QAB 400 base design system with layout, spacing, radius and color tokens in `assets/css/style.css`.
- Core components including tiles, cards, buttons, toggles and drop-zone upload styles.
- Sample page structure in `index.html` with hero cards and the “Diversity of UI Elements” gallery.
- A wide range of experimental UI tiles demonstrating buttons, file drop, accordions, ratings, steppers, tags, search, toasts, sliders and more.
- Micro-interaction behaviors in `assets/js/script.js` for toggles, accordions, ratings, steppers, toasts, validation, sliders and other interactive tiles.
