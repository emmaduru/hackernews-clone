const loginForm = document.querySelector("#login-form")
let error = ""
const errMsg = document.querySelector(".err-msg")

loginForm.addEventListener("submit", async (e) => {
    e.preventDefault()

    const username = loginForm.username.value;
    const password = loginForm.password.value;

    try {
        const res = await fetch("/auth/login", {
            method: "POST",
            body: JSON.stringify({username, password}),
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
    } catch (err) {
        console.log(err)
    }
    
})