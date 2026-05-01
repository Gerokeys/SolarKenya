# SolarKenya — Full-Stack Solar Energy Platform

Kenya-focused solar information, cost calculator, blog, and lead generation platform.

---

## Tech Stack

| Layer     | Technology                        |
|-----------|-----------------------------------|
| Frontend  | React (Vite), Tailwind CSS, GSAP  |
| Backend   | Node.js, Express                  |
| Database  | MongoDB (Mongoose)                |
| Auth      | JWT                               |
| Uploads   | Multer                            |
| Deploy    | Nginx + PM2 on VPS                |

---

## Local Development Setup

### Prerequisites
- Node.js 18+
- MongoDB (local or Atlas)
- Git

### 1. Clone & Install

```bash
git clone <your-repo>
cd solar-kenya

# Backend
cd backend
cp .env.example .env        # Fill in your values
npm install

# Frontend
cd ../frontend
cp .env.example .env        # Set VITE_API_URL
npm install
```

### 2. Configure Environment

**backend/.env**
```
PORT=5000
NODE_ENV=development
MONGO_URI=mongodb://localhost:27017/solar-kenya
JWT_SECRET=change_this_to_a_long_random_string
JWT_EXPIRES_IN=7d
FRONTEND_URL=http://localhost:5173
```

**frontend/.env**
```
VITE_API_URL=http://localhost:5000/api
```

### 3. Run

```bash
# Terminal 1 — Backend
cd backend && npm run dev

# Terminal 2 — Frontend
cd frontend && npm run dev
```

Frontend: http://localhost:5173  
API: http://localhost:5000/api

### 4. Create First Admin User

```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"name":"Admin","email":"admin@solarkenya.co.ke","password":"securepassword123"}'
```

Then visit http://localhost:5173/admin/login

---

## Production Deployment (Ubuntu VPS)

### 1. Server Setup

```bash
# Node.js 18
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs

# MongoDB
sudo apt-get install -y mongodb
sudo systemctl start mongodb && sudo systemctl enable mongodb

# PM2 & Nginx
sudo npm install -g pm2
sudo apt-get install -y nginx certbot python3-certbot-nginx
```

### 2. Deploy Application

```bash
# Upload code
cd /var/www
git clone <your-repo> solar-kenya
cd solar-kenya

# Backend
cd backend
cp .env.example .env   # Fill production values
npm install --production

# Frontend
cd ../frontend
cp .env.example .env   # Set VITE_API_URL to https://solarkenya.co.ke/api
npm install && npm run build
```

### 3. Start with PM2

```bash
cd /var/www/solar-kenya
mkdir -p logs
pm2 start ecosystem.config.js --env production
pm2 save
pm2 startup   # Follow the printed command to auto-start on reboot
```

### 4. Configure Nginx

```bash
sudo cp nginx.conf /etc/nginx/sites-available/solarkenya.co.ke
sudo ln -s /etc/nginx/sites-available/solarkenya.co.ke /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl reload nginx

# SSL (replace with your domain)
sudo certbot --nginx -d solarkenya.co.ke -d www.solarkenya.co.ke
```

---

## API Reference

### Auth
| Method | Route | Auth | Description |
|--------|-------|------|-------------|
| POST | /api/auth/register | — | Create admin user |
| POST | /api/auth/login | — | Login, returns JWT |
| GET | /api/auth/me | JWT | Get current user |

### Blog
| Method | Route | Auth | Description |
|--------|-------|------|-------------|
| GET | /api/blog | — | List posts (paginated) |
| GET | /api/blog/:slug | — | Single post by slug |
| POST | /api/blog | JWT | Create post (multipart) |
| PUT | /api/blog/:id | JWT | Update post |
| DELETE | /api/blog/:id | JWT | Delete post |

### Leads
| Method | Route | Auth | Description |
|--------|-------|------|-------------|
| POST | /api/leads | — | Submit lead form |
| GET | /api/leads | JWT | List leads |
| GET | /api/leads/stats/summary | JWT | Dashboard stats |
| PATCH | /api/leads/:id | JWT | Update status |
| DELETE | /api/leads/:id | JWT | Delete lead |

---

## Project Structure

```
solar-kenya/
├── backend/
│   ├── config/db.js
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── uploads/
│   └── server.js
├── frontend/
│   └── src/
│       ├── api/
│       ├── components/
│       ├── context/
│       ├── hooks/
│       ├── pages/
│       │   └── admin/
│       └── utils/
├── ecosystem.config.js   # PM2 config
├── nginx.conf            # Nginx config
└── README.md
```
