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
  var userDatas = JSON.parse(xhttp.responseText)[2].data;
  deleteObject(userDatas, 'dead', 'true');
  advBubbleSort(userDatas, 'name');

  for (var i = 0; i < userDatas.length; i++) {
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
