
// user ratings array and current rating
let ratingsArray = [];
let rating = 0;

// Used by html input elements to submit form once clicked
function submitForm(form, userRating) {

    rating = userRating;

    //get the form element's document to create the input control with
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

// function used for client side caching using localStorage
function cacheForm()
{
    // Create new entry for localStorage and ratingsArray
    const img =  document.getElementById("dogImg").src;
    const entry = {rate: rating, imgURL: img};

    // Local storage is empty
    if(!("ratings" in localStorage))
    {
        ratingsArray.push(entry);
        localStorage.setItem("ratings", JSON.stringify(ratingsArray));
    }

    // Local storage is not empty
    else
    {
        // push new entry on top of current entries in localStorage
        ratingsArray = JSON.parse(localStorage.getItem("ratings"));
        ratingsArray.push(entry);

        // sort array by ratings (highest to lowest)
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

            // or probably could also do (b - a)
        });

        // save array in local storage
        localStorage.setItem("ratings", JSON.stringify(ratingsArray));
    }
}

