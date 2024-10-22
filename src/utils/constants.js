export const LOGO = "https://assets.nflxext.com/ffe/siteui/acquisition/home/nflxlogo.png" 
export const USER_AVATAR = "https://occ-0-5452-3662.1.nflxso.net/dnm/api/v6/vN7bi_My87NPKvsBoib006Llxzg/AAAABTZ2zlLdBVC05fsd2YQAR43J6vB1NAUBOOrxt7oaFATxMhtdzlNZ846H3D8TZzooe2-FT853YVYs8p001KVFYopWi4D4NXM.png?r=229"
console.log( process.env.REACT_APP_TMDB_KEY);
export const API_OPTIONS = {
    method: "GET",
    headers: {
        accept: "application/json",
        Authorization: "Bearer " + process.env.REACT_APP_TMDB_KEY,
        

    },
};

export const IMG_CDN_URL = "https://image.tmdb.org/t/p/w500"

export const BG_URL = "https://images.unsplash.com/photo-1626814026160-2237a95fc5a0?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
export const SUPPORTED_LANGUAGES = [{identifier: "en", name: "English"},{identifier: "malayalam", name: "Malayalam"},{identifier: "spanish", name: "Spanish"}]

export const OPENAI_KEY = process.env.REACT_APP_OPENAI_KEY;



