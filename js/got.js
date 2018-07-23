function getData(url, callbackFunc) {
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function ifItsReady() {
    if (this.readyState === 4 && this.status === 200) {
      callbackFunc(this);
    }
  };
  xhttp.open('GET', url, true);
  xhttp.send();
}

function successAjax(xhttp) {
  let userDatas = JSON.parse(xhttp.responseText)[2].data;
  deleteObject(userDatas, 'dead', 'true');
  advBubbleSort(userDatas, 'name');
  showCharacters(userDatas);

  for (let i = 0; i < userDatas.length; i++) {
    console.log(userDatas[i].name);
  }
}

getData('/json/characters.json', successAjax);

function deleteObject(arrayToClean, keyToSearchIn, valueToSearch) {
  for (let i = 0; i < arrayToClean.length; i++) {
    if (arrayToClean[i][`${keyToSearchIn}`] === valueToSearch) {
      arrayToClean.splice(i, 1);
      i -= 1;
    }
  }
}

function advBubbleSort(arrayToSort, key) {
  let i = arrayToSort.length - 1; let j = 0;
  while (i >= 2) {
    let swap = 0;
    for (j = 0; j < i; j++) {
      if ( (arrayToSort[j][`${key}`] > arrayToSort[j + 1][`${key}`])) {
        [arrayToSort[j], arrayToSort[j + 1]] = [arrayToSort[j + 1], arrayToSort[j]];
        swap = j;
      }
    }
    i = swap;
  }
}

function showCharacters(dataList) {
  let characterList = document.querySelector('.character-list');
  let listDiv = createListDiv(characterList);
  for (let i = 0; i < dataList.length; i++) {
    createCharacter(listDiv, dataList[i]);
  }
}

function createListDiv(dataList) {
  let listDiv = dataList.querySelector('.list-div');
  if (!listDiv) {
    listDiv = document.createElement('div');
    listDiv.className = 'list-div';
    dataList.appendChild(listDiv);
  }
  return listDiv;
}

function createCharacter(listDiv, characterData) {
  let characterItem = document.createElement('div');
  characterItem.className = 'character-item';

  let namePara = document.createElement('p');
  namePara.innerHTML = characterData.name;
  namePara.character = characterData;

  namePara.onclick = function onClickEvent() {
    showOneCharacter(this.character);
  };
  let portraitImage = createPortrait(characterData);
  characterItem.appendChild(portraitImage);

  characterItem.appendChild(namePara);
  listDiv.appendChild(characterItem);
}

function createPortrait(characterData) {
  let characterPortrait = document.createElement('img');
  characterPortrait.src = characterData.portrait;
  characterPortrait.alt = characterData.name;
  return characterPortrait;
}

function showOneCharacter(characterData) {
  let oneCharacter = document.querySelector('.one-character');
  let listDiv = createListDiv(oneCharacter);
  listDiv.innerHTML = '';

  let characterPic = createPicture(characterData);
  listDiv.appendChild(characterPic);

  let characterDataList = showDetails(characterData);
  listDiv.appendChild(characterDataList);
}

function createPicture(characterData) {
  let characterPicture = document.createElement('img');
  characterPicture.src = characterData.picture;
  characterPicture.alt = characterData.name;
  return characterPicture;
}

function showDetails(characterData) {
  let listDiv = document.createElement('div');
  listDiv.className = 'list-div';
  let oneCharacter = document.querySelector('.one-character');
  oneCharacter.appendChild(listDiv);

  if (characterData.house) {
    let houseImage = document.createElement('img');
    houseImage.src = `/assets/houses/${characterData.house}.png`;
    houseImage.alt = 'House';
    houseImage.style.float = 'right';
    listDiv.appendChild(houseImage);
  }

  let nameHeader = document.createElement('h3');
  nameHeader.innerHTML = characterData.name;
  listDiv.appendChild(nameHeader);

  let detailPara = document.createElement('p');
  detailPara.innerHTML = characterData.bio;
  listDiv.appendChild(detailPara);

  return listDiv;
}

document.querySelector('#search-button').onclick = searchCharacter;

function searchCharacter() {
  var inputValue = document.querySelector('#search-text').value;
  var characterDataList = document.querySelectorAll('.character-item p');
  for (var i = 0; i < characterDataList.length; i++) {
    if (characterDataList[i].character.name.toLowerCase() === inputValue.toLowerCase()) {
      showOneCharacter(characterDataList[i].character);
      break;
    } else {
      let container = document.querySelector('.one-character');
      let listDiv = createListDiv(container);
      listDiv.innerHTML = 'Character not found';
      listDiv.style.textAlign = 'center';
    }
  }
}
