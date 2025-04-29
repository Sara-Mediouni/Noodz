# 🍽️ **Noodz**

![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)
![Stripe](https://img.shields.io/badge/Stripe-635BFF?style=for-the-badge&logo=stripe&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)

---

## 📚 **Table des matières**

- [✨ Présentation](#-présentation)
- [🛠️ Stack technique](#️-stack-technique)
- [📸 Aperçu](#-aperçu)
- [🚀 Lancer localement](#-lancer-localement)
- [📋 Fonctionnalités principales](#-fonctionnalités-principales)
- [⚠️ Remarque](#️-remarque)


---

## ✨ **Présentation**

**Foodle** est une application web qui permet aux utilisateurs de réserver une table dans leur restaurant préféré et de payer leur réservation en ligne de manière sécurisée. 🍝🍷

---

## 🛠️ **Stack technique**

- **Frontend** : React.js
- **Backend** : Node.js + Express.js
- **Base de données** : MongoDB
- **Paiement** : Stripe API (ou autre service)

---

## 📸 **Aperçu**

*([Preview](https://noodz-e5w4.vercel.app))*

---

## 🚀 **Lancer localement**

```bash
git clone https://github.com/Sara-Mediouni/Noodz.git
cd noodz

cd backend && npm install
cd frontend && npm install
cd admin && npm install
# Créez un fichier .env pour configurer MongoDB et Stripe
nodemon server (backend)
npm run dev (frontend)
npm run dev (admin)
```

## 📋 Fonctionnalités principales
-📅 Réservation de tables en ligne

-💳 Paiement sécurisé lors de la réservation

-👤 Gestion des comptes utilisateurs

-📋 Historique des réservations disponibles pour chaque utilisateur

## ⚠️ Remarque
Pour activer le paiement en ligne, l'intégration d'une API comme Stripe est nécessaire.