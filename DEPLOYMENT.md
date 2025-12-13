# Deployment Anleitung

Diese Anleitung beschreibt, wie du die Autohaus-Webanwendung auf deinem Server deployen kannst.

## Voraussetzungen

Auf dem Server müssen folgende Tools installiert sein:
- Docker (Version 20.10 oder höher)
- Docker Compose (Version 2.0 oder höher)
- Git
- (Optional) Nginx als Reverse Proxy für Domain-Zuordnung

## Schritt 1: Repository auf Server klonen

```bash
cd /var/www  # oder dein bevorzugtes Verzeichnis
git clone <dein-repository-url> kueppers
cd kueppers
```

## Schritt 2: Production Environment-Variablen konfigurieren

Kopiere die Beispiel-Datei und passe die Werte an:

```bash
cp .env.production.example .env
nano .env  # oder ein anderer Editor
```

**Wichtig:** Ändere folgende Werte für Production:
- `POSTGRES_PASSWORD`: Starkes Passwort für die Datenbank
- `JWT_SECRET`: Langer, zufälliger String (mindestens 32 Zeichen)
- `MASTER_REGISTRATION_KEY`: Sicherer Key für Admin-Registrierung
- `MAIL_*`: Echte SMTP-Server-Daten (z.B. von SendGrid, Mailgun, etc.)

## Schritt 3: Docker Container starten

```bash
# Alle Container im Hintergrund starten
docker-compose up -d

# Logs ansehen (optional)
docker-compose logs -f
```

Die Anwendung ist nun erreichbar unter:
- Frontend: `http://server-ip:3000`
- Backend: `http://server-ip:3001`

## Schritt 4: Domain mit Nginx konfigurieren (Optional aber empfohlen)

Siehe `nginx.conf.example` für eine Nginx-Konfiguration.

1. Installiere Nginx (falls noch nicht installiert):
```bash
sudo apt update
sudo apt install nginx
```

2. Erstelle eine neue Site-Konfiguration:
```bash
sudo nano /etc/nginx/sites-available/autohaus
```

3. Kopiere den Inhalt aus `nginx.conf.example` und passe die Domain an

4. Aktiviere die Site:
```bash
sudo ln -s /etc/nginx/sites-available/autohaus /etc/nginx/sites-enabled/
sudo nginx -t  # Konfiguration testen
sudo systemctl reload nginx
```

5. SSL-Zertifikat mit Let's Encrypt (empfohlen):
```bash
sudo apt install certbot python3-certbot-nginx
sudo certbot --nginx -d deine-domain.de
```

## Nützliche Docker-Befehle

```bash
# Container stoppen
docker-compose down

# Container neu starten
docker-compose restart

# Logs ansehen
docker-compose logs -f [service-name]

# Container neu bauen nach Code-Änderungen
docker-compose up -d --build

# Datenbank-Backup erstellen
docker exec autohaus-db pg_dump -U userdb kueppersdb > backup.sql

# Alle Container und Volumes löschen (VORSICHT!)
docker-compose down -v
```

## Updates deployen

Wenn du Änderungen am Code vornimmst:

```bash
cd /var/www/kueppers
git pull origin main
docker-compose up -d --build
```

## Troubleshooting

### Container startet nicht
```bash
# Logs prüfen
docker-compose logs [service-name]

# Container-Status prüfen
docker-compose ps
```

### Datenbank-Verbindungsfehler
- Prüfe, ob der Postgres-Container läuft: `docker-compose ps`
- Prüfe die DATABASE_URL in der .env Datei
- Warte ca. 10-15 Sekunden nach dem Start, bis die DB bereit ist

### Frontend kann Backend nicht erreichen
- Stelle sicher, dass alle Container im gleichen Netzwerk sind
- Prüfe die `NEXT_PUBLIC_API_URL` Variable

## Sicherheitshinweise

1. **Niemals** die `.env` Datei mit sensiblen Daten in Git committen
2. Verwende starke, zufällige Passwörter und Secrets
3. Halte Docker und alle Images aktuell
4. Nutze HTTPS in Production (Let's Encrypt)
5. Beschränke den Zugriff auf Port 5432 (Postgres) von außen
