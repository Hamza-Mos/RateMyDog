let ratingsArray = [];

let rating = 0;

function submitForm(form, userRating) {

    rating = userRating;

    //get the form element's document to create the input control with
    //(this way will work across windows in IE8)
    var button = form.ownerDocument.createElement('input');

    //make sure it can't be seen/disrupts layout (even momentarily)
    button.style.display = 'none';

    //make it such that it will invoke submit if clicked
    button.type = 'submit';

    //append it and click it
    form.appendChild(button).click();

    //if it was prevented, make sure we don't get a build up of buttons
    form.removeChild(button);
}


function cacheForm()
{
    const img =  document.getElementById("dogImg").src;

    const entry = {rate: rating, imgURL: img};

    if(!("ratings" in localStorage))
    {
        ratingsArray.push(entry);
        localStorage.setItem("ratings", JSON.stringify(ratingsArray));
    }

    else
    {

        ratingsArray = JSON.parse(localStorage.getItem("ratings"));
        ratingsArray.push(entry);

        ratingsArray.sort((a,b) => {
            if(a.rate > b.rate)
            {
                return -1;
            }

            else if(b.rate > a.rate)
            {
                return 1;
            }

            else
            {
                return 0;
            }

            // or prolly could also do (b - a)
        });

        localStorage.setItem("ratings", JSON.stringify(ratingsArray));
    }
}

