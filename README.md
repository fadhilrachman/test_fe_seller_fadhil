# 🚀 Web Article - Fullstack Next JS

This my Frontend test using Next.js, Tailwind, ShadCN for a modern UI, and MySQL with Prisma for the backend. It features article management, category filtering, and smooth UI interactions.

## 📦 How to Run

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/genzet-blog.git
cd genzet-blog
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Configure Environment Variables

Create a `.env` file in the root directory and add the following:

```env
DATABASE_URL=mysql://admin:Admin123!@hrisdev.cjog0guiewj0.ap-southeast-2.rds.amazonaws.com:3306/test_frontend_seller
COOKIE_NAME=AuthToken

AWS_ACCESS_KEY_ID=AKIAQFC27NP3HS3SFJME
AWS_SECRET_ACCESS_KEY=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
AWS_BUCKET_NAME=mycbuckethris
AWS_REGION=ap-southeast-1

```

### 4. Run Migrations (First-time setup only)

```
bash npx prisma migrate dev --name init
```

### 5. Generate Prisma Client

```bash
npx prisma generate
```

### 6. Start Development Server

```bash
npm run dev
```

Visit the app at: [http://localhost:3000](http://localhost:3000)

---

## ⚙️ Tech & Tools Used

### 🖥️ Frontend

- **Next.js** – React framework with SSR and SSG support.
- **Tailwind CSS** – Utility-first CSS framework.
- **ShadCN UI** – Component library using Radix + Tailwind.
- **React Query** – Data fetching & caching.
- **React Hook Form** – Powerful form validation.

### 🗄️ Backend

- **MySQL** – Relational database.
- **Prisma** – Type-safe ORM with schema-based migration system.

---

## 📁 Project Structure

```
/
├── app/ or pages/         # Next.js route handlers
│   └── api/               # API route handlers
├── components/            # UI components
├── modules/               # Collection of all JSX components used in app
├── hooks/                 # Custom hooks (React Query, etc.)
├── lib/                   # Utilities and helpers
├── prisma/                # Prisma schema and migrations
├── public/                # Static assets (images, icons, etc.)
├── types/                 # TypeScript type definitions
└── .env                   # Environment configuration
```

---

## 🔗 API Documentation

- Access the Postman collection [here](https://cuyy99.postman.co/workspace/CUYY-Workspace~e22cd32c-4cd3-4534-b3d7-811a6e43d394/collection/19580160-514ab391-720e-4e84-93aa-936d4f88fe5e?action=share&creator=19580160).
