const addEntree = async (event) => {
    event.preventDefault();
  
    const name = document.querySelector('#entree-name').value.trim();
    const description = document.querySelector('#entree-desc').value.trim();
    const price = document.querySelector('#entree-price').value.trim();
    const in_stock = document.querySelector('#instock').checked;
    const allergy = document.querySelector('#allergy').value.trim();

    // const image = document.querySelector('#image').value.trim();

    const response = await fetch(`/api/entrees/`, {
    method: 'POST',
    body: JSON.stringify({ name, description, price, in_stock, allergy }),
    headers: {
        'Content-Type': 'application/json',
    },
    });

    console.log(response.body)

    if (response.ok) {
    document.location.replace('/dashboard/menu');
    } else {
    alert('Failed add entree');
    }
  };

  document.getElementById('submit-button').addEventListener('click', addEntree);