const image= document.getElementById('productImg');
const btn= document.getElementsByClassName('btn');

btn[0].addEventListener('click', function(){ 
    image.src='red_back.webp';
    for(bt of btn){
        bt.classList.remove('active');
    } 
    this.classList.add('active');
});

btn[1].addEventListener('click', function(){ 
    image.src='red_front.webp';
    for(bt of btn){
        bt.classList.remove('active');
    } 
    this.classList.add('active');

});

btn[2].addEventListener('click', function(){ 
    image.src='red_side.webp';
    for(bt of btn){
        bt.classList.remove('active');
    } 
    this.classList.add('active') ;
});





