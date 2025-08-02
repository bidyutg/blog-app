// Toggle content visibility
function toggleContent(articleId) {
  const short = document.getElementById('short-content-' + articleId);
  const full = document.getElementById('full-content-' + articleId);
  const btn = document.getElementById('see-more-btn-' + articleId);

  if (full.style.display === 'none' || full.style.display === '') {
    full.style.display = 'block';
    short.style.display = 'none';
    btn.textContent = 'See Less';
  } else {
    full.style.display = 'none';
    short.style.display = 'block';
    btn.textContent = 'See More';
  }
}

// Simulated Like
function likeArticle(articleId) {
  alert("You liked this article!");
  // Later: integrate with backend
}

// Add comment dynamically
function submitComment(articleId) {
  const input = document.getElementById('comment-input-' + articleId);
  const commentsList = document.getElementById('comments-' + articleId);
  const comment = input.value.trim();

  if (comment) {
    const commentElement = document.createElement('p');
    commentElement.textContent = '💬 ' + comment;
    commentsList.appendChild(commentElement);
    input.value = '';
  }
}
