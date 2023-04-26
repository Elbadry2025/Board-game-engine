function initializeHTML(dimx, dimy){//, color1, color2){
    const chars = ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z'];
    let counter = 0;
    let container = document.getElementById('board');
    for (let i = 0; i < dimx*dimy; i++){
        if(i%dimy==0&&(dimx*dimy)%2==0)counter++
        let element = document.createElement('div');
        if(counter%2==0) element.className = "white"
        else element.className = "black"
        element.id = chars[i%dimy]+(Math.trunc(i/dimy)+1);
        container.appendChild(element);
        counter++;
    };

    // elementWhite = document.getElementsByClassName('white');
    // elementBlack = document.getElementsByClassName('black');
    // for(let i =0;i<elementWhite.length;i++)
    //     elementWhite[i].style.background = color1;
    // for(let i =0;i<elementBlack.length;i++)
    //     elementBlack[i].style.background = color2;
}