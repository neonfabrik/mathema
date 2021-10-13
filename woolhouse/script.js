//var btn = document.createElement("BUTTON");
//btn.innerHTML = "CLICK ME";
//var bdy = document.body;

var grid;
var result;
var allNumbers = [];
var selNumbers = [];
var genNumbers = [];

document.addEventListener("DOMContentLoaded", function(event)
{
    grid = document.getElementById("Grid");

    initAllNumbers();
    initButtonClick();
    result = document.getElementById("Result");
    //result.style.display = "none";
    console.log(result);
});

function initAllNumbers()
{
    

    for(i = 1; i <= 70; i++)
    {
        var lineBreak = document.createElement("br");
        allNumbers.push(i);
        var btn = document.createElement("button");
        btn.className = "gridButton";
        btn.name = "b_" + i;
        btn.id = "b_" + i;
        btn.innerHTML = i;
        grid.appendChild(btn);
        if(i % 10 === 0) grid.appendChild(lineBreak);
    }
    console.log(allNumbers);
}

function initButtonClick()
{
    document.querySelectorAll('.gridButton').forEach(function(e) {
        e.addEventListener('click', function() {
        var idx = parseInt(this.innerHTML);
        result.style.display = "none";
        genNumbers = [];
        if(!selNumbers.includes(idx))
        { 
            selNumbers.push(idx);
            //this.style.backgroundColor = getComputedStyle(document.documentElement).getPropertyValue("--gridButtonSelect");
        }
        else
        {
            //selNumbers.pop(idx);

                selNumbers = selNumbers.filter(function(value, index, arr) {
                    return value != idx;
                });
            //this.style.backgroundColor = getComputedStyle(document.documentElement).getPropertyValue("--gridButtonBG");
        }
        updateGridColors();
        })
        //console.log(selNumbers);
        
        
    });
    
}

function generateNumbers()
{
    var remNumbers = allNumbers.slice();
    selNumbers.forEach(num => {
        remNumbers = remNumbers.filter(function(value, index, arr) {
            return value != num;
        });
    });
    //console.log(remNumbers);
    var remCount = 11-selNumbers.length;
    if (remCount <= 0) genNumbers = [];
    else {
        remNumbers = shuffleArray(remNumbers).splice(0,remCount);
        genNumbers = remNumbers;
    }
    updateGridColors();
    result.style.display = "block";
    updateGeneratedSequence();
}

function updateGridColors()
{
    allNumbers.forEach(num => {
        var btn = document.getElementById("b_" + num);
        if(selNumbers.includes(num))
        {
            btn.style.backgroundColor = getComputedStyle(document.documentElement).getPropertyValue("--gridButtonSelect");
        }
        else if (genNumbers.includes(num))
        {
            btn.style.backgroundColor = getComputedStyle(document.documentElement).getPropertyValue("--gridButtonGenerated");
        }
        else
        {
            btn.style.backgroundColor = getComputedStyle(document.documentElement).getPropertyValue("--gridButtonBG");
        }
    });
}

function updateGeneratedSequence()
{
    //result.hidden = false;
    /*
    while(result.)
    {
        result.removeChild(lastElementChild);
    }
    */
   result.innerHTML = "<p>Generated sequence:</p> <br>";
    var theNumbers = selNumbers.concat(genNumbers);
    theNumbers.sort();
    console.log(theNumbers);
    theNumbers.forEach(num => {
        var btn = document.createElement("button");
        btn.innerHTML = num;
        btn.className = "resultButton";
        if(selNumbers.includes(num))
        {
            btn.style.backgroundColor = getComputedStyle(document.documentElement).getPropertyValue("--gridButtonSelect");
        } else 
        {
            btn.style.backgroundColor = getComputedStyle(document.documentElement).getPropertyValue("--gridButtonGenerated");
        }
        result.appendChild(btn);
    });
    //result.innerHTML = "ghkgak";

}

function shuffleArray(array) {
    let currentIndex = array.length,  randomIndex;
    while (currentIndex != 0) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]];
    }
  
    return array;
  }
  


//bdy.appendChild(btn); 