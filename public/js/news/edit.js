const newsEditForm = document.querySelector("#news-edit-form")
let error = ""
const errMsg = document.querySelector(".err-msg")

newsEditForm.addEventListener("submit", async(e) => {
    e.preventDefault()

    const title = newsEditForm.title.value;
    const url = newsEditForm.url.value;
    const description = newsEditForm.description.value;
    const slug = newsEditForm.slug.value;

    try {
        const res = await fetch(`/news/${slug}/edit`, {
            method: "PUT",
            body: JSON.stringify({title, url, description}),
            headers: {"Content-Type": "application/json"}
        })
        const data = await res.json()

        if (data.success) {
            window.location.replace("/")
        } else {
            errMsg.innerHTML = `
                <div class="border p-3">
                    <div class="card-text text-danger">${data.error}</div>
                </div>
            `
        }
    } catch(err) {
        console.log(err)
    }
})