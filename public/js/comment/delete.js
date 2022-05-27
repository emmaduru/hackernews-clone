const commentDeleteForms = document.querySelectorAll(".comment-delete-form")

commentDeleteForms.forEach(commentDeleteForm => {
    commentDeleteForm.addEventListener("submit", async (e) => {
        e.preventDefault()
        
        const comment_id = commentDeleteForm.comment_id.value;
        const news_slug = commentDeleteForm.news_slug.value

        try {
            const res = await fetch(`/news/${news_slug}/comments/${comment_id}/delete`, {
                method: "DELETE"
            })
            const data = await res.json()

            if (data.success) {
                window.location.reload()
            }
        } catch (err) {
            console.log(err)
        }
    })
})