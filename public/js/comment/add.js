const commentCreateForm = document.querySelector("#comment-create-form")

commentCreateForm.addEventListener("submit", async (e) => {
    e.preventDefault()

    const news_slug = commentCreateForm.news_slug.value;
    const body = commentCreateForm.body.value;

    try {
        const res = await fetch(`/news/${news_slug}/comments/add`, {
            method: "POST",
            body: JSON.stringify({body}),
            headers: {"Content-Type": "application/json"}
        })
        const data = await res.json()

        if (data.success) {
            window.location.reload();
        }
    } catch(err) {
        console.log(err)
    }
})