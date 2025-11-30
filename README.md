# QAB 400 Design System (EN)

The QAB 400 Design System is a **basic**, **experimental** and intentionally **work-in-progress** design foundation. It is built with a focus on clarity, small building blocks and minimal technology, relying only on semantic HTML, modern CSS and a thin layer of vanilla JavaScript for micro interactions. The goal is to offer a lightweight starting point that can be extended and adapted rather than a finished, locked-down product.

QAB 400 is meant for both **professional and educational use**. It can be used as a teaching tool when explaining design systems, tokens and interaction patterns, and it can act as a reference or prototype kit in real projects where a simple but coherent visual language is more important than complete coverage of every UI pattern.

## Scope and philosophy

This system deliberately stays small and opinionated. It focuses on a limited but expressive set of layout utilities, typographic rules, color tokens and reusable components such as tiles, cards and buttons. Many elements are exploratory or illustrative rather than production-hardened. They are there to stimulate thinking and conversation about what a design system can become.

The project embraces the idea that a design system is never “finished”. Instead, it evolves through experiments, sketches and refinements. New UI tiles and micro interactions are added freely to explore unusual use cases, edge cases and playful interactions that might later be distilled into more formal patterns.

## Current state of the system

The current version contains:

- Foundational layout helpers, spacing and radius tokens defined in CSS.
- A small greyscale-based color system and basic type scale.
- Core components such as tiles, cards, buttons, toggles and drop zones.
- An experimental “Diversity of UI Elements” section that showcases many different UI ideas side by side.
- A collection of micro interactions implemented in JavaScript for elements like toggles, accordions, steppers, ratings, sliders, toasts, tags and small visual effects.

Many of these components are prototypes. Some are intentionally simple or even a bit unusual, to invite critique and iteration. Not every component will necessarily survive into a later, more stable system.

## Intended audience and use

QAB 400 is designed for:

- Designers and developers who want a **basic**, understandable system they can inspect, modify and extend.
- Educators who need a **work-in-progress** example to discuss tokens, components, accessibility and interaction design with students.
- Professionals who want a small, expressive sandbox for exploring interface ideas without the overhead of a large framework.

The repository is not a drop‑in production library. Instead, it is a learning and prototyping environment. You are encouraged to fork it, remove what you do not need, rename tokens and reshape the patterns until they fit your own projects.

## Technology and structure

The system is intentionally minimal in terms of tooling. It relies on:

- Static HTML documents for structure and content.
- A single primary stylesheet in `assets/css/style.css` that defines tokens, layout helpers and components.
- A single script in `assets/js/script.js` that adds focused, small-scale micro interactions.
- A small set of sample images in `assets/img` used for visual experiments (e.g. comparison sliders, galleries and hover effects).

This structure keeps the cognitive load low and makes it easy to inspect the implementation directly in a browser or editor without needing a build step.

## Status: experimental and evolving

This design system is **experimental** and will change over time. Components may be added, renamed, simplified or removed as the system matures. Certain patterns are intentionally provocative or playful to test ideas about motion, feedback and emotional tone in user interfaces.

Because it is a **work-in-progress**, breaking changes are to be expected. Consumers of this system should treat it as a living reference rather than a stable dependency.

## Professional and educational considerations

Although the project is playful, it is built with **professional and educational use** in mind. The examples aim to:

- Demonstrate practical ways to structure CSS tokens and component layers.
- Encourage accessible defaults and clear states wherever feasible.
- Show how micro interactions can add delight without overwhelming the interface.
- Provide a shared vocabulary for teams when discussing behavior, hierarchy and visual rhythm.

Educators can use the examples as prompts for critique, redesign or extension. Practitioners can use the system as a starting point for internal design documentation or as a sandbox for pairing sessions between designers and developers.

---

# QAB 400 Design System (DE)

Das QAB 400 Design System ist ein **grundlegendes**, **experimentelles** und bewusst **unfertiges** Designfundament. Es legt den Fokus auf Klarheit, kleine Bausteine und minimale Technik und verwendet ausschließlich semantisches HTML, modernes CSS und eine dünne Schicht Vanilla-JavaScript für Mikrointeraktionen. Ziel ist ein leichtgewichtiges Ausgangsgerüst, das erweitert und angepasst werden kann, statt ein fertiges, starr definiertes Produkt zu sein.

QAB 400 ist sowohl für den **professionellen als auch den edukativen Einsatz** gedacht. Es kann als Lehrwerkzeug dienen, um Designsysteme, Tokens und Interaktionsmuster zu erklären, und gleichzeitig als Referenz oder Prototypen-Baukasten in realen Projekten, in denen eine einfache, stimmige Designsprache wichtiger ist als eine vollständige Abdeckung aller UI-Muster.

## Umfang und Philosophie

Dieses System bleibt bewusst klein und meinungsstark. Es konzentriert sich auf ein überschaubares, aber ausdrucksstarkes Set an Layout-Hilfen, typografischen Regeln, Farb-Tokens und wiederverwendbaren Komponenten wie Tiles, Cards und Buttons. Viele Elemente sind eher explorativ oder illustrativ als produktionsreif. Sie sollen dazu anregen, über Möglichkeiten und Grenzen eines Designsystems nachzudenken.

Das Projekt folgt der Idee, dass ein Designsystem niemals „fertig“ ist. Es entwickelt sich über Experimente, Skizzen und Iterationen weiter. Neue UI-Tiles und Mikrointeraktionen werden bewusst frei hinzugefügt, um ungewöhnliche Anwendungsfälle, Randfälle und spielerische Interaktionen zu erforschen, die später vielleicht in formellere Muster überführt werden.

## Aktueller Stand des Systems

Die aktuelle Version enthält:

- Grundlegende Layout-Utilities sowie Abstände und Radii, definiert in CSS.
- Ein kleines, auf Grautönen basierendes Farbsystem und eine einfache Typo-Skala.
- Zentrale Komponenten wie Tiles, Cards, Buttons, Toggles und Drop-Zone-Uploads.
- Einen experimentellen Abschnitt „Diversity of UI Elements“, der viele unterschiedliche UI-Ideen nebeneinander zeigt.
- Eine Sammlung von Mikrointeraktionen in JavaScript für Elemente wie Toggles, Akkordeons, Steppers, Ratings, Slider, Toasts, Tags und kleine visuelle Effekte.

Viele dieser Komponenten sind Prototypen. Einige sind bewusst sehr einfach oder bewusst ungewöhnlich gestaltet, um Kritik, Diskussion und Weiterentwicklung zu fördern. Nicht jedes Muster wird zwangsläufig in ein späteres, stabileres System übernommen.

## Zielgruppe und Verwendung

QAB 400 richtet sich an:

- Designer:innen und Entwickler:innen, die ein **einfaches**, gut nachvollziehbares System suchen, das sie inspizieren, verändern und erweitern können.
- Lehrende, die ein **Work-in-Progress**-Beispiel benötigen, um mit Studierenden über Tokens, Komponenten, Accessibility und Interaktionsdesign zu sprechen.
- Professionals, die ein kleines, ausdrucksstarkes Experimentierfeld für Interface-Ideen brauchen, ohne den Ballast großer Frameworks.

Das Repository ist keine sofort einsetzbare Produktionsbibliothek. Es ist vielmehr ein Lern- und Prototyping-Umfeld. Es ist ausdrücklich erwünscht, das Projekt zu forken, nicht benötigte Teile zu entfernen, Tokens umzubenennen und Muster so zu formen, dass sie zu eigenen Projekten passen.

## Technologie und Struktur

Technisch bleibt das System bewusst minimal und kommt ohne komplexe Toolchains aus. Es basiert auf:

- Statischen HTML-Dokumenten für Struktur und Inhalt.
- Einem zentralen Stylesheet `assets/css/style.css`, in dem Tokens, Layout-Hilfen und Komponenten definiert werden.
- Einem Skript `assets/js/script.js`, das gezielte, kleine Mikrointeraktionen ergänzt.
- Einer kleinen Sammlung an Beispielbildern in `assets/img`, die für visuelle Experimente wie Vergleichsslider, Galerien oder Hover-Effekte eingesetzt werden.

Diese Struktur hält die Komplexität niedrig und macht es einfach, die Umsetzung direkt im Browser oder Editor nachzuvollziehen – ohne zusätzlichen Build-Schritt.

## Status: experimentell und im Wandel

Dieses Designsystem ist **experimentell** und wird sich im Laufe der Zeit verändern. Komponenten können hinzugefügt, umbenannt, vereinfacht oder entfernt werden, wenn das System reift. Einige Muster sind bewusst provokant oder verspielt, um Ideen zu testen, etwa zu Motion, Feedback und emotionalem Ton einer Oberfläche.

Da es sich um ein **Work-in-Progress** handelt, sind Breaking Changes zu erwarten. Wer das System nutzt, sollte es als lebende Referenz und nicht als stabile Abhängigkeit betrachten.

## Professionelle und edukative Aspekte

Trotz des spielerischen Charakters ist das Projekt auf **professionelle und edukative Nutzung** ausgerichtet. Die Beispiele sollen:

- zeigen, wie sich CSS-Tokens und Komponenten sinnvoll strukturieren lassen,
- zu möglichst zugänglichen Defaults und klaren Zuständen anregen, wo immer es praktikabel ist,
- illustrieren, wie Mikrointeraktionen Freude bringen können, ohne das Interface zu überladen,
- und ein gemeinsames Vokabular schaffen, mit dem Teams über Verhalten, Hierarchie und visuellen Rhythmus sprechen können.

Lehrende können die Beispiele als Ausgangspunkt für Kritik, Redesigns oder Erweiterungen nutzen. Praktiker:innen können das System als Basis für interne Design-Dokumentation oder als Sandbox für gemeinsame Sessions von Design und Entwicklung einsetzen.

