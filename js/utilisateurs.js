const utilisateursBody = document.getElementById('utilisateurs-body');
const utilisateurForm = document.getElementById('utilisateur-form');
const reloadUtilisateursBtn = document.getElementById('reload-utilisateurs');

async function chargerUtilisateurs() {
    utilisateursBody.innerHTML = '<tr><td colspan="8">Chargement des utilisateurs...</td></tr>';

    try {
        const utilisateurs = await getAll('utilisateur');

        if (!utilisateurs.length) {
            utilisateursBody.innerHTML = '<tr><td colspan="8">Aucun utilisateur trouvé.</td></tr>';
            return;
        }

        utilisateursBody.innerHTML = utilisateurs.map(utilisateur => `
      <tr>
        <td>${escapeHtml(utilisateur.idutilisateur)}</td>
        <td>${escapeHtml(utilisateur.nom)}</td>
        <td>${escapeHtml(utilisateur.prenom)}</td>
        <td>${escapeHtml(utilisateur.courriel)}</td>
        <td>${escapeHtml(utilisateur.telephone)}</td>
        <td>${escapeHtml(utilisateur.role)}</td>
        <td>${formatDate(utilisateur.datecreation)}</td>
        <td>
          <button class="btn btn-secondary" onclick="supprimerUtilisateur(${utilisateur.idutilisateur})">
            Supprimer
          </button>
        </td>
      </tr>
    `).join('');
    } catch (error) {
        utilisateursBody.innerHTML = `<tr><td colspan="8">${escapeHtml(error.message)}</td></tr>`;
        setMessage('utilisateur-message', 'Impossible de charger les utilisateurs.', 'error');
    }
}

async function supprimerUtilisateur(id) {
    if (!confirm(`Supprimer l'utilisateur ${id} ?`)) return;

    try {
        await remove('utilisateur', id);
        setMessage('utilisateur-message', 'Utilisateur supprimé avec succès.', 'success');
        chargerUtilisateurs();
    } catch (error) {
        setMessage('utilisateur-message', error.message, 'error');
    }
}

utilisateurForm.addEventListener('submit', async (event) => {
    event.preventDefault();

    const nouvelUtilisateur = {
        nom: document.getElementById('nom').value,
        prenom: document.getElementById('prenom').value,
        courriel: document.getElementById('courriel').value,
        telephone: document.getElementById('telephone').value,
        motdepasse: document.getElementById('motdepasse').value,
        role: document.getElementById('role').value,
        datecreation: document.getElementById('datecreation').value + 'T00:00:00Z'
    };

    try {
        await create('utilisateur', nouvelUtilisateur);
        utilisateurForm.reset();
        setMessage('utilisateur-message', 'Utilisateur ajouté avec succès.', 'success');
        chargerUtilisateurs();
    } catch (error) {
        setMessage('utilisateur-message', error.message, 'error');
    }
});

reloadUtilisateursBtn.addEventListener('click', chargerUtilisateurs);

chargerUtilisateurs();