import { html } from '../dom.js';
import { createRecipe } from '../api/data.js';



const createTemplate = () => html`
<section id="create">
    <article>
        <h2>New Movie</h2>
        <form id="createForm">
            <label>Name: <input type="text" name="title" placeholder="Movie Name"></label>
            <label>Image: <input type="text" name="img" placeholder="Image URL"></label>
            <label>Plot: <input type="text" name="description" placeholder="Short Plot Summary"></label>  
            <input type="submit" value="Create Movie">         
        </form>
    </article>
</section>`;

export function setupCreate() {
    return showCreate;

    function showCreate() {
        return createTemplate();
    }
}

export async function onCreateSubmit(data, onSuccess) {
    const body = {
        title: data.title,
        img: data.img,
        description: data.description
    };

    try {
        const result = await createRecipe(body);
        onSuccess(result._id);
    } catch (err) {
        alert(err.message);
    }
}