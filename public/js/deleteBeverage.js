const delBeverage = async (event) => {
    const submitButton = document.getElementById('submit-button')
    const id = submitButton.getAttribute('data-id');
  
    const response = await fetch(`/api/beverages/${id}`, {
    method: 'DELETE',
    });

    if (response.ok) {
        document.location.replace('/dashboard');
    } else {
        alert('Failed to delete beverage');
    }
  };

  document.getElementById('submit-button').addEventListener('click', delBeverage);