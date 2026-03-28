# Plan: Lead-Dashboard & Supabase Upgrade

## Ausgangslage

### Was ein Lead-Report enthält (aus MD-Beispiel)
Jeder Lead hat folgende Informationen:
- Firmenname, Website, Branche, Standort
- Kurze Beschreibung des Unternehmens
- Agentur-Fit (Warum passt der Lead zum Kunden?)
- Pain Point (Wo kann der Kunde helfen?)
- Intent-Signal (Warum jetzt kontaktieren?)
- Entscheiderperson: Name, Position, E-Mail, LinkedIn-URL, Telefon, Empfohlener Kontaktkanal

### Was die Supabase `leads` Tabelle aktuell hat
| Spalte | Vorhanden |
|--------|-----------|
| company_name | ✅ |
| website | ✅ |
| industry | ✅ |
| location | ✅ |
| contact_name | ✅ |
| contact_email | ✅ |
| phone | ✅ |
| social_media_url | ✅ |
| fit_description | ✅ |
| notes, status, week_added | ✅ |
| **description** (Firmenbeschreibung) | ❌ fehlt |
| **pain_point** | ❌ fehlt |
| **intent_signal** | ❌ fehlt |
| **contact_position** (z.B. "CEO") | ❌ fehlt |
| **linkedin_url** (eigene Spalte) | ❌ fehlt (aktuell nur social_media_url) |
| **preferred_contact_channel** | ❌ fehlt |

---

## Schritt 1: Supabase Migration — Neue Spalten hinzufügen

```sql
ALTER TABLE leads
  ADD COLUMN description text,
  ADD COLUMN pain_point text,
  ADD COLUMN intent_signal text,
  ADD COLUMN contact_position text,
  ADD COLUMN linkedin_url text,
  ADD COLUMN preferred_contact_channel text;
```

> `social_media_url` bleibt erhalten für andere Social Media Links.
> `linkedin_url` wird neu als eigene Spalte geführt, da LinkedIn der primäre Kontaktkanal ist.

---

## Schritt 2: LeadCard — Neues Design

### Aufbau der Karte (von oben nach unten)

```
┌─────────────────────────────────────────┐
│  🏢 Firmenname          [Branche-Badge] │
│  🌐 website.com         📍 Zürich, CH   │
├─────────────────────────────────────────┤
│  Kurze Beschreibung des Unternehmens    │
│  (2-3 Sätze, grauer Text)               │
├─────────────────────────────────────────┤
│  👤 Max Mustermann  •  CEO & Co-Founder │
│  ✉️  max@firma.com                       │
│  📞 +41 44 123 45 67                    │
│  🔗 LinkedIn-Profil                     │
│  💬 Empfohlen: E-Mail → LinkedIn        │
├─────────────────────────────────────────┤
│  AGENTUR-FIT                            │
│  Warum dieser Lead passt...             │
├─────────────────────────────────────────┤
│  PAIN POINT                             │
│  Wo der Kunde helfen kann...            │
├─────────────────────────────────────────┤
│  INTENT-SIGNAL ⚡                        │
│  Warum jetzt der richtige Moment ist... │
└─────────────────────────────────────────┘
```

### Visuelle Highlights
- **Intent-Signal** bekommt ein gelbes Highlight (`⚡`) — das ist der wichtigste Abschnitt für den Kunden, da es zeigt warum JETZT der richtige Zeitpunkt ist
- **Branche** als kleines Badge oben rechts (z.B. `EdTech`, `NGO`)
- **Standort** mit Pin-Icon neben dem Website-Link
- **Empfohlener Kontaktkanal** als farbiger Hinweis (blau)
- Drei Sektionen klar getrennt: Firma / Kontakt / Analyse

---

## Schritt 3: Dashboard-Seite

### Aktuell
- Leads werden als Grid angezeigt (2 Spalten)
- Trennung: "Diese Woche" / "Frühere Leads"

### Verbesserungen
- **Wochengruppen** mit Datum: "Woche vom 24. März 2026" statt nur "Diese Woche"
- **Statistik-Header**: z.B. "3 neue Leads diese Woche · 8 insgesamt"
- **Auf Mobile**: 1 Spalte, Karten etwas kompakter

---

## Schritt 4: Daten erfassen (Workflow für CrossMatic)

Wenn du einem Kunden Leads lieferst, trägst du in Supabase folgendes ein:

| Feld | Beispiel (Sparkli) |
|------|--------------------|
| company_name | Sparkli |
| website | https://www.sparkli.ai |
| industry | EdTech |
| location | Pfaffikon, Schweiz |
| description | KI-gestützte Lernplattform für Kinder... |
| fit_description | Büro Sturmfrei ist spezialisiert auf... |
| pain_point | Optimierung der Content-Strategie... |
| intent_signal | Pre-Seed Finanzierung $5M im Jan 2026... |
| contact_name | Lax Poojary |
| contact_position | CEO & Co-Founder |
| contact_email | l******@sparkli.ai |
| linkedin_url | https://ch.linkedin.com/in/laxpoojary |
| phone | (nicht gefunden) |
| preferred_contact_channel | E-Mail → LinkedIn |
| week_added | 2026-03-28 |
| client_id | [UUID des Kunden] |

---

## Zusammenfassung: Was umgesetzt werden muss

1. **Supabase**: 6 neue Spalten via Migration hinzufügen
2. **LeadCard**: Komplette Neugestaltung mit allen Feldern in strukturiertem Layout
3. **Dashboard**: Wochengruppen mit Datum + Statistik-Header
4. **Keine Logik-Änderung** — der bestehende Fetch (`select("*").eq("client_id", user.id)`) funktioniert weiterhin
