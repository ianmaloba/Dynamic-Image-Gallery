
// By Ian Maloba

// Features
// -> Interactive Image Gallery with Zoom Lens Effect
// -> Fullscreen Image Viewer with Navigation
// -> Responsive Grid Layout
// -> Touch and Mouse Swipe Navigation
// -> Slideshow Mode
// -> Ultimate Fullscreen Toggle
// -> Keyboard Navigation Support
// -> Dynamic Image Height Adjustment
// -> Touch and Mouse Lens Zoom for Gallery and Fullscreen

// Configuration and State Management
const CONFIG = {
    LENS_SIZE: {
        GALLERY: 100,
        FULLSCREEN: 150
    },
    ZOOM_RATIO: {
        GALLERY: 2,
        FULLSCREEN: 3
    },
    SLIDESHOW_INTERVAL: 3000
};

class ImageGallery {
    constructor() {
        // DOM Elements
        this.gallery = document.getElementById('imageGallery');
        this.fullscreenOverlay = document.getElementById('fullscreenOverlay');
        this.fullscreenImage = document.getElementById('fullscreenImage');
        this.closeFullscreen = document.getElementById('closeFullscreen');
        this.prevButton = document.getElementById('prevButton');
        this.nextButton = document.getElementById('nextButton');
        this.slideshowToggle = document.getElementById('slideshowToggle');
        this.ultimateFullscreenToggle = document.getElementById('ultimateFullscreenToggle');

        // State Variables
        this.imageUrls = [
            "https://upload.wikimedia.org/wikipedia/commons/e/eb/Beach_zones.png",

            "https://upload.wikimedia.org/wikipedia/commons/thumb/6/67/London_Skyline_%28125508655%29.jpeg/1024px-London_Skyline_%28125508655%29.jpeg",

            "https://upload.wikimedia.org/wikipedia/commons/thumb/1/12/London_Eye_at_sunset_2013-07-19.jpg/800px-London_Eye_at_sunset_2013-07-19.jpg",

            "https://upload.wikimedia.org/wikipedia/commons/thumb/d/da/London%2C_Trafalgar_Square%2C_Nelson%27s_Column_--_2016_--_4851.jpg/800px-London%2C_Trafalgar_Square%2C_Nelson%27s_Column_--_2016_--_4851.jpg",

            "https://upload.wikimedia.org/wikipedia/commons/thumb/0/06/St_Paul%27s_Cathedral_Dome_from_One_New_Change_-_Vertical_Crop.jpg/320px-St_Paul%27s_Cathedral_Dome_from_One_New_Change_-_Vertical_Crop.jpg",

            "https://upload.wikimedia.org/wikipedia/commons/thumb/4/46/Dubai_Skyline_mit_Burj_Khalifa_%28cropped%29.jpg/1920px-Dubai_Skyline_mit_Burj_Khalifa_%28cropped%29.jpg",

            "https://upload.wikimedia.org/wikipedia/commons/thumb/c/cc/Dubai_Skylines_at_night_%28Pexels_3787839%29.jpg/800px-Dubai_Skylines_at_night_%28Pexels_3787839%29.jpg",

            "https://upload.wikimedia.org/wikipedia/commons/thumb/7/76/The_view_of_Dubai_Creek.jpg/800px-The_view_of_Dubai_Creek.jpg",

            "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e6/Dubai_Marina_Skyline.jpg/800px-Dubai_Marina_Skyline.jpg",

            "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f1/Burj_Al_Arab_%40_Madinat_Jumeirah_%40_Dubai_%2815851725086%29.jpg/800px-Burj_Al_Arab_%40_Madinat_Jumeirah_%40_Dubai_%2815851725086%29.jpg",

            "https://upload.wikimedia.org/wikipedia/commons/thumb/7/76/Dubai_Highrise.jpg/800px-Dubai_Highrise.jpg",

            "https://upload.wikimedia.org/wikipedia/commons/thumb/5/57/Imagen_de_los_canales_conc%C3%A9ntricos_en_%C3%81msterdam.png/268px-Imagen_de_los_canales_conc%C3%A9ntricos_en_%C3%81msterdam.png",

            "https://upload.wikimedia.org/wikipedia/commons/thumb/b/be/KeizersgrachtReguliersgrachtAmsterdam.jpg/800px-KeizersgrachtReguliersgrachtAmsterdam.jpg",

            "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5f/Reguliersgracht%2C_Amsterdam.jpg/800px-Reguliersgracht%2C_Amsterdam.jpg",

            "https://upload.wikimedia.org/wikipedia/commons/thumb/3/39/Concertgebouw_04.jpg/800px-Concertgebouw_04.jpg",

            "https://upload.wikimedia.org/wikipedia/commons/thumb/8/80/South_facade_of_the_Rijksmuseum_Amsterdam_%28DSCF0528%29.jpg/800px-South_facade_of_the_Rijksmuseum_Amsterdam_%28DSCF0528%29.jpg",

            "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2c/ZuidasAmsterdamtheNetherlands.jpg/1280px-ZuidasAmsterdamtheNetherlands.jpg",

            "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f7/Museumsinsel_Berlin_Juli_2021_1_%28cropped%29_b.jpg/1024px-Museumsinsel_Berlin_Juli_2021_1_%28cropped%29_b.jpg",

            "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a6/Brandenburger_Tor_abends.jpg/800px-Brandenburger_Tor_abends.jpg",

            "https://upload.wikimedia.org/wikipedia/commons/thumb/d/de/Berlin_-_Reichstag_-_2020.jpg/800px-Berlin_-_Reichstag_-_2020.jpg", "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/Obama_and_Biden_await_updates_on_bin_Laden.jpg/800px-Obama_and_Biden_await_updates_on_bin_Laden.jpg"  ,
                    
            "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7c/Robberg_Peninsula_-_a_home_of_seals.webp/800px-Robberg_Peninsula_-_a_home_of_seals.webp.png",
                        
            "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6e/00065_sand_collage.jpg/800px-00065_sand_collage.jpg",
                        
            "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b4/Hyams_Beach%2C_Jervis_Bay%2C_Australia.jpg/800px-Hyams_Beach%2C_Jervis_Bay%2C_Australia.jpg",

            "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b3/Castelldefels_September.JPG/800px-Castelldefels_September.JPG",
                        
            "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6b/BDA_Bermuda.jpg/800px-BDA_Bermuda.jpg",
                        
            "https://upload.wikimedia.org/wikipedia/commons/thumb/0/00/33_-_Ajuy.JPG/800px-33_-_Ajuy.JPG",
                        
            "https://upload.wikimedia.org/wikipedia/commons/thumb/f/fd/Santorini_97.jpg/1024px-Santorini_97.jpg",
                        
            "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e8/Ramla_Bay.jpg/800px-Ramla_Bay.jpg",
                    
            "https://upload.wikimedia.org/wikipedia/commons/4/4e/Sequins_iPhone_Background-5475096512.jpg" ,
                    
            "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/Green_sand_closeup_1.jpg/800px-Green_sand_closeup_1.jpg",
                        
            "https://upload.wikimedia.org/wikipedia/commons/thumb/4/47/Carters_Beach-_Sand.jpg/800px-Carters_Beach-_Sand.jpg",
                    
            "https://travel.home.sndimg.com/content/dam/images/travel/stock/2017/1/9/0/GettyImages_Burj_Khalifa_TallestBuilding_Topoftheworld_538290197.jpg.rend.hgtvcom.966.644.suffix/1491841333972.jpeg" ,
                    
            "https://upload.wikimedia.org/wikipedia/commons/thumb/b/bf/Mekong_beach_in_Si_Phan_Don.jpg/800px-Mekong_beach_in_Si_Phan_Don.jpg",
                    
            "https://travel.home.sndimg.com/content/dam/images/travel/fullrights/2017/1/9/0/Original_SteveLarese_Teotihuacan_MexicoCity_DSC03730.jpg.rend.hgtvcom.966.644.suffix/1491593902863.jpeg" ,
                    
            "https://travel.home.sndimg.com/content/dam/images/travel/fullrights/2017/1/9/0/Original_SteveLarese_Albuquerque_Balloon_800_1987.jpg.rend.hgtvcom.966.725.suffix/1491593902887.jpeg" ,
                
            "https://upload.wikimedia.org/wikipedia/commons/thumb/b/bc/Yarmouk_crisis_%28cropped%29.jpg/800px-Yarmouk_crisis_%28cropped%29.jpg" ,
                    
            "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7a/View_of_Empire_State_Building_from_Rockefeller_Center_New_York_City_dllu_%28cropped%29.jpg/1024px-View_of_Empire_State_Building_from_Rockefeller_Center_New_York_City_dllu_%28cropped%29.jpg",

            "https://upload.wikimedia.org/wikipedia/commons/thumb/6/67/London_Skyline_%28125508655%29.jpeg/1024px-London_Skyline_%28125508655%29.jpeg",

            "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b9/Above_Gotham.jpg/1024px-Above_Gotham.jpg",

            "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b2/Skyscrapers_of_Shinjuku_2009_January.jpg/1024px-Skyscrapers_of_Shinjuku_2009_January.jpg",

            "https://upload.wikimedia.org/wikipedia/commons/thumb/4/43/Tokyo_Skytree_at_night_%28Iki%29_%28cropped%29.jpg/320px-Tokyo_Skytree_at_night_%28Iki%29_%28cropped%29.jpg",

            "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/Rainbow_Bridge_%28Tokyo%29_at_night_8.jpg/800px-Rainbow_Bridge_%28Tokyo%29_at_night_8.jpg",

            "https://upload.wikimedia.org/wikipedia/commons/thumb/e/ed/TaroTokyo20110213-TokyoTower-01min.jpg/320px-TaroTokyo20110213-TokyoTower-01min.jpg",

            "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c5/Tokyo_Shibuya_Scramble_Crossing_2018-10-09.jpg/800px-Tokyo_Shibuya_Scramble_Crossing_2018-10-09.jpg",

            "https://upload.wikimedia.org/wikipedia/commons/thumb/1/16/National_Diet_Building_02.jpg/1024px-National_Diet_Building_02.jpg",

            "https://upload.wikimedia.org/wikipedia/commons/thumb/c/ca/024_Seimon_Ishibashi_2.jpg/1024px-024_Seimon_Ishibashi_2.jpg",

            "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1d/Tokyo-STA_Marunouchi-Entrance_2023.jpg/800px-Tokyo-STA_Marunouchi-Entrance_2023.jpg",

            "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4b/La_Tour_Eiffel_vue_de_la_Tour_Saint-Jacques%2C_Paris_ao%C3%BBt_2014_%282%29.jpg/1024px-La_Tour_Eiffel_vue_de_la_Tour_Saint-Jacques%2C_Paris_ao%C3%BBt_2014_%282%29.jpg",

            "https://upload.wikimedia.org/wikipedia/commons/thumb/a/af/Notre-Dame_de_Paris_2013-07-24.jpg/800px-Notre-Dame_de_Paris_2013-07-24.jpg",

            "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6d/Arc_de_Triomphe_HDR_2007.jpg/800px-Arc_de_Triomphe_HDR_2007.jpg",

            "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a2/Louvre_Courtyard%2C_Looking_West.jpg/1920px-Louvre_Courtyard%2C_Looking_West.jpg", 

            "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a4/Hidden_Beach_%2815093910956%29.jpg/800px-Hidden_Beach_%2815093910956%29.jpg"
        ];
        this.currentImageIndex = 0;
        this.touchStartX = 0;
        this.touchEndX = 0;
        this.slideshowInterval = null;
        this.slideshowActive = false;

        this.initializeEventListeners();
        this.renderGallery();
    }

    initializeEventListeners() {
        // Fullscreen Navigation
        this.closeFullscreen.addEventListener('click', () => this.closeFullscreenView());
        this.fullscreenOverlay.addEventListener('click', (e) => this.handleOverlayClick(e));
        this.nextButton.addEventListener('click', (e) => this.handleNextImage(e));
        this.prevButton.addEventListener('click', (e) => this.handlePrevImage(e));

        // Touch Navigation
        this.fullscreenImage.addEventListener('touchstart', (e) => this.handleTouchStart(e));
        this.fullscreenImage.addEventListener('touchend', (e) => this.handleTouchEnd(e));

        // Slideshow and Fullscreen Toggles
        this.slideshowToggle.addEventListener('click', () => this.toggleSlideshow());
        this.ultimateFullscreenToggle.addEventListener('click', () => this.toggleUltimateFullscreen());

        // Keyboard Navigation
        document.addEventListener('keydown', (e) => this.handleKeyboardNavigation(e));
    }

    renderGallery() {
        this.gallery.innerHTML = '';
        this.imageUrls.forEach((url, index) => {
            const galleryItem = this.createGalleryItem(url, index);
            this.gallery.appendChild(galleryItem);
        });
    }

    createGalleryItem(url, index) {
        const div = document.createElement('div');
        div.className = 'gallery-item';
        
        const img = document.createElement('img');
        img.src = url;
        img.alt = `Image ${index + 1}`;
        
        const lens = document.createElement('div');
        lens.className = 'lens';
        
        div.appendChild(img);
        div.appendChild(lens);

        this.setupLensEffects(div, img, lens, CONFIG.LENS_SIZE.GALLERY, CONFIG.ZOOM_RATIO.GALLERY);
        img.addEventListener('load', () => this.adjustItemHeight(div, img));
        img.addEventListener('click', () => this.openFullscreen(index));
        
        return div;
    }

    setupLensEffects(item, img, lens, lensSize, zoomRatio) {
        const lensHandlers = {
            mousemove: (e) => this.createLensEffect(e, img, lens, lensSize, zoomRatio),
            mouseenter: () => lens.style.display = 'block',
            mouseleave: () => lens.style.display = 'none',
            touchstart: (e) => {
                lens.style.display = 'block';
                this.createLensEffect(e.touches[0], img, lens, lensSize, zoomRatio);
            },
            touchmove: (e) => this.createLensEffect(e.touches[0], img, lens, lensSize, zoomRatio),
            touchend: () => lens.style.display = 'none'
        };

        Object.entries(lensHandlers).forEach(([event, handler]) => {
            item.addEventListener(event, handler);
        });
    }

    createLensEffect(e, img, lens, lensSize, zoomRatio) {
        const item = img.parentElement;
        const itemRect = item.getBoundingClientRect();
        
        const x = e.clientX - itemRect.left;
        const y = e.clientY - itemRect.top;
        
        lens.style.width = `${lensSize}px`;
        lens.style.height = `${lensSize}px`;
        lens.style.left = `${x - lensSize / 2}px`;
        lens.style.top = `${y - lensSize / 2}px`;
        
        const bgX = -((x / itemRect.width) * img.naturalWidth - lensSize / 2) * zoomRatio;
        const bgY = -((y / itemRect.height) * img.naturalHeight - lensSize / 2) * zoomRatio;
        
        lens.style.backgroundImage = `url('${img.src}')`;
        lens.style.backgroundSize = `${img.naturalWidth * zoomRatio}px ${img.naturalHeight * zoomRatio}px`;
        lens.style.backgroundPosition = `${bgX}px ${bgY}px`;
    }

    adjustItemHeight(item, img) {
        const aspectRatio = img.naturalHeight / img.naturalWidth;
        item.style.gridRowEnd = `span ${Math.ceil(aspectRatio * 15)}`;
    }

    openFullscreen(index) {
        this.currentImageIndex = index;
        this.fullscreenImage.src = this.imageUrls[index];
        this.fullscreenOverlay.style.display = 'flex';
        
        this.stopSlideshow();
        
        this.fullscreenImage.onload = () => this.addLensToFullscreen();
    }

    addLensToFullscreen() {
        const fullscreenLens = document.createElement('div');
        fullscreenLens.className = 'lens';
        this.fullscreenOverlay.querySelector('.fullscreen-content').appendChild(fullscreenLens);

        this.setupLensEffects(
            this.fullscreenImage, 
            this.fullscreenImage, 
            fullscreenLens, 
            CONFIG.LENS_SIZE.FULLSCREEN, 
            CONFIG.ZOOM_RATIO.FULLSCREEN
        );
    }

    navigateImage(direction) {
        const currentImage = this.fullscreenImage;
        currentImage.classList.add('morphing');

        setTimeout(() => {
            this.currentImageIndex = (this.currentImageIndex + direction + this.imageUrls.length) % this.imageUrls.length;
            
            const progressLine = document.createElement('div');
            progressLine.className = 'slideshow-progress';
            this.fullscreenOverlay.appendChild(progressLine);

            currentImage.classList.remove('morphing');
            currentImage.classList.add('morphing-next');
            
            setTimeout(() => {
                this.fullscreenImage.src = this.imageUrls[this.currentImageIndex];
                currentImage.classList.remove('morphing-next');
                progressLine.remove();
            }, 800);
            
            if (this.slideshowActive) {
                this.fullscreenOverlay.style.display = 'flex';
            }
        }, 400);
    }

    toggleSlideshow() {
        if (!this.slideshowActive) {
            this.slideshowActive = true;
            this.openFullscreen(0);
            
            this.slideshowInterval = setInterval(() => {
                this.navigateImage(1);
            }, CONFIG.SLIDESHOW_INTERVAL);
        }
    }

    stopSlideshow() {
        if (this.slideshowInterval) {
            clearInterval(this.slideshowInterval);
            this.slideshowActive = false;
        }
    }

    toggleUltimateFullscreen() {
        if (!document.fullscreenElement) {
            document.documentElement.requestFullscreen();
            this.ultimateFullscreenToggle.textContent = 'Exit Ultimate Fullscreen';
        } else {
            document.exitFullscreen();
            this.ultimateFullscreenToggle.textContent = 'Ultimate Fullscreen';
        }
    }

    // Event Handlers
    closeFullscreenView() {
        this.fullscreenImage.classList.add('closing');
        this.fullscreenOverlay.classList.add('closing');
        
        setTimeout(() => {
            this.fullscreenOverlay.style.display = 'none';
            this.fullscreenImage.classList.remove('closing');
            this.fullscreenOverlay.classList.remove('closing');
            this.stopSlideshow();
        }, 300);
    }

    handleOverlayClick(e) {
        if (e.target === this.fullscreenOverlay) {
            this.fullscreenOverlay.style.display = 'none';
            this.stopSlideshow();
        }
    }

    handleNextImage(e) {
        e.stopPropagation();
        this.navigateImage(1);
    }

    handlePrevImage(e) {
        e.stopPropagation();
        this.navigateImage(-1);
    }

    handleTouchStart(e) {
        this.touchStartX = e.changedTouches[0].screenX;
    }

    handleTouchEnd(e) {
        this.touchEndX = e.changedTouches[0].screenX;
        this.handleSwipe();
    }

    handleSwipe() {
        if (this.touchEndX < this.touchStartX) {
            this.navigateImage(1);
        } else if (this.touchEndX > this.touchStartX) {
            this.navigateImage(-1);
        }
    }

    handleKeyboardNavigation(e) {
        const isFullscreenVisible = this.fullscreenOverlay.style.display === 'flex';

        if (isFullscreenVisible) {
            switch(e.key) {
                case 'ArrowRight':
                    this.navigateImage(1);
                    break;
                case 'ArrowLeft':
                    this.navigateImage(-1);
                    break;
                case 'Escape':
                    this.fullscreenOverlay.style.display = 'none';
                    this.stopSlideshow();
                    break;
            }
        }

        // Ultimate fullscreen toggle with Esc
        if (e.key === 'Escape' && document.fullscreenElement) {
            document.exitFullscreen();
            this.ultimateFullscreenToggle.textContent = 'Ultimate Fullscreen';
        }
    }
}

// Initialize the gallery when the page loads
document.addEventListener('DOMContentLoaded', () => {
    new ImageGallery();
});