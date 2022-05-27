const newsDeleteForms = document.querySelectorAll(".news-delete-form")

newsDeleteForms.forEach(newsDeleteForm => {
    newsDeleteForm.addEventListener("submit", async (e) => {
        e.preventDefault()

        const slug = newsDeleteForm.slug.value;

        try {
            const res = await fetch (`/news/${slug}/delete`, {
                method: "DELETE"
            })
            const data = await res.json();

            if (data.success) {
                window.location.replace("/news")
            }
        } catch (err) {
            console.log(err)
        }
    })
})