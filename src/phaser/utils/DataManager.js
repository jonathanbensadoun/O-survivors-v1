/**
 * Gère les interactions avec les données du jeu, telles que les pièces, les personnages débloqués, etc.
 */
export default class DataManager {
	/**
	 * Crée une instance de DataManager.
	 * @param {Phaser.Scene} scene - La scène Phaser à laquelle DataManager est lié.
	 */
	constructor(scene) {
		this.scene = scene;
		this.baseUrl = 'https://osurvivor.fr/v1/api/';
	}

	/**
	 * Récupère le nombre de pièces possédées par le joueur.
	 * @param {string} token - Le jeton d'authentification du joueur.
	 * @returns {Promise<number|null>} - Une promesse résolue avec le nombre de pièces, ou null en cas d'erreur.
	 */
	async getPlayerCoins(token) {
		try {
			const response = await fetch(`${this.baseUrl}user`, {
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${token}`,
				},
			});

			if (!response.ok) {
				throw new Error('Erreur lors de la mise à jour des pièces possédées');
			}

			return response.json();
		} catch (error) {
			console.error('Impossible de charger les données des personnages.');
			return null;
		}
	}

	/**
	 * Récupère les données de tous les personnages disponibles dans le jeu.
	 * @returns {Promise<object[]|null>} - Une promesse résolue avec les données des personnages, ou null en cas d'erreur.
	 */
	async getAllCharactersData() {
		try {
			const response = await fetch(`${this.baseUrl}character`);

			const characterData = await response.json();

			return characterData;
		} catch (error) {
			console.error('Impossible de charger les données des personnages.');
			return null;
		}
	}

	/**
	 * Récupère les données de tous les niveaux (stages) disponibles dans le jeu.
	 * @returns {Promise<object[]|null>} - Une promesse résolue avec les données des niveaux, ou null en cas d'erreur.
	 */
	async getAllStagesData() {
		try {
			const response = await fetch(`${this.baseUrl}stage`);

			const characterData = await response.json();

			return characterData;
		} catch (error) {
			console.error('Impossible de charger les données des personnages.');
			return null;
		}
	}

	/**
	 * Récupère les identifiants des personnages débloqués par le joueur.
	 * @param {string} token - Le jeton d'authentification du joueur.
	 * @returns {Promise<number[]|null>} - Une promesse résolue avec les identifiants des personnages débloqués, ou null en cas d'erreur.
	 */
	async getUserUnlockedCharacters(token) {
		try {
			const response = await fetch(`${this.baseUrl}user/unlocked_character`, {
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${token}`,
				},
			});

			const userUnlockedCharacters = await response.json();

			return userUnlockedCharacters;
		} catch (error) {
			console.error('Impossible de charger les données des personnages.');
			return null;
		}
	}

	/**
	 * Met à jour le nombre de pièces possédées par le joueur.
	 * @param {number} updateOwnedCoins - Le nouveau nombre de pièces possédées.
	 * @returns {Promise<object|null>} - Une promesse résolue avec les données mises à jour du joueur, ou null en cas d'erreur.
	 */
	async updateOwnedCoins(updateOwnedCoins) {
		this.userToken = localStorage.getItem('token');

		try {
			const response = await fetch(`${this.baseUrl}user`, {
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${this.userToken}`,
				},
			});

			if (!response.ok) {
				throw new Error('Erreur lors de la mise à jour des pièces possédées');
			}

			this.userData = await response.json();
		} catch (error) {
			console.error('Impossible de charger les données des personnages.');
			return null;
		}

		try {
			const response = await fetch(`${this.baseUrl}user`, {
				method: 'PATCH',
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${this.userToken}`,
				},
				body: JSON.stringify({ coins: updateOwnedCoins }),
			});

			if (!response.ok) {
				throw new Error('Erreur lors de la mise à jour des pièces possédées');
			}

			return response.json();
		} catch (error) {
			console.error(
				'Erreur lors de la mise à jour des pièces possédées :',
				error
			);
			return null;
		}
	}

	/**
	 * Met à jour la liste des personnages débloqués par le joueur.
	 * @param {number} characterId - L'identifiant du personnage à débloquer.
	 * @returns {Promise<object|null>} - Une promesse résolue avec les données mises à jour du joueur, ou null en cas d'erreur.
	 */
	async updateUnlockedCharacter(characterId) {
		this.userToken = localStorage.getItem('token');

		try {
			const response = await fetch(`${this.baseUrl}user`, {
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${this.userToken}`,
				},
			});

			if (!response.ok) {
				throw new Error('Erreur lors de la mise à jour des pièces possédées');
			}

			const result = await response.json();
			this.userId = result.id;
		} catch (error) {
			console.error('Impossible de charger les données des personnages.');
			return null;
		}

		try {
			const response = await fetch(`${this.baseUrl}user/unlocked_character`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${this.userToken}`,
				},
				body: JSON.stringify({
					userId: this.userId,
					characterId,
				}),
			});
			if (!response.ok) {
				throw new Error('Erreur lors de la mise à jour des pièces possédées');
			}

			return response.json();
		} catch (error) {
			console.error('Impossible de charger les données des personnages.');
			return null;
		}
	}
}
