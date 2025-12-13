# Production Deployment Checklist - Autohaus Küppers

Diese Checkliste führt dich Schritt für Schritt durch das Deployment auf dem Hetzner-Server.

## 🔍 **Zusammenfassung der Probleme & Lösungen**

### Identifizierte Probleme:
1. ✅ **CORS-Fehler**: Production-Domain fehlte in CORS-Middleware
2. ✅ **Nginx Routing**: Trailing slash in `proxy_pass` führte zu falschen Pfaden
3. ✅ **Frontend API_URL**: Wurde nicht korrekt als leerer String zur Build-Zeit gesetzt
4. ✅ **Doppelte /api**: Frontend baute `/api/api/...` Pfade

### Implementierte Fixes:
- CORS-Middleware aktualisiert mit `autohausk.sakaits.com`
- Nginx `proxy_pass` korrigiert (kein trailing slash)
- Frontend `NEXT_PUBLIC_API_URL` explizit auf `""` gesetzt
- Docker build args korrekt konfiguriert

---

## 📋 **Deployment-Schritte auf dem Server**

### 1. Code aktualisieren

```bash
cd /var/www/autohaus-kueppers
git pull origin main
```

**Erwartete Ausgabe:**
```
From github.com:Sefkan2698/autohaus-kueppers
 * branch            main       -> FETCH_HEAD
Updating ...
```

### 2. Nginx-Konfiguration aktualisieren

```bash
# Aktuelle Nginx-Config sichern
sudo cp /etc/nginx/sites-available/autohausk.sakaits.com /etc/nginx/sites-available/autohausk.sakaits.com.backup

# Neue Config aus dem Repo kopieren
sudo cp nginx.conf /etc/nginx/sites-available/autohausk.sakaits.com

# Nginx-Konfiguration testen
sudo nginx -t
```

**Erwartete Ausgabe:**
```
nginx: the configuration file /etc/nginx/conf.d/nginx.conf syntax is ok
nginx: configuration file /etc/nginx/conf.d/nginx.conf test is successful
```

**Falls Fehler auftreten:**
```bash
# Backup wiederherstellen
sudo cp /etc/nginx/sites-available/autohausk.sakaits.com.backup /etc/nginx/sites-available/autohausk.sakaits.com
```

### 3. Nginx neu laden

```bash
sudo systemctl reload nginx
```

### 4. Docker Container komplett neu bauen

```bash
# Stoppe alle Container
docker compose down

# Lösche alte Images (wichtig für vollständigen Rebuild)
docker rmi autohaus-kueppers-frontend:latest autohaus-kueppers-backend:latest

# Lösche Build-Cache
docker builder prune -af

# Baue alles komplett neu
docker compose build --no-cache --pull

# Starte die Container
docker compose up -d
```

**Erwartete Ausgabe:**
```
[+] Building ...
[+] Running 6/6
 ✔ Network autohaus-kueppers_autohaus-network  Created
 ✔ Container autohaus-db                       Healthy
 ✔ Container autohaus-backend                  Started
 ✔ Container autohaus-frontend                 Started
```

### 5. Container-Status überprüfen

```bash
docker compose ps
```

**Erwartete Ausgabe:** Alle Container sollten "Up" status haben
```
NAME                 STATUS              PORTS
autohaus-backend     Up 10 seconds       0.0.0.0:3001->3001/tcp
autohaus-db          Up (healthy)        0.0.0.0:5432->5432/tcp
autohaus-frontend    Up 8 seconds        0.0.0.0:3000->3000/tcp
```

### 6. Backend-Logs prüfen

```bash
docker compose logs backend --tail 50
```

**Erwartete Ausgabe:**
```
Server läuft auf Port 3001
```

**Sollte NICHT enthalten:**
- Error-Meldungen
- Connection refused
- CORS errors

### 7. Frontend-Logs prüfen

```bash
docker compose logs frontend --tail 50
```

**Erwartete Ausgabe:**
```
▲ Next.js 16.0.8
- Local:         http://localhost:3000
- Network:       http://0.0.0.0:3000

✓ Starting...
✓ Ready in XXms
```

### 8. API-Endpunkte testen (vom Server aus)

```bash
# Test 1: Backend Health Check (direkt)
curl http://localhost:3001/
```
**Erwartete Ausgabe:** `{"message":"Autohaus API läuft"}`

```bash
# Test 2: API durch Nginx (wie Browser)
curl http://localhost/api/
```
**Erwartete Ausgabe:** `{"message":"Autohaus API läuft"}`

```bash
# Test 3: Login-Endpoint
curl -X POST http://localhost/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@test.de","password":"test"}'
```
**Erwartete Ausgabe:** `{"error":"Ungültige Anmeldedaten"}` (nicht 404 oder 500!)

```bash
# Test 4: Infobanner-Endpoint
curl http://localhost/api/infobanner
```
**Erwartete Ausgabe:** `[]` oder Liste von Bannern (nicht 404!)

### 9. Browser-Tests durchführen

1. **Öffne ein neues Inkognito-Fenster**

2. **Öffne Developer Tools (F12)**
   - Gehe zum **Network Tab**
   - Aktiviere **"Disable cache"**

3. **Teste die Hauptseite:**
   - URL: `https://autohausk.sakaits.com`
   - **Erwartung:** Seite lädt ohne Fehler
   - **Check:** Im Network Tab sollten keine 404/500 Fehler sein

4. **Teste die Admin-Login-Seite:**
   - URL: `https://autohausk.sakaits.com/admin`
   - **Erwartung:** Login-Formular wird angezeigt
   - **Check:** Keine "Lädt..."-Endlosschleife

5. **Teste den Login:**
   - Email: `info@auto-kueppers.de`
   - Passwort: (dein Admin-Passwort)
   - **Erwartung:** Weiterleitung zu `/admin/dashboard`
   - **Check im Network Tab:**
     - `POST /api/auth/login` sollte `200 OK` sein (nicht 500!)
     - Response sollte ein Token enthalten

6. **Teste die Fahrzeuge-Seite:**
   - URL: `https://autohausk.sakaits.com/fahrzeuge`
   - **Check im Network Tab:**
     - `GET /api/vehicles?isActive=true` sollte `200 OK` sein

---

## ✅ **Erfolgs-Kriterien**

Das Deployment war erfolgreich wenn:

- [ ] Alle Docker-Container laufen (`docker compose ps`)
- [ ] Backend antwortet auf `http://localhost:3001/`
- [ ] API antwortet über Nginx auf `/api/`
- [ ] Hauptseite lädt ohne Fehler
- [ ] Admin-Login lädt ohne Fehler
- [ ] Login funktioniert und leitet zu Dashboard weiter
- [ ] Keine CORS-Fehler in der Browser-Console
- [ ] Keine 404/500 Fehler auf API-Endpunkte

---

## 🐛 **Troubleshooting**

### Problem: Container startet nicht

```bash
# Logs ansehen
docker compose logs -f [service-name]

# Container neu starten
docker compose restart [service-name]
```

### Problem: "502 Bad Gateway" im Browser

```bash
# Nginx-Logs prüfen
sudo tail -f /var/log/nginx/error.log

# Container-Status prüfen
docker compose ps

# Nginx testen
sudo nginx -t
```

### Problem: CORS-Fehler in der Browser-Console

**Symptom:** `Access to fetch at ... from origin ... has been blocked by CORS policy`

**Lösung:**
```bash
# Backend neu bauen (CORS-Fix ist im Code)
docker compose build backend
docker compose up -d backend
docker compose logs backend
```

### Problem: "404 Not Found" auf /api/auth/login

**Symptom:** Browser zeigt 404 auf API-Endpunkte

**Lösung:**
```bash
# Nginx-Config prüfen
sudo nginx -t

# Sicherstellen dass kein trailing slash:
# proxy_pass http://localhost:3001;  ✅
# proxy_pass http://localhost:3001/; ❌

# Nginx neu laden
sudo systemctl reload nginx
```

### Problem: "Failed to fetch" im Browser

**Symptom:** Login schlägt fehl mit "Verbindungsfehler"

**Lösung:**
```bash
# 1. Browser-Cache leeren (Strg+Shift+R)
# 2. Inkognito-Fenster testen
# 3. Developer Tools öffnen und genauen Fehler checken
# 4. Network Tab aktivieren und API-Call beobachten
```

### Problem: Alte JavaScript-Dateien im Browser

**Symptom:** Browser verwendet alte JS-Dateien trotz Rebuild

**Lösung:**
1. **Hard Refresh:** Strg+Shift+R (Windows) / Cmd+Shift+R (Mac)
2. **DevTools:** F12 → Network Tab → "Disable cache" aktivieren
3. **Inkognito-Modus:** Neues privates Fenster öffnen

### Problem: Datenbank-Verbindungsfehler

```bash
# Postgres-Logs prüfen
docker compose logs postgres

# Warte 10-15 Sekunden nach Start
docker compose ps
```

---

## 📊 **Finale Verifizierung**

Führe alle diese Checks durch:

```bash
# 1. Container-Status
docker compose ps

# 2. Backend Health
curl http://localhost:3001/

# 3. API durch Nginx
curl http://localhost/api/

# 4. Nginx-Status
sudo systemctl status nginx

# 5. Nginx-Logs (sollten keine Errors zeigen)
sudo tail -20 /var/log/nginx/error.log

# 6. Docker-Logs (sollten keine Errors zeigen)
docker compose logs --tail 50
```

---

## 🎯 **Nach erfolgreichem Deployment**

1. **Admin-Account testen:**
   - Login unter `/admin`
   - Dashboard sollte laden
   - Alle Admin-Bereiche durchklicken

2. **Öffentliche Seiten testen:**
   - Hauptseite: `/`
   - Fahrzeuge: `/fahrzeuge`
   - Jobs: `/jobs`
   - Kontakt: `/kontakt`

3. **Funktionalität testen:**
   - Infobanner erstellen
   - Fahrzeug hinzufügen
   - Bilder hochladen
   - Carousel-Bilder hochladen

4. **Performance checken:**
   - Ladezeiten beobachten
   - Keine Timeouts
   - Bilder laden korrekt

---

## 📝 **Notizen**

- **Nginx-Config:** `/etc/nginx/sites-available/autohausk.sakaits.com`
- **Docker-Logs:** `docker compose logs [service]`
- **Nginx-Logs:** `/var/log/nginx/error.log` und `/var/log/nginx/access.log`
- **Projekt-Verzeichnis:** `/var/www/autohaus-kueppers`

Bei Problemen: Logs checken, Browser-Cache leeren, Container neu starten!
