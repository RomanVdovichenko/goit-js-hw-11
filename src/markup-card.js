export default function markup(arr) {
    const markup = arr.map(item => 
                `<div class="photo-card">
                    <a class="gallery__item" href="${item.largeImageURL}">
                        <img
                        class="gallery__image"
                        src="${item.webformatURL}"
                        alt="${item.tags}"
                        loading="lazy"
                        />
                    </a>                   
                    <div class="info">
                        <p class="info-item">
                            <b>Likes:</b>
                            <span>${item.likes}</span>
                        </p>
                        <p class="info-item">
                            <b>Views:</b>
                            <span>${item.views}</span>
                        </p>
                        <p class="info-item">
                            <b>Comments:</b>
                            <span>${item.comments}</span>
                        </p>
                        <p class="info-item">
                            <b>Downloads:</b>
                            <span>${item.downloads}</span>
                        </p>
                    </div>
                </div>`         
    ).join('');
    return markup
}