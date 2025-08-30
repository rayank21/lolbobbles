# 🎮 Générateur d'Équipes LoL

Un générateur d'équipes équilibrées pour League of Legends, inspiré du design du client LoL. Permet de créer des équipes de 5v5 en tenant compte des rôles et des niveaux des joueurs.

## ✨ Fonctionnalités

- **Gestion des joueurs** : Ajout, suppression et sauvegarde automatique
- **Rôles LoL** : TOP, JGL, MID, ADC, SUP
- **Système de niveaux** : Évaluation de 1 à 5 étoiles
- **Génération équilibrée** : Algorithme intelligent pour équilibrer les équipes
- **Design LoL** : Interface inspirée du client officiel
- **Responsive** : Compatible mobile et desktop
- **Partage** : Copie des équipes dans le presse-papiers

## 🛠️ Technologies

- **HTML5** : Structure sémantique
- **CSS3** : Design moderne avec variables CSS
- **JavaScript Vanilla** : Logique métier sans framework
- **LocalStorage** : Sauvegarde des données
- **Font Awesome** : Icônes

## 🚀 Utilisation

1. **Ajouter des joueurs** :
   - Saisir le nom du joueur
   - Sélectionner son rôle principal
   - Définir son niveau (1-5)
   - Cliquer sur "Ajouter"

2. **Générer des équipes** :
   - Ajouter au moins 10 joueurs
   - Cliquer sur "Trouver une partie"
   - Les équipes bleue et rouge sont créées automatiquement

3. **Partager** :
   - Cliquer sur "Partager les équipes"
   - Les équipes sont copiées dans le presse-papiers

## 🎯 Algorithme de Génération

1. **Mélange aléatoire** des joueurs
2. **Assignation par rôle** : Priorité aux joueurs dans leur rôle principal
3. **Complétion** : Remplissage avec les joueurs restants
4. **Équilibrage** : Swap de joueurs pour équilibrer les niveaux totaux

## 📱 Design

- **Thème sombre** inspiré du client LoL
- **Couleurs officielles** : Bleu (#0bc6e3) et Rouge (#c41e3a)
- **Accents dorés** (#c89b3f) pour les éléments importants
- **Responsive design** pour tous les écrans

## 🔧 Personnalisation

### Modifier les couleurs
Éditez les variables CSS dans `style.css` :
```css
:root {
    --bg-color: #010a13;
    --panel-bg: #0a1428;
    --primary-blue: #0bc6e3;
    --gold-accent: #c89b3f;
    /* ... */
}
```

### Ajouter des rôles
Modifiez le tableau `ROLES` dans `main.js` :
```javascript
const ROLES = ['top', 'jungle', 'mid', 'adc', 'support', 'nouveau_role'];
```

## 📊 Fonctionnalités Avancées

- **Sauvegarde automatique** : Les joueurs sont conservés entre les sessions
- **Validation** : Vérification des doublons et champs requis
- **Équilibrage intelligent** : Algorithme pour équilibrer les niveaux
- **Interface intuitive** : Design moderne et accessible

## 🚀 Déploiement

Le projet est prêt pour le déploiement sur Netlify :
- Fichiers statiques uniquement
- Pas de build requis
- Compatible avec tous les navigateurs modernes

## 🤝 Contribution

1. Fork le projet
2. Créez une branche feature
3. Committez vos changements
4. Ouvrez une Pull Request

## 📄 Licence

Ce projet est sous licence MIT.

## 👨‍💻 Auteur

**Rayan K.** - [GitHub](https://github.com/rayank21)

---

🎮 **GG WP !** Amusez-vous bien avec vos parties équilibrées !
