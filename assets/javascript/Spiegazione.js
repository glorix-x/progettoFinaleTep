     function openTutorial() {
            document.getElementById('tutorialOverlay').classList.add('active');
            document.getElementById('tutorialPanel').classList.add('active');
            document.body.style.overflow = 'hidden'; // Blocca lo scroll della pagina
        }

        function closeTutorial() {
            document.getElementById('tutorialOverlay').classList.remove('active');
            document.getElementById('tutorialPanel').classList.remove('active');
            document.body.style.overflow = 'auto'; // Riabilita lo scroll
        }

        // Chiudi con ESC
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape') {
                closeTutorial();
            }
        });