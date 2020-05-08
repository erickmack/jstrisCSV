function convertToCSV(objArray) {
  const array = typeof objArray != "object" ? JSON.parse(objArray) : objArray;
  let str = "";

  for (let i = 0; i < array.length; i++) {
    let line = "";
    for (let index in array[i]) {
      if (line != "") line += ",";

      line += array[i][index];
    }

    str += line + "\r\n";
  }

  return str;
}

function exportCSVFile(headers, items, fileName) {
  if (headers) {
    items.unshift(headers);
  }

  const jsonObject = JSON.stringify(items);

  const csv = convertToCSV(jsonObject);

  const exportName = fileName + ".csv" || "export.csv";

  const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
  if (navigator.msSaveBlob) {
    navigator.msSaveBlob(blob, exportName);
  } else {
    const link = document.createElement("a");
    if (link.download !== undefined) {
      const url = URL.createObjectURL(blob);
      link.setAttribute("href", url);
      link.setAttribute("download", exportName);
      link.style.visibility = "hidden";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  }
}

const headers = {
  id: "id",
  gid: "gid",
  cid: "cid",
  gametime: "gametime",
  sent: "sent",
  attack: "attack",
  rep: "rep",
  pcs: "pcs",
  players: "players",
  r1v1: "r1v1",
  pos: "pos",
  vs: "versus",
  gtime: "gametimes",
};

function startUp() {
  let username = document.querySelector("#username").value;
  let amount = document.querySelector("#amount").value;
  let data = [];
  for (let i = 0; i < parseInt(amount); i += 50) {
    fetch(
      `https://cors-anywhere.herokuapp.com/https://jstris.jezevec10.com/api/u/${username}/live/games?offset=${i}`
    )
      .then((response) => response.json())
      .then((predata) => {
        data.push(...predata);
      });
  }
  setTimeout(function () {
    exportCSVFile(headers, data, "Stats");
  }, 5000);
}

//exportCSVFile(headers, data, "Stats");
