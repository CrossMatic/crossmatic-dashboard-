# Dashboard Upgrade Plan

## Vision

Das Dashboard soll sich anfühlen wie ein professionelles B2B SaaS-Tool — nicht wie eine interne Tabelle.
Der Kunde bezahlt einen High-Ticket-Preis und soll das beim ersten Öffnen spüren.
Wenige, aber perfekt platzierte Elemente statt Feature-Overload.

---

## 1. Layout: Von Flat-Page zu Sidebar-App

### Aktuell
Alles auf einer einzigen Seite. Kein echtes Navigation-Konzept. Wirkt wie ein einfaches Listenview.

### Neu: Sidebar-Layout
```
┌──────────────────────────────────────────────────────────┐
│  [CM Logo]                                               │
│ ─────────────────────────────────────────────────────── │
│  Sidebar (links, 220px)  │  Content (rechts, flex)      │
│                          │                              │
│  🎯 Leads                │  [Tab-Inhalt]                │
│  📁 Archiv               │                              │
│  👤 Mein Profil          │                              │
│                          │                              │
│  ─────────────────       │                              │
│  Musterfirma AG          │                              │
│  [Abmelden]              │                              │
└──────────────────────────────────────────────────────────┘
```

**Warum Sidebar statt Top-Nav:**
- Standard bei professionellen B2B SaaS Tools (Notion, Linear, HubSpot)
- Gibt dem Content mehr vertikalen Raum
- Macht den Kunden-Namen unten links prominent sichtbar — schafft Vertrauen

---

## 2. Tabs & Seiten

### Tab 1: Leads (Hauptseite)
Die aktuelle Ansicht — alle neuen Leads der aktuellen Woche prominent oben.
Darunter ältere Wochen zusammengeklappt (Accordion).

**Neu hinzukommen:**
- **Status-Badge** pro Lead: `Neu` · `Kontaktiert` · `In Gespräch` · `Abgeschlossen`
- Der Kunde kann den Status selbst ändern (einfacher Klick)
- Status wird in Supabase gespeichert (Spalte `status` existiert bereits)

### Tab 2: Archiv
Alle Leads aller Wochen in einer einfachen, kompakten Listenansicht (nicht Cards).
Filterbar nach: Woche / Status / Branche.

```
| Logo | Firmenname      | Branche  | Kontakt          | Status        | Woche        |
|------|-----------------|----------|------------------|---------------|--------------|
| [S]  | Sparkli         | EdTech   | Lax Poojary      | Kontaktiert   | 28. März     |
| [K]  | Kinderschutz.ch | NGO      | Maria Muster     | Neu           | 21. März     |
```

Diese kompakte Tabellenansicht gibt dem Kunden einen schnellen Überblick über alle bisherigen Leads ohne scrollen zu müssen.

### Tab 3: Mein Profil
Einfache Seite mit:
- Firmenname
- Kontakt-E-Mail
- Passwort ändern (Link zu Supabase Auth)
- Kurze Info: "Ihr nächstes Lead-Paket wird am [Datum] geliefert" (manuell gesetzt)

---

## 3. Lead-Status System

Der grösste Mehrwert für den Kunden: Er kann Leads tracken ohne ein externes CRM zu brauchen.

### Status-Optionen
| Status | Farbe | Bedeutung |
|--------|-------|-----------|
| `Neu` | Blau | Frisch geliefert, noch nicht bearbeitet |
| `Kontaktiert` | Gelb | Erstkontakt wurde gemacht |
| `In Gespräch` | Lila | Aktive Kommunikation läuft |
| `Abgeschlossen` | Grün | Deal gewonnen oder Lead abgehakt |

### UI
- Status-Badge oben rechts auf der LeadCard
- Klick öffnet ein kleines Dropdown zum Wechseln
- Ändert sich sofort (optimistic update), wird im Hintergrund gespeichert
- Keine Supabase-Migration nötig — `status` Spalte existiert bereits

---

## 4. LeadCard: Accordion statt alles ausgeklappt

### Problem heute
Alle Sektionen (Fit, Pain Point, Intent-Signal) sind immer sichtbar → die Karten sind sehr lang, man muss viel scrollen.

### Lösung: Kompakter Header + aufklappbare Analyse
```
┌──────────────────────────────────────────┐
│  [Logo] Sparkli          [EdTech] [Neu]  │
│  🌐 sparkli.ai  📍 Pfaffikon            │
│  Sparkli ist eine KI-gestützte...        │
│  ──────────────────────────────────────  │
│  👤 Lax Poojary · CEO   ✉️  l***@...    │
│  🔗 LinkedIn   💬 E-Mail → LinkedIn     │
│  ──────────────────────────────────────  │
│  [▼ Analyse anzeigen]                    │
└──────────────────────────────────────────┘
```

Klick auf "Analyse anzeigen" klappt Fit / Pain Point / Intent-Signal auf.
→ Karten sind standardmässig kompakt, der Kunde entscheidet wann er tiefer geht.

---

## 5. Header-Banner: "Neue Leads diese Woche"

Wenn neue Leads vorhanden sind, erscheint oben ein subtiler blauer Banner:

```
┌─────────────────────────────────────────────────────────────┐
│  ✨  3 neue Leads wurden diese Woche für Sie recherchiert.  │
└─────────────────────────────────────────────────────────────┘
```

Verschwindet wenn alle Leads als "Kontaktiert" markiert sind. Gibt dem Dashboard ein lebendiges Gefühl.

---

## 6. Leere Zustände (Empty States)

Momentan gibt es einen einfachen Text wenn keine Leads da sind. Das soll hochwertig aussehen:

```
         [Illustration oder Icon]
    Ihre ersten Leads sind unterwegs.
    CrossMatic liefert wöchentlich neue,
    tiefgehend recherchierte Kontakte.

         [Nächste Lieferung: 04. April]
```

---

## 7. Mobile

Die Sidebar wird auf Mobile zu einem **Bottom Navigation Bar**:

```
┌─────────────────────────┐
│  [Content]              │
│                         │
│  ─────────────────────  │
│  🎯 Leads  📁  👤       │
└─────────────────────────┘
```

---

## Priorisierung (Reihenfolge der Umsetzung)

| # | Feature | Aufwand | Impact |
|---|---------|---------|--------|
| 1 | Sidebar-Layout | Mittel | ⭐⭐⭐⭐⭐ |
| 2 | Status-System (Badge + Dropdown) | Klein | ⭐⭐⭐⭐⭐ |
| 3 | Archiv-Tab (Tabellenansicht) | Mittel | ⭐⭐⭐⭐ |
| 4 | LeadCard Accordion | Klein | ⭐⭐⭐⭐ |
| 5 | Neue-Leads Banner | Klein | ⭐⭐⭐ |
| 6 | Profil-Seite | Klein | ⭐⭐⭐ |
| 7 | Mobile Bottom-Nav | Klein | ⭐⭐⭐ |
| 8 | Empty State | Klein | ⭐⭐ |

---

## Keine geplanten Features (bewusst weggelassen)

- Keine Statistiken/Charts — die Datenmenge rechtfertigt das nicht
- Kein Export (CSV etc.) — unnötige Komplexität
- Kein Kommentar-System — zu aufwändig für den Mehrwert
- Kein Dark/Light Mode Toggle — Dark bleibt, passt zur Brand
