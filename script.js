const apodApp = {};

apodApp.$displayData = $('ul');
apodApp.$dateInput = $('input[type=date]');

apodApp.formListener = function(e) {
    e.preventDefault();
    const submittedDate = apodApp.$dateInput.val();
    
    const api_call = $.ajax({
        url: 'https://api.nasa.gov/planetary/apod?api_key=lZWUgJmVRzcKTbHPVGw99CvrQMgb9TyUBTxvlWQa',
        dataType: 'json',
        method: 'GET',
        data: {
            date: submittedDate
        }
    });

    api_call.then(function(data) {
        const $removeElement = $('li');
        $removeElement.remove();
        const selectedDate = data.date;
        const title = data.title;
        const explanation = data.explanation;
        const mediaType = data.media_type;
        
        if(mediaType === 'video') {
            const videoSrc = data.url;
            apodApp.$displayData.append(`
                <li>
                    <div><span>Date:</span> ${selectedDate}</div>
                    <br>
                    <div><span>Title:</span> ${title}</div>
                    <br>
                    <iframe src="${videoSrc}" frameborder="0"></iframe>
                    <div>${explanation}</div>
                </li>
            `);
        } else {
            const imgSrc = data.url;
            apodApp.$displayData.append(`
                <li>
                    <div><span>Date:</span> ${selectedDate}</div>
                    <br>
                    <div><span>Title:</span> ${title}</div>
                    <br>
                    <img src="${imgSrc}" alt="${explanation}">
                    <div>${explanation}</div>
                </li>
            `);
        };
    }).catch(function() {
        alert('please choose a date between June 16th, 1995 and today');
    });
    apodApp.$dateInput.val('');
};

apodApp.init = () => {
    $('form').on('submit', apodApp.formListener);
};

$(() => {
    apodApp.init();
});