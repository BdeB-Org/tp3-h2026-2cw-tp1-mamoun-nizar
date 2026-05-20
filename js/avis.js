const avisBody = document.getElementById('avis-body');
const avisForm = document.getElementById('avis-form');
const reloadAvisBtn = document.getElementById('reload-avis');

const utilisateurSelect = document.getElementById('utilisateur_idutilisateur');
const produitSelect = document.getElementById('produit_idproduit');

let utilisateurs = [];
let produits = [];

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
        setMessage('avis-message', 'Impossible de charger les utilisateurs.', 'error');
    }
}

async function chargerProduits() {
    try {
        produits = await getAll('produit');

        produitSelect.innerHTML = '<option value="">Choisir un produit</option>';

        produits.forEach(produit => {
            produitSelect.innerHTML += `
        <option value="${escapeHtml(produit.idproduit)}">
          ${escapeHtml(produit.nomproduit)}
        </option>
      `;
        });
    } catch (error) {
        setMessage('avis-message', 'Impossible de charger les produits.', 'error');
    }
}

function trouverUtilisateur(idUtilisateur) {
    const utilisateur = utilisateurs.find(u => u.idutilisateur == idUtilisateur);

    if (!utilisateur) {
        return '—';
    }

    return `${escapeHtml(utilisateur.prenom)} ${escapeHtml(utilisateur.nom)}`;
}

function trouverProduit(idProduit) {
    const produit = produits.find(p => p.idproduit == idProduit);

    if (!produit) {
        return '—';
    }

    return escapeHtml(produit.nomproduit);
}

async function chargerAvis() {
    avisBody.innerHTML = '<tr><td colspan="7">Chargement des avis...</td></tr>';

    try {
        const avis = await getAll('avis');

        if (!avis.length) {
            avisBody.innerHTML = '<tr><td colspan="7">Aucun avis trouvé.</td></tr>';
            return;
        }

        avisBody.innerHTML = avis.map(unAvis => `
      <tr>
        <td>${escapeHtml(unAvis.idavis)}</td>
        <td>${escapeHtml(unAvis.note)} / 5</td>
        <td>${escapeHtml(unAvis.commentaire)}</td>
        <td>${formatDate(unAvis.dateavis)}</td>
        <td>${trouverUtilisateur(unAvis.utilisateur_idutilisateur)}</td>
        <td>${trouverProduit(unAvis.produit_idproduit)}</td>
        <td>
          <button class="btn btn-secondary" onclick="supprimerAvis(${unAvis.idavis})">
            Supprimer
          </button>
        </td>
      </tr>
    `).join('');
    } catch (error) {
        avisBody.innerHTML = `<tr><td colspan="7">${escapeHtml(error.message)}</td></tr>`;
        setMessage('avis-message', 'Impossible de charger les avis.', 'error');
    }
}

async function supprimerAvis(id) {
    if (!confirm(`Supprimer l'avis ${id} ?`)) return;

    try {
        await remove('avis', id);
        setMessage('avis-message', 'Avis supprimé avec succès.', 'success');
        chargerAvis();
    } catch (error) {
        setMessage('avis-message', error.message, 'error');
    }
}

avisForm.addEventListener('submit', async (event) => {
    event.preventDefault();

    const nouvelAvis = {
        note: Number(document.getElementById('note').value),
        commentaire: document.getElementById('commentaire').value,
        dateavis: document.getElementById('dateavis').value + 'T00:00:00Z',
        utilisateur_idutilisateur: Number(document.getElementById('utilisateur_idutilisateur').value),
        produit_idproduit: Number(document.getElementById('produit_idproduit').value)
    };

    try {
        await create('avis', nouvelAvis);
        avisForm.reset();
        setMessage('avis-message', 'Avis ajouté avec succès.', 'success');
        chargerAvis();
    } catch (error) {
        setMessage('avis-message', error.message, 'error');
    }
});

reloadAvisBtn.addEventListener('click', chargerAvis);

chargerUtilisateurs();
chargerProduits();
chargerAvis();