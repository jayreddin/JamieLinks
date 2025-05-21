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
    
    // Add smooth transition to popup close action
    const popupClose = document.querySelector('.popup-close');
    if (popupClose) {
        popupClose.addEventListener('click', function(e) {
            e.preventDefault();
            document.querySelector('.overlay').style.visibility = 'hidden';
            document.querySelector('.overlay').style.opacity = '0';
            setTimeout(function() {
                history.back();
            }, 300);
        });
    }
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
