// Mockup de projetos
const projects = [
    { id: 1, name: "Projeto A", description: "Descrição do Projeto A" },
    { id: 2, name: "Projeto B", description: "Descrição do Projeto B" }
];

// Carregar projetos na tela
function loadProjects() {
    const projectList = document.getElementById('project-list');
    projectList.innerHTML = '';
    projects.forEach(project => {
        const projectCard = document.createElement('div');
        projectCard.className = 'project-card';
        projectCard.innerHTML = `
                    <h3>${project.name}</h3>
                    <p>${project.description}</p>
                `;
        projectList.appendChild(projectCard);
    });
    // Atualiza opções do select de exclusão
    const deleteSelect = document.getElementById('delete-project-select');
    if (deleteSelect) {
        deleteSelect.innerHTML = '';
        projects.forEach(project => {
            const option = document.createElement('option');
            option.value = project.id;
            option.textContent = project.name;
            deleteSelect.appendChild(option);
        });
    }
}
// Modal para excluir projeto
function openDeleteModal() {
    document.getElementById('delete-project-modal').style.display = 'flex';
}

function closeDeleteModal() {
    document.getElementById('delete-project-modal').style.display = 'none';
}

function deleteProject() {
    const select = document.getElementById('delete-project-select');
    const projectId = parseInt(select.value);
    if (!isNaN(projectId)) {
        const idx = projects.findIndex(p => p.id === projectId);
        if (idx !== -1) {
            projects.splice(idx, 1);
            loadProjects();
            closeDeleteModal();
        }
    }
}

// Alterar foto de perfil
document.getElementById('profile-pic').addEventListener('click', () => {
    document.getElementById('profile-pic-upload').click();
});

document.getElementById('profile-pic-upload').addEventListener('change', (event) => {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
            document.getElementById('profile-pic').src = e.target.result;
        };
        reader.readAsDataURL(file);
    }
});

// Modal para novo projeto
function openModal() {
    document.getElementById('new-project-modal').style.display = 'flex';
}

function closeModal() {
    document.getElementById('new-project-modal').style.display = 'none';
    document.getElementById('project-name').value = '';
}

function createProject() {
    const projectName = document.getElementById('project-name').value;
    if (projectName) {
        projects.push({
            id: projects.length + 1,
            name: projectName,
            description: `Descrição do ${projectName}`
        });
        loadProjects();
        closeModal();
    } else {
        alert('Por favor, insira um nome para o projeto.');
    }
}

// Carregar projetos ao iniciar
loadProjects();