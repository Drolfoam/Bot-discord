# Bot-discord
# 🤖 Commandes Discord

Bienvenue dans mon dépôt GitHub !

Tu trouveras ici plusieurs commandes personnalisées pour les bots Discord utilisant **Discord.js**.

## 📦 Contenu

- `commands/` : toutes les commandes du bot.
- `images/` : images utilisées par certaines commandes.
- `economy.js` : système économique.
- `deploy-commands.js` : enregistrement des commandes slash.
- `index.js` : fichier principal du bot.
- `package.json` : dépendances du projet.
- `package-lock.json` : versions des dépendances.

## ⚙️ Installation

### 1. Télécharger les fichiers

Clique sur le bouton **Code**, puis sur **Download ZIP**.

### 2. Installer les dépendances

Dans la console :

```bash
npm install
```

### 3. Configurer le bot

Crée un fichier `.env` à la racine du projet :

```env
TOKEN=TON_TOKEN
CLIENT_ID=TON_CLIENT_ID
GUILD_ID=TON_ID_SERVEUR
```

Remplace les valeurs par les identifiants de ton propre bot et de ton serveur.

### 4. Déployer les commandes

Exécute :

```bash
node deploy-commands.js
```

### 5. Démarrer le bot

Exécute :

```bash
node index.js
```

## ⚠️ Informations importantes

- Utilise ton propre bot Discord.
- Ne partage jamais ton token.
- Certaines commandes nécessitent des fichiers supplémentaires.
- Ne supprime pas les fichiers JSON utilisés par les commandes.
- Le projet utilise Discord.js.

## 💜 Crédits

Commandes créées et partagées par Drolfoam.
