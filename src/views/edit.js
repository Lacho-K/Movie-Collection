import { html } from '../dom.js';
import { getRecipeById, editRecipe } from '../api/data.js';


const editTemplate = (recipe) => html`
<section id="create">
    <article>
        <h2>Edit Recipe</h2>
        <form id="editForm">
        <input type="hidden" name="_id" value=${recipe._id}>
            <label>Name: <input type="text" name="title" placeholder="Movie Name"></label>
            <label>Image: <input type="text" name="img" placeholder="Image URL"></label>
            <label>Plot: <input type="text" name="description" placeholder="Short Plot Summary"></label>  
            <input type="submit" value="Create Recipe">  
            <input type="submit" value="Save Changes">
        </form>
    </article>
</section>`;

export function setupEdit() {
    return showEdit;
    
    async function showEdit(context) {
        const recipeId = context.params.id;
        const recipe = await getRecipeById(recipeId);

        return editTemplate(recipe);
    }
}

export async function onEditSubmit(data, onSuccess) {
    const recipeId = data._id;
    const body = {
        title: data.title,
        img: data.img,
        description: data.description
    };

    try {
        await editRecipe(recipeId, body);
        onSuccess(recipeId);
    } catch (err) {
        alert(err.message);
    }
}

export function setupDeleted() {
    return () => html`
    <section id="details">
        <article>
            <h2>Movie deleted</h2>
        </article>
    </section>`;
}