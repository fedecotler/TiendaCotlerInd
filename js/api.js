fetch('https://fashion4.p.rapidapi.com/v1/results')
then(response => response.json())
then(response => console.log(response))
catch(err => console.error(err));