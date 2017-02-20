var form = document.getElementById('url-form');
form.addEventListener('submit', function(e) {
    e.preventDefault();
    var uri = document.getElementById('uri-box').value;
    var uriParts = parseUri(uri);
    render(uriParts);
});

function render(uriParts) {
    document.getElementById('parts').className = '';
    for (var key in uriParts) {
        document.getElementById(key + '-value').innerHTML = uriParts[key];
    }
}

function parseUri(uri) {
    var uriParts = {
        scheme: '',
        authority: '',
        path: '',
        query: '',
        fragment: ''
    }; 

    var str  = document.getElementById('uri-box').value;
    var next = false;
    var next_2 = true;
    var start = 0;
   	var end = str.indexOf("://");
   	if (end < 0)
   		end = str.indexOf(":");
   	if (end < 0)
   		next = false;
   	else{
	   	uriParts.scheme = str.substring(start,end);
	   	next = true;
	   	if (str.indexOf("://") > -1)
   			start = end + 3;
   		else start = end + 1;
   		str = str.substring(start);
   	}

   	//AUTHORITY
   	if (next){
	   	end = str.indexOf("/");
	   	if (end < 0){
	   		uriParts.authority = str;
	   		end = str.indexOf("?");
	   		next = false;
	   	}
	   	if (end < 0){
	   		uriParts.authority = str;
	   		end = str.indexOf("#");
	   		next = false;
	   	}
	   	if (end < 0){
	   		uriParts.authority = str;
	   		end = str.indexOf("#");
	   		next = false;
	   	}
	   	else{
	   		uriParts.authority = str.substring(0,end);
	   		start = end;
	   		str = str.substring(start);
	   		next = true;
	   	}
	}

   	//PATH
   	if (next){
	   	end = str.indexOf("?");
	   	var tmp = str.indexOf("#")
	   	if (end < 0){
	   		end = str.indexOf("#");
	   		next_2 = false;
	   	}
	   	else if (tmp < end && tmp > -1){
	   		end = tmp;
	   		next_2 = false;
	   	}
	   	if (end < 0){
	   		uriParts.path = str;
	   		next = false;
	   	}
	   	else{
	   		uriParts.path = str.substring(0,end);
	   		start = end + 1;
	   		str = str.substring(start);
	   		next = true;
	   	}
	}

   	//QUERY
   	if (next){
	   	end = str.indexOf("#");
	   	if (end < 0 && next_2){
	   		uriParts.query = str;
	   		next = false;
	   	}
	   	else {
	   		uriParts.query = str.substring(0,end);
	   		start = end + 1;
	   		str = str.substring(start);
	   		next = true;
	   	}
	}

   	if (next)
   		uriParts.fragment = str;


    return uriParts;
}