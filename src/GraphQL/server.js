const url = "http://localhost:4000/";

const queryFetch = async (query) => {
    const response = await fetch(url, {
        method: "POST",
        headers: {
            "Content-type": "application/json"
        },
        body: JSON.stringify({ query })
    });
    return await response.json();
};

export default queryFetch;
