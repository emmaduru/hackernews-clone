const signupForm = document.querySelector("#signup-form")
let error = ""
const errMsg = document.querySelector(".err-msg")

signupForm.addEventListener("submit", async (e) => {
    e.preventDefault()

    const username = signupForm.username.value;
    const email = signupForm.email.value;
    const password = signupForm.password.value;

    if (password.length < 6) {
        error = "Password should have at least 6 characters."
        errMsg.innerHTML = `
            <div class="border p-3">
                <div class="card-text text-danger">${error}</div>
            </div>
        `;
        return;
    }

    try {
        const res = await fetch("/auth/signup", {
            method: "POST",
            body: JSON.stringify({username, email, password}),
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