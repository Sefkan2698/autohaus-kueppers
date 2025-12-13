# Server Setup Anleitung

Diese Anleitung zeigt dir, wie du Docker, Docker Compose, Nginx und Certbot auf einem Ubuntu/Debian Server installierst.

## Voraussetzungen

- Ubuntu 20.04+ oder Debian 11+ Server
- Root-Zugriff oder sudo-Rechte
- SSH-Zugang zum Server

## 1. System aktualisieren

```bash
# Als erstes das System aktualisieren
sudo apt update && sudo apt upgrade -y

# Nützliche Tools installieren
sudo apt install -y curl git wget software-properties-common
```

## 2. Docker installieren

```bash
# Alte Docker-Versionen entfernen (falls vorhanden)
sudo apt remove -y docker docker-engine docker.io containerd runc

# Abhängigkeiten installieren
sudo apt install -y ca-certificates curl gnupg lsb-release

# Docker's offiziellen GPG-Key hinzufügen
sudo install -m 0755 -d /etc/apt/keyrings
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /etc/apt/keyrings/docker.gpg
sudo chmod a+r /etc/apt/keyrings/docker.gpg

# Docker Repository hinzufügen
echo \
  "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.gpg] https://download.docker.com/linux/ubuntu \
  $(lsb_release -cs) stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null

# Docker installieren
sudo apt update
sudo apt install -y docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin

# Docker ohne sudo verwenden (optional)
sudo usermod -aG docker $USER

# WICHTIG: Nach diesem Befehl musst du dich neu einloggen oder:
newgrp docker

# Docker-Installation testen
docker --version
docker compose version
```

## 3. Nginx installieren

```bash
# Nginx installieren
sudo apt install -y nginx

# Nginx starten und beim Boot aktivieren
sudo systemctl start nginx
sudo systemctl enable nginx

# Nginx-Status prüfen
sudo systemctl status nginx

# Firewall konfigurieren (falls UFW aktiv ist)
sudo ufw allow 'Nginx Full'
sudo ufw allow OpenSSH
sudo ufw enable
```

## 4. Certbot für SSL-Zertifikate installieren

```bash
# Certbot und Nginx-Plugin installieren
sudo apt install -y certbot python3-certbot-nginx

# Certbot-Version prüfen
certbot --version
```

## 5. Projekt deployen

```bash
# Repository klonen (ersetze mit deiner GitHub-URL)
cd /var/www
sudo git clone https://github.com/DEIN_USERNAME/autohaus-kueppers.git
cd autohaus-kueppers

# Eigentümer auf deinen User setzen (optional)
sudo chown -R $USER:$USER /var/www/autohaus-kueppers

# .env Datei erstellen
cp .env.production.example .env
nano .env
```

**Wichtige Werte in der .env ändern:**
- `POSTGRES_USER` - Datenbank-Benutzername (Standard: userdb)
- `POSTGRES_PASSWORD` - Starkes Passwort
- `POSTGRES_DB` - Datenbank-Name (Standard: kueppersdb)
- `DATABASE_URL` - Wird automatisch von Docker Compose aus den obigen Werten zusammengesetzt
- `JWT_SECRET` - Langer zufälliger String
- `MASTER_REGISTRATION_KEY` - Sicherer Key
- `MAIL_*` - Deine SMTP-Server-Daten
- `NEXT_PUBLIC_API_URL` - Siehe unten

## 6. Docker Container starten

```bash
# Container im Hintergrund starten
docker compose up -d

# Logs ansehen
docker compose logs -f

# Container-Status prüfen
docker compose ps
```

## 7. Nginx konfigurieren

### Option A: Ohne SSL (zum Testen)

```bash
# Nginx-Konfiguration erstellen
sudo nano /etc/nginx/sites-available/autohaus
```

Füge folgende Konfiguration ein (ersetze `deine-domain.de` mit deiner Domain):

```nginx
server {
    listen 80;
    listen [::]:80;
    server_name deine-domain.de www.deine-domain.de;

    client_max_body_size 20M;

    # Frontend
    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }

    # Backend API
    location /api/ {
        proxy_pass http://localhost:3001;
        proxy_http_version 1.1;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }

    # Uploads
    location /uploads/ {
        proxy_pass http://localhost:3001/uploads/;
        expires 1y;
        add_header Cache-Control "public, immutable";
    }
}
```

```bash
# Konfiguration aktivieren
sudo ln -s /etc/nginx/sites-available/autohaus /etc/nginx/sites-enabled/

# Standard-Site deaktivieren (optional)
sudo rm /etc/nginx/sites-enabled/default

# Nginx-Konfiguration testen
sudo nginx -t

# Nginx neu laden
sudo systemctl reload nginx
```

**In deiner .env setzen:**
```bash
NEXT_PUBLIC_API_URL=/api
```

```bash
# Docker Container neu starten damit die neue .env geladen wird
docker compose down
docker compose up -d
```

### Option B: Mit SSL (empfohlen für Production)

Erst Option A durchführen, dann:

```bash
# SSL-Zertifikat mit Certbot installieren
sudo certbot --nginx -d deine-domain.de -d www.deine-domain.de

# Folge den Anweisungen:
# 1. Email-Adresse eingeben
# 2. Terms of Service akzeptieren
# 3. Newsletter (optional)
# 4. Wähle "Redirect" um HTTP zu HTTPS weiterzuleiten
```

Certbot wird automatisch:
- SSL-Zertifikate von Let's Encrypt holen
- Deine Nginx-Konfiguration aktualisieren
- Auto-Renewal einrichten

```bash
# Auto-Renewal testen
sudo certbot renew --dry-run
```

## 8. Firewall-Regeln (falls UFW aktiv)

```bash
# Firewall-Status prüfen
sudo ufw status

# Falls UFW aktiv, folgende Ports öffnen:
sudo ufw allow 22/tcp    # SSH
sudo ufw allow 80/tcp    # HTTP
sudo ufw allow 443/tcp   # HTTPS
sudo ufw reload
```

## 9. Nützliche Befehle

### Docker:
```bash
# Container anzeigen
docker compose ps

# Logs ansehen
docker compose logs -f [service-name]

# Container neu starten
docker compose restart

# Container stoppen
docker compose down

# Container neu bauen nach Code-Änderungen
docker compose up -d --build

# In Container einloggen
docker exec -it autohaus-backend sh
```

### Nginx:
```bash
# Nginx neuladen
sudo systemctl reload nginx

# Nginx neu starten
sudo systemctl restart nginx

# Nginx-Konfiguration testen
sudo nginx -t

# Nginx-Logs ansehen
sudo tail -f /var/log/nginx/access.log
sudo tail -f /var/log/nginx/error.log
```

### Git Updates:
```bash
cd /var/www/autohaus-kueppers
git pull origin main
docker compose up -d --build
```

## 10. Erste Schritte nach Installation

1. **Admin-Account erstellen:**
   - Gehe zu `https://deine-domain.de/admin`
   - Registriere den ersten Admin mit dem `MASTER_REGISTRATION_KEY`

2. **Carousel-Bilder hochladen:**
   - Einloggen ins Admin-Dashboard
   - Zu "Carousel-Bilder" navigieren
   - Bilder hochladen

3. **Fahrzeuge hinzufügen:**
   - Im Admin-Dashboard zu "Fahrzeuge" navigieren
   - Erste Fahrzeuge mit Bildern erstellen

## Troubleshooting

### Docker-Container starten nicht:
```bash
docker compose logs -f
```

### Nginx zeigt 502 Bad Gateway:
```bash
# Container-Status prüfen
docker compose ps

# Nginx-Logs prüfen
sudo tail -f /var/log/nginx/error.log
```

### SSL-Zertifikat funktioniert nicht:
```bash
# Certbot-Logs prüfen
sudo certbot certificates
sudo journalctl -u certbot
```

### Datenbank-Verbindungsfehler:
```bash
# Postgres-Container-Logs prüfen
docker compose logs postgres

# Warte ca. 10-15 Sekunden nach dem Start
```

## Sicherheitshinweise

1. ✅ Regelmäßige Updates: `sudo apt update && sudo apt upgrade`
2. ✅ Starke Passwörter in der .env
3. ✅ Firewall aktivieren (UFW)
4. ✅ SSL-Zertifikate verwenden
5. ✅ Nur notwendige Ports öffnen
6. ✅ SSH-Keys statt Passwörter verwenden
7. ✅ Regelmäßige Backups der Datenbank
