 // Function to toggle content visibility
 function toggleContent(articleId) {
    var shortContent = document.getElementById('short-content-' + articleId);
    var fullContent = document.getElementById('full-content-' + articleId);
    var button = document.getElementById('see-more-btn-' + articleId);
    
    // Toggle the visibility of the content and button text
    if (fullContent.style.display === 'none') {
        fullContent.style.display = 'block';
        button.textContent = 'See Less';
    } else {
        fullContent.style.display = 'none';
        button.textContent = 'See More';
    }
}