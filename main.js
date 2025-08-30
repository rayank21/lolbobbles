document.addEventListener('DOMContentLoaded', () => {
    // --- VARIABLES ET ÉLÉMENTS DU DOM ---
    const addPlayerBtn = document.getElementById('addPlayerBtn');
    const generateTeamsBtn = document.getElementById('generateTeamsBtn');
    const playerListContainer = document.getElementById('player-list-container');
    const shareBtn = document.getElementById('shareBtn');

    let players = [];
    const ROLES = ['top', 'jungle', 'mid', 'adc', 'support'];

    // --- FONCTIONS DE GESTION DES JOUEURS ---

    // Sauvegarde les joueurs dans le localStorage
    function savePlayers() {
        localStorage.setItem('lolTeamGeneratorPlayers', JSON.stringify(players));
    }

    // Charge les joueurs depuis le localStorage
    function loadPlayers() {
        const savedPlayers = localStorage.getItem('lolTeamGeneratorPlayers');
        if (savedPlayers) {
            players = JSON.parse(savedPlayers);
            renderPlayerList();
        }
    }

    // Affiche la liste des joueurs
    function renderPlayerList() {
        playerListContainer.innerHTML = '';
        if (players.length === 0) {
            playerListContainer.innerHTML = '<p>Aucun joueur pour le moment.</p>';
        } else {
            players.forEach((player, index) => {
                const playerEl = document.createElement('div');
                playerEl.className = 'player-item';
                playerEl.innerHTML = `
                    <span>${player.name} (${player.role.toUpperCase()} - Nv ${player.level})</span>
                    <button class="btn-delete" data-index="${index}">&times;</button>
                `;
                playerListContainer.appendChild(playerEl);
            });
        }
        // Activer le bouton de génération si on a assez de joueurs
        generateTeamsBtn.disabled = players.length < 10;
    }
    
    // Ajoute un joueur
    function addPlayer() {
        const nameInput = document.getElementById('playerName');
        const roleInput = document.getElementById('primaryRole');
        const levelInput = document.getElementById('playerLevel');

        if (nameInput.value.trim() === '') {
            alert('Le nom du joueur est requis.');
            return;
        }

        // Vérifier si le joueur existe déjà
        const existingPlayer = players.find(p => p.name.toLowerCase() === nameInput.value.trim().toLowerCase());
        if (existingPlayer) {
            alert('Un joueur avec ce nom existe déjà.');
            return;
        }

        players.push({
            name: nameInput.value.trim(),
            role: roleInput.value,
            level: parseInt(levelInput.value, 10),
        });
        
        nameInput.value = ''; // Réinitialiser le champ
        savePlayers();
        renderPlayerList();
    }
    
    // Supprime un joueur
    function removePlayer(index) {
        players.splice(index, 1);
        savePlayers();
        renderPlayerList();
    }

    // --- LOGIQUE DE GÉNÉRATION D'ÉQUIPES ---

    function generateTeams() {
        if (players.length < 10) {
            alert("Il faut au moins 10 joueurs !");
            return;
        }

        // 1. Mélanger les joueurs pour l'aléatoire
        let shuffledPlayers = [...players].sort(() => 0.5 - Math.random());

        let teamBlue = [];
        let teamRed = [];
        let assignedRolesBlue = [];
        let assignedRolesRed = [];

        // 2. Tenter d'assigner un joueur pour chaque rôle
        ROLES.forEach(role => {
            // Pour l'équipe bleue
            let playerIndex = shuffledPlayers.findIndex(p => p.role === role && !teamBlue.includes(p) && !teamRed.includes(p));
            if (playerIndex !== -1) {
                teamBlue.push(shuffledPlayers[playerIndex]);
                assignedRolesBlue.push(role);
                shuffledPlayers.splice(playerIndex, 1);
            }
            // Pour l'équipe rouge
            playerIndex = shuffledPlayers.findIndex(p => p.role === role && !teamBlue.includes(p) && !teamRed.includes(p));
            if (playerIndex !== -1) {
                teamRed.push(shuffledPlayers[playerIndex]);
                assignedRolesRed.push(role);
                shuffledPlayers.splice(playerIndex, 1);
            }
        });
        
        // 3. Compléter les équipes avec les joueurs restants
        let remainingPlayers = shuffledPlayers;
        while (teamBlue.length < 5 && remainingPlayers.length > 0) {
            teamBlue.push(remainingPlayers.shift());
        }
        while (teamRed.length < 5 && remainingPlayers.length > 0) {
            teamRed.push(remainingPlayers.shift());
        }

        // 4. Équilibrer par niveau (algorithme simple)
        balanceTeamsByLevel(teamBlue, teamRed);

        renderTeams(teamBlue, teamRed);
    }

    // Fonction pour équilibrer les équipes par niveau
    function balanceTeamsByLevel(teamBlue, teamRed) {
        const blueTotal = teamBlue.reduce((sum, p) => sum + p.level, 0);
        const redTotal = teamRed.reduce((sum, p) => sum + p.level, 0);
        
        // Si la différence est trop importante, essayer de swapper des joueurs
        if (Math.abs(blueTotal - redTotal) > 3) {
            // Trouver les meilleurs candidats pour swap
            for (let i = 0; i < teamBlue.length; i++) {
                for (let j = 0; j < teamRed.length; j++) {
                    const newBlueTotal = blueTotal - teamBlue[i].level + teamRed[j].level;
                    const newRedTotal = redTotal - teamRed[j].level + teamBlue[i].level;
                    
                    if (Math.abs(newBlueTotal - newRedTotal) < Math.abs(blueTotal - redTotal)) {
                        // Swap les joueurs
                        [teamBlue[i], teamRed[j]] = [teamRed[j], teamBlue[i]];
                        return; // Un seul swap pour éviter les boucles infinies
                    }
                }
            }
        }
    }
    
    // Affiche les équipes
    function renderTeams(blue, red) {
        document.getElementById('teams-placeholder').classList.add('hidden');
        const display = document.getElementById('teams-display');
        display.classList.remove('hidden');
        
        const blueTotal = blue.reduce((sum, p) => sum + p.level, 0);
        const redTotal = red.reduce((sum, p) => sum + p.level, 0);
        
        display.innerHTML = `
            <div class="team-container blue-side">
                <h2>ÉQUIPE BLEUE (Total: ${blueTotal})</h2>
                ${blue.map(p => `
                    <div class="player-card">
                        <span>${p.name}</span>
                        <small>${p.role.toUpperCase()} - Nv ${p.level}</small>
                    </div>
                `).join('')}
            </div>
            <div class="team-container red-side">
                <h2>ÉQUIPE ROUGE (Total: ${redTotal})</h2>
                ${red.map(p => `
                    <div class="player-card">
                        <span>${p.name}</span>
                        <small>${p.role.toUpperCase()} - Nv ${p.level}</small>
                    </div>
                `).join('')}
            </div>
        `;
        document.getElementById('share-section').classList.remove('hidden');
    }

    // Fonction de partage
    function shareTeams() {
        const teamsDisplay = document.getElementById('teams-display');
        const teamsText = teamsDisplay.innerText;
        
        if (navigator.share) {
            navigator.share({
                title: 'Équipes LoL générées',
                text: teamsText,
                url: window.location.href
            });
        } else {
            // Fallback : copier dans le presse-papiers
            navigator.clipboard.writeText(teamsText).then(() => {
                alert('Équipes copiées dans le presse-papiers !');
            }).catch(() => {
                // Fallback pour les navigateurs plus anciens
                const textArea = document.createElement('textarea');
                textArea.value = teamsText;
                document.body.appendChild(textArea);
                textArea.select();
                document.execCommand('copy');
                document.body.removeChild(textArea);
                alert('Équipes copiées dans le presse-papiers !');
            });
        }
    }

    // --- ÉVÉNEMENTS ---
    addPlayerBtn.addEventListener('click', addPlayer);
    generateTeamsBtn.addEventListener('click', generateTeams);
    shareBtn.addEventListener('click', shareTeams);
    
    // Permettre l'ajout avec la touche Entrée
    document.getElementById('playerName').addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            addPlayer();
        }
    });

    playerListContainer.addEventListener('click', (e) => {
        if (e.target.classList.contains('btn-delete')) {
            removePlayer(parseInt(e.target.dataset.index, 10));
        }
    });

    // --- INITIALISATION ---
    loadPlayers();
});
