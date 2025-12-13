# Projektbeschreibung: Web-Anwendung für Autohaus

## Überblick

Dieses Projekt umfasst die Entwicklung einer modernen, dynamischen und mobiloptimierten Web-Anwendung für ein Autohaus. Die Web-Anwendung soll es dem Betreiber ermöglichen, Inhalte selbstständig zu verwalten – insbesondere Fahrzeuge, Jobangebote, Infobanner und Bilder auf der Landing-Page. Zusätzlich wird ein sicheres Admin-Interface entwickelt, über das alle Inhalte gepflegt werden können.

Die gesamte Anwendung wird SEO-optimiert, responsiv (Mobile First) gestaltet und mit einer Datenbank angebunden, um die dynamischen Inhalte zu verwalten. Ein Kontaktformular mit Pflichtfeldern und Versand über einen externen Mail-Server wird ebenfalls implementiert.

---

## Ziele des Projekts

* Bereitstellung einer professionellen, übersichtlichen und modernen Autohaus-Webseite
* Ermöglichung einer vollständigen selbstständigen Verwaltung sämtlicher Inhalte durch das Autohaus
* Sicheres Admin-System mit Login-Bereich unter `/admin`
* Mobile-First-Design
* Hohe Performance & SEO-Optimierung
* Nutzung eines eigenen Mailservers zum Versand der Kontaktformulare

---

## Funktionen der Web-Anwendung

### 1. **Admin-Oberfläche (`/admin`)**

* Geschützter Login-Bereich nur für das Autohaus
* Übersichtlich gestaltetes Dashboard
* Verwaltung aller dynamischen Inhalte

### 2. **Infobanner-Verwaltung**

* Infobanner erscheint auf der Landing-Page / Homepage
* Admin kann Infobanner:

  * Erstellen
  * Bearbeiten
  * Löschen
* Banner wird dynamisch geladen

### 3. **Jobstellen-Verwaltung**

* Seite für Jobangebote
* Admin kann Jobstellen:

  * Hinzufügen
  * Bearbeiten
  * Löschen
* Dynamische Darstellung der Jobangebote

### 4. **Fahrzeugmanagement (Vorführwagen & Gebrauchtwagen)**

* Admin kann Fahrzeuge verwalten ähnlich wie bei AutoScout24 oder mobile.de
* Funktionen:

  * Fahrzeuge erstellen
  * Fahrzeuge bearbeiten
  * Fahrzeuge löschen
* Felder z. B.:

  * Titel / Modell
  * Preis
  * Kilometerstand
  * Baujahr
  * Ausstattung
  * Bildergalerie
  * Beschreibung
* Dynamische Fahrzeuglisten + Fahrzeugdetailseiten

### 5. **Dynamisches Bildkarussell auf der Startseite**

* Slider / Carousel mit variabler Anzahl an Bildern
* Admin kann Bilder:

  * Hochladen
  * Löschen
  * Austauschen
* Carousel reagiert dynamisch auf Anzahl der vorhandenen Bilder

### 6. **Kontaktformular**

* Enthält Pflichtfelder, z. B.:

  * Name
  * E-Mail
  * Telefonnummer
  * Nachricht
* Versand über eigenen Mailserver (Docker-Compose Setup auf Hetzner)
* Validierung: E-Mail wird nur versendet, wenn alle Pflichtfelder ausgefüllt sind

---

## Technische Anforderungen

### **Frontend**

* Mobile-First-Design
* Moderne UI/UX
* Responsive Layout
* SEO-Optimierung
* Bildoptimierung

### **Backend**

* Admin-Auth-System mit sicherem Login
* REST- oder GraphQL-API zur Verwaltung der Daten
* Datenbankschnittstelle (z. B. PostgreSQL, MySQL oder MongoDB)
* Bildverwaltung (Uploads, Storage, Komprimierung)
* Mail-Server-Anbindung für Kontaktformular

### **Datenbank / Storage**

Tabellen/Collections z. B. für:

* Fahrzeuge
* Jobstellen
* Infobanner
* Carousel-Bilder
* Admin-User

### **Mail-Server**

* Externer privater Mail-Server
* Versand über SMTP
* Fehlermanagement (z. B. bei ungültigen Feldern)

---

## SEO & Performance

* Schnelle Ladezeiten (Lazy Loading, Optimierte Bilder)
* SEO-freundliche URLs
* Strukturierte Daten (Schema.org) für Fahrzeuge
* Sitemap & Meta-Tags

---

## Zusammenfassung

Diese Web-Anwendung ermöglicht es dem Autohaus, seine Webseite vollständig selbst zu verwalten, ohne technische Kenntnisse zu benötigen. Die Umsetzung umfasst ein Admin-Panel, vielseitige Content-Verwaltung, SEO-Optimierung und responsives Design. Alle Inhalte – Fahrzeuge, Jobs, Infobanner und Karussell-Bilder – sind dynamisch und können jederzeit durch den Betreiber angepasst werden.

---


  Backend-Architektur Vorschläge

  Empfehlung: Node.js mit Express/Fastify + PostgreSQL

  Stack:
  - Runtime: Node.js (TypeScript)
  - Framework: Express.js oder Fastify
  - ORM: Prisma oder TypeORM
  - Datenbank: PostgreSQL
  - Auth: JWT + bcrypt
  - File Storage: Lokales Volume (mit Image-Optimierung via Sharp)
  - Mail: Nodemailer mit SMTP

  Vorteile:
  - Bewährter, stabiler Stack
  - Gute Performance
  - Einfache Integration mit Frontend
  - PostgreSQL bietet strukturierte Daten + gute Performance
  - Prisma macht Datenbankschema sehr übersichtlich
  - Einfaches Docker-Setup

  Frontend-Architektur Vorschläge

  Empfehlung: Next.js 14+ (App Router)

  Vorteile:
  - SSR/SSG für optimale SEO-Performance
  - Built-in Image-Optimierung
  - File-based Routing
  - React Server Components
  - Sehr gute SEO-Tools (Metadata API)
  - Perfekt für Mobile-First
  - Einfache API-Routes (optional)