# 📖 HifzApp — Cahier des Charges  
v1.0 — 2025–2026  
Plateforme de Mémorisation du Coran

---

## 📌 Produit
HifzApp — Plateforme de mémorisation du Coran

## 📅 Version
v1.0 — Document initial

## 🧱 Stack
Next.js 15 · TypeScript · PostgreSQL · Redis

## 🎯 Audience
Enfants · Adolescents · Adultes actifs · Seniors · Hafiz

---

# 01. Présentation du Projet

## 1.1 Contexte & Vision
La mémorisation du Coran (Al-Hifz) est une pratique essentielle mais difficile à structurer dans un environnement moderne.

Problèmes principaux :
- manque de méthode structurée  
- absence de suivi personnalisé  
- difficulté de régularité  
- outils dispersés (audio, PDF, etc.)

## 🌍 Vision
HifzApp est une plateforme intelligente qui accompagne la mémorisation du Coran via :
- personnalisation
- suivi intelligent
- méthodes pédagogiques adaptées
- gamification

---

## 1.2 Problèmes Identifiés
- absence de méthode personnalisée
- pas de SRS (révision intelligente)
- outils fragmentés
- manque de gamification
- pas adapté aux enfants
- difficulté de suivi global

---

## 1.3 Proposition de Valeur
- méthodes adaptées par profil
- SRS (spaced repetition system)
- streaks, badges, niveaux
- mode enfant sécurisé
- audio intégré
- PWA offline

---

# 02. Cibles & Profils

## Profils
- 👦 Enfant (6–12 ans)
- 🧑 Adolescent (13–17 ans)
- 👔 Adulte actif
- 📚 Étudiant intensif (Hifz)
- 🧓 Senior
- 🏅 Hafiz en révision

---

## 2.1 Onboarding
- âge & temps disponible
- niveau
- objectif (sourate / Juz / Coran)
- méthode préférée
- réciteur favori

### 💡 PMP (Plan personnalisé)
- versets/jour
- méthodes recommandées
- planning SRS
- jalons 30/90/180 jours

---

# 03. Méthodes de Mémorisation

## 1. Tikrar
Répétition classique du verset N fois.

## 2. SRS
Révision espacée basée sur la courbe d’oubli.

## 3. Mosaïque
Découpage en segments progressifs.

## 4. Samaa
Apprentissage par écoute répétée.

## 5. Kitaba
Écriture et dictée coranique.

## 6. Miroir
Révision du dernier verset vers le premier.

## 7. Hybride
Combinaison automatique des méthodes.

---

# 04. Fonctionnalités

## Mémorisation
- sélection sourate/Juz
- plan automatique
- masquage progressif
- Tajwid coloré
- plein écran

## SRS
- file quotidienne
- notation mémoire
- dashboard rétention

## Audio
- récitateurs multiples
- vitesse variable
- mode offline

## Analytics
- progression globale
- heatmap
- streaks
- rapports

## Gamification
- points (Hasanat)
- badges
- niveaux
- défis

## Enfants
- interface simplifiée
- mascotte
- contrôle parental

## Autres
- recherche versets
- mushaf complet
- mode nuit
- multi-langue
- PWA offline

---

# 05. Architecture

## Stack
- Next.js 15
- TypeScript
- PostgreSQL
- Prisma
- Redis
- NextAuth
- Cloudflare R2 / S3

## Modèle de données
- User
- Profile
- Memorization
- SRS Card
- Session
- Badge
- Verse

## Sécurité
- HTTPS
- RGPD
- protection enfants
- rate limiting
- OWASP

---

# 06. UX/UI

## Principes
- RTL arabe + LTR UI
- design accessible
- thème clair/sombre
- typographie arabe adaptée

## Pages
- Landing
- Onboarding
- Dashboard
- Memorize
- Review
- Listen
- Quran
- Progress
- Community
- Settings
- Parent

---

# 07. Planning

## Phases
- P0 Setup
- P1 Auth
- P2 Mémorisation
- P3 SRS
- P4 Gamification
- P5 Enfant
- P6 Analytics
- P7 QA
- P8 Launch

Durée estimée : ~19 semaines

---

# 08. KPIs

- DAU ≥ 500
- Rétention J7 ≥ 40%
- Rétention J30 ≥ 20%
- 30 versets/mois/utilisateur
- NPS ≥ 50

---

# 09. Contraintes

## Techniques
- RTL arabe complexe
- audio sous licence
- timestamps audio
- voice recognition limitée

## Métier
- respect intégrité du Coran
- sensibilité religieuse
- protection des mineurs
- modération

---

# 10. Modèle économique

- Free
- Premium (7–10€/mois)
- Famille (15€/mois)
- Écoles / mosquées

---

## 🎯 Next step
- validation produit
- maquettes UI
- setup projet Next.js
- backlog Jira