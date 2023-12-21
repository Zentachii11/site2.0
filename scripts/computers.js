function createComputerBlock(computerData) {
    const computerLink = document.createElement('a');
    computerLink.href = '#!';
    computerLink.className = 'computer-link';
  
    const blockImg = document.createElement('div');
    blockImg.className = 'block-img';
  
    const textBlock = document.createElement('div');
    textBlock.className = 'text-block';
    const profitable = document.createElement('div');
    profitable.className = 'profitable';
    profitable.textContent = 'Выгодно!';
    textBlock.appendChild(profitable);
    blockImg.appendChild(textBlock);
  
    const compImg = document.createElement('img');
    compImg.className = 'comp-img';
    compImg.src = './img/comp_img.svg';
    compImg.alt = '';
    blockImg.appendChild(compImg);
    computerLink.appendChild(blockImg);
  
    const textContainerFlex = document.createElement('div');
    textContainerFlex.className = 'text-container-flex';
  
    const textContainer1 = document.createElement('div');
    textContainer1.className = 'text-container';
    const textComputer1 = document.createElement('div');
    textComputer1.className = 'text-computer1';
    textComputer1.textContent = computerData.title;
    const textComputer2 = document.createElement('div');
    textComputer2.className = 'text-computer2';
    textComputer2.textContent = computerData.description;
    textContainer1.appendChild(textComputer1);
    textContainer1.appendChild(textComputer2);
    textContainerFlex.appendChild(textContainer1);
  
    const textContainer2 = document.createElement('div');
    textContainer2.className = 'text-container';
    const textComputer3 = document.createElement('div');
    textComputer3.className = 'text-computer3';
    textComputer3.textContent = computerData.price + '₽';
    const textComputer4 = document.createElement('div');
    textComputer4.className = 'text-computer3';
    textComputer4.textContent = computerData.price_per_month + '₽';
    textContainer2.appendChild(textComputer3);
    textContainer2.appendChild(textComputer4);
    textContainerFlex.appendChild(textContainer2);
  
    computerLink.appendChild(textContainerFlex);
  
    const separator = document.createElement('div');
    separator.className = 'separator';
    const sepImg = document.createElement('img');
    sepImg.className = 'sep-img';
    sepImg.src = './img/separator.svg';
    sepImg.alt = '';
    separator.appendChild(sepImg);
    computerLink.appendChild(separator);
  
    const compInfo = document.createElement('div');
    compInfo.className = 'comp-info';
  
    const createCompSpec = (iconSrc, text) => {
      const compSpec = document.createElement('div');
      compSpec.className = 'comp-spec';
      const icon = document.createElement('img');
      icon.src = iconSrc;
      icon.alt = '';
      const textSpec = document.createElement('div');
      textSpec.className = 'text-spec';
      textSpec.textContent = text;
      compSpec.appendChild(icon);
      compSpec.appendChild(textSpec);
      return compSpec;
    };
  
    compInfo.appendChild(createCompSpec('./img/icon-gpu.svg', computerData.gpu));
    compInfo.appendChild(createCompSpec('./img/icon-cpu.svg', computerData.cpu));
    compInfo.appendChild(createCompSpec('./img/icon-temp.svg', computerData.cooling));
    compInfo.appendChild(createCompSpec('./img/icon-ram.svg', computerData.ram));
  
    computerLink.appendChild(compInfo);
  
    return computerLink;
  }
  
  fetch('http://localhost:3000/computers')
    .then(response => response.json())
    .then(data => {
      const computerContainer = document.getElementById('computerContainer');
      data.computers.forEach(computer => {
        const computerLink = createComputerBlock(computer);
        computerContainer.appendChild(computerLink);
      });
    })
    .catch(error => {
      console.error('Ошибка при получении данных о компьютерах:', error);
    });
  