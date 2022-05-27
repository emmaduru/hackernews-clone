const newsCreateForm = document.querySelector("#news-create-form");
let error = ""
const errMsg = document.querySelector(".err-msg")

newsCreateForm.addEventListener("submit", async(e) => {
    e.preventDefault()

    const title = newsCreateForm.title.value;
    const url = newsCreateForm.url.value;
    const description = newsCreateForm.description.value;

    try {
        const res = await fetch("/news/submit", {
            method: "POST",
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