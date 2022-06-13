import { html } from '../dom.js';
import { regster } from '../api/data.js';


const registerTemplate = () => html`
<section id="register">
    <article>
        <h2>Register</h2>
        <form id="registerForm">
            <label>E-mail: <input type="text" name="email"></label>
            <label>Password: <input type="password" name="password"></label>
            <label>Repeat: <input type="password" name="rePass"></label>
            <input type="submit" value="Register">
        </form>
    </article>
</section>`;


export function setupRegister() {
    return showRegister;

    function showRegister() {
        return registerTemplate();
    }
}

export async function onRegisterSubmit(data, onSuccess) {
    const regex = new RegExp('[0-9]+');

    if (data.password != data.rePass) {
        return alert('Passwords don\'t match');
    }
    else if(data.password.length < 9){
        return alert('Password must be of at least nine characters!');
    }
    else if(!regex.test(data.password)){
        return alert('Password must contain at least one digit!');
    }

    try {
        await regster(data.email, data.password);
        onSuccess();
    } catch (err) {
        alert(err.message);
    }
}