const delEntree = async (event) => {
  if (event.target.hasAttribute('data-id')) {
    const id = event.target.getAttribute('data-id');

    const response = await fetch(`/api/entrees/${id}`, {
      method: 'DELETE',
    });

    if (response.ok) {
      document.location.replace('/dashboard');
    } else {
      alert('Failed to delete entree');
    }
  }
};

document.getElementById('submit-button').addEventListener('click', delEntree);