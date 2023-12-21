async function getUserId() {

}


async function fetchComputersAndPopulateSelect() {
  try {
    const computersResponse = await fetch('http://localhost:3000/computers');
    
    if (!computersResponse.ok) {
      throw new Error('Ошибка при получении данных о компьютерах');
    }

    const computersData = await computersResponse.json();
    const computers = computersData.computers;

    const selectComputer = document.getElementById('computerSelect');

    computers.forEach(computer => {
      const option = document.createElement('option');
      option.value = computer.id;
      option.textContent = `${computer.title} (${computer.description}, ${computer.gpu}, ${computer.cpu}, ${computer.cooling}, ${computer.ram}) - Цена: ${computer.price} (${computer.price_per_month})`;
      selectComputer.appendChild(option);
    });

  } catch (error) {
    console.error('Ошибка:', error);
  }
}

async function createOrder() {
  try {
    const token = localStorage.getItem('token');

    const selectedComputerId = document.querySelector('#computerSelect').value;
    const customerName = document.getElementById('nameInput').value;
    const email = document.getElementById('emailInput').value;
    const phoneNumber = document.getElementById('numberInput').value;
    const deliveryAddress = document.getElementById('addressInput').value;
    const selectedPaymentMethod = document.querySelector('input[name="paymentMethod"]:checked').value;

    const orderData = {
      user_id: null,
      computer_id: selectedComputerId,
      customer_name: customerName,
      email: email,
      phone_number: phoneNumber,
      delivery_address: deliveryAddress,
      payment_method: selectedPaymentMethod
    };

    const response = await fetch('http://localhost:3000/createOrder', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(orderData)
    });

    if (!response.ok) {
      throw new Error('Ошибка при создании заказа');
    }

    const result = await response.json();
    console.log('Заказ успешно создан:', result);
    alert('Заказ оформлен');
  } catch (error) {
    console.error('Ошибка:', error);
  }
}

window.addEventListener('DOMContentLoaded', async () => {
  await fetchComputersAndPopulateSelect();
});

document.querySelector('.main-btn').addEventListener('click', async function() {
  await createOrder();
});
