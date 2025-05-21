/**
 * JamieLinks - Personal Links Page
 * 
 * This script handles the interactive elements of the links page,
 * including toggling visibility for about me and GitHub projects sections.
 */

// DOM content loaded event listener to ensure all elements are available
document.addEventListener('DOMContentLoaded', function() {
    // Add listeners to toggle buttons
    document.getElementById('about-me-btn').addEventListener('click', function(e) {
        e.preventDefault();
        toggleElement('about-me-container');
    });
    
    document.getElementById('github-projects-btn').addEventListener('click', function(e) {
        e.preventDefault();
        toggleElement('github-projects-container');
    });
    
    // Add skills showcase toggle button event listener
    const skillsShowcaseBtn = document.getElementById('skills-showcase-btn');
    if (skillsShowcaseBtn) {
        skillsShowcaseBtn.addEventListener('click', function(e) {
            e.preventDefault();
            toggleElement('skills-showcase-container');
        });
    }

    // Add blog section toggle button event listener
    const blogSectionBtn = document.getElementById('blog-section-btn');
    if (blogSectionBtn) {
        blogSectionBtn.addEventListener('click', function(e) {
            e.preventDefault();
            toggleElement('blog-section-container');
        });
    }

    // Add testimonials toggle button event listener
    const testimonialsBtn = document.getElementById('testimonials-btn');
    if (testimonialsBtn) {
        testimonialsBtn.addEventListener('click', function(e) {
            e.preventDefault();
            toggleElement('testimonials-container');
        });
    }
    
    // Add smooth transition to popup close action
    const popupClose = document.querySelector('.popup-close');
    if (popupClose) {
        popupClose.addEventListener('click', function(e) {
            e.preventDefault();
            const overlay = document.querySelector('.overlay');
            overlay.style.visibility = 'hidden';
            overlay.style.opacity = '0';
            // Fix to ensure popup scales back properly
            const popup = document.querySelector('.popup');
            if (popup) {
                popup.style.transform = 'scale(0)';
                popup.style.top = '-43%';
            }
            // Optional: only go back if there's history to go back to
            setTimeout(function() {
                if (window.history.length > 1) {
                    history.back();
                }
            }, 300);
        });
    }
    
    // Fix profile picture popup
    const profilePicture = document.getElementById('profilePicture');
    if (profilePicture) {
        profilePicture.addEventListener('click', function(e) {
            const overlay = document.querySelector('.overlay');
            const popup = document.querySelector('.popup');
            if (overlay && popup) {
                overlay.style.visibility = 'visible';
                overlay.style.opacity = '1';
                popup.style.transform = 'scale(1)';
                popup.style.top = '0';
            }
        });
    }
    
    // Add contact form toggle button event listener
    const contactFormBtn = document.getElementById('contact-form-btn');
    if (contactFormBtn) {
        contactFormBtn.addEventListener('click', function(e) {
            e.preventDefault();
            toggleElement('contact-form-container');
        });
    }
    
    // Add share buttons toggle event listener
    const sharePageBtn = document.getElementById('share-page-btn');
    if (sharePageBtn) {
        sharePageBtn.addEventListener('click', function(e) {
            e.preventDefault();
            toggleElement('share-buttons-container');
        });
    }
    
    // Add music player toggle event listener
    const musicPlayerBtn = document.getElementById('music-player-btn');
    if (musicPlayerBtn) {
        musicPlayerBtn.addEventListener('click', function(e) {
            e.preventDefault();
            toggleElement('music-player-container');
        });
    }
    
    // Check if localStorage is available for visit counter
    if (typeof(Storage) !== "undefined") {
        // Create visit counter element
        const visitCounterContainer = document.createElement('div');
        visitCounterContainer.id = 'visit-counter';
        
        // Get current count or initialize
        let visits = localStorage.getItem('visit-counter') || 0;
        visits = parseInt(visits) + 1;
        localStorage.setItem('visit-counter', visits);
        
        // Display the counter
        visitCounterContainer.innerHTML = `<span>Visit count: ${visits}</span>`;
        
        // Add to footer
        const footer = document.querySelector('footer');
        if (footer) {
            footer.appendChild(visitCounterContainer);
        }
    }
    
    // Create theme toggle button
    const themeToggle = document.createElement('button');
    themeToggle.id = 'theme-toggle';
    themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
    themeToggle.title = 'Toggle Dark/Light Mode';
    document.body.appendChild(themeToggle);
    
    // Check for saved theme preference
    const savedTheme = localStorage.getItem('theme') || 'dark';
    document.body.classList.add(savedTheme);
    updateToggleIcon(savedTheme === 'light');
    
    // Add click event for theme toggle
    themeToggle.addEventListener('click', function() {
        if (document.body.classList.contains('dark')) {
            document.body.classList.replace('dark', 'light');
            localStorage.setItem('theme', 'light');
            updateToggleIcon(true);
        } else {
            document.body.classList.replace('light', 'dark');
            localStorage.setItem('theme', 'dark');
            updateToggleIcon(false);
        }
    });
    
    // Set up music player if available
    setupMusicPlayer();
});

/**
 * Toggle an element's visibility with a smooth transition
 * @param {string} elementId - The ID of the element to toggle
 * @returns {void}
 */
function toggleElement(elementId) {
    const element = document.getElementById(elementId);
    if (!element) {
        console.error(`Element with ID "${elementId}" not found.`);
        return;
    }
    
    // Toggle display with smooth transition
    if (element.style.display === 'none' || element.style.display === '') {
        element.style.display = 'block';
        // Use setTimeout to allow CSS transition to work
        setTimeout(() => {
            element.style.opacity = '1';
            element.classList.add('visible');
        }, 10);
    } else {
        element.style.opacity = '0';
        element.classList.remove('visible');
        // Wait for transition to complete before hiding
        setTimeout(() => {
            element.style.display = 'none';
        }, 300);
    }
}

/**
 * Legacy toggle functions for backward compatibility
 * @deprecated Use toggleElement instead
 */
function toggleGithubProjects() {
    toggleElement('github-projects-container');
}

function toggleAboutMe() {
    toggleElement('about-me-container');
}

/**
 * Updates the theme toggle icon based on the current theme
 * @param {boolean} isLight - Whether the theme is light or dark
 */
function updateToggleIcon(isLight) {
    const themeToggle = document.getElementById('theme-toggle');
    if (themeToggle) {
        themeToggle.innerHTML = isLight ? '<i class="fas fa-sun"></i>' : '<i class="fas fa-moon"></i>';
    }
}

/**
 * Handles the submission of the contact form
 * @param {Event} event - The form submission event
 * @returns {boolean} - Always false to prevent form submission
 */
function submitContactForm(event) {
    event.preventDefault();
    
    const formStatus = document.getElementById('form-status');
    formStatus.textContent = 'Sending...';
    
    // Collect form data
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;
    
    // This is where you would normally send the data to a server
    // For demo purposes, we'll just simulate a successful submission
    setTimeout(() => {
        formStatus.textContent = 'Thank you for your message! I will get back to you soon.';
        formStatus.style.color = 'var(--accentColor)';
        document.getElementById('contact-form').reset();
        
        // Hide the form after 3 seconds
        setTimeout(() => {
            toggleElement('contact-form-container');
            formStatus.textContent = '';
        }, 3000);
    }, 1000);
    
    return false;
}

/**
 * Shares the current page on various social media platforms
 * @param {string} platform - The platform to share on (facebook, twitter, linkedin, whatsapp)
 * @returns {boolean} - Always false to prevent default link behavior
 */
function shareOnPlatform(platform) {
    const pageUrl = encodeURIComponent(window.location.href);
    const pageTitle = encodeURIComponent(document.title);
    let shareUrl;
    
    switch(platform) {
        case 'facebook':
            shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${pageUrl}`;
            break;
        case 'twitter':
            shareUrl = `https://twitter.com/intent/tweet?url=${pageUrl}&text=${pageTitle}`;
            break;
        case 'linkedin':
            shareUrl = `https://www.linkedin.com/shareArticle?mini=true&url=${pageUrl}&title=${pageTitle}`;
            break;
        case 'whatsapp':
            shareUrl = `https://api.whatsapp.com/send?text=${pageTitle}%20${pageUrl}`;
            break;
    }
    
    if (shareUrl) {
        window.open(shareUrl, '_blank', 'width=600,height=400');
    }
    
    return false;
}

/**
 * Copies the current page URL to the clipboard
 * @returns {boolean} - Always false to prevent default link behavior
 */
function copyPageUrl() {
    const shareStatus = document.getElementById('share-status');
    
    navigator.clipboard.writeText(window.location.href)
        .then(() => {
            shareStatus.textContent = 'Link copied to clipboard!';
            shareStatus.style.color = 'var(--accentColor)';
            
            setTimeout(() => {
                shareStatus.textContent = '';
            }, 2000);
        })
        .catch(err => {
            shareStatus.textContent = 'Failed to copy link';
            shareStatus.style.color = 'red';
        });
    
    return false;
}

/**
 * Sets up the music player functionality
 */
function setupMusicPlayer() {
    const playBtn = document.getElementById('play-btn');
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');
    const playlistItems = document.querySelectorAll('.playlist-item');
    
    if (!playBtn || !prevBtn || !nextBtn || playlistItems.length === 0) return;
    
    let currentTrack = 0;
    let isPlaying = false;
    let audio = new Audio();
    
    // Update player UI with track information
    function updatePlayer() {
        const current = playlistItems[currentTrack];
        document.getElementById('track-title').textContent = current.dataset.title;
        document.getElementById('track-artist').textContent = current.dataset.artist;
        document.getElementById('album-art').src = current.dataset.img;
        audio.src = current.dataset.src;
        
        // Update active class
        playlistItems.forEach(item => item.classList.remove('active'));
        current.classList.add('active');
    }
    
    // Play/pause functionality
    function togglePlay() {
        if (isPlaying) {
            audio.pause();
            playBtn.innerHTML = '<i class="fas fa-play"></i>';
        } else {
            audio.play();
            playBtn.innerHTML = '<i class="fas fa-pause"></i>';
        }
        isPlaying = !isPlaying;
    }
    
    // Set up event listeners
    playBtn.addEventListener('click', togglePlay);
    
    prevBtn.addEventListener('click', () => {
        currentTrack = (currentTrack - 1 + playlistItems.length) % playlistItems.length;
        updatePlayer();
        if (isPlaying) {
            audio.play();
        }
    });
    
    nextBtn.addEventListener('click', () => {
        currentTrack = (currentTrack + 1) % playlistItems.length;
        updatePlayer();
        if (isPlaying) {
            audio.play();
        }
    });
    
    // Set up playlist item clicks
    playlistItems.forEach((item, index) => {
        item.addEventListener('click', () => {
            currentTrack = index;
            updatePlayer();
            isPlaying = false;
            togglePlay();
        });
    });
    
    // Initialize the player with the first track
    updatePlayer();
}
