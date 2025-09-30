// Carregar tarefas do localStorage ao iniciar
        let tasks = JSON.parse(localStorage.getItem('tasks')) || {
            todo: [],
            doing: [],
            done: []
        };

        // Função para salvar tarefas no localStorage
        function saveTasks() {
            localStorage.setItem('tasks', JSON.stringify(tasks));
        }

        // Função para criar um card
        function createCard(task) {
            const card = document.createElement('div');
            card.className = 'card';
            card.draggable = true;
            card.dataset.id = task.id;
            card.innerHTML = `
                <h3>${task.title}</h3>
                <p>${task.description.substring(0, 50)}${task.description.length > 50 ? '...' : ''}</p>
            `;
            card.addEventListener('dragstart', dragStart);
            card.addEventListener('dragend', dragEnd);
            return card;
        }

        // Carregar tarefas na inicialização
        function loadTasks() {
            ['todo', 'doing', 'done'].forEach(status => {
                const dropzone = document.querySelector(`.dropzone[data-status="${status}"]`);
                dropzone.innerHTML = ''; // Limpar dropzone
                tasks[status].forEach(task => {
                    dropzone.appendChild(createCard(task));
                });
            });
            // Atualiza opções do select de exclusão
            const deleteSelect = document.getElementById('delete-task-select');
            if (deleteSelect) {
                deleteSelect.innerHTML = '';
                ['todo', 'doing', 'done'].forEach(status => {
                    tasks[status].forEach(task => {
                        const option = document.createElement('option');
                        option.value = task.id;
                        option.textContent = `${task.title} (${status})`;
                        deleteSelect.appendChild(option);
                    });
                });
            }
        }
        // Modal para excluir tarefa
        function openDeleteTaskModal() {
            document.getElementById('delete-task-modal').style.display = 'flex';
        }

        function closeDeleteTaskModal() {
            document.getElementById('delete-task-modal').style.display = 'none';
        }

        function deleteTask() {
            const select = document.getElementById('delete-task-select');
            const taskId = select.value;
            let found = false;
            ['todo', 'doing', 'done'].forEach(status => {
                const idx = tasks[status].findIndex(t => t.id === taskId);
                if (idx !== -1) {
                    tasks[status].splice(idx, 1);
                    found = true;
                }
            });
            if (found) {
                saveTasks();
                loadTasks();
                closeDeleteTaskModal();
            }
        }

        // Funções para o modal
        function openModal() {
            document.getElementById('taskModal').style.display = 'block';
        }

        function closeModal() {
            document.getElementById('taskModal').style.display = 'none';
            document.getElementById('taskForm').reset();
        }

        // Fechar modal ao clicar fora
        window.onclick = function(event) {
            const modal = document.getElementById('taskModal');
            if (event.target === modal) {
                closeModal();
            }
        }

        // Adicionar nova tarefa
        document.getElementById('taskForm').addEventListener('submit', function(e) {
            e.preventDefault();
            const title = document.getElementById('title').value;
            const description = document.getElementById('description').value;
            const task = {
                id: Date.now().toString(), // ID único baseado no timestamp
                title,
                description
            };

            // Adicionar ao array de tarefas
            tasks.todo.push(task);
            saveTasks();

            // Adicionar ao DOM
            const card = createCard(task);
            document.querySelector('#todo .dropzone').appendChild(card);

            closeModal();
        });

        // Configurar dropzones
        const dropzones = document.querySelectorAll('.dropzone');
        dropzones.forEach(zone => {
            zone.addEventListener('dragover', dragOver);
            zone.addEventListener('drop', drop);
        });

        // Funções de drag and drop
        function dragStart(e) {
            e.dataTransfer.setData('text/plain', this.dataset.id);
            this.classList.add('dragging');
            setTimeout(() => this.classList.add('invisible'), 0);
        }

        function dragEnd(e) {
            this.classList.remove('dragging', 'invisible');
        }

        function dragOver(e) {
            e.preventDefault();
        }

        function drop(e) {
            e.preventDefault();
            const taskId = e.dataTransfer.getData('text/plain');
            const card = document.querySelector(`.card[data-id="${taskId}"]`);
            if (card) {
                const targetStatus = this.dataset.status;
                
                // Atualizar o array de tarefas
                ['todo', 'doing', 'done'].forEach(status => {
                    tasks[status] = tasks[status].filter(task => task.id !== taskId);
                });
                const task = tasks.todo.find(t => t.id === taskId) || 
                            tasks.doing.find(t => t.id === taskId) || 
                            tasks.done.find(t => t.id === taskId);
                tasks[targetStatus].push(task);
                
                // Atualizar o DOM
                this.appendChild(card);
                saveTasks();
            }
        }

        // Carregar tarefas ao iniciar
        loadTasks();