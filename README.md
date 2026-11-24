# Martin Mayer — Portfolio

Portfolio français/anglais basé sur `Martin_Mayer_Portfolio.pdf`. Identité ivoire, noir et rouge, photographies extraites du PDF, six projets avec fiches détaillées, filtres, transitions, navigation mobile et préférence de langue mémorisée.

Le site est entièrement statique : HTML, CSS et JavaScript natif. Les images et polices sont hébergées dans le dépôt. Aucun serveur applicatif, dépendance npm ou clé API n’est nécessaire.

## Aperçu local

Avec Node.js 22 ou plus récent :

```sh
npm run dev
```

Ouvrir <http://127.0.0.1:4173>. L’adresse <http://127.0.0.1:4173/portfolio/> permet de vérifier les chemins de GitHub Pages. Aucun `npm install` n’est nécessaire.

```sh
npm run check     # Syntaxe JavaScript, contenu bilingue et fichiers référencés
npm run build     # Copie uniquement les fichiers du site dans dist/
npm run preview   # Sert la version construite
```

## Hébergement GitHub Pages

Le dépôt cible est [MartinMayerEPFL/portfolio](https://github.com/MartinMayerEPFL/portfolio).

1. Dans le dépôt GitHub, aller dans **Settings → Pages**.
2. Choisir **GitHub Actions** comme source dans **Build and deployment**.
3. Envoyer les fichiers sur la branche `main`. Le workflow `.github/workflows/deploy.yml` vérifie le contenu, prépare `dist/` et le publie. Il peut aussi être lancé depuis **Actions → Deploy portfolio to GitHub Pages → Run workflow**.
4. Après le succès du déploiement, le site sera accessible sur **https://martinmayerepfl.github.io/portfolio/**.

Il n’y a aucun secret à configurer. Les prochains envois sur `main` mettront le site à jour automatiquement.

Alternative sans GitHub Actions : le site peut aussi être publié avec **Deploy from a branch**, branche `main`, dossier `/ (root)`, puisque `index.html` est à la racine. Désactiver alors le workflow Actions pour conserver une seule méthode de publication.

Documentation officielle : [Utiliser un workflow personnalisé avec GitHub Pages](https://docs.github.com/en/pages/getting-started-with-github-pages/using-custom-workflows-with-github-pages).

## Modifier le portfolio

- **Projets et textes français/anglais** : `assets/js/content.js`. Chaque projet contient sa catégorie, ses technologies, ses descriptions, ses images et son éventuel lien externe.
- **Contenu de secours sans JavaScript et métadonnées** : `index.html`. En cas d’ajout ou de modification d’un projet, mettre également à jour son aperçu HTML. Sans JavaScript, les projets ouvrent la page correspondante du PDF.
- **Couleurs, typographie, mise en page et animations** : `assets/styles.css`. Les couleurs principales sont définies en tête de fichier.
- **Interactions et traduction** : `assets/js/main.js`.
- **Images** : `assets/images/`. Elles sont extraites du PDF et optimisées en WebP. Le document d’origine reste à la racine pour le téléchargement.
- **Polices** : Manrope et DM Sans, auto-hébergées sous SIL Open Font License. Les licences se trouvent dans `assets/fonts/`.

Les liens directs vers une fiche utilisent une ancre, par exemple `/portfolio/#projet-sola`, et fonctionnent sans configuration de serveur. Adapter les métadonnées de `index.html` si l’adresse d’hébergement change.

## Accessibilité et navigation

Navigation au clavier, lien d’accès au contenu, filtres annoncés aux lecteurs d’écran, menus et boîtes de dialogue avec états accessibles, fermeture par Échap, retour du focus au projet d’origine et respect de `prefers-reduced-motion`. La page reste consultable sans JavaScript et les liens de contact ouvrent directement la messagerie, GitHub ou LinkedIn.

Le stockage local sert uniquement à mémoriser le choix FR/EN. Le site reste utilisable si le navigateur désactive ce stockage.
