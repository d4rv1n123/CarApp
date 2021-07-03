var URI = "https://localhost:44311/api/car";

async function fetchCars() {
    const response = await fetch(URI);
    const data = await response.json();
    console.log(data);
    drawTable(data);
  }

  fetchCars();


function drawTable(data)
{
  for(var i=0;i<data.length;i++){
    document.querySelector('table').innerHTML+=
    '<tbody>'
      +'<tr>'
        +'<th scope="row">'+ data[i].id +'</th>'
        +'<td>' + data[i].make +'</td>'
        +'<td>' + data[i].model + '</td>'
        +'<td>' + data[i].price + '$'+ '</td>'
      +'</tr>'
    +'</tbody>'
  }
}

var btn = document.getElementById('submit');
var btn2 = document.getElementById('delete');

btn.onclick = function()
{
  var inputs = document.querySelectorAll('input');

  var xhr = new XMLHttpRequest();
  xhr.open("POST", URI);

  xhr.setRequestHeader("Accept", "application/json");
  xhr.setRequestHeader("Content-Type", "application/json");

  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4) {
        console.log(xhr.status);
        console.log(xhr.responseText);
    }};

    console.log(inputs[2].textContent);

  var data = `{
    "make": "${inputs[0].value}",
    "model": "${inputs[1].value}",
    "price": ${inputs[2].value}
  }`;

  xhr.send(data);
  location.reload();
}

btn2.onclick = function()
{
  fetch(URI+'/' + document.querySelectorAll('input')[3].value, {
    method: 'delete',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({id: btn2.value})
  })
  location.reload();
}

