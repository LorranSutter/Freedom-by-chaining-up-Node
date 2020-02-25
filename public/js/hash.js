function randomHash(size) {
	var result = [];
    var AlphaNumber = "0123456789abcdefghijklmnopqrstuvxyz0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"; 
    for (var i = 0 ; i < size; i++) { 
    	var  index = AlphaNumber.length * Math.random();
      result.push(AlphaNumber.charAt(index));
    }
    return(result.join(""));
}
function sendReceive(size) {
	var result = [];
    var AlphaNumber = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvxyz"; 
    for (var i = 0 ; i < size; i++) { 
    	var  index = AlphaNumber.length * Math.random();
      result.push(AlphaNumber.charAt(index));
    }
    return(result.join(""));
}

function randomDate(startDate, endDate) {
  return new Date(startDate.getTime() + Math.random() * (startDate.getTime() - endDate.getTime()));
}

function hashTable() {
  var size = 20;
  var table = document.querySelector("#table-realtime-transactions tbody");    
  for (var i = 0 ; i < 10; i++) { 
      var row = table.insertRow();
      var hash = row.insertCell(0);
      var dttime = row.insertCell(1);
      var send = row.insertCell(2);
      var receive = row.insertCell(3);
      var s = sendReceive(6);
      var r = sendReceive(6);

      hash.innerHTML = randomHash(size);
      dttime.innerHTML = randomDate(new Date(2020,01,01), new Date).getTime();
      send.innerHTML = s;
      receive.innerHTML = r;
  }
}

hashTable();