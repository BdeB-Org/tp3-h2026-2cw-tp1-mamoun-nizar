const reservationsBody = document.getElementById('reservations-body');
const reservationForm = document.getElementById('reservation-form');
const reloadReservationsBtn = document.getElementById('reload-reservations');

const utilisateurSelect = document.getElementById('utilisateur_idutilisateur');

let utilisateurs = [];

async function chargerUtilisateurs() {
    try {
        utilisateurs = await getAll('utilisateur');

        utilisateurSelect.innerHTML = '<option value="">Choisir un utilisateur</option>';

        utilisateurs.forEach(utilisateur => {
            utilisateurSelect.innerHTML += `
        <option value="${escapeHtml(utilisateur.idutilisateur)}">
          ${escapeHtml(utilisateur.prenom)} ${escapeHtml(utilisateur.nom)}
        </option>
      `;
        });
    } catch (error) {
        setMessage('reservation-message', 'Impossible de charger les utilisateurs.', 'error');
    }
}

function trouverUtilisateur(idUtilisateur) {
    const utilisateur = utilisateurs.find(u => u.idutilisateur == idUtilisateur);

    if (!utilisateur) {
        return '—';
    }

    return `${escapeHtml(utilisateur.prenom)} ${escapeHtml(utilisateur.nom)}`;
}

async function chargerReservations() {
    reservationsBody.innerHTML = '<tr><td colspan="8">Chargement des réservations...</td></tr>';

    try {
        const reservations = await getAll('reservation');

        if (!reservations.length) {
            reservationsBody.innerHTML = '<tr><td colspan="8">Aucune réservation trouvée.</td></tr>';
            return;
        }

        reservationsBody.innerHTML = reservations.map(reservation => `
      <tr>
        <td>${escapeHtml(reservation.idreservation)}</td>
        <td>${formatDate(reservation.datereservation)}</td>
        <td>${escapeHtml(reservation.heurereservation)}</td>
        <td>${escapeHtml(reservation.nombrepersonne)}</td>
        <td>${escapeHtml(reservation.status)}</td>
        <td>${escapeHtml(reservation.commentaire)}</td>
        <td>${trouverUtilisateur(reservation.utilisateur_idutilisateur)}</td>
        <td>
          <button class="btn btn-secondary" onclick="supprimerReservation(${reservation.idreservation})">
            Supprimer
          </button>
        </td>
      </tr>
    `).join('');
    } catch (error) {
        reservationsBody.innerHTML = `<tr><td colspan="8">${escapeHtml(error.message)}</td></tr>`;
        setMessage('reservation-message', 'Impossible de charger les réservations.', 'error');
    }
}

async function supprimerReservation(id) {
    if (!confirm(`Supprimer la réservation ${id} ?`)) return;

    try {
        await remove('reservation', id);
        setMessage('reservation-message', 'Réservation supprimée avec succès.', 'success');
        chargerReservations();
    } catch (error) {
        setMessage('reservation-message', error.message, 'error');
    }
}

reservationForm.addEventListener('submit', async (event) => {
    event.preventDefault();

    const nouvelleReservation = {
        datereservation: document.getElementById('datereservation').value + 'T00:00:00Z',
        heurereservation: document.getElementById('heurereservation').value,
        nombrepersonne: Number(document.getElementById('nombrepersonne').value),
        status: document.getElementById('status').value,
        commentaire: document.getElementById('commentaire').value,
        utilisateur_idutilisateur: Number(document.getElementById('utilisateur_idutilisateur').value)
    };

    try {
        await create('reservation', nouvelleReservation);
        reservationForm.reset();
        setMessage('reservation-message', 'Réservation ajoutée avec succès.', 'success');
        chargerReservations();
    } catch (error) {
        setMessage('reservation-message', error.message, 'error');
    }
});

reloadReservationsBtn.addEventListener('click', chargerReservations);

chargerUtilisateurs();
chargerReservations();