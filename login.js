// Identifiants et mots de passe hachés (SHA-256 en hexadécimal)
const users = {
    'admin': {
        password: '0f921755e427688e6f22bb97145ec4c4a4ffe9d18e1bf693073d437e3fdbc4da', // Admin-Login_Magistrade
        redirect: 'dashboard.html'  // Page de redirection pour admin
    },
    'TurenneMagalie.Guest0': {
        password: 'b2031d91cf6d50c45c30e6252da753082b75514aeefd0a9a32eadd5350ec0709', // MmeTurenne.guest0000*MAGISTRADE-prj
        redirect: 'guests/turenne.html'  // Page de redirection pour user1
    },
    'EscamezPierre.Guest1': {
        password: 'a0c479a224bbcfe05773f21a1a6a58a0bab0cf73890d929f4de9aee4dbced7a6', // EscPierre.guest0001*MAGISTRADE-prj
        redirect: 'guests/pierre.html'  // Page de redirection pour user2
    }
};

// Fonction pour convertir le texte en SHA-256
async function hashPassword(password) {
    const encoder = new TextEncoder();
    const data = encoder.encode(password);
    const hash = await crypto.subtle.digest('SHA-256', data);
    // Convertir le hash en chaîne hexadécimale
    return Array.from(new Uint8Array(hash)).map(b => b.toString(16).padStart(2, '0')).join('');
}

async function login() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const errorMessage = document.getElementById('error-message');

    // Vérification des entrées utilisateur dans la console pour déboguer
    console.log('Username:', username);
    console.log('Password (en clair):', password);

    // Vérifier si l'utilisateur existe
    if (users[username]) {
        // Hacher le mot de passe saisi par l'utilisateur
        const hashedPassword = await hashPassword(password);
        console.log('Password haché (SHA-256):', hashedPassword);

        // Vérifier si le hachage correspond à celui stocké
        if (users[username].password === hashedPassword) {
            console.log('Connexion réussie!');
            // Redirection vers la page spécifique de l'utilisateur
            window.location.href = users[username].redirect;
        } else {
            errorMessage.textContent = 'Identifiant ou mot de passe incorrect';
            console.log('Mot de passe incorrect');
        }
    } else {
        errorMessage.textContent = 'Identifiant ou mot de passe incorrect';
        console.log('Identifiant incorrect');
    }
}
