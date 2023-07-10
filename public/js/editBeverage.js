const editBeverage = async (event) => {
    event.preventDefault();
  
    const submitButton = document.getElementById('submit-button')
    const beverage_id = submitButton.getAttribute('data-id');    
    const name = document.querySelector('#beverage-name').value.trim();
    const description = document.querySelector('#beverage-desc').value.trim();
    const price = document.querySelector('#beverage-price').value.trim();
    const in_stock = document.querySelector('#instock').checked;
    const has_alcohol = document.querySelector('#has_alcohol').checked;

    // const image = document.querySelector('#image').value.trim();

    const response = await fetch(`/api/beverages/${beverage_id}`, {
    method: 'PUT',
    body: JSON.stringify({ name, description, price, in_stock, has_alcohol }),
    headers: {
        'Content-Type': 'application/json',
    },
    });

    if (response.ok) {
    document.location.replace('/dashboard/menu');
    } else {
    alert('Failed to update beverage');
    }
  };

  document.getElementById('submit-button').addEventListener('click', editBeverage);