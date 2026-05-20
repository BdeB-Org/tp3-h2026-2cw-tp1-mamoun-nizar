const categoriesBody = document.getElementById('categories-body');
const categorieForm = document.getElementById('categorie-form');
const reloadCategoriesBtn = document.getElementById('reload-categories');

async function chargerCategories() {
    categoriesBody.innerHTML = '<tr><td colspan="4">Chargement des catégories...</td></tr>';

    try {
        const categories = await getAll('categorie');

        if (!categories.length) {
            categoriesBody.innerHTML = '<tr><td colspan="4">Aucune catégorie trouvée.</td></tr>';
            return;
        }

        categoriesBody.innerHTML = categories.map(categorie => `
      <tr>
        <td>${escapeHtml(categorie.idcategorie)}</td>
        <td>${escapeHtml(categorie.nomcategorie)}</td>
        <td>${escapeHtml(categorie.descriptioncategorie)}</td>
        <td>
          <button class="btn btn-secondary" onclick="supprimerCategorie(${categorie.idcategorie})">
            Supprimer
          </button>
        </td>
      </tr>
    `).join('');
    } catch (error) {
        categoriesBody.innerHTML = `<tr><td colspan="4">${escapeHtml(error.message)}</td></tr>`;
        setMessage('categorie-message', 'Impossible de charger les catégories.', 'error');
    }
}

async function supprimerCategorie(id) {
    if (!confirm(`Supprimer la catégorie ${id} ?`)) return;

    try {
        await remove('categorie', id);
        setMessage('categorie-message', 'Catégorie supprimée avec succès.', 'success');
        chargerCategories();
    } catch (error) {
        setMessage('categorie-message', error.message, 'error');
    }
}

categorieForm.addEventListener('submit', async (event) => {
    event.preventDefault();

    const nouvelleCategorie = {
        nomcategorie: document.getElementById('nomcategorie').value,
        descriptioncategorie: document.getElementById('descriptioncategorie').value
    };

    try {
        await create('categorie', nouvelleCategorie);
        categorieForm.reset();
        setMessage('categorie-message', 'Catégorie ajoutée avec succès.', 'success');
        chargerCategories();
    } catch (error) {
        setMessage('categorie-message', error.message, 'error');
    }
});

reloadCategoriesBtn.addEventListener('click', chargerCategories);

chargerCategories();