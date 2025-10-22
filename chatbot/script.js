function toggleChat() {
            const panel = document.getElementById('chatPanel');
            panel.classList.toggle('open');
        }

        function sendMessage() {
            const input = document.getElementById('messageInput');
            const messages = document.getElementById('chatMessages');
            const msg = input.value.trim();

            if (!msg) return;

            messages.innerHTML += `<div class="message user-message">${msg}</div>`;
            input.value = '';

            setTimeout(() => {
                const responses = [
                    "Entendi! Como posso ajudar mais?",
                    "Ótima pergunta! O que mais você precisa?",
                    "Perfeito! Estou aqui para auxiliar."
                ];
                const randomResponse = responses[Math.floor(Math.random() * responses.length)];
                messages.innerHTML += `<div class="message bot-message">${randomResponse}</div>`;
                messages.scrollTop = messages.scrollHeight;
            }, 1000);
        }