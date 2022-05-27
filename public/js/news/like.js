const likeBtns = document.querySelectorAll(".news-like")

likeBtns.forEach(likeBtn => {
    likeBtn.addEventListener("click", async (e) => {
        e.preventDefault()
        try {
            const res = await fetch(`/news/${likeBtn.id}/like`, {
                method: "PUT"
            })
            const data = await res.json()

            if (data.success) {
                likeBtn.innerHTML = `
                    <i class="fa-solid fa-angle-up fa-2x"></i><br>
                    <span class="like-count">${data.likes}</span>
                `
                if (likeBtn.classList.contains("btn-outline-primary")) {
                    likeBtn.classList.replace("btn-outline-primary", "btn-primary")
                } else {
                    likeBtn.classList.replace("btn-primary", "btn-outline-primary")
                }
            }
        } catch (err) {
            console.log(err)
        }
    })
})