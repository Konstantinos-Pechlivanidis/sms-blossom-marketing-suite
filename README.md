# 📲 Retail Marketing Web App

A modern, responsive, and AI-enhanced marketing platform built for retailers to create and manage SMS campaigns, automate communications, and track engagement. This application is designed to be intuitive, mobile-first, and fully self-managed.

---

## 🚀 Features

### 📨 Campaigns
- Step-by-step **Create Campaign** flow
- Always-visible **mobile preview** of the SMS message
- Audience targeting: All contacts, Men, Women, VIP, or custom views
- **AI Assistant** for message optimization
- Message scheduling: Send now, schedule later, or save as draft
- **Recurring sending** (e.g., every Monday and Tuesday)
- Campaigns list view with filters, actions (edit, view, delete, resend), and draft management

### 🔁 Automations
- Predefined automation types (e.g., Birthday, Conversion, 10 Purchases)
- Users can **edit message content** before activation
- **Recurring automation control**
- Drag & Drop-inspired flow layout
- Inline preview of SMS
- Full responsiveness and UI consistency with Campaigns module

### 📇 Contacts
- List view of contacts
- Filtering by tag, gender, and source
- Functional buttons for **view**, **edit**, and **delete**

### ⚙️ Settings
- Minimal design
- **Change password** functionality (primary)
- Edit personal account information
- Fully mobile-friendly layout

### 📱 QR Scan & Tracking Page
- Each campaign message contains a **unique backend-generated link**
- Redirects to a **QR Scan Page** with:
  - Campaign branding
  - Visible QR Code
  - Unsubscribe button

### 🛒 Message Purchase Page
- Allows user to easily **buy more messages**
- Credits appear in the **Dashboard**
- Premium, clean layout with unique **Navbar integration**

---

## 🎨 Design System

- **Fully responsive** (Mobile, Tablet, Desktop)
- UI built around a **Tiffany Blue accent palette**
- Consistent layout structure across all pages
- Realistic mobile device previews for better UX
- Modern font sizes, padding, card-based design

---

## 🧪 Data

- All data is **dummy-based** — no real API integration
- Buttons, transitions, and flows are **fully functional** and simulate realistic UX
- User feedback, toasts, and error states are included

---

## 📂 Pages Overview

| Page                | Description                                      |
|---------------------|--------------------------------------------------|
| `/dashboard`        | Main stats and credit display                    |
| `/campaigns`        | View all campaigns, filter, edit, resend         |
| `/campaigns/create` | Step-by-step campaign builder with AI & preview  |
| `/automations`      | View, edit, activate predefined workflows        |
| `/contacts`         | View and manage contacts                         |
| `/settings`         | Change password and update user info            |
| `/messages`         | Purchase credits (messages)                      |
| `/qr/:campaignId`   | QR scan landing page with unsubscribe option     |

---

## 🛠 Tech Stack

- **Frontend:** React.js + Tailwind CSS + ShadCN UI
- **State Management:** React Hooks
- **Design Focus:** Mobile-first, Accessibility, UI Transitions

---

## 💡 Notes

- All backend integrations (e.g., message sending, credit deduction, unsubscribe logic) are **mocked**
- The mobile preview component mimics **real phone dimensions**
- Recurring logic and QR generation are **simulated** for demo purposes

---

## 📸 Preview

> Insert screenshots or Loom demo video links here if available.

---

## 📬 Contact

For questions, support, or collaboration, contact the creator.

