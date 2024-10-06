function getData(kategori = "", id = "") {
    return fetch(`../main/data/${kategori}.json`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok ' + response.statusText);
            }
            return response.json();
        })
        .catch(err => {
            console.error('Fetch Error: ', err);
        });
}

// CARA PEMANGGILAN FUNGSI
// getData("projects")
//     .then(data => {
//         // console.log(data);
//     });

export { getData };
