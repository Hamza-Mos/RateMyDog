let ratingsArray = [];
let entry = {rating: 5, imgURL: "URL"};
// ratingsArray.push(entry);

// console.log("we here");

// JSON.stringify(ratingsArray);
// console.log(ratingsArray);

const ratingInput = document.getElementById("rating");

function cacheForm()
{
    localStorage.clear();
    const img =  document.getElementById("rateButton").value;
    const rating = ratingInput.value;

    const entry = {rate: rating, imgURL: img};

    if(!("ratings" in localStorage))
    {
        ratingsArray.push(entry);
        localStorage.setItem("ratings", JSON.stringify(ratingsArray));

        console.log("yessir");
    }

    else
    {
        console.log("first timer");

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

