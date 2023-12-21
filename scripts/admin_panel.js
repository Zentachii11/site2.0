document.getElementById('admin_panelForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const title = document.getElementById('titleInput').value;
    const description = document.getElementById('descriptionInput').value;
    const gpu = document.getElementById('gpuInput').value;
    const cpu = document.getElementById('cpuInput').value;
    const cooling = document.getElementById('coolingInput').value;
    const ram = document.getElementById('ramInput').value;
    const price = document.getElementById('priceInput').value;
    const price_per_month = document.getElementById('price_per_monthInput').value;

    const data = {
      title,
      description,
      gpu,
      cpu,
      cooling,
      ram,
      price,
      price_per_month, 
    };

    fetch('http://localhost:3000/addComputer', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      },
      body: JSON.stringify(data),
    })
    .then(response => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error('Ошибка при добавлении ПК');
      }
    })
    .then(result => {
      console.log('ПК успешно добавлен:', result);
    })
    .catch(error => {
      console.error('Ошибка:', error);
    });
  });

async function fetchComputersAndPopulateSelect() {
  try {
    const computersResponse = await fetch('http://localhost:3000/computers');
    
    if (!computersResponse.ok) {
      throw new Error('Ошибка при получении данных о компьютерах');
    }

    const computersData = await computersResponse.json();
    const computers = computersData.computers;

    const selectComputer = document.getElementById('computerSelect');
    selectComputer.innerHTML = '';

    computers.forEach(computer => {
      const option = document.createElement('option');
      option.value = computer.id;
      option.textContent = `${computer.title} (${computer.description}) - Цена: ${computer.price}`;
      selectComputer.appendChild(option);
    });

  } catch (error) {
    console.error('Ошибка:', error);
  }
}


window.addEventListener('DOMContentLoaded', async () => {
  await fetchComputersAndPopulateSelect();
});

document.getElementById('deleteComputerBtn').addEventListener('click', function(event) {
  event.preventDefault();

  const selectComputer = document.getElementById('computerSelect');
  const selectedComputerId = selectComputer.value;

  if (selectedComputerId) {
      fetch(`http://localhost:3000/deleteComputer/${selectedComputerId}`, {
          method: 'DELETE',
          headers: {
              'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
      })
      .then(response => {
          if (response.ok) {
              return response.json();
          } else {
              throw new Error('Ошибка при удалении ПК');
          }
      })
      .then(result => {
          console.log('ПК успешно удален:', result);
          fetchComputersAndPopulateSelect();
      })
      .catch(error => {
          console.error('Ошибка:', error);
      });
  } else {
      console.error('Пожалуйста, выберите компьютер для удаления');
  }
});

