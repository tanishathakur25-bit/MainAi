async function askGemini() {

    const question = document.getElementById("question").value;

    const response = await fetch("https://mainai-u81g.onrender.com/ask", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ question })
    });

    const data = await response.json();

    document.getElementById("answer").textContent = data.answer;
}



