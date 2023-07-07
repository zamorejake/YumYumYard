const newEntree = async (event) => {
  event.preventDefault();

  const name = document.querySelector('#name').value.trim();
  const description = document.querySelector('#desc').value.trim();
  const price = document.querySelector('#price').value.trim();
  const inStock = document.querySelector('#instock').value.trim();
  const allergy = document.querySelector('#allergy').value.trim();
  const image = document.querySelector('#image').value.trim();

  const response = await fetch(`/api/entrees`, {
    method: 'POST',
    body: JSON.stringify({ name, description, price, inStock, allergy, image }),
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (response.ok) {
    document.location.replace('/dashboard');
  } else {
    alert('Failed to create entree');
  }
};

const editEntree = async (event) => {
  event.preventDefault();

  if (event.target.hasAttribute('data-id')) {
    const id = event.target.getAttribute('data-id');
    const title = document.querySelector('#post-title').value.trim();
    const content = document.querySelector('#post-desc').value.trim();


    const response = await fetch(`/api/posts/${id}`, {
      method: 'PUT',
      body: JSON.stringify({ title, content }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.ok) {
      console.log('POST EDITED')
      document.location.replace('/dashboard');
    } else {
      alert('Failed to update post');
    }
  }
};

const delEntree = async (event) => {
  if (event.target.hasAttribute('data-id')) {
    const id = event.target.getAttribute('data-id');

    const response = await fetch(`/api/posts/${id}`, {
      method: 'DELETE',
    });

    if (response.ok) {
      document.location.replace('/dashboard');
    } else {
      alert('Failed to delete post');
    }
  }
};

if (document
  .querySelector('.new-post-form')) {
  document
  .querySelector('.new-post-form')
  .addEventListener('submit', newEntree);
}

if (document
  .querySelector('.edit-post-form')) {
    document.querySelector('.edit-post-form')
    .addEventListener('click', editEntree);
}

if (document
  .querySelector('.post-list')) {
  document
  .querySelector('.post-list')
  .addEventListener('click', delEntree);
}