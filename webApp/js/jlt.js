function nextPicture(next){
	var pictureDiv = document.getElementById('imagesDiv');
	var images = pictureDiv.getElementsByTagName('img');
	for (var i = 0; i < images.length; i++) {
		if(images[i].style.display == ''){
			images[i].style.display = 'none';
			if(next == 1){
				if(i == images.length -1)
					images[0].style.display = '';
				else
					images[i+1].style.display = '';
			}
			else
			{
				if(i==0)
					images[images.length-1].style.display ='';
				else
					images[i-1].style.display = '';

			}
			break;
		}
		
	}

}



 function showSample(e){
 	var div;
 	if(e.target.tagName == 'IMG')
 	 div = e.target.parentElement.parentElement;
 	else
 		div = e.target.parentElement;
 	var id = div.id;
 	var pictureDiv = document.getElementById('imagesDiv');
 	pictureDiv.innerHTML =''
 	var img;
 	$.post("getJLTFiles",{'id':id}, function(data){
        for (var i = data.length - 1; i >= 0; i--) {
        	
        	img =document.createElement('img');
        	img.src = './samples/'+id+'/'+data[i];
        	img.classList.add('showcaseSamples')
        	if(i==0)
        		img.style.display = '';
        	else
        		img.style.display = 'none';
        	pictureDiv.append(img);
        }
              });
    document.getElementById('samplesDiv').style.display = 'none';
    document.getElementById('sampleDiv').style.display = '';
    document.getElementById('closeIcon').style.display = '';

  }