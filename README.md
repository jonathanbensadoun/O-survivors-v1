﻿# Utilisation de React et Redux

Nous avons utiliser REACT pour la construction d'interfaces utilisateur et Redux pour la gestion de l'état de l'application.

## Utilisation de React

### Composants
### Composants

React utilise une architecture basée sur des composants. Un composant représente une partie réutilisable de l'interface utilisateur.

Les composants sont des fonctions JavaScript qui renvoient des éléments React. Ils sont simples et souvent utilisés pour des fonctionnalités plus petites.

### Gestion de l'État

React utilise l'état pour suivre les données dynamiques dans un composant. Lorsque l'état change, le composant se met à jour automatiquement.

ici nous utilisons Redux, pour gerer le changement d'etat (voir plus bas)

### JSX

React utilise JSX, une syntaxe qui ressemble à XML/HTML, pour décrire la structure des composants.

```jsx
const ExampleComponent = () => {
	return <div>Hello, React!</div>;
};
```

## Intégration de Redux

### Actions

Redux utilise des actions pour décrire les changements dans l'état de l'application. Les actions sont des objets simples qui ont un type et éventuellement des données associées.

### Reducers

Les reducers décrivent comment l'état de l'application change en réponse à une action. Ils sont des fonctions pures qui prennent l'état actuel et une action en entrée, puis renvoient un nouvel état. On doit passer par les reducers pour pouvoir modifier le state du store.

### Store

Le store est l'objet central de Redux qui détient l'état de l'application. Il offre des méthodes pour dispatch des actions, s'abonner aux changements d'état et accéder à l'état actuel.

### Connexion avec React

La bibliothèque react-redux facilite l'intégration de Redux avec React. Utilisez le composants Provider pour connecter vos composants React au store Redux.

## Exemple d'Utilisation

```jsx
// Actions
const increment = () => ({ type: 'INCREMENT' });

// Reducer
const counterReducer = (state = 0, action) => {
	switch (action.type) {
		case 'INCREMENT':
			return state + 1;
		default:
			return state;
	}
};

// Store
const store = Redux.createStore(counterReducer);

// Composant React
class CounterComponent extends React.Component {
	render() {
		return (
			<div>
				<p>Count: {store.getState()}</p>
				<button onClick={() => store.dispatch(increment())}>Increment</button>
			</div>
		);
	}
}

// Connexion du comporsant react au store de redux
const ConnectedCounter = ReactRedux.connect()(CounterComponent);
```

## Bibliothèques de REACT utilisées

## react-icons

La bibliothèque react-icons offre une collection de composants d'icônes React prêts à l'emploi provenant de diverses bibliothèques d'icônes populaires telles que Font Awesome, Material Icons, et bien d'autres. Elle simplifie l'intégration d'icônes dans votre application React en fournissant des composants faciles à utiliser. Par exemple, si vous avez besoin d'ajouter une icône de média social, vous pouvez simplement importer le composant correspondant de react-icons plutôt que de gérer manuellement le code SVG.

### Exemple d'utilisation :

```jsx
import { FaGithub } from 'react-icons/fa';

const GitHubIcon = () => {
	return <FaGithub />;
};
```

## react-responsive

La bibliothèque react-responsive facilite la création d'interfaces réactives en fournissant des composants pour rendre conditionnellement du contenu en fonction de la taille de l'écran ou d'autres caractéristiques du périphérique. Vous pouvez définir des points de rupture (breakpoints) pour gérer le rendu des composants en fonction de la taille de l'écran, ce qui améliore l'expérience utilisateur sur différents dispositifs.

Exemple d'utilisation pour rendre un composant conditionnellement visible sur un écran de taille réduite :

```jsx
import { useMediaQuery } from 'react-responsive';

const MyComponent = () => {
	const isMobile = useMediaQuery({ maxWidth: 767 });

	return isMobile ? <MobileComponent /> : <DesktopComponent />;
};
```

## react-router-dom

La bibliothèque react-router-dom est un ensemble d'utilitaires pour la gestion de la navigation dans une application React à page unique (SPA). Elle permet de définir des routes et d'effectuer la navigation entre différentes vues ou composants en fonction de l'URL. Les composants tels que BrowserRouter, Route, et Link simplifient la mise en place d'une navigation dynamique.

### Exemple d'utilisation pour définir des routes dans une application :

```jsx
Copy code
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

const App = () => {
return (
<Router>
<div>
<nav>
<ul>
<li><Link to="/">Accueil</Link></li>
<li><Link to="/profil">Profil</Link></li>
</ul>
</nav>

        <Route path="/" exact component={Home} />
        <Route path="/profil" component={Profile} />
      </div>
    </Router>

);
};
```

Ces bibliothèques facilitent le développement d'applications React en fournissant des composants et des utilitaires prêts à l'emploi pour des fonctionnalités courantes telles que l'affichage d'icônes, la gestion de la réactivité, et la navigation entre différentes vues.

## Conclusion

Ce guide offre un aperçu rapide de l'utilisation que nous avons fait de React et Redux. Utilisez ces concepts pour créer des applications React bien organisées avec une gestion d'état centralisée.
