/**
 * Created by admin on 28.04.2017.
 */
//if(typeof(EventSource) !== "undefined"){
//    var source = new EventSource("/notification");
//    source.onmessage = function(e){
//        self.postMessage(e.data);
//    }
//}else{
//    console.log('!');
//}

var counter = 0;

onmessage = function(e){
    counter = e.data;
}

request();

setInterval(function(){
    request();
}, 3000);

function request(){
    var xhr = new XMLHttpRequest();
    xhr.open('POST', '/new-orders');
    xhr.send();

    xhr.onreadystatechange = function(){

        if(xhr.readyState != 4) return;
        if(xhr.status == 200 && counter != JSON.parse(xhr.responseText).length){
            //console.log(counter);
            self.postMessage(JSON.parse(xhr.responseText));
        }
    };
}