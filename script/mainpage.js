$("#mptoggle").click(() => {
    loadArticleByNum(0);
});

// Swipe("mainpage", (e) => {
//     if (e.len < 125) return;
//     if (within(e.deg, 180, 25) && getHashPre() == "home") {
//         loadArticleByNum(0);
//         //console.log("[Swipe] Swipe Up.");
//     }
// });