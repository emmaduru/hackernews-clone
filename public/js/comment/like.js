const commentLikeBtns = document.querySelectorAll(".comment-like-btn")

commentLikeBtns.forEach(commentLikeBtn => {
    commentLikeBtn.addEventListener("click", async (e) => {
        e.preventDefault()
        const ids = commentLikeBtn.id.split(" ");

        try {
            const res = await fetch(`/news/${ids[1]}/comments/${ids[0]}/like`, {
                method: "PUT"
            })
            const data = await res.json()

            if (data.success) {
                commentLikeBtn.innerHTML = `
                    <i class="fa-solid fa-angle-up fa-2x"></i><br>
                    <span class="like-count">${data.likes}</span>
                `
                if (commentLikeBtn.classList.contains("btn-outline-primary")) {
                    commentLikeBtn.classList.replace("btn-outline-primary", "btn-primary")
                } else {
                    commentLikeBtn.classList.replace("btn-primary", "btn-outline-primary")
                }
            }
        } catch (err) {
            console.log(err)
        }
    })
})