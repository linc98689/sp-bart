const STATIONS_IMG = {
    "12TH": "https://upload.wikimedia.org/wikipedia/commons/thumb/8/87/Richmond-bound_train_at_12th_Street_Oakland_station%2C_July_2018.jpg/1600px-Richmond-bound_train_at_12th_Street_Oakland_station%2C_July_2018.jpg",
    "BERY": "https://www.sanjoseca.gov/home/showpublishedimage/15882/637805603148670000",
    "CAST":"https://live.staticflickr.com/3546/3551087306_ac30510f44_b.jpg",
    "COLS":"https://upload.wikimedia.org/wikipedia/commons/thumb/6/6c/Coliseum_BART_station_in_the_afternoon.jpg/1599px-Coliseum_BART_station_in_the_afternoon.jpg?20221217190110",
    "DBRK":"https://s3.amazonaws.com/sfc-datebook-wordpress/wp-content/uploads/sites/2/2018/10/61312324_DATEBOOK_bartart1027-1024x679.jpg",
    "OAKL": "https://cdn.kqed.org/wp-content/uploads/sites/10/2014/12/BART-Oakland.png",

};

const RAMDOM_IMGS = [
    "https://www.sftravel.com/sites/default/files/styles/hero/public/2023-02/bart-train-sfo.jpg.webp?itok=0mld-EYp",
    "https://www.railway-technology.com/wp-content/uploads/sites/13/2017/10/1-image-51.jpg",
    "https://www.railway-technology.com/wp-content/uploads/sites/13/2017/10/1-image-51.jpg",
    "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e8/BART_train_viewed_from_Oakland_Airport_station.jpg/1600px-BART_train_viewed_from_Oakland_Airport_station.jpg?20150326062406",
    "https://evilleeye.com/wp-content/uploads/2014/11/20141121_140839edited.jpg"

]
const findImgURLbyStation = (id)=>{
    let url = STATIONS_IMG[id];
    let idx = Math.floor(Math.random() * RAMDOM_IMGS.length);
    return url === undefined? RAMDOM_IMGS[idx] : url;
}
export {STATIONS_IMG, findImgURLbyStation};
