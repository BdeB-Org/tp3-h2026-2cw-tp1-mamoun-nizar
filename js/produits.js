const produitsBody = document.getElementById('produits-body');
const produitForm = document.getElementById('produit-form');
const reloadProduitsBtn = document.getElementById('reload-produits');

const categorieSelect = document.getElementById('categorie_idcategorie');

let categories = [];

async function chargerCategories() {
    try {
        categories = await getAll('categorie');

        categorieSelect.innerHTML = '<option value="">Choisir une catégorie</option>';

        categories.forEach(categorie => {
            categorieSelect.innerHTML += `
        <option value="${escapeHtml(categorie.idcategorie)}">
          ${escapeHtml(categorie.nomcategorie)}
        </option>
      `;
        });
    } catch (error) {
        setMessage('produit-message', 'Impossible de charger les catégories.', 'error');
    }
}

function trouverCategorie(idCategorie) {
    const categorie = categories.find(c => c.idcategorie == idCategorie);

    if (!categorie) {
        return '—';
    }

    return escapeHtml(categorie.nomcategorie);
}

function afficherDisponibilite(disponibilite) {
    if (disponibilite && disponibilite.toLowerCase() === 'disponible') {
        return '<span class="available">Disponible</span>';
    }

    return '<span class="unavailable">Non disponible</span>';
}

async function chargerProduits() {
    produitsBody.innerHTML = '<tr><td colspan="7">Chargement des produits...</td></tr>';

    try {
        const produits = await getAll('produit');

        if (!produits.length) {
            produitsBody.innerHTML = '<tr><td colspan="7">Aucun produit trouvé.</td></tr>';
            return;
        }

        produitsBody.innerHTML = produits.map(produit => `
      <tr>
        <td>${escapeHtml(produit.idproduit)}</td>
        <td>${escapeHtml(produit.nomproduit)}</td>
        <td>${escapeHtml(produit.descriptionproduit)}</td>
        <td>${formatMoney(produit.prix)}</td>
        <td>${afficherDisponibilite(produit.disponibilite)}</td>
        <td>${trouverCategorie(produit.categorie_idcategorie)}</td>
        <td>
          <button class="btn btn-secondary" onclick="supprimerProduit(${produit.idproduit})">
            Supprimer
          </button>
        </td>
      </tr>
    `).join('');
    } catch (error) {
        produitsBody.innerHTML = `<tr><td colspan="7">${escapeHtml(error.message)}</td></tr>`;
        setMessage('produit-message', 'Impossible de charger les produits.', 'error');
    }
}

async function supprimerProduit(id) {
    if (!confirm(`Supprimer le produit ${id} ?`)) return;

    try {
        await remove('produit', id);
        setMessage('produit-message', 'Produit supprimé avec succès.', 'success');
        chargerProduits();
    } catch (error) {
        setMessage('produit-message', error.message, 'error');
    }
}

produitForm.addEventListener('submit', async (event) => {
    event.preventDefault();

    const nouveauProduit = {
        nomproduit: document.getElementById('nomproduit').value,
        descriptionproduit: document.getElementById('descriptionproduit').value,
        prix: Number(document.getElementById('prix').value),
        disponibilite: document.getElementById('disponibilite').value,
        categorie_idcategorie: Number(document.getElementById('categorie_idcategorie').value)
    };

    try {
        await create('produit', nouveauProduit);
        produitForm.reset();
        setMessage('produit-message', 'Produit ajouté avec succès.', 'success');
        chargerProduits();
    } catch (error) {
        setMessage('produit-message', error.message, 'error');
    }
});

async function initialiserPage() {
    await chargerCategories();
    await chargerProduits();
}

reloadProduitsBtn.addEventListener('click', async () => {
    await chargerCategories();
    await chargerProduits();
});

initialiserPage();