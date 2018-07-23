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

  let img = createPortrait(characterData);
  characterItem.appendChild(img);

  characterItem.appendChild(namePara);
  listDiv.appendChild(characterItem);
}

function createPortrait(characterData) {
  let img = document.createElement('img');
  img.src = characterData.portrait;
  img.alt = characterData.name;
  return img;
}
