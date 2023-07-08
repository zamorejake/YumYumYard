const addBeverage = async (event) => {
    event.preventDefault();
     
    const name = document.querySelector('#beverage-name').value.trim();
    const description = document.querySelector('#beverage-desc').value.trim();
    const price = document.querySelector('#beverage-price').value.trim();
    const in_stock = document.querySelector('#instock').checked;
    const has_alcohol = document.querySelector('#has_alcohol').checked;

    // const image = document.querySelector('#image').value.trim();

    const response = await fetch(`/api/beverages/`, {
    method: 'POST',
    body: JSON.stringify({ name, description, price, in_stock, has_alcohol }),
    headers: {
        'Content-Type': 'application/json',
    },
    });

    console.log(response.body)

    if (response.ok) {
        document.location.replace('/dashboard/menu');
    } else {
    alert('Failed to add beverage');
    }
  };

  document.getElementById('submit-button').addEventListener('click', addBeverage);